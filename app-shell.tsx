import { BookOpen, ChartNoAxesCombined, ClipboardCheck, CloudOff, Download, FileText, GraduationCap, Home, Info, Library, Mail, Menu, Moon, PanelLeft, Sun, UserCircle, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useEffect, useState, type ReactNode } from 'react';

const nav = [
  { href: '/', label: 'Overview', icon: Home },
  { href: '/resources', label: 'Resource library', icon: Library },
  { href: '/mocks', label: 'Mock exams', icon: ClipboardCheck },
  { href: '/super-mocks', label: 'Super mocks', icon: GraduationCap },
  { href: '/reports', label: 'Examiner reports', icon: FileText },
  { href: '/guides', label: 'Study guides', icon: BookOpen },
  { href: '/downloads', label: 'Downloads', icon: Download },
  { href: '/progress', label: 'My progress', icon: ChartNoAxesCombined },
];
const mobileNav = nav.slice(0, 5);
type BeforeInstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> };

export function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('wassce-theme') === 'dark');
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('wassce-theme', dark ? 'dark' : 'light'); }, [dark]);
  return [dark, setDark] as const;
}
export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation(); const [dark, setDark] = useTheme(); const [online, setOnline] = useState(navigator.onLine); const [installReady, setInstallReady] = useState(false); const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null); const [menuOpen, setMenuOpen] = useState(false);
  const user = (() => { try { return JSON.parse(localStorage.getItem('wassce-user') || 'null') as {name?: string; email?: string} | null; } catch { return null; } })();
  useEffect(() => { const on=()=>setOnline(true), off=()=>setOnline(false); window.addEventListener('online',on); window.addEventListener('offline',off); const prompt=(e:Event)=>{e.preventDefault();setInstallEvent(e as BeforeInstallPromptEvent);setInstallReady(true)}; window.addEventListener('beforeinstallprompt',prompt); return()=>{window.removeEventListener('online',on);window.removeEventListener('offline',off);window.removeEventListener('beforeinstallprompt',prompt)}; },[]);
  useEffect(() => { if ('serviceWorker' in navigator) navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(()=>undefined); },[]);
  const install=async()=>{if(installEvent){await installEvent.prompt();setInstallReady(false)}};
  const isActive=(href:string)=>href==='/'?location==='/':location.startsWith(href);
  return <div className="app-layout">
    <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-mobile-head"><Link href="/" className="brand" onClick={()=>setMenuOpen(false)}><span className="brand-mark">W</span><span><span className="brand-title">WASSCE Study</span><span className="brand-sub">Ghana · independent</span></span></Link><button className="icon-button" onClick={()=>setMenuOpen(false)} aria-label="Close menu"><X size={18}/></button></div>
      <Link href="/" className="brand desktop-brand"><span className="brand-mark">W</span><span><span className="brand-title">WASSCE Study</span><span className="brand-sub">Ghana · independent</span></span></Link>
      <div className="nav-label">Study desk</div><nav className="nav-list" aria-label="Main navigation">{nav.map(({href,label,icon:Icon})=><Link href={href} key={href} onClick={()=>setMenuOpen(false)} className={`nav-link ${isActive(href)?'active':''}`}><Icon size={17} strokeWidth={1.8}/><span>{label}</span></Link>)}</nav>
      <div className="nav-label" style={{marginTop:27}}>Information</div><nav className="nav-list">
        <Link href="/exam-guides" onClick={()=>setMenuOpen(false)} className={`nav-link ${isActive('/exam-guides')?'active':''}`}><Info size={17}/><span>Exam preparation</span></Link>
        <Link href="/dos-donts" onClick={()=>setMenuOpen(false)} className={`nav-link ${isActive('/dos-donts')?'active':''}`}><PanelLeft size={17}/><span>Do's & don'ts</span></Link>
        <Link href="/about" onClick={()=>setMenuOpen(false)} className={`nav-link ${isActive('/about')?'active':''}`}><Info size={17}/><span>About</span></Link>
        <Link href="/contact" onClick={()=>setMenuOpen(false)} className={`nav-link ${isActive('/contact')?'active':''}`}><Mail size={17}/><span>Contact</span></Link>
      </nav>
      <div className="sidebar-foot"><p>Built for focused revision when data is scarce and time matters.</p><span className="legal-links"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/disclaimer">Disclaimer</Link></span></div>
    </aside>
    {menuOpen && <button className="sidebar-overlay" aria-label="Close navigation" onClick={()=>setMenuOpen(false)} />}
    <main className="main-area">
      <header className="topbar"><div className="breadcrumbs"><button className="mobile-menu-button icon-button" onClick={()=>setMenuOpen(true)} aria-label="Open menu"><Menu size={19}/></button><strong>{location==='/'?'Good morning':(nav.find(x=>isActive(x.href))?.label||'WASSCE Study')}</strong><span> / independent revision desk</span></div><div className="top-actions"><span className={`online-pill ${online?'':'offline'}`}><span className="online-dot"/>{online?'Online':'Offline mode'}</span><button className="icon-button" aria-label={dark?'Use light mode':'Use dark mode'} onClick={()=>setDark(!dark)}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button>{user?<Link className="account-chip" href="/account"><UserCircle size={17}/><span>{user.name?.split(' ')[0]||'Account'}</span></Link>:<Link className="account-chip" href="/login"><UserCircle size={17}/><span>Sign in</span></Link>}</div></header>
      {!online&&<div className="callout" style={{margin:'16px clamp(17px,4vw,54px) 0'}}><CloudOff size={17}/><span>You are offline. Saved resources and completed mocks remain available on this device.</span></div>}
      {children}
      {installReady&&<div className="install-card" style={{margin:'0 clamp(17px,4vw,54px) 20px'}}><span><strong>Install WASSCE Study.</strong><br/>Keep your study desk close for quicker access.</span><span style={{display:'flex',gap:7}}><button className="button button-primary" onClick={install}>Install</button><button className="icon-button" onClick={()=>setInstallReady(false)} aria-label="Dismiss"><X size={15}/></button></span></div>}
    </main>
    <nav className="mobile-nav" aria-label="Mobile navigation">{mobileNav.map(({href,label,icon:Icon})=><Link href={href} key={href} className={`mobile-nav-link ${isActive(href)?'active':''}`}><Icon size={19}/><span>{label==='Resource library'?'Library':label}</span></Link>)}</nav>
  </div>;
}
