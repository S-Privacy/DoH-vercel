# Control D DoH Proxy — API Only

This branch contains the lightweight Vercel DNS-over-HTTPS proxy without a web interface. It forwards DNS queries to Control D and exposes a standards-compatible `/api/dns-query` endpoint for browsers, operating systems, routers, and privacy tools.

## Deploy to Vercel

Import this repository into Vercel with the `main` branch selected. Vercel will deploy the API route without the optional web UI.

## DNS endpoint

```text
https://<your-vercel-domain>/api/dns-query?mode=standard
```

The route supports DoH `GET`, `POST`, and CORS preflight `OPTIONS` requests. Standard mode uses `freedns.controld.com/p2`; Family mode uses `freedns.controld.com/family` when `?mode=family` is supplied.

## Web interface

Want the visual terminal-style interface? Deploy the `web-ui` branch instead. That branch includes the Next.js UI, profile selector, endpoint copy control, and its own `/api/dns-query` route.
