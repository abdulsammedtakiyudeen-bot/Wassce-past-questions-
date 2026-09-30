import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT || 3000);
const DB = path.join(ROOT, '.data', 'users.json');
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `http://localhost:${PORT}/api/auth/google/callback`;
const sessions = new Map();

async function readUsers(){ try{return JSON.parse(await fs.readFile(DB,'utf8'))}catch{return []} }
async function saveUsers(users){await fs.mkdir(path.dirname(DB),{recursive:true});await fs.writeFile(DB,JSON.stringify(users,null,2),'utf8')}
function send(res,status,data,headers={}){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers});res.end(JSON.stringify(data))}
function redirect(res,url){res.writeHead(302,{Location:url});res.end()}
function parseCookies(req){return Object.fromEntries((req.headers.cookie||'').split(';').filter(Boolean).map(x=>{const i=x.indexOf('=');return [x.slice(0,i).trim(),decodeURIComponent(x.slice(i+1))]}))}
function sign(value){return crypto.createHmac('sha256',SESSION_SECRET).update(value).digest('hex')}
function setSession(res,user){const id=crypto.randomBytes(24).toString('hex');sessions.set(id,user);res.setHeader('Set-Cookie',`wassce_session=${id}.${sign(id)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800`);return id}
function getSession(req){const raw=parseCookies(req).wassce_session||'';const [id,sig]=raw.split('.');if(!id||sig!==sign(id))return null;return sessions.get(id)||null}
function clearSession(res){res.setHeader('Set-Cookie','wassce_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0')}
async function body(req){let s='';for await(const chunk of req)s+=chunk;return s?JSON.parse(s):{}}
function hashPassword(password,salt=crypto.randomBytes(16).toString('hex')){return new Promise((resolve,reject)=>crypto.scrypt(password,salt,64,(e,key)=>e?reject(e):resolve(`${salt}:${key.toString('hex')}`)))}
async function verifyPassword(password,stored){const [salt,hex]=stored.split(':');const key=await hashPassword(password,salt);return crypto.timingSafeEqual(Buffer.from(key.split(':')[1],'hex'),Buffer.from(hex,'hex'))}

const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`);
    if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Credentials':'true'});return res.end()}
    if(url.pathname==='/api/health') return send(res,200,{ok:true,service:'WASSCE Study API',googleConfigured:Boolean(GOOGLE_CLIENT_ID&&GOOGLE_CLIENT_SECRET)});
    if(url.pathname==='/api/me'){const user=getSession(req);return send(res,200,{user:user||null})}
    if(url.pathname==='/api/logout'){clearSession(res);return send(res,200,{ok:true})}
    if(url.pathname==='/api/auth/local'&&req.method==='POST'){
      const b=await body(req); if(!b.email||!b.password)return send(res,400,{error:'Email and password are required.'});
      const users=await readUsers(); const email=String(b.email).trim().toLowerCase();
      if(b.action==='signup'){if(!b.name)return send(res,400,{error:'Name is required.'});if(users.some(u=>u.email===email))return send(res,409,{error:'An account with this email already exists.'});const user={id:crypto.randomUUID(),name:String(b.name).trim(),email,provider:'local',passwordHash:await hashPassword(String(b.password)),joinedAt:new Date().toISOString()};users.push(user);await saveUsers(users);const safe={id:user.id,name:user.name,email:user.email,provider:'local',joinedAt:user.joinedAt};setSession(res,safe);return send(res,201,{user:safe})}
      const user=users.find(u=>u.email===email);if(!user||!await verifyPassword(String(b.password),user.passwordHash))return send(res,401,{error:'Incorrect email or password.'});const safe={id:user.id,name:user.name,email:user.email,provider:'local',joinedAt:user.joinedAt};setSession(res,safe);return send(res,200,{user:safe});
    }
    if(url.pathname==='/api/auth/google/start'){
      if(!GOOGLE_CLIENT_ID||!GOOGLE_CLIENT_SECRET)return send(res,503,{error:'Google OAuth is not configured on this server.'});
      const returnTo=url.searchParams.get('returnTo')||'/';
      const state=crypto.randomBytes(24).toString('hex');sessions.set(`oauth:${state}`,{returnTo,createdAt:Date.now()});
      const auth=new URL('https://accounts.google.com/o/oauth2/v2/auth');auth.searchParams.set('client_id',GOOGLE_CLIENT_ID);auth.searchParams.set('redirect_uri',GOOGLE_REDIRECT_URI);auth.searchParams.set('response_type','code');auth.searchParams.set('scope','openid email profile');auth.searchParams.set('state',state);return redirect(res,auth.toString());
    }
    if(url.pathname==='/api/auth/google/callback'){
      const state=url.searchParams.get('state')||'';const oauth=sessions.get(`oauth:${state}`);sessions.delete(`oauth:${state}`);if(!oauth)return send(res,400,{error:'Invalid or expired OAuth state.'});
      if(url.searchParams.get('error'))return redirect(res,oauth.returnTo);
      const code=url.searchParams.get('code');if(!code)return send(res,400,{error:'Missing Google authorization code.'});
      const tokenResp=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({code,client_id:GOOGLE_CLIENT_ID,client_secret:GOOGLE_CLIENT_SECRET,redirect_uri:GOOGLE_REDIRECT_URI,grant_type:'authorization_code'})});
      const tokens=await tokenResp.json();if(!tokenResp.ok)return send(res,502,{error:'Google token exchange failed.'});
      const infoResp=await fetch('https://openidconnect.googleapis.com/v1/userinfo',{headers:{Authorization:`Bearer ${tokens.access_token}`}});
      const info=await infoResp.json();if(!infoResp.ok)return send(res,502,{error:'Google profile lookup failed.'});
      const users=await readUsers();let user=users.find(u=>u.provider==='google'&&u.providerId===info.sub)||users.find(u=>u.email===String(info.email||'').toLowerCase());
      if(!user){user={id:crypto.randomUUID(),name:info.name||info.email?.split('@')[0]||'Student',email:String(info.email||'').toLowerCase(),provider:'google',providerId:info.sub,joinedAt:new Date().toISOString()};users.push(user);await saveUsers(users)}
      const safe={id:user.id,name:user.name,email:user.email,provider:'google',joinedAt:user.joinedAt};setSession(res,safe);return redirect(res,oauth.returnTo);
    }
    if(url.pathname.startsWith('/api/'))return send(res,404,{error:'API route not found.'});
    // Optional production static hosting: build first, then run this server.
    const dist=path.join(ROOT,'dist','public');let filePath=url.pathname==='/'?path.join(dist,'index.html'):path.join(dist,url.pathname.replace(/^\/+/,''));try{const stat=await fs.stat(filePath);if(stat.isDirectory())filePath=path.join(filePath,'index.html');const data=await fs.readFile(filePath);const ext=path.extname(filePath);const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.pdf':'application/pdf','.webmanifest':'application/manifest+json'};res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'});return res.end(data)}catch{try{return res.end(await fs.readFile(path.join(dist,'index.html')))}catch{return send(res,404,{error:'Build not found. Run pnpm build first.'})}}
  }catch(e){console.error(e);send(res,500,{error:'Unexpected server error.'})}
});
server.listen(PORT,()=>console.log(`WASSCE Study API listening on http://localhost:${PORT}`));
