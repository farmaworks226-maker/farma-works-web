import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

// Storyblok Başlatıcı ve API Oluşturucu
export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN, // .env dosyasından token'ı alır
  use: [apiPlugin], // <-- İŞTE EKSİK OLAN KRİTİK PARÇA BU
  apiOptions: {
    region: "eu", // Eğer space'iniz EU (Avrupa) bölgesindeyse bunu ekleyin
    cache: {
      type: "memory", // Geliştirme ortamı için önbellek ayarı
      clear: "auto",
    },
  },
});