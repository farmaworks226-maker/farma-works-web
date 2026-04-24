"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";

export function SiteHeaderLoader() {
  const pathname = usePathname();
  
  // Sadece ana sayfada şeffaf/beyaz menü
  const variant = pathname === "/" ? "transparent" : "solid";
  
  return <SiteHeader key={variant} variant={variant} />;
}