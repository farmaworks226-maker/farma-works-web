import type { Metadata } from "next";
import { IletisimFormComponent } from "@/components/iletisim-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim | FW İlaç",
  description: "FW İlaç ile iletişime geçin. Sorularınız için bize ulaşın.",
};

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Başlık */}
      <div className="bg-gradient-to-r from-[#1E40D8] to-[#2a6ba0] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">İletişim</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Bize ulaşın, size yardımcı olmaktan mutluluk duyarız
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* İletişim Bilgileri */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F3EBE2] rounded-lg">
                  <MapPin className="w-6 h-6 text-[#1E40D8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                  <p className="text-sm text-gray-600">
                    Nisbetiye Mahallesi, Nisbetiye Caddesi No:22 Özden İş Merkezi Kat: 3, 34520 Beşiktaş/İstanbul
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F3EBE2] rounded-lg">
                  <Phone className="w-6 h-6 text-[#1E40D8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                  <p className="text-sm text-gray-600">+90 212 706 71 76</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F3EBE2] rounded-lg">
                  <Mail className="w-6 h-6 text-[#1E40D8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                  <p className="text-sm text-gray-600">info@fw.com.tr</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F3EBE2] rounded-lg">
                  <Clock className="w-6 h-6 text-[#1E40D8]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</h3>
                  <p className="text-sm text-gray-600">Pazartesi - Cuma: 09:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <IletisimFormComponent />
          </div>
        </div>
      </div>
    </div>
  );
}