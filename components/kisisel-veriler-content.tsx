"use client"

import { useState } from "react"
import { Download, FileText, Shield, FileCheck, Lock } from "lucide-react"
//import { useSearchParams } from "next/navigation"

export function KisiselVerilerContent() {
  //const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'aydinlatma' | 'saklama' | 'basvuru'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'aydinlatma' || hash === 'saklama' || hash === 'basvuru') {
        return hash as 'aydinlatma' | 'saklama' | 'basvuru'
      }
    }
    return 'aydinlatma'
  })

  // Tab değiştiğinde URL hash'i güncelle
  const handleTabChange = (tab: 'aydinlatma' | 'saklama' | 'basvuru') => {
    setActiveTab(tab)
    window.history.pushState(null, '', `#${tab}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E40D8] to-[#2a6ba0] text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">KVKK Uyumlu</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Kişisel Verileriniz Hakkında
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme ve belgeler
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto -mb-px">
            <button
              onClick={() => handleTabChange('aydinlatma')}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'aydinlatma'
                  ? 'border-[#ED6E2D] text-[#1E40D8]'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              Aydınlatma Metni
            </button>
            <button
              onClick={() => handleTabChange('saklama')}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'saklama'
                  ? 'border-[#ED6E2D] text-[#1E40D8]'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Lock className="w-4 h-4" />
              Saklama ve İmha Politikası
            </button>
            <button
              onClick={() => handleTabChange('basvuru')}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'basvuru'
                  ? 'border-[#ED6E2D] text-[#1E40D8]'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              Başvuru Formu
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          
          {/* Aydınlatma Metni Tab */}
          {activeTab === 'aydinlatma' && (
            <div className="animate-fade-in">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-[#1E40D8] mb-6 pb-4 border-b-2 border-[#F3EBE2]">
                  6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma Metni
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Bu bilgilendirme metni 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVK Kanunu&quot;) ve ilgili mevzuat uyarınca,
                    VERİ SORUMLUSU sıfatıyla, FW İlaç A. Ş. (&quot;Şirket&quot;) nezdinde Kişisel Verilerin işlenmesine ilişkin bilgilendirmeleri içermektedir.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-8">
                    İşbu aydınlatma metni ile; kişisel verisi toplanan kişi gruplarına yönelik olarak; toplanan kişisel veriler, 
                    kişisel verilerin toplanma yöntemi, işlenme amaçları, hukuki sebepleri, işlenen kişisel verilerin kimlere ve 
                    hangi amaçlarla aktarılabileceği ve kişisel veri sahiplerinin hakları konularında bilgilendirmek amaçlanmıştır.
                  </p>

                  <h3 className="text-2xl font-bold text-[#1E40D8] mt-8 mb-4">Tanımlar</h3>
                  <div className="space-y-3 mb-8">
                    <p><span className="font-semibold text-[#1E40D8]">KVK Kanunu:</span> 6698 sayılı Kişisel Verilerin Korunması Kanunu</p>
                    <p><span className="font-semibold text-[#1E40D8]">KVK Kurulu:</span> Kişisel Verileri Koruma Kurulu</p>
                    <p><span className="font-semibold text-[#1E40D8]">Veri Sahibi:</span> Kişisel verisi işlenen gerçek kişi</p>
                    <p><span className="font-semibold text-[#1E40D8]">Kişisel verilerin işlenmesi:</span> Kişisel verilerin tamamen veya kısmen otomatik olan ya da herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla elde edilmesi, kaydedilmesi, depolanması, muhafaza edilmesi, değiştirilmesi, yeniden düzenlenmesi, açıklanması, aktarılması, devralınması, elde edilebilir hâle getirilmesi, sınıflandırılması ya da kullanılmasının engellenmesi gibi veriler üzerinde gerçekleştirilen her türlü işlem.</p>
                  </div>

                  <div className="bg-[#F3EBE2] border-l-4 border-[#ED6E2D] p-6 rounded-r-lg mb-8">
                    <p className="text-gray-800 leading-relaxed">
                      <span className="font-semibold">Not:</span> İşbu aydınlatma metninde kişisel veriler ve özel nitelikli kişisel veriler beraber 
                      &apos;&apos;Kişisel veriler&apos;&apos; olarak adlandırılabilecektir. Aydınlatma metninde yer alan amaçlar doğrultusunda işlenen kişisel verileriniz 
                      işbu metinde yer alan amaçlarla doğru orantılı olarak aktarım gerçekleştirilmektedir.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1E40D8] mt-10 mb-4">Şirket Tarafından Kişisel Verisi Toplanan Kişi Grupları</h3>

                  <div className="space-y-8">
                    <div className="border-l-4 border-[#1E40D8] pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">1. Çalışan Adayı</h4>
                      <p className="mb-2"><span className="font-semibold">Toplanan Kişisel Veriler:</span> Kimlik Verisi, İletişim Verisi, Fiziksel Mekân Güvenliği Verisi, Mesleki Deneyim Verisi, Görsel ve İşitsel Kayıtlar, Sağlık Verisi, Aday İşlem Verisi.</p>
                      <p><span className="font-semibold">İşlenme Amacı:</span> Yeni eleman istihdam edilmesi, adayları inceleme ve istihdam edilecek yeni adayın tespit edilmesi, acil durum yönetimi süreçlerinin yürütülmesi.</p>
                    </div>

                    <div className="border-l-4 border-[#1E40D8] pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">2. Çalışan</h4>
                      <p className="mb-2"><span className="font-semibold">Toplanan Kişisel Veriler:</span> Kimlik Verisi, İletişim Verisi, Özlük Verisi, Sağlık Bilgileri, Finans Verisi, Lokasyon Verisi ve diğer çalışan bilgileri.</p>
                      <p><span className="font-semibold">İşlenme Amacı:</span> İş akdi ve mevzuattan kaynaklı yükümlülüklerin yerine getirilmesi, performans değerlendirme, eğitim faaliyetleri, iş sağlığı/güvenliği.</p>
                    </div>

                    <div className="border-l-4 border-[#1E40D8] pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">3. Potansiyel Müşteri / Müşteri Adayı</h4>
                      <p className="mb-2"><span className="font-semibold">Toplanan Kişisel Veriler:</span> Kimlik Verisi, İletişim Verisi, Pazarlama Verisi.</p>
                      <p><span className="font-semibold">İşlenme Amacı:</span> İletişim faaliyetleri, pazarlama analiz çalışmaları, reklam/kampanya/promosyon süreçleri.</p>
                    </div>

                    <div className="border-l-4 border-[#1E40D8] pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">4. Tedarikçi / Hizmet Sağlayıcılar</h4>
                      <p className="mb-2"><span className="font-semibold">Toplanan Kişisel Veriler:</span> Kimlik Verisi, İletişim Verisi, Finans Verisi, Müşteri İşlem Verisi.</p>
                      <p><span className="font-semibold">İşlenme Amacı:</span> Sözleşme süreçleri, finans ve muhasebe işleri, iş ortakları ile ilişki yönetimi.</p>
                    </div>

                    <div className="border-l-4 border-[#1E40D8] pl-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">5. Ürün veya Hizmet Alan Kişi / Müşteri</h4>
                      <p className="mb-2"><span className="font-semibold">Toplanan Kişisel Veriler:</span> Kimlik Verisi, İletişim Verisi, Finans Verisi, Müşteri İşlem Verisi, Pazarlama Verisi.</p>
                      <p><span className="font-semibold">İşlenme Amacı:</span> Müşteri ilişkileri yönetimi, sipariş ve satış süreçleri, müşteri memnuniyeti aktiviteleri, talep/şikayet takibi.</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1E40D8] mt-10 mb-4">Kişisel Verilerin Aktarılması</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Şirket, yasal zorunluluklar ve kanunen tanınan haklar dışında, açık onay olsun ya da olmasın Kişisel verileri 
                    kanunen yasaklanmış üçüncü kişiler ile paylaşmamaktadır.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Kişisel verileriniz, KVK Kanunu&apos;nun 8. ve 9. maddelerinde belirtilen şartlar çerçevesinde grup şirketleri,
                    iş ortakları, hissedar/ortaklar, yetkili kişi ve kurumlarla, denetim şirketleri ile paylaşılabilecek ve aktarılabilecektir.
                  </p>

                  <h3 className="text-2xl font-bold text-[#1E40D8] mt-10 mb-4">Kişisel Verilerin Saklanma Süresi</h3>
                  <p className="text-gray-700 leading-relaxed">
                    İşbu Aydınlatma Metninde anılan kanallar vasıtasıyla Şirketimiz ile paylaşılmış olunan kişisel veriler, 
                    6698 sayılı Kişisel Verilerin Korunması Kanunu ve ilgili mevzuatta süre öngörülmüş ise, öngörülen sürelere 
                    uygun şekilde saklanacaktır. KVK Kanunu kapsamında işbu amaçlar doğrultusunda kişisel verileriniz gerekli 
                    saklama süresi sonunda KVK Kanunu madde 7&apos;nin usul ve esaslarına uygun olarak imha edilecektir.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Saklama ve İmha Politikası Tab */}
          {activeTab === 'saklama' && (
            <div className="animate-fade-in">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-[#1E40D8] mb-6 pb-4 border-b-2 border-[#F3EBE2]">
                  Kişisel Verilerin Saklama ve İmha Politikası
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold text-[#1E40D8] mt-6 mb-4">1. Giriş</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Kişisel Veri Saklama ve İmha Politikası (&quot;Politika&quot;), 6698 Sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot; ya da &quot;Kanun&quot;)
                    ve Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Hakkında Yönetmelik (&quot;Yönetmelik&quot;) uyarınca
                    veri sorumlusu sıfatıyla FW İLAÇ A. Ş. (&quot;Şirket&quot;) tarafından yükümlülüklerimizi yerine getirmek ve veri sahiplerini
                    kişisel verilerinin işlendikleri amaç için gerekli olan azami saklama süresinin belirlenmesi esasları ile silme, 
                    yok etme ve anonim hale getirme süreçleri hakkında bilgilendirmek amacıyla hazırlanmıştır.
                  </p>

                  <h3 className="text-2xl font-bold text-[#1E40D8] mt-8 mb-4">2. Kapsam</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Bu Politika; Şirketimiz çalışanları da dahil kişilerin tamamen veya kısmen otomatik olan ya da herhangi bir veri 
                    kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla işlenen tüm kişisel verilerine ilişkindir.
                  </p>

                  <h3 className="text-2xl font-bold text-[#1E40D8] mt-8 mb-4">3. Tanımlar</h3>
                  <div className="space-y-3 mb-6">
                    <p><span className="font-semibold text-[#1E40D8]">Kanun/KVKK:</span> 6698 Sayılı Kişisel Verilerin Korunması Kanunu</p>
                    <p><span className="font-semibold text-[#1E40D8]">Yönetmelik:</span> Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Hakkında Yönetmelik</p>
                    <p><span className="font-semibold text-[#1E40D8]">Veri Sorumlusu:</span> Kişisel verilerin işleme amaçlarını ve vasıtalarını belirleyen, veri kayıt sisteminin kurulmasından ve yönetilmesinden sorumlu olan gerçek veya tüzel kişi</p>
                    <p><span className="font-semibold text-[#1E40D8]">Kişisel Veri:</span> Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgi</p>
                    <p><span className="font-semibold text-[#1E40D8]">Özel Nitelikli Kişisel Veri:</span> Kişilerin ırkı, etnik kökeni, siyasi düşüncesi, sağlığı, cinsel hayatı vb. hassas bilgileri</p>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1E40D8] mt-8 mb-4">4. Kişisel Verilerin İmhasını Gerektiren Sebepler</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">Yönetmelik uyarınca, aşağıda sayılan hallerde veri sahiplerine ait kişisel veriler silinir, yok edilir veya anonim hale getirilir:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700">
                    <li>Kişisel verilerin işlenmesine esas teşkil eden mevzuat hükümlerinin değiştirilmesi veya ilgası</li>
                    <li>Kişisel verilerin işlenmesini gerektiren amacın ortadan kalkması</li>
                    <li>Kişisel verilerin işlenmesini gerektiren şartların ortadan kalkması</li>
                    <li>İlgili kişinin rızasını geri alması</li>
                    <li>Veri sahibinin talebi veya Kurul&apos;un kararı</li>
                    <li>Saklama süresinin sona ermesi</li>
                  </ul>

                  <h3 className="text-2xl font-bold text-[#1E40D8] mt-8 mb-4">5. Kişisel Verilerin Saklanması ve İmha Usulleri</h3>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.1. Kayıt Ortamları</h4>
                  <p className="text-gray-700 leading-relaxed mb-3">Kişisel veriler aşağıdaki ortamlarda güvenli şekilde saklanmaktadır:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700">
                    <li><span className="font-semibold">Fiziksel ortam:</span> Kapalı ortamlarda, yetkisiz erişime kapalı</li>
                    <li><span className="font-semibold">Veri tabanları:</span> Rol ve izin ataması ile kontrollü erişim</li>
                    <li><span className="font-semibold">Sunucular:</span> Yetkilendirme sistemi ile korumalı</li>
                    <li><span className="font-semibold">Taşınabilir cihazlar:</span> Erişim yetkisi tanımlı</li>
                    <li><span className="font-semibold">Bulut ortamı:</span> Güvenli kimlik doğrulama ile korumalı</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.2. Teknik ve İdari Tedbirler</h4>
                  <div className="bg-[#F3EBE2] rounded-lg p-6 mb-6">
                    <p className="font-semibold text-[#1E40D8] mb-3">İdari Tedbirler:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                      <li>Erişim yetkilerinin sınırlandırılması</li>
                      <li>Personel eğitimleri</li>
                      <li>Gizlilik sözleşmeleri</li>
                      <li>Periyodik denetimler</li>
                      <li>Aydınlatma yükümlülüğü</li>
                    </ul>
                  </div>

                  <div className="bg-[#F3EBE2] rounded-lg p-6 mb-6">
                    <p className="font-semibold text-[#1E40D8] mb-3">Teknik Tedbirler:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                      <li>Güvenlik sistemleri ve şifreleme</li>
                      <li>Yedekleme programları</li>
                      <li>Log kayıtları</li>
                      <li>Erişim kontrolleri</li>
                      <li>Risk değerlendirmesi</li>
                    </ul>
                  </div>

                  <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.3. İmha Yöntemleri</h4>
                  <div className="space-y-4">
                    <p className="text-gray-700"><span className="font-semibold text-[#1E40D8]">Silme:</span> Verilerin erişilemez ve kullanılamaz hale getirilmesi</p>
                    <p className="text-gray-700"><span className="font-semibold text-[#1E40D8]">Yok Etme:</span> Verilerin geri getirilemez şekilde ortadan kaldırılması (elektronik silme, fiziksel imha)</p>
                    <p className="text-gray-700"><span className="font-semibold text-[#1E40D8]">Anonim Hale Getirme:</span> Verilerin kimlikle ilişkilendirilemeyecek şekilde işlenmesi</p>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1E40D8] mt-8 mb-4">6. Periyodik İmha</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Şirketimiz, kişisel verilerin işlenme şartlarının ortadan kalkması durumunda, bu verileri periyodik olarak 
                    silme, yok etme veya anonim hale getirme işlemi gerçekleştirir.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Başvuru Formu Tab */}
          {activeTab === 'basvuru' && (
            <div className="animate-fade-in">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-[#1E40D8] mb-6 pb-4 border-b-2 border-[#F3EBE2]">
                  Veri Sahibi Bilgi Edinme Başvuru Formu
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    6698 Sayılı Kişisel Verilerin Korunması Kanunu&apos;nun 11. maddesi uyarınca, kişisel veri sahipleri olarak
                    aşağıdaki haklara sahipsiniz:
                  </p>

                  <div className="bg-gradient-to-br from-[#F3EBE2] to-white rounded-xl p-8 mb-8 border border-[#e5d9ca]">
                    <h3 className="text-xl font-bold text-[#1E40D8] mb-4">Veri Sahibi Haklarınız</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#ED6E2D] mt-2 flex-shrink-0"></div>
                        <span>Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#ED6E2D] mt-2 flex-shrink-0"></div>
                        <span>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#ED6E2D] mt-2 flex-shrink-0"></div>
                        <span>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#ED6E2D] mt-2 flex-shrink-0"></div>
                        <span>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#ED6E2D] mt-2 flex-shrink-0"></div>
                        <span>Eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#ED6E2D] mt-2 flex-shrink-0"></div>
                        <span>Silinmesini veya yok edilmesini isteme</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#ED6E2D] mt-2 flex-shrink-0"></div>
                        <span>Yapılan işlemlerin üçüncü kişilere bildirilmesini isteme</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#ED6E2D] mt-2 flex-shrink-0"></div>
                        <span>Otomatik sistemler ile analiz sonucuna itiraz etme</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#ED6E2D] mt-2 flex-shrink-0"></div>
                        <span>Kanuna aykırı işleme nedeniyle zararın giderilmesini talep etme</span>
                      </li>
                    </ul>
                  </div>

                  {/* Download Card */}
                  <div className="bg-gradient-to-br from-[#1E40D8] to-[#2a6ba0] rounded-2xl p-8 md:p-10 text-white text-center shadow-lg mb-8 transform hover:scale-105 transition-transform">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                      <Download className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Başvuru Formunu İndirin</h3>
                    <p className="text-white/90 mb-6 max-w-xl mx-auto">
                      Kişisel verileriniz ile ilgili başvurularınızı iletmek için aşağıdaki formu indirebilir, 
                      doldurduktan sonra Şirketimize iletebilirsiniz.
                    </p>
                    <a
                      href="/documents/FW_VERI_SAHIBI_BILGI_EDINME_BASVURU_FORMU.pdf"
                      download
                      className="inline-flex items-center gap-3 bg-[#ED6E2D] hover:bg-[#d45a1e] text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                      <FileText className="w-5 h-5" />
                      PDF Formu İndir
                    </a>
                  </div>

                  <div className="bg-[#F3EBE2] border-l-4 border-[#ED6E2D] p-6 rounded-r-lg mb-6">
                    <h4 className="font-bold text-[#1E40D8] text-lg mb-3">Başvuru Yöntemi</h4>
                    <p className="text-gray-800 mb-3">Başvurularınızı, kimliğinizi tespit edici gerekli bilgiler ile birlikte aşağıdaki yöntemlerden biri ile Şirketimize iletebilirsiniz:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Yazılı olarak şirket adresimize</li>
                      <li>Kayıtlı elektronik posta (KEP) adresi ile</li>
                      <li>Güvenli elektronik imza, mobil imza kullanarak</li>
                      <li>Sistemimizde kayıtlı e-posta adresiniz ile</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1E40D8] mt-8 mb-4">Başvuru Süreçleri</h3>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      <span className="font-semibold text-[#1E40D8]">Değerlendirme Süresi:</span> Başvurular en geç 30 gün içinde 
                      ücretsiz olarak sonuçlandırılır. İşlemin ayrıca maliyet gerektirmesi halinde, Kişisel Verileri Koruma Kurulu 
                      tarifesindeki ücret alınabilir.
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-[#1E40D8]">Cevap Yöntemi:</span> Başvurunuza verilecek cevap, başvuru 
                      yöntemine göre yazılı veya elektronik ortamda tarafınıza iletilir.
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-[#1E40D8]">Başvurunun Reddi:</span> Başvurunuzun reddedilmesi, verilen 
                      cevabın yetersiz bulunması veya süresinde cevap verilmemesi hallerinde; cevabı öğrendiğiniz tarihten itibaren 
                      30 gün içinde Kişisel Verileri Koruma Kurulu&apos;na şikayette bulunabilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer Note */}
      <div className="border-t border-gray-200 bg-gray-50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2024 FW İlaç A.Ş. | Kişisel Verilerin Korunması Hakkında Tüm Hakları Saklıdır</p>
          <p className="mt-2 text-xs">Son Güncellenme: 2024</p>
        </div>
      </div>
    </div>
  )
}