const DNS_MESSAGE_TYPE = "application/dns-message"
const UPSTREAMS = {
  family: "https://freedns.controld.com/family",
  standard: "https://freedns.controld.com/p1",
} as const

type Mode = keyof typeof UPSTREAMS

export const runtime = "edge"
export const preferredRegion = "auto"

function headers(): HeadersInit {
  return {
    "Content-Type": DNS_MESSAGE_TYPE,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Cache-Control": "public, max-age=300",
    "X-Content-Type-Options": "nosniff",
  }
}

function upstreamFor(request: Request) {
  const mode = new URL(request.url).searchParams.get("mode")
  return UPSTREAMS[mode === "standard" ? "standard" : "family"]
}

async function proxy(request: Request, init: RequestInit, target = upstreamFor(request)) {
  try {
    const response = await fetch(target, {
      ...init,
      headers: { ...(init.headers ?? {}), Accept: DNS_MESSAGE_TYPE, "User-Agent": "DoH-Proxy/3.0" },
    })
    if (!response.ok) return new Response(`DNS error: ${response.status}`, { status: response.status })
    return new Response(response.body, { status: 200, headers: headers() })
  } catch {
    return new Response("Upstream DNS unavailable", { status: 502, headers: headers() })
  }
}

export async function GET(request: Request) {
  const dns = new URL(request.url).searchParams.get("dns")
  if (!dns) return new Response("Missing dns parameter", { status: 400 })
  const upstream = `${upstreamFor(request)}?dns=${encodeURIComponent(dns)}`
  return proxy(request, { method: "GET", headers: { Accept: DNS_MESSAGE_TYPE } }, upstream)

}

export async function POST(request: Request) {
  return proxy(request, { method: "POST", headers: { "Content-Type": DNS_MESSAGE_TYPE }, body: request.body })
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: { ...headers(), "Access-Control-Max-Age": "86400" } })
}
