import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"

// --- BLOG YAZILARI VERİTABANI ---
const BLOG_DETAILS = [
  {
    id: "1",
    title: "Bağışıklık Sistemini Güçlendirme Yolları",
    date: "15 Mart 2024",
    category: "Bağışıklık",
    author: "Uzm. Ecz. Ayşe Yılmaz",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-600">
        Mevsim geçişlerinde sık sık hasta mı oluyorsunuz? Bağışıklık sistemi, vücudumuzu virüs, bakteri ve diğer zararlı mikroorganizmalara karşı koruyan karmaşık bir savunma mekanizmasıdır. Güçlü bir bağışıklık sistemi, sağlıklı bir yaşamın temel taşıdır. İşte bağışıklığınızı doğal yollarla çelik gibi yapmanın bilimsel yolları.
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">1. Renkli ve Dengeli Beslenme</h3>
      <p class="mb-4 text-gray-600">
        "Gökkuşağı gibi beslenin" sözünü duymuşsunuzdur. Farklı renklerdeki sebze ve meyveler, farklı vitamin ve antioksidanlar içerir.
      </p>
      <ul class="list-disc pl-6 mb-6 text-gray-600 space-y-2">
        <li><strong>Turunçgiller:</strong> C vitamini deposudur. Beyaz kan hücrelerinin üretimini artırır.</li>
        <li><strong>Kırmızı Biber:</strong> Portakaldan 2 kat daha fazla C vitamini içerir.</li>
        <li><strong>Brokoli:</strong> A, C ve E vitaminleri açısından çok zengindir.</li>
        <li><strong>Sarımsak ve Zencefil:</strong> Doğal antibiyotik etkisi gösterirler.</li>
      </ul>

      <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Kaliteli Uyku Şart</h3>
      <p class="mb-4 text-gray-600">
        Uyku sırasında vücudumuz sitokin adı verilen proteinler salgılar. Bu proteinler enfeksiyon ve iltihaplanma ile savaşta kritik rol oynar. Yetişkin bir bireyin günde en az 7-8 saat kaliteli uyku uyuması, bağışıklık sisteminin yenilenmesi için elzemdir.
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">3. Stres Yönetimi</h3>
      <p class="mb-4 text-gray-600">
        Kronik stres, bağışıklık sistemini baskılayan kortizol hormonunu artırır. Meditasyon, yoga veya sadece doğada yürüyüş yapmak stres seviyenizi düşürerek bağışıklığınızı korur.
      </p>

      <div class="bg-green-50 border-l-4 border-[#00b074] p-6 my-8 rounded-r-lg">
        <h4 class="font-bold text-[#00b074] mb-2">Eczacı Önerisi:</h4>
        <p class="text-gray-700">
          Beslenmenizin yetersiz kaldığı durumlarda Çinko, C Vitamini ve Kara Mürver (Sambucus Nigra) takviyeleri bağışıklık sisteminize güçlü bir destek sağlayabilir. Kullanmadan önce mutlaka eczacınıza danışın.
        </p>
      </div>
    `
  },
  {
    id: "2",
    title: "Vitamin D Eksikliği ve Önemi",
    date: "12 Mart 2024",
    category: "Vitaminler",
    author: "Dr. Mehmet Demir",
    image: "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-600">
        D vitamini, aslında bir vitaminden ziyade vücudumuzda hormon gibi davranan eşsiz bir bileşiktir. "Güneş Vitamini" olarak da bilinen D vitamini, kemik sağlığından depresyona kadar pek çok alanda kritik rol oynar. Peki, neden bu kadar yaygın bir eksiklik yaşıyoruz?
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">D Vitamini Neden Önemli?</h3>
      <p class="mb-4 text-gray-600">
        D vitamininin en bilinen görevi kalsiyum emilimini sağlamaktır. D vitamini olmadan vücudumuz kalsiyumu kemiklere yerleştiremez. Ancak son araştırmalar gösteriyor ki; bağışıklık sistemi fonksiyonları, kalp sağlığı ve ruh hali üzerinde de doğrudan etkilidir.
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Eksikliğinde Neler Görülür?</h3>
      <ul class="list-disc pl-6 mb-6 text-gray-600 space-y-2">
        <li>Sürekli yorgunluk ve halsizlik</li>
        <li>Kemik ve sırt ağrıları</li>
        <li>Sık hastalanma ve geç iyileşme</li>
        <li>Depresif ruh hali ve saç dökülmesi</li>
      </ul>

      <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Nasıl Temin Ederiz?</h3>
      <p class="mb-4 text-gray-600">
        En iyi kaynak güneştir. Öğle saatlerinde (11:00-15:00 arası) 15-20 dakika kolların ve bacakların güneş görmesi yeterlidir. Ancak modern yaşam, ofis ortamları ve kış ayları bunu zorlaştırır. Besinlerde ise somon, yumurta sarısı ve mantarda az miktarda bulunur.
      </p>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
        <h4 class="font-bold text-blue-700 mb-2">Dikkat Edilmesi Gerekenler:</h4>
        <p class="text-gray-700">
          D vitamini yağda çözünen bir vitamindir. Takviye olarak alıyorsanız, emilimini artırmak için mutlaka yağlı bir öğünle (örneğin kahvaltıda zeytin/peynir ile veya akşam yemeğinde) birlikte tüketiniz.
        </p>
      </div>
    `
  },
  {
    id: "3",
    title: "Probiyotiklerin Faydaları",
    date: "10 Mart 2024",
    category: "Sindirim Sağlığı",
    author: "Dyt. Selin Kara",
    image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-600">
        Vücudumuzda, kendi hücre sayımızdan daha fazla bakteri yaşadığını biliyor muydunuz? Korkmayın, bunların çoğu bizim dostumuz! İşte bu dost bakterilere "Probiyotik" diyoruz. Bağırsaklarımız artık bilim dünyasında "İkinci Beyin" olarak kabul ediliyor.
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Probiyotik Nedir?</h3>
      <p class="mb-4 text-gray-600">
        Probiyotikler, yeterli miktarda alındığında konakçının (yani bizim) sağlığına yarar sağlayan canlı mikroorganizmalardır. Sindirim sistemindeki doğal dengeyi korumaya yardımcı olurlar.
      </p>

      <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Ne İşe Yararlar?</h3>
      <ol class="list-decimal pl-6 mb-6 text-gray-600 space-y-3">
        <li><strong>Sindirim Sorunları:</strong> İshal, kabızlık, gaz ve şişkinlik gibi problemlerin giderilmesine yardımcı olur.</li>
        <li><strong>Bağışıklık:</strong> Bağışıklık hücrelerinin %70'i bağırsaklarda bulunur. Sağlıklı bir flora, güçlü bir savunma demektir.</li>
        <li><strong>Ruh Hali:</strong> Serotonin (mutluluk hormonu) büyük oranda bağırsaklarda üretilir. Bağırsak sağlığı, psikolojiyi doğrudan etkiler.</li>
        <li><strong>Cilt Sağlığı:</strong> Egzama ve akne gibi cilt sorunlarının temelinde bazen bağırsak florası bozukluğu yatar.</li>
      </ol>

      <h3 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Doğal Kaynaklar vs Takviyeler</h3>
      <p class="mb-4 text-gray-600">
        Ev yapımı yoğurt, kefir, turşu, tarhana ve şalgam suyu en zengin doğal probiyotik kaynaklarıdır. Ancak antibiyotik kullanımı veya ciddi sindirim sorunları sonrası florayı hızlıca toparlamak için yüksek (milyar) bakterili takviyeler gerekebilir.
      </p>
    `
  }
]

// DÜZELTME: Fonksiyonu 'async' yaptık ve params'ı 'Promise' olarak tanımladık
export default async function BlogDetayPage({ params }: { params: Promise<{ id: string }> }) {
  
  // DÜZELTME: Params'ı await ile bekliyoruz
  const { id } = await params
  
  // İstenen yazıyı bul
  const post = BLOG_DETAILS.find((p) => p.id === id)

  // Yazı bulunamazsa gösterilecek ekran
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">İçerik Hazırlanıyor...</h2>
        <p className="text-gray-600 mb-8">Bu konu hakkındaki makalemiz editörlerimiz tarafından hazırlanmaktadır.</p>
        <Link href="/saglik-onerileri" className="bg-[#00b074] text-white px-6 py-3 rounded-full font-bold hover:bg-[#00965e] transition">
          Listeye Dön
        </Link>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-white pb-20">
      
      {/* Hero Görseli */}
      <div className="w-full h-[400px] relative">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="container mx-auto px-4 max-w-4xl">
             <span className="bg-[#00b074] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 inline-block">
                {post.category}
             </span>
             <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                {post.title}
             </h1>
          </div>
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="container mx-auto px-4 max-w-4xl -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-100">
          
          {/* Yazar ve Tarih Bilgisi */}
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#00b074]" />
              <span className="font-medium text-gray-900">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00b074]" />
              <span>{post.date}</span>
            </div>
          </div>

          {/* Makale Metni (HTML olarak render edilir) */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-[#1e293b] prose-a:text-[#00b074]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          {/* Alt Buton */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link 
              href="/saglik-onerileri" 
              className="inline-flex items-center text-gray-600 hover:text-[#00b074] font-bold transition group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Tüm Yazılara Dön
            </Link>
          </div>

        </div>
      </div>

    </article>
  )
}