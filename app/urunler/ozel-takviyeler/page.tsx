import type { Metadata } from "next";
// Dikkat: Import yolunda küçük harfli dosya adını kullanıyoruz
import { OzelTakviyeContent } from "@/components/ozel-takviye-content";

export const metadata: Metadata = {
  title: "Özel Takviyeler - Kolajen, Omega-3 ve Daha Fazlası",
  description: "Spesifik sağlık ihtiyaçlarınız için geliştirilmiş premium takviye edici gıdalar. Kolajen, Omega-3, Q10 ve bitkisel ekstreler.",
};

export default function Page() {
  return <OzelTakviyeContent />;
}