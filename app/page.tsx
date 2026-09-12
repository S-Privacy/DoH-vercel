"use client"

import { useMemo, useState } from "react"
import { Check, Clipboard, Command, LockKeyhole, ShieldCheck, Terminal, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const modes = {
  family: {
    label: "family",
    description: "Blocks malware, ads, trackers, adult content, and drug sites. Safer for kids’ devices or shared home Wi-Fi.",
    upstream: "freedns.controld.com/family",
  },
  standard: {
    label: "standard",
    description: "Blocks malware, ads, and trackers that follow you around online.",
    upstream: "freedns.controld.com/p2",
  },
} as const

type Mode = keyof typeof modes

export default function Home() {
  const [mode, setMode] = useState<Mode>("standard")
  const [copied, setCopied] = useState(false)

  const endpoint = useMemo(() => {
    if (typeof window === "undefined") return `/api/dns-query?mode=${mode}`
    return `${window.location.origin}/api/dns-query?mode=${mode}`
  }, [mode])

  async function copyEndpoint() {
    await navigator.clipboard.writeText(endpoint)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 font-mono text-foreground sm:px-8 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3 text-sm"><Terminal className="text-primary" /><span className="font-semibold">clearpath_dns</span><span className="text-muted-foreground">v1.0.0</span></div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" /> online</div>
        </header>

        <section className="grid flex-1 gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-12">
          <div className="flex flex-col justify-center gap-7">
            <div className="text-xs text-primary">$ ./clearpath --status</div>
            <div className="flex flex-col gap-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Private DNS.<br /><span className="text-primary">No noise.</span></h1>
              <p className="max-w-lg font-sans text-base leading-7 text-muted-foreground">Encrypted DNS over HTTPS with Control D protection. Configure once, then browse with a cleaner signal.</p>
            </div>
            <div className="flex flex-col gap-2 border-l-2 border-primary pl-4 text-xs leading-6 text-muted-foreground"><span><span className="text-primary">OK</span> encrypted transport</span><span><span className="text-primary">OK</span> Control D upstream</span><span><span className="text-primary">OK</span> no account required</span></div>
          </div>

          <section className="border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border px-5 py-4 text-xs"><span className="flex items-center gap-2"><Command className="size-4 text-primary" /> resolver_config</span><span className="text-muted-foreground">[interactive]</span></div>
            <div className="flex flex-col gap-6 p-5 sm:p-7">
              <div className="flex flex-col gap-2"><p className="text-xs text-muted-foreground"># choose a filtering profile</p><ToggleGroup type="single" value={mode} onValueChange={(value) => value && setMode(value as Mode)} className="grid grid-cols-2 gap-2"><ToggleGroupItem value="family" className="justify-start rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition-colors hover:bg-white/[0.08] data-[state=on]:border-[#7fffb2]/50 data-[state=on]:bg-[#7fffb2]/10 data-[state=on]:text-[#b8ffd0]">[ family ]</ToggleGroupItem><ToggleGroupItem value="standard" className="justify-start rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition-colors hover:bg-white/[0.08] data-[state=on]:border-[#7fffb2]/50 data-[state=on]:bg-[#7fffb2]/10 data-[state=on]:text-[#b8ffd0]">[ standard ]</ToggleGroupItem></ToggleGroup></div>
              <div className="flex flex-col gap-2"><p className="text-xs text-muted-foreground"># active upstream</p><div className="border border-border px-4 py-3 text-xs text-primary">{modes[mode].upstream}</div><p className="font-sans text-sm leading-6 text-muted-foreground">{modes[mode].description}</p></div>
              <div className="flex flex-col gap-2"><p className="text-xs text-muted-foreground"># your DoH endpoint</p><div className="flex items-center gap-3 border border-border bg-card px-4 py-4"><Wifi className="size-4 shrink-0 text-primary" /><code className="min-w-0 flex-1 break-all text-xs">{endpoint}</code></div><Button onClick={copyEndpoint} className="h-11 w-full rounded-xl border border-[#7fffb2]/30 bg-[#7fffb2]/10 font-mono text-xs text-[#b8ffd0] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md hover:bg-[#7fffb2]/15">{copied ? <Check data-icon="inline-start" /> : <Clipboard data-icon="inline-start" />}{copied ? "copied" : "copy endpoint"}</Button></div>
            </div>
          </section>
        </section>

        <footer className="grid gap-4 border-t border-border px-5 py-5 text-xs text-muted-foreground sm:grid-cols-3 sm:px-8"><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Control D protected</span><span className="flex items-center gap-2"><LockKeyhole className="size-4 text-primary" /> RFC 8484 / HTTPS</span><span className="text-left sm:text-right">mode={mode} // ready</span></footer>
      </div>
    </main>
  )
}
