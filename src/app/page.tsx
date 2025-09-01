import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { PricingTeaser } from "@/components/sections/pricing-teaser";

export default function Home() {
  console.log("789123789");
  return (
    <div className="min-h-screen flex flex-col w-full max-w-full mx-auto">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
        <PricingTeaser />
      </main>
      <Footer />
    </div>
  );
}