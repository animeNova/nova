"use client";

import Best from "@/components/(sliders)/bestOfSeason/Best";
import dynamic from "next/dynamic";
const AnimeCardsCarousel = dynamic(
  () => import('@/components/cards/AnimeCardsCarousel'),
  { ssr: false }
)
const CollectionCard = dynamic(
  () => import('@/components/collection/CollectionCard'),
  { ssr: false }
)
const CollectionWarapper = dynamic(
  () => import('@/components/collection/CollectionWarapper'),
  { ssr: false }
)
const Hero = dynamic(
  () => import('@/components/Hero/Hero'),
  { ssr: false }
)
const Popular = dynamic(
  () => import('@/components/(sliders)/popularShows/popular'),
  { ssr: false }
)
const Recommendation = dynamic(
  () => import('@/components/(sliders)/recommendation/recommendation'),
  { ssr: false }
)

export default function Home() { 
  return (
    <div className="space-y-6">
      <Hero />
      <Recommendation />
      <Best />
      {/* <AnimeCardsCarousel /> */}
      <CollectionWarapper>
      <CollectionCard/>
      <CollectionCard/>
      <CollectionCard/>
      </CollectionWarapper>
      {/* <AnimeCardsCarousel /> */}
      {/* <Popular /> */}
    </div>
  );
}
