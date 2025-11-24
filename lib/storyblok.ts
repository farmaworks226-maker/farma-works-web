import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

// Storyblok Başlatıcı
storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu", // Hesabı Avrupa sunucusunda açtığımız için bunu eklemek ŞART
  },
});

// Veri çekme fonksiyonunu dışarı açıyoruz
export { getStoryblokApi } from "@storyblok/react/rsc";