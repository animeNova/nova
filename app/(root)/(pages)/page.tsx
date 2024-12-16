"use client";

import Best from "@/components/(sliders)/bestOfSeason/Best";
import dynamic from "next/dynamic";
const Hero = dynamic(
  () => import('@/components/Hero/Hero'),
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
    </div>
  );
}
