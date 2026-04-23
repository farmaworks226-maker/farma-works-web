import { AydinlatmaMetni } from "@/components/aydinlatma-metni"

export const metadata = {
  title: "Ticari SMS Onayı | FW İlaç",
  description: "6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni",
}

const content = [
  "Ticari Elektronik İleti SMS Onayı",
  "6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve 6698 sayılı Kişisel Verilerin Korunması Kanunu çerçevesinde FW İlaç A. Ş.  (“Şirket”) tarafından veya bir aracı firma vasıtasıyla tarafınıza https://fw.com.tr/ üzerinde sunulan Şirket ürünlerine ilişkin telefon, çağrı merkezleri, otomatik arama makineleri, akıllı ses kaydedici sistemler, kısa mesaj hizmeti gibi vasıtalar kullanılarak elektronik ortamda gerçekleştirilen ve ticari amaçlarla gönderilen veri, ses ve görüntü içerikli her türlü ticari elektronik ileti ile telefon numaranıza yapılacak tüm tanıtım, kampanya ve bilgilendirme mesajı gönderimini kabul etmektesiniz.",
  "“SMS ile ürün içerik tanıtımı veya kampanyalardan faydalanmak istiyorum veya kampanya ve duyurulardan haberdar olmak istiyorum” seçeneğini işaretledikten sonra üyelik tarihinizden itibaren “İZİNLİ” data olarak kabul edilecek ve yukarıda belirtilen tüm iletişim yolları ile sizinle iletişim kurulmasına Onay Vermiş sayılacaksınız",
  "SMS Onayınızı iptal etmek istediğinizde tarafınıza gönderilen SMS içerisinde bulunan SMS İptal yönlendirmeleri ile birlikte SMS bilgilendirme hizmetinden çıkabilirsiniz."
]

export default function TicariSmsOnayPage() {
  return (
    <AydinlatmaMetni
      title="Ticari SMS Onayı"
      content={content}
    />
  )
}