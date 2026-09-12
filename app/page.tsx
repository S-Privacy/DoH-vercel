"use client"

import { useMemo, useState } from "react"
import { Check, Clipboard, Globe2, LockKeyhole, Moon, Radio, ShieldCheck, Sparkles, Sun, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const modes = {
  family: {
    label: "Family shield",
    description: "Blocks adult content, malware, and unsafe domains.",
    upstream: "freedns.controld.com/family",
  },
  standard: {
    label: "Standard",
    description: "Fast Control D resolution without family filtering.",
    upstream: "freedns.controld.com/p1",
  },
} as const

type Mode = keyof typeof modes

export default function Home() {
  const [mode, setMode] = useState<Mode>("family")
  const [copied, setCopied] = useState(false)
  const [dark, setDark] = useState(true)

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
    <div className={dark ? "min-h-screen bg-[#071015] text-[#edf7f4]" : "min-h-screen bg-[#edf7f4] text-[#071015]"}>
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between border-b border-[#31504b]/50 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#83f28f] text-[#071015] shadow-[0_0_30px_rgba(131,242,143,0.25)]"><Radio /></div>
            <span className="font-mono text-sm font-semibold tracking-[0.2em]">CLEARPATH<span className="text-[#83f28f]">.DNS</span></span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Toggle color theme" className="text-current hover:bg-[#31504b]/30">
            {dark ? <Sun /> : <Moon />}
          </Button>
        </nav>

        <section className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#83f28f]"><Sparkles /> private by default</div>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">The quiet layer between you and the internet.</h1>
            <p className="max-w-xl text-pretty text-lg leading-8 text-[#a7bdb8]">A fast, encrypted DNS resolver with Control D protection at the edge. No app. No account. Just a cleaner route to every site.</p>
            <div className="flex flex-wrap gap-3 text-sm text-[#a7bdb8]"><span className="rounded-full border border-[#31504b] px-4 py-2">Encrypted transport</span><span className="rounded-full border border-[#31504b] px-4 py-2">Edge-routed</span><span className="rounded-full border border-[#31504b] px-4 py-2">Open source</span></div>
          </div>

          <Card className="overflow-hidden rounded-[2rem] border-[#31504b] bg-[#10221f] text-[#edf7f4] shadow-2xl shadow-black/30">
            <CardHeader className="gap-5 border-b border-[#31504b] p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-[#83f28f]">Resolver profile</p><CardTitle className="mt-3 text-2xl tracking-tight">Choose your signal</CardTitle></div><ShieldCheck className="text-[#83f28f]" /></div>
              <CardDescription className="leading-6 text-[#a7bdb8]">Switch protection without changing your device configuration.</CardDescription>
              <ToggleGroup type="single" value={mode} onValueChange={(value) => value && setMode(value as Mode)} className="grid grid-cols-2 rounded-2xl bg-[#071015] p-1">
                <ToggleGroupItem value="family" className="h-auto rounded-xl py-3 data-[state=on]:bg-[#83f28f] data-[state=on]:text-[#071015]">Family shield</ToggleGroupItem>
                <ToggleGroupItem value="standard" className="h-auto rounded-xl py-3 data-[state=on]:bg-[#83f28f] data-[state=on]:text-[#071015]">Standard</ToggleGroupItem>
              </ToggleGroup>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 p-7 sm:p-9">
              <div><p className="text-lg font-medium">{modes[mode].label}</p><p className="mt-1 text-sm leading-6 text-[#a7bdb8]">{modes[mode].description}</p></div>
              <div className="flex items-center gap-3 rounded-xl border border-[#31504b] bg-[#071015] p-4"><Globe2 className="shrink-0 text-[#83f28f]" /><code className="min-w-0 flex-1 break-all text-xs text-[#d1e4df]">{endpoint}</code></div>
              <Button onClick={copyEndpoint} className="h-12 rounded-xl bg-[#83f28f] text-[#071015] hover:bg-[#a5f7ab]">{copied ? <Check data-icon="inline-start" /> : <Clipboard data-icon="inline-start" />}{copied ? "Copied endpoint" : "Copy endpoint"}</Button>
              <p className="font-mono text-xs text-[#6f918a]">UPSTREAM / {modes[mode].upstream}</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 border-t border-[#31504b]/50 py-10 sm:grid-cols-3">
          {[{ icon: LockKeyhole, title: "Encrypted", text: "DNS queries travel over RFC 8484 HTTPS." }, { icon: Zap, title: "Low latency", text: "Resolve close to your users on the edge." }, { icon: ShieldCheck, title: "Control D", text: "Family filtering, malware defense, and privacy." }].map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4 rounded-2xl border border-[#31504b]/70 bg-[#10221f]/40 p-5"><Icon className="mt-1 shrink-0 text-[#83f28f]" /><div><h2 className="font-medium">{title}</h2><p className="mt-1 text-sm leading-6 text-[#a7bdb8]">{text}</p></div></div>)}
        </section>
        <footer className="flex flex-col gap-2 border-t border-[#31504b]/50 py-6 text-xs text-[#6f918a] sm:flex-row sm:items-center sm:justify-between"><span>Clearpath DNS / powered by Vercel Edge</span><span className="font-mono">MODE: {mode.toUpperCase()}</span></footer>
      </main>
    </div>
  )
}

