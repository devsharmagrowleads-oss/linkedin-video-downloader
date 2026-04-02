import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StepsGuide from "@/components/StepsGuide";
import FeaturesGrid from "@/components/FeaturesGrid";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StepsGuide />
        <FeaturesGrid />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
