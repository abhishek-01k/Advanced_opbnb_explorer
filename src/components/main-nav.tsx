import * as React from "react"
import Link from "next/link"

import { siteConfig } from "../../config/site";
import { cn } from "@/lib/utils"

interface MainNavProps {
  items?: NavItem[]
}

interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
  }
  

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
      <img src="https://static.particle.network/token-list/opbnb/native.png" alt="mainlogo" className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
