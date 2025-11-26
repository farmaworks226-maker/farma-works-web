"use client";

import dynamic from "next/dynamic";

const SiteHeader = dynamic(
  () => import("@/components/site-header").then((mod) => mod.SiteHeader),
  { ssr: false }
);

export function SiteHeaderLoader() {
  return <SiteHeader />;
}