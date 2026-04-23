import { AydinlatmaMetni } from "@/components/aydinlatma-metni"

export const metadata = {
  title: "Çerez Aydınlatma Metni | FW İlaç",
  description: "6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni",
}

const content = [
  "WEB SAYFAMIZDA KULLANILAN ÇEREZLERE İLİŞKİN AYDINLATMA METNİ",
  "FW İlaç A. Ş. (“Şirket”) tarafından web sayfamızı ziyaret eden kullanıcılarımızın kişisel verilerinin 6698 sayılı Kişisel Verilerin Korunması Kanunu’na (“Kanun”) ve sair mevzuat hükümlerine uygun şekilde işlenmesi amaçlanmaktadır. İşbu aydınlatma metni ile amacımız; kişisel verilerinizin toplanma yöntemi, işlenme amaçları, hukuki sebepleri, işlenen kişisel verilerinizin kimlere ve hangi amaçlarla aktarılabileceği ve haklarınız konularında sizleri bilgilendirmektir.",
  "Çerez Nedir ve Neden Kullanılmaktadır?",
  "Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcılar aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır. Çerezler konusundan daha detaylı bilgi için www.aboutcookies.org  ve www.allaboutcookies.org adreslerini ziyaret edebilirsiniz.",
  "Çerez kullanılmasının tercih edilmemesi halinde tarayıcınızın ayarlarından Çerezlerin silinmesi ya da engellenmesi mümkündür. Ancak bunun internet sitesinin kullanımınızı etkileyebileceğini hatırlatmak isteriz. Tarayıcıdan Çerez ayarlarınızı değiştirmediğiniz sürece bu sitede Çerez kullanımının kabul edildiği varsayılmaktadır.",
  "Kullanılan Çerez Türleri: Web sayfamızda Şirket tarafından zorunlu çerezler ve oturum çerezleri tutulmaktadır.",
  "Zorunlu Çerezler: Bu çerezler internet sitesinin çalışması amacıyla gerekli olan çerezlerdir. Kullanıcının talep etmiş olduğu bir bilgi toplumu hizmetinin (log-in olma, form doldurma, form gönderme, gizlilik tercihlerinin hatırlanması gibi) yerine getirilebilmesi için zorunlu olarak kullanılmaktadırlar.",
  "Oturum Çerezleri: Geçici çerez olarak da adlandırılan oturum çerezi, oturumun sürekliliğinin sağlanması amacıyla kullanılır. Kullanıcı internet tarayıcısını kapattığında oturum çerezleri de silinmektedir. Belli çerezlerin kullanımı web sitemizin ve uygulamamızın doğru biçimde çalışması için zorunludur.",
  "Kalıcı Çerezler: İnternet tarayıcısı kapatıldığı zaman silinmeyen kalıcı bir çerez, belirli bir tarihte veya belirli bir süre sonra kendiliğinden silinmektedir. Bu çerez aracılığıyla kullanıcı bir internet sitesini her ziyaret ettiğinde kullanıcının işlenen verileri sunucuya iletilmektedir. Bu nedenle, kalıcı çerezler bazen izleme çerezleri olarak da adlandırılırlar. Örneğin reklam verenler bir kullanıcının internet tarama alışkanlıklarıyla (web browsing habits) ilgili bilgilerini uzun bir süre boyunca kaydederek kullanabilirler. Ayrıca, kullanıcıların internet sitelerindeki hesaplarına giriş yaparken her seferinde giriş bilgilerini tekrar girmemelerini sağlamak üzere de kullanılabilirler.",
  "İşlevsellik ve Tercih Çerezleri: Bu çerezler sizlerin web sitesi ve uygulama üzerindeki tercihlerinizi ve seçimlerinizi hatırlayarak sitemizde sunulan hizmetlerin sizin için kişiselleşmesini sağlamaktadır. Örneğin sitemiz üzerindeki dil seçiminizi veya bir metin okurken seçmiş olduğunuz yazı font boyutunu hatırlamamızı sağlar.",
  "Şirket Tarafından Çerezler Yoluyla İşlenen Kişisel Veriler",
  "Yukarıda açıklanan çerez türlerinden kullanmış olduğunuz web tarayıcılarının tutmuş olduğu çerez türlerinin dışında web sitemizi ziyaretlerinizde Şirket çerez kaydı tutmamaktadır.",
  "ÇEREZLERİN KULLANIMI VERİ SAHİPLERİ TARAFINDAN ENGELLENEBİLİR Mİ?",
  "Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz.",
  "Adobe Analytics ayarları: https://www.adobe.com/uk/privacy/opt-out.html",
  "AOL ayarları: https://help.aol.com/articles/restore-security-settings-and-enable-cookie-settings-on-browser",
  "Google Adwords ayarları: https://support.google.com/My-Ad-Center-Help/answer/12155764?hl=en&visit_id=638137122527343447-921912288&rd=1",
  "Google Analytics ayarları: https://tools.google.com/dlpage/gaoptout",
  "Google Chrome ayarları: https://support.google.com/chrome/answer/95647?hl=en",
  "Internet Explorer ayarları: https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d",
  "Mozilla Firefox ayarları: https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer?redirectslug=Cookies&redirectlocale=en-US",
  "Opera ayarları: https://security.opera.com/en/",
  "Safari ayarları: https://support.apple.com/tr-tr/guide/safari/sfri11471/mac",
  "Kişisel Verilerin Aktarımı: Kullanmakta olduğunuz web tarayıcısının işlevlerine göre bağlı bulunduğu ülkedeki şirket, yetkili ve sunucular ile paylaşılabilecek ve aktarılabilecektir. Bu paylaşım ve aktarımların Şirketimiz ile ilgisi bulunmamaktadır."
]

export default function CerezAydinlatmaPage() {
  return (
    <AydinlatmaMetni
      title="Çerez Aydınlatma Metni"
      content={content}
    />
  )
}