import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

// Storyblok Başlatıcı
storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN, // .env dosyasındaki şifreyi kullanır
  use: [apiPlugin],
});

// Bu fonksiyonu sayfalarımızda veri çekerken kullanacağız
export { getStoryblokApi } from "@storyblok/react/rsc";