"use client";
import AnimeCardsCarousel from "@/components/cards/AnimeCardsCarousel";
import CollectionCard from "@/components/collection/CollectionCard";
import CollectionWarapper from "@/components/collection/CollectionWarapper";
import Hero from "@/components/Hero/Hero";
import Popular from "@/components/(sliders)/popularShows/popular";
import Recommendation from "@/components/(sliders)/recommendation/recommendation";

export  default function Home() { 
  return (
    <div className="space-y-6">
      <Hero />
      <Recommendation />
      <AnimeCardsCarousel />
      <CollectionWarapper>
      <CollectionCard/>
      <CollectionCard/>
      <CollectionCard/>
      </CollectionWarapper>
      <AnimeCardsCarousel />
      <Popular />
    </div>
  );
}
