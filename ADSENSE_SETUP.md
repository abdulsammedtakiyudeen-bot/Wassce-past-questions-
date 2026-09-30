# Google AdSense setup

This repository intentionally contains no fake AdSense publisher ID.

## When your AdSense account is approved

1. In AdSense, copy the exact site/ad code Google gives you.
2. Put the site-wide script in `index.html` or a dedicated React ad component.
3. Replace the reserved `AdPlaceholder` inventory with real ad slots only where appropriate.
4. Create `public/ads.txt` using the exact publisher line shown by AdSense.
5. Keep Privacy Policy and cookie disclosures synchronized with the actual configuration.
6. Never click your own ads or encourage visitors to click them.
7. Do not label ads as study buttons or make them look like resource downloads.

## Publisher file template

Do not deploy this placeholder as `ads.txt`. Replace it with the exact line supplied by Google:

```text
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

The `pub-XXXXXXXXXXXXXXXX` value above is deliberately invalid and must not be used.
