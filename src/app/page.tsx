import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import StatsBar from "@/components/landing/StatsBar";
import ValueProposition from "@/components/landing/ValueProposition";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import TrustSection from "@/components/landing/TrustSection";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import VoiceAgent from "@/components/landing/VoiceAgent";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-surface-primary text-white overflow-hidden">
      <Navbar />
      <Hero />
      <VoiceAgent />
      <StatsBar />
      <ValueProposition />
      <FeatureShowcase />
      <HowItWorks />
      <TrustSection />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
