"use client"
import { StoryblokComponent, storyblokEditable } from "@storyblok/react"

interface NestedBlok {
  _uid: string
  component: string
  [key: string]: unknown
}

interface PageBlok {
  _uid: string
  component: string
  body?: NestedBlok[]
  [key: string]: unknown
}

const Page = ({ blok }: { blok: PageBlok }) => (
  <main {...storyblokEditable(blok)} className="min-h-screen bg-white">
    {blok.body
      ? blok.body.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))
      : null}
  </main>
)

export default Page