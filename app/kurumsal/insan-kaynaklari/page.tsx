import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, Building2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "İnsan Kaynakları ",
  description: "FW İlaç olarak çalışanlarımıza değer veriyor, gelişimlerini destekliyoruz.",
};

export default function InsanKaynaklariPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. ÜST BANNER */}
      <div className="relative h-[300px] w-full bg-[#1E40D8] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <Image 
             src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200"
             alt="İnsan Kaynakları Banner"
             fill
             className="object-cover"
           />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">İnsan Kaynakları</h1>
        </div>
      </div>

      {/* 2. GİRİŞ METNİ */}
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-[#1E40D8] mb-6">İnsan Kaynakları</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          FW İlaç olarak, sağlıklı yaşamı destekleme misyonumuz doğrultusunda, her bireyin potansiyelini en üst düzeye çıkarabileceği bir çalışma ortamı sunuyoruz.
          Çalışanlarımız, şirketimizin en değerli varlıklarıdır ve onların gelişimi, mutluluğu ve sağlıklı bir yaşam sürmeleri bizim için son derece önemlidir.
        </p>
      </div>

      {/* 3. DEĞERLER VE DESTEK (İkonlu Bölüm) */}
      <div className="bg-[#F3EBE2] py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Blok 1: Çalışanlarımızı Destekliyoruz */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-16 h-16 bg-[#1E40D8] rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E40D8] mb-4">Çalışanlarımızı Destekliyoruz</h3>
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              Sürekli gelişim ve inovasyon anlayışımızla, çalışanlarımıza sadece iş yerinde değil, tüm yaşamlarında destek olmayı hedefliyoruz. Onların kişisel ve profesyonel gelişimlerine yatırım yapıyor, sürdürülebilirlik ve sağlık odaklı yaklaşımlarımızla iş-yaşam dengesini sağlamalarına yardımcı oluyoruz. Ayrıca, güvenli ve sağlıklı bir çalışma ortamı sunarak, her çalışanımızın potansiyelini en iyi şekilde ortaya koyabilmesi için gereken şartları sağlıyoruz.
            </p>
          </div>

          {/* Blok 2: İş Yerinde Değerlerimiz */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#ED6E2D] rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E40D8] mb-4">İş Yerinde Değerlerimiz</h3>
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              FW İlaç, takım çalışması, dürüstlük, saygı ve şeffaflık gibi temel değerlere dayalı bir çalışma kültürüne sahiptir. Her bir çalışanımıza eşit fırsatlar sunuyor ve onların sağlıklı bir iş yaşamı sürdürebilmesi için gereken tüm desteği sağlıyoruz.
            </p>
          </div>

        </div>
      </div>

      {/* 4. BİZE KATILIN (Alt Bölüm) */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Sol: Görsel Kolajı */}
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
               <Image 
                 src="/images/foto.jpg" 
                 alt="FW İlaç Ekibi"
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1E40D8]/60 to-transparent"></div>
               <div className="absolute bottom-6 left-6 text-white">
                 <p className="font-bold text-lg">Birlikte Başaralım</p>
                 <p className="text-sm opacity-90">FW İlaç Ailesi</p>
               </div>
            </div>

            {/* Sağ: Metin */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#1E40D8]">Bize Katılın</h2>
              <div className="w-20 h-1 bg-[#ED6E2D] rounded-full"></div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Bizimle birlikte büyümek, yenilikçi çözümler geliştirmek ve sağlıklı yaşam misyonumuza katkıda bulunmak isterseniz, açık pozisyonlarımıza göz atabilir ve başvurunuzu hemen gönderebilirsiniz.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Güçlü bir takımın parçası olarak hem profesyonel hem de kişisel olarak büyümek için size fırsatlar sunuyoruz. Geleceği birlikte inşa etmek için başvurularınızı bekliyoruz.
              </p>
              
              <div className="pt-4">
                <Link 
                  href="/iletisim" 
                  className="inline-flex items-center bg-[#ED6E2D] text-white px-8 py-4 rounded-full font-bold hover:bg-[#d55f24] transition-colors group"
                >
                  Başvuru Yap
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}