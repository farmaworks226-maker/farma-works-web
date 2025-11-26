import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

// Token'ı al
const token = process.env.STORYBLOK_TOKEN;

// Eğer token yoksa konsola bas bas bağır (Hata ayıklama için)
if (!token) {
  console.error("🚨 HATA: STORYBLOK_TOKEN bulunamadı! Vercel Environment Variables ayarlarını kontrol edin.");
}

// Storyblok Başlatıcı
storyblokInit({
  accessToken: token,
  use: [apiPlugin], // apiPlugin burada şart
  apiOptions: {
    region: "eu", // Space'iniz EU sunucusundaysa
    cache: {
      type: 'memory',
      clear: 'auto',
    },
  },
});

// API fonksiyonunu dışa aktar
export { getStoryblokApi } from "@storyblok/react/rsc";
