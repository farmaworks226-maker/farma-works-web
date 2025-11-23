import type { Metadata } from "next";
// DİKKAT: { } içinde import ediyoruz ve dosya adı probiyotik-content
import { ProbiyotikContent } from "@/components/probiyotik-content";

export const metadata: Metadata = {
  title: "Probiyotik Takviyeleri",
  description: "Sindirim sistemi ve bağışıklık için 10 milyar canlı bakteri içeren probiyotik çözümler.",
};

export default function Page() {
  return <ProbiyotikContent />;
}