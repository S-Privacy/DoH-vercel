# Control D DoH Proxy — Web UI

A terminal-inspired Next.js interface for a privacy-focused DNS-over-HTTPS proxy powered by Control D. It lets visitors choose Standard or Family filtering, copy a ready-to-use DoH endpoint, and deploy their own instance to Vercel.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` to use the interface.

## Deploy your own UI

Import the `web-ui` branch into Vercel. The app serves the interface and the `/api/dns-query` route from your own deployment. The Standard profile is selected by default and uses `freedns.controld.com/p2`; Family uses `freedns.controld.com/family`.

## Endpoint

```text
https://<your-vercel-domain>/api/dns-query?mode=standard
```

The route supports standard DoH `GET`, `POST`, and CORS preflight `OPTIONS` requests. This branch includes the deployable web interface; see the `main` branch for the API-only service.
