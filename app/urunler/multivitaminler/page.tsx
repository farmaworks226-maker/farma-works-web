import type { Metadata } from "next";
import { MultivitaminContent } from "@/components/multivitamin-content";

export const metadata: Metadata = {
  title: "Multivitamin Takviyeleri",
  description: "Günlük enerji ve bağışıklık desteği. 13 vitamin ve 10 mineral içeren kapsamlı formüllerimizle tanışın.",
};

export default function Page() {
  return <MultivitaminContent />;
}