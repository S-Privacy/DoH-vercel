"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function ToggleGroup({ className, value, onValueChange, children }: { className?: string; value?: string; onValueChange?: (value: string) => void; children: React.ReactNode }) {
  return <div className={cn("flex", className)} data-value={value}>{React.Children.map(children, (child) => React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<{ active?: boolean; onSelect?: () => void }>, { active: child.props.value === value, onSelect: () => onValueChange?.(child.props.value) }) : child)}</div>
}

export function ToggleGroupItem({ value, active, onSelect, className, children }: { value: string; active?: boolean; onSelect?: () => void; className?: string; children: React.ReactNode }) {
  return <button type="button" aria-pressed={active} data-state={active ? "on" : "off"} onClick={onSelect} className={cn("inline-flex items-center justify-center", className)}>{children}</button>
}
