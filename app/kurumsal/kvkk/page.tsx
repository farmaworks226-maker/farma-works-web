import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "KVKK ve Aydınlatma Metni",
  description: "Kişisel verilerin korunması kanunu kapsamında aydınlatma metni ve gizlilik politikamız.",
}

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-[#F3EBE2]">
      {/* Hero Banner */}
      <div className="bg-[#1E40D8] py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">KVKK Aydınlatma Metni</h1>
          <p className="text-lg opacity-90 mt-2">Kişisel Verilerin Korunması</p>
        </div>
      </div>

      <div className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <div className="space-y-8 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-[#1E40D8]">FW İlaç A.Ş.</strong> olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. 
                Kişisel verileriniz 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında aşağıda açıklanan kapsamda işlenmektedir.
              </p>
              
              <div>
                <h3 className="text-xl font-bold text-[#1E40D8] mb-3">1. Veri Sorumlusu</h3>
                <p>
                  KVKK uyarınca, kişisel verileriniz; veri sorumlusu olarak FW İlaç tarafından aşağıda açıklanan kapsamda toplanacak ve işlenebilecektir.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-[#1E40D8] mb-3">2. Kişisel Verilerin İşlenme Amacı</h3>
                <p>
                  Toplanan kişisel verileriniz; şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması, 
                  şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması amaçlarıyla işlenecektir.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-[#1E40D8] mb-3">3. İşlenen Kişisel Verilerin Kimlere Aktarılabileceği</h3>
                <p>
                  Kişisel verileriniz; kanunen yetkili kamu kurumlarına ve özel kişilere, KVKK&apos;nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1E40D8] mb-3">4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h3>
                <p>
                  Kişisel verileriniz, her türlü sözlü, yazılı ya da elektronik ortamda, yukarıda yer verilen amaçlar doğrultusunda şirketimiz tarafından sunulan hizmetlerin belirlenen yasal çerçevede sunulabilmesi ve bu kapsamda şirketimizin sözleşme ve yasadan doğan mesuliyetlerini eksiksiz ve doğru bir şekilde yerine getirebilmesi gayesi ile edinilir.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1E40D8] mb-3">5. Kişisel Veri Sahibinin Hakları</h3>
                <p className="mb-4">KVKK&apos;nın 11. maddesi uyarınca herkes, veri sorumlusuna başvurarak kendisiyle ilgili;</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
                  <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
                  <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                  <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
                  <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
                  <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme,</li>
                  <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
                  <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme,</li>
                </ul>
                <p className="mt-4">haklarına sahiptir.</p>
              </div>

              <div className="bg-[#F3EBE2] p-6 rounded-xl border border-gray-200 mt-8">
                <p className="text-center">
                  Detaylı bilgi ve başvurularınız için{" "}
                  <a href="mailto:info@farmaworks.com" className="text-[#ED6E2D] underline font-bold hover:text-[#d55f24]">
                    info@farmaworks.com
                  </a>{" "}
                  adresinden bize ulaşabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}