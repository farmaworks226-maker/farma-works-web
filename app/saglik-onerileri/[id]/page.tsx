import { ArrowLeft, Calendar, User, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { render as renderRichText } from "storyblok-rich-text-react-renderer"
import { getStoryblokApi } from "@/lib/storyblok";
import type { Metadata } from "next";

// --- TİP TANIMLAMASI
type Props = {
  params: Promise<{ id: string }>
}

// --- YARDIMCI FONKSİYONLAR
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderContent = (content: any, options: any) => {
  if (!content) return null;
  if (typeof content === 'string') return content;
  if (content.type === 'doc' && content.content && content.content.length > 0) {
    return renderRichText(content, options);
  }
  return null;
}

// Makaleyi çeken fonksiyon
async function fetchMakale(slugPart: string) {
  const storyblokApi = getStoryblokApi();
  if (!slugPart || slugPart === 'undefined') return null;

  // 1. DENEME: Klasörlü yol (saglik-onerileri/slug)
  try {
    const { data } = await storyblokApi.get(`cdn/stories/saglik-onerileri/${slugPart}`, { version: "draft" });
    if (data.story) return data.story;
  } catch { 
    /* Hata olursa devam et (catch içindeki 'e' kullanılmadığı için kaldırıldı) */ 
  }

  // 2. DENEME: Sadece slug (slug) - Eğer klasörsüzse bunu bulur
  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slugPart}`, { version: "draft" });
    if (data.story) return data.story;
  } catch { 
    /* Devam et */ 
  }

  return null;
}

// --- METADATA (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  if (!id) return {};

  const articleStory = await fetchMakale(id);

  if (!articleStory || !articleStory.content.title) {
    return {
      title: "Makale Bulunamadı",
    };
  }

  const article = articleStory.content;
   
  const descriptionText = article.seo_description || (article.content?.content?.[0]?.content?.[0]?.text || 'Sağlık önerileri.');

  return {
    title: article.title,
    description: descriptionText,
  };
}

// SAYFA BİLEŞENİ
export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;

  // ID yoksa 404
  if (!id) return notFound();

  // Veriyi çek
  const articleStory = await fetchMakale(id);

  // Veri yoksa 404
  if (!articleStory || !articleStory.content) {
    console.error(`Makale bulunamadı. Aranan Slug: ${id}`);
    return notFound();
  }

  const post = articleStory.content;

  // --- TARİH DÜZELTMESİ ---
  // Date.now() veya new Date() kullanmak "Hydration Error" verir.
  // Eğer tarih yoksa boş bırakıyoruz veya sabit bir metin dönüyoruz.
  const rawDate = articleStory.published_at || articleStory.created_at;
  const date = rawDate ? new Date(rawDate).toLocaleDateString('tr-TR') : ''; 

  // RichText Ayarları
  const richTextOptions = {
    nodeResolvers: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'list_item': (children: any) => (
        <li className="flex items-start gap-3 list-none mb-2">
           <Check className="w-5 h-5 text-[#00b074] shrink-0 mt-1" />
           <span>{children}</span>
        </li>
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'paragraph': (children: any) => <p className="mb-4 leading-relaxed">{children}</p>
    }
  };

  return (
    <article className="min-h-screen bg-gray-50 pb-20">
      
      {/* Hero Görseli */}
      {/* Container'da 'relative' ve 'h-[400px]' olduğu için Image fill buraya tam oturur */}
      <div className="w-full h-[400px] relative bg-gray-900">
        <Image
          src={post.image?.filename || 'https://via.placeholder.com/1200x400?text=Gorsel+Yok'}
          alt={post.title || "Makale Görseli"}
          fill // Responsive: Kapsayıcıyı doldurur
          className="object-cover opacity-70" // Resmi düzgünce yayar ve sündürmez
          priority // Sayfanın en üstündeki resim olduğu için hızlı yükler
        />
        
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <span className="bg-[#00b074] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 inline-block">
              {post.category || "Makale"}
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
          
          {/* Yazar ve Tarih */}
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#00b074]" />
              <span className="font-medium text-gray-900">{post.author || "Farma Works Editörü"}</span>
            </div>
            {date && (
                <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00b074]" />
                <span>{date}</span>
                </div>
            )}
          </div>

          {/* Makale Metni */}
          <div className="prose prose-lg max-w-none prose-headings:text-[#1e293b] prose-a:text-[#00b074] text-gray-700 leading-relaxed">
            {renderContent(post.content, richTextOptions)}
          </div>

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