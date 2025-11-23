import type { Metadata } from "next";
import { MinerallerContent } from "@/components/mineraller-content";

export const metadata: Metadata = {
  title: "Mineral Takviyeleri",
  description: "Vücudunuzun ihtiyaç duyduğu Magnezyum, İyot ve Zeolit gibi temel mineralleri en saf haliyle keşfedin.",
};

export default function MinerallerPage() {
  return <MinerallerContent />;
}