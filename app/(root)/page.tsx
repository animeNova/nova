import AnimeCardsCarousel from "@/components/cards/AnimeCardsCarousel";
import CollectionCard from "@/components/collection/CollectionCard";
import CollectionWarapper from "@/components/collection/CollectionWarapper";
import Hero from "@/components/Hero/Hero";
import Popular from "@/components/popularShows/popular";


export  default async function Home() {
  
  return (
    <div className="space-y-6">
      <Hero />
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
