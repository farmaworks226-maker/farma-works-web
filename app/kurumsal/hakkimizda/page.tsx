import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda", // Otomatik olarak "Hakkımızda | Farma Works" olacak
  description: "Farma Works'ün kuruluş hikayesi, vizyonu, misyonu ve üretim kalitesi hakkında detaylı bilgi edinin.",
};
import Image from "next/image"
import { Microscope, Award, Users, Heart, FlaskConical, Hexagon, Store, Factory } from "lucide-react"

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. BÖLÜM: Üst Giriş Yazısı */}
      <div className="container mx-auto px-4 py-20 text-center max-w-4xl">
        <h1 className="text-4xl font-bold text-[#1e293b] mb-6">Farma Works İlaç,</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Yüksek kalite standartlarına sahip gıda takviyeleriyle "optimum sağlığı" hedefleyen alanında inovatif, lider bir firmadır. 
          Hedefleri doğrultusunda üretim süreçlerini titizlik ve en son teknolojiye bağlı kalarak sürdürmektedir. 
          Yenilikçi ve geniş ürün yelpazesi ile sağlıklı yaşamın sürdürülebilirliği için çalışmalarına devam etmektedir.
        </p>
      </div>

      {/* 2. BÖLÜM: Misyon & Vizyon (Gri Alan) */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Misyon */}
            <div>
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Misyonumuz</h2>
              <p className="text-gray-600 leading-relaxed text-sm text-justify">
                Farma Works İlaç olarak, sağlıklı yaşamı desteklemek ve bireylerin yaşam kalitesini iyileştirmek amacıyla, doğa ve bilimden ilham alarak yüksek kaliteli gıda takviyeleri sunuyoruz. Amacımız, sağlıklı yaş almanın her aşamasında bilimsel verilerle desteklenmiş ürünler sunarak, bireylerin hem hastalık dönemlerinde hem de sağlıklı yaşam süreçlerinde yanlarında olmak ve her yaşa uygun sağlık çözümleri sunmaktır.
              </p>
            </div>

            {/* Vizyon */}
            <div>
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Vizyonumuz</h2>
              <p className="text-gray-600 leading-relaxed text-sm text-justify">
                Farma Works İlaç, sağlıklı yaşam ve gıda takviyesi alanında global bir referans marka olmayı hedeflemektedir. Yenilikçi çözümlerimiz, kaliteli hammadde ve üretim koşullarımız ile sektördeki liderliğimizi pekiştirirken, sürdürülebilir sağlık anlayışını her bireye ulaştırmak için çalışmalarımızı hızla genişletiyoruz. Dünya çapında tercih edilen bir gıda takviyesi markası olmayı ve global pazarda sağlıklı yaşamın öncüsü olarak bilinirliği artırmayı hedefliyoruz.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 3. BÖLÜM: Değerlerimiz (İkonlu) */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-[#1e293b] mb-16">Değerlerimiz</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <Microscope className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Bilimsel Doğruluk ve İnovasyon</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Ürünlerimizi ve hizmetlerimizi sürekli olarak bilimsel araştırmalar ve yenilikçi yaklaşımlar doğrultusunda geliştiririz.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Kalite ve Güvenilirlik</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Ürünlerimizin güvenli ve etkili olmasına büyük önem gösteririz. Katkı maddesi içermeyen, en yüksek kalitede doğal bileşenleri kullanırız.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">İnsan Odaklılık</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Her bireyin sağlıklı ve dengeli bir yaşam sürmeye hakkı olduğuna inanırız. İnsan sağlığına ve yaşam kalitesine olan bağlılığımız en büyük değerimizdir.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Eğitim ve Sağlık Bilinci</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sağlıklı yaşam ve sağlık bilinci konularında toplumu bilinçlendirmeyi önceliklerimiz arasında görürüz. Doğru bilgiye ulaşması için rehberlik sağlarız.
            </p>
          </div>

        </div>
      </div>

      {/* 4. BÖLÜM: Aile Resmi ve Slogan */}
      <div className="w-full relative h-[400px] mb-20 bg-gray-200 flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=2000" 
          alt="Mutlu Aile" 
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-8 z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white italic drop-shadow-lg text-center px-4">
            Farma Works optimum sağlık için yaşamın her anında!
          </h2>
        </div>
      </div>

      {/* 5. BÖLÜM: Ürünlerin Oluşma Yolculuğu */}
      <div className="container mx-auto px-4 pb-24 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1e293b] uppercase tracking-wider mb-2">Ürünlerin Oluşma Yolculuğu</h2>
          <p className="text-gray-500 text-sm">Farma Works İlaç, her bir ürünün oluşum yolculuğunda birincil önceliğini tüketicinin optimum sağlığını sürdürebilme hedefi üzerine verdi.</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-0 relative">
            <div className="md:w-1/2 pr-8 text-right hidden md:block"></div> 
            <div className="z-10 bg-white p-2 border-4 border-green-50 rounded-full mb-4 md:mb-0">
              <div className="w-16 h-16 bg-[#00b074] rounded-full flex items-center justify-center text-white">
                <FlaskConical className="w-8 h-8" />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 text-center md:text-left">
              <h3 className="font-bold text-gray-900 mb-2">DOĞRU FORMÜLASYON VE DOĞRU ETKEN MADDE</h3>
              <p className="text-sm text-gray-500">Ürünlerin formülasyonu oluşturulurken etken maddelerin bilimsel temelli çalışmalarda yer almasına, günlük ihtiyaç miktarlarına ve sinerjik etkinlik gösteren kombinasyonlarına dikkat edildi.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-0 relative">
            <div className="md:w-1/2 md:pr-12 text-center md:text-right order-2 md:order-1">
              <h3 className="font-bold text-gray-900 mb-2">DOĞAL VE KATKISIZ HAMMADDE SUNUMU</h3>
              <p className="text-sm text-gray-500">Şeker, tatlandırıcı, koruyucu ve renklendirici içermeyen hammaddeler tüketicilerin kullanımı için sunulmuştur. Aynı zamanda titanyum dioksit içermeyen vegan kapsüller yer verilmiştir.</p>
            </div>
            <div className="z-10 bg-white p-2 border-4 border-green-50 rounded-full mb-4 md:mb-0 order-1 md:order-2">
              <div className="w-16 h-16 bg-[#00b074] rounded-full flex items-center justify-center text-white">
                <Hexagon className="w-8 h-8" />
              </div>
            </div>
            <div className="md:w-1/2 hidden md:block order-3"></div> 
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-0 relative">
            <div className="md:w-1/2 hidden md:block"></div>
            <div className="z-10 bg-white p-2 border-4 border-green-50 rounded-full mb-4 md:mb-0">
              <div className="w-16 h-16 bg-[#00b074] rounded-full flex items-center justify-center text-white">
                <Factory className="w-8 h-8" />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 text-center md:text-left">
              <h3 className="font-bold text-gray-900 mb-2">KALİTELİ ÜRETİM KOŞULLARI</h3>
              <p className="text-sm text-gray-500">Ürünlerimiz Türkiye'de ISO, Haccp, Helal ve Kosher sertifikalı, iyi üretim koşullarına sahip tesislerde üst düzey hijyen ile üretilmektedir.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between relative">
            <div className="md:w-1/2 md:pr-12 text-center md:text-right order-2 md:order-1">
              <h3 className="font-bold text-gray-900 mb-2">ULAŞILABİLİRLİK</h3>
              <p className="text-sm text-gray-500">Ürünler üye olan eczanelerimizde yer almaktadır.</p>
            </div>
            <div className="z-10 bg-white p-2 border-4 border-green-50 rounded-full mb-4 md:mb-0 order-1 md:order-2">
              <div className="w-16 h-16 bg-[#00b074] rounded-full flex items-center justify-center text-white">
                <Store className="w-8 h-8" />
              </div>
            </div>
            <div className="md:w-1/2 hidden md:block order-3"></div>
          </div>

        </div>
      </div>

    </div>
  )
}