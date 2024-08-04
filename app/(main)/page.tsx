import HighlightedText from "@/components/Common/HighlightedText";
import HeroSection from "@/components/Home/HeroSection";
import PopularTutorials from "@/components/Home/PopularTracks";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularTutorials />
    </>
  );
}
