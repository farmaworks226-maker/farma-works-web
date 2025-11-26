import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

// Storyblok Başlatıcı
storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN, // .env dosyasındaki şifreyi kullanır
  use: [apiPlugin],
  apiOptions: {
    // ÇÖZÜM: API Sürümünü manuel olarak V2'ye ayarlıyoruz (Daha stabil)
    version: 'v2', 
    region: 'eu' // Eğer space'i EU'da açtıysanız bunu da ekleyin
  }
});

// Bu fonksiyonu sayfalarımızda veri çekerken kullanacağız
export { getStoryblokApi } from "@storyblok/react/rsc";