"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const SiteHeader = dynamic(
  () => import("@/components/site-header").then((mod) => mod.SiteHeader),
  { ssr: false }
);

export function SiteHeaderLoader() {
  const pathname = usePathname();
  
  // Sadece ana sayfada şeffaf/beyaz menü
  const variant = pathname === "/" ? "transparent" : "solid";
  
  return <SiteHeader variant={variant} />;
}