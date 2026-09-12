"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cn } from "@/lib/utils"

const ToggleGroupContext = React.createContext<{ className?: string }>({})

function ToggleGroup({ className, children, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn("flex items-center justify-center gap-1", className)} {...props}><ToggleGroupContext.Provider value={{ className }}>{children}</ToggleGroupContext.Provider></ToggleGroupPrimitive.Root>
}

function ToggleGroupItem({ className, children, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  const context = React.useContext(ToggleGroupContext)
  return <ToggleGroupPrimitive.Item data-slot="toggle-group-item" className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground", context.className, className)} {...props}>{children}</ToggleGroupPrimitive.Item>
}

export { ToggleGroup, ToggleGroupItem }
