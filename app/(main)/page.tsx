import HighlightedText from "@/components/Common/HighlightedText";
import Footer from "@/components/Home/Footer";
import HeroSection from "@/components/Home/HeroSection";
import PopularTutorials from "@/components/Home/PopularTracks";
import { auth } from "@/lib/auth";

export default async function Home() {
  return (
    <>
      <HeroSection />
      {/* <PopularTutorials /> */}
      <Footer />
    </>
  );
}
