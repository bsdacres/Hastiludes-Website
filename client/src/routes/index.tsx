import Footer from "~/components/Footer";
import Hero from "~/components/Hero";
import TokenSection from "~/components/TokenSection";
import VeNFTSection from "~/components/VeNFTSection";

export default function Home() {
  return (
    <>
      <Hero />
      <VeNFTSection />
      <TokenSection />
      <Footer />
    </>
  );
}
