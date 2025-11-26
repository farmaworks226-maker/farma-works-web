import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK ve Aydınlatma Metni",
  description: "Kişisel verilerin korunması kanunu kapsamında aydınlatma metni ve gizlilik politikamız.",
};

// BU KISIM EKSİK OLABİLİR: Varsayılan bileşen (Default Export)
export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-[#1e293b] mb-8">KVKK Aydınlatma Metni</h1>
        
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          <p>
            <strong>Farma Works İlaç A.Ş.</strong> olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. 
            Kişisel verileriniz 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında aşağıda açıklanan kapsamda işlenmektedir.
          </p>

          <h3 className="text-lg font-bold text-gray-900">1. Veri Sorumlusu</h3>
          <p>
            KVKK uyarınca, kişisel verileriniz; veri sorumlusu olarak Farma Works tarafından aşağıda açıklanan kapsamda toplanacak ve işlenebilecektir.
          </p>

          <h3 className="text-lg font-bold text-gray-900">2. Kişisel Verilerin İşlenme Amacı</h3>
          <p>
            Toplanan kişisel verileriniz; şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması, 
            şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması amaçlarıyla işlenecektir.
          </p>

          <h3 className="text-lg font-bold text-gray-900">3. İşlenen Kişisel Verilerin Kimlere Aktarılabileceği</h3>
          <p>
            Kişisel verileriniz; kanunen yetkili kamu kurumlarına ve özel kişilere, KVKK’nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
          </p>
          
          <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-8">
            <p>
              Detaylı bilgi için <a href="mailto:info@farmaworks.com" className="text-[#065f46] underline font-medium">info@farmaworks.com</a> adresinden bize ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}