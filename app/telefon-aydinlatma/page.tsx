import { AydinlatmaMetni } from "@/components/aydinlatma-metni"

export const metadata = {
  title: "Telefon Üzerinden İşleme Aydınlatma Metni | FW İlaç",
  description: "6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni",
}

const content = [
  "TELEFON METNİ",
  "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla, görüşmelerimizde elde ettiğimiz kişisel verilerinizi, görüşme amacına uygun olarak işlemekteyiz.",
  "Kişisel verileriniz hakkında bilgilendirme yapmamız amacıyla aydınlatma metnini dinlemek için ….(rakam giriniz) tuşlayınız.",
  "… tuşuna basıldı ise şu metin dinletilmelidir: (Aydınlatma Metni)",
  "Kişisel verilerinize ilişkin FW İlaç A. Ş. Aydınlatma Metni (“Kısaca Aydınlatma Metni”) Kişisel verileriniz; FW İlaç A. Ş. tarafından; Kişisel Verilerin Korunması Kanunun 5 inci maddesinin 2 inci fıkrasında yer alan, c bendine göre “Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması.” d bendine göre, ‘’İlgili kişinin kendisi tarafından alenileştirilmiş olması.’’, e bendine göre, “Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması.”, f bendine göre, “İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması” hukuki dayanaklarına göre, ticari faaliyetlerin yürütülmesi, hizmet akdinin yürütülmesi, güvenlik, acil durumların yürütülmesi, müşteri memnuiyet süreçlerinin yürütülmesi, ürün/hizmet kalitesini arttırma, ürün/hizmet satın alım ve satış süreçlerinin yürütülmesi, kişi talep-şikayetlerin yürütülmesi, ürün/hizmet bilgi talebinin karşılanması, pazarlama faaliyetlerinin yürütülmesi ve sözleşmenin ifası başta olmak üzere ve şirketin ana faaliyetini doğrudan etkileyen ve ilgili veri sahiplerinin temel, hak ve özgürlüklerine zarar vermemek koşuluyla ilgili veri sahibini hiçbir mağduriyete  uğramaksızın veya kişisel veri mahremiyetine zarar vermeksizin veri sorumlusunun meşru menfaati amaçları çerçevesinde sözlü olarak, telefon aracılığıyla kişisel verileriniz işlenmekte ve işbu amaçlara bağlı sınırlı ölçülü kalınarak aktarılabilmektedir. İşbu belirtmiş olduğumuz amaçlar doğrultusunda işlenen ve aktarılan kişisel verileriniz kişisel veri güvenliği hususunda hassasiyet, kişisel verilerin mahremiyeti ve gizliliği ilkelerine riayet ederek korumakta olduğumuzu bildiririz.",
  "6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla, görüşmelerimizde elde ettiğimiz ad, soyadı, T.C. kimlik numarası, telefon numarası, adres, e posta, vergi numarası, vergi dairesi, talep veya şikâyet vb. kişisel verilerinizi, görüşme amacına bağlı işlemekte, her türlü teknik ve idari tedbirleri alarak korumakta, gizli tutmakta, saklama süresin sona ermesini izleyen ilk periyodik imha süresinde silmekte, yok etmekte veya anonim hale getirmekteyiz.",
  "Kişisel verilerinizi, işlenmesini gerektiren amaç çerçevesinde, mevzuat ve açık rızanızla, hissedarlar, iş ortakları, tedarikçiler, müşteriler, yetkili kamu kurum ve kuruluşları, denetçiler, danışmanlar, avukatlar, sözleşmeli hizmet aldığımız, iş birliği yaptığımız gerçek veya özel hukuk tüzel kişileri ile paylaşabilmekteyiz.",
  "6698 Sayılı Kanun’un 11. maddesinde düzenlenen hükümlere göre; kendinizle ile kişisel veri işlenip işlenmediğini öğrenme, kişisel verileri işlenmişse buna ilişkin bilgi talep etme, kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme, kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme haklarınız bulunmaktadır. 6698 Sayılı Kanun’a göre yine kişisel verilerinize ilişkin işbu haklarınızı, Veri Sahibi Başvuru Formu’nu https://fw.com.tr/ uzantılı web adresimizden veya FW İlaç A.Ş. Nisbetiye Mah. Nisbetiye Cad. Özden İş Merkezi No:22 Kat:3 Beşiktaş / İSTANBUL adresimizden ulaşarak tarafımıza ileterek, talep edebilirsiniz.",
  "Bu itibarla, görüşmemizde vereceğiniz kişisel verilerin tarafımızca işlenmesine açık rıza göstermiş olmaktasınız.",
  "Konu ile ilgili geniş bilgiye, https://www.fw.com.tr/ adresinde bulunan, Kişisel Verilerin Korunması ve İşlenmesi Politikası, Kişisel Veri Saklama ve İmha Politikası ile Veri Sahibi Bilgi Edinme Başvuru Formu’ndan ulaşabilirsiniz."
]

export default function TelefonAydinlatmaPage() {
  return (
    <AydinlatmaMetni
      title="Telefon Üzerinden İşleme Aydınlatma Metni"
      content={content}
    />
  )
}