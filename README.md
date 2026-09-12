# Control D DoH Proxy

A Vercel-hosted DNS-over-HTTPS proxy with a polished web UI. DNS requests use Control D's Family resolver by default:

```text
https://freedns.controld.com/family
```

The UI also provides an optional Standard mode using Control D's `p1` resolver.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` to use the web UI.

## Deploy to Vercel

Import this repository into Vercel. The Next.js app automatically serves the UI and the `/api/dns-query` route.

## DNS endpoint

```text
https://<your-vercel-domain>/api/dns-query
```

The route supports standard DoH `GET`, `POST`, and CORS preflight `OPTIONS` requests. Family mode is the default unless `?mode=standard` is provided.
