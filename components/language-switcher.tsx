"use client"

import * as React from "react"
import { ChevronDown, Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useParams } from 'next/navigation';

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const selectedLanguage = LANGUAGES.find((lang) => lang.code === locale)

  function onSelectChange(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- TypeScript may complain about params spreading, but it's fine for our simple routes
      { pathname, params },
      { locale: nextLocale }
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="gradient-border-card group">
          <span className="flex items-center gap-2 rounded-[inherit] px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-white/5">
            <Globe className="h-4 w-4 text-cyan-400 transition-transform duration-300 group-hover:rotate-12" />
            <span>{selectedLanguage?.label}</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onSelectChange(lang.code)}
            className={`cursor-pointer gap-2.5 ${locale === lang.code ? "bg-cyan-500/10 text-cyan-400" : ""}`}
          >
            <Globe className={`h-3.5 w-3.5 ${locale === lang.code ? "text-cyan-400" : "text-muted-foreground"}`} />
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
