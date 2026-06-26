import { HeroSection } from "@/components/HeroSection";
import { PricingSection } from "@/components/PricingSection";
import { BentoAccordion } from "@/components/BentoAccordion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <HeroSection />
      <BentoAccordion />
      <PricingSection />
      <footer className="w-full bg-[#172b36] py-12 text-center text-[#d9e8e2] border-t border-white/10 font-mono text-sm">
        <p>&copy; {new Date().getFullYear()} Next-Gen AI Platform. Phase 1 Speed Run.</p>
      </footer>
    </main>
  );
}
