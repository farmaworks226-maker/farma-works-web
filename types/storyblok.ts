// Storyblok Asset (Resim, Video vb.)
export interface StoryblokAsset {
  filename: string
  alt?: string
  title?: string
  name?: string
  focus?: string
}

// Temel Ürün Yapısı
export interface Product {
  _uid: string
  component: string
  name: string
  slug?: string
  category?: string
  description?: string
  short_description?: string
  price?: string
  image?: StoryblokAsset
  gallery?: StoryblokAsset[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features?: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  benefits?: any[]
  usage?: string
  ingredients?: string
  warnings?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // Ekstra alanlar için esneklik
}

// Storyblok Story Wrapper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface StoryblokStory<T = any> {
  name: string
  created_at: string
  published_at?: string | null
  id: number
  uuid: string
  content: T
  slug: string
  full_slug: string
  sort_by_date?: string | null
  position?: number
  tag_list?: string[]
  is_startpage?: boolean
  parent_id?: number | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta_data?: any
  group_id?: string
  first_published_at?: string | null
  release_id?: number | null
  lang?: string
  path?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  alternates?: any[]
  default_full_slug?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translated_slugs?: any[] | null
}

// API Response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface StoryblokResponse<T = any> {
  story?: StoryblokStory<T>
  stories?: StoryblokStory<T>[]
  cv?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rels?: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  links?: any[]
}

// Rich Text için
export interface RichTextContent {
  type: string
  content?: RichTextContent[]
  text?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  marks?: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attrs?: any
}

// Sağlık Önerileri için
export interface HealthArticle {
  _uid: string
  component: string
  title: string
  excerpt?: string
  content?: RichTextContent
  image?: StoryblokAsset
  author?: string
  date?: string
  category?: string
  tags?: string[]
}