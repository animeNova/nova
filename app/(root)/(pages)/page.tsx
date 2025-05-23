
import Best from "@/components/(sliders)/bestOfSeason/Best";
import Popular from "@/components/(sliders)/popularShows/popular";
import dynamic from "next/dynamic";
import Hero from '@/components/Hero/Hero'
import Recommendation from '@/components/(sliders)/recommendation/recommendation'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Nova",
    default: "Nova "
  },
  description: "Discover  your favorite shows and movies with Nova",
  keywords: ["streaming", "movies", "TV shows", "anime", "entertainment"],
  authors: [{ name: "Nova Team" }],
  creator: "Nova Team",
  publisher: "Nova",
  metadataBase: new URL("https://nova-streaming.example.com"),
  openGraph: {
    title: "Nova - Your Ultimate Streaming Platform",
    description: "Discover  your favorite shows and movies with Nova",
    url: "https://nova-streaming.example.com",
    siteName: "Nova",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nova Platform"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova - Your Ultimate Streaming Platform",
    description: "Discover your favorite shows and movies with Nova",
    images: ["/assets/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function Home() { 

  return (
    <div className="space-y-6">
      <Hero />
      <Recommendation />
      <Best />
      <Popular />
    </div>
  );
}
