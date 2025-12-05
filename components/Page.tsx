"use client"

import { StoryblokComponent, storyblokEditable, SbBlokData } from "@storyblok/react"

type NestedBlok = SbBlokData

interface PageBlok extends SbBlokData {
  body?: NestedBlok[]
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