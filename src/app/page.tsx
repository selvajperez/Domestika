import { Hero } from "@/components/home/hero";
import { CategoryStrip } from "@/components/home/category-strip";
import { FeaturedGrid } from "@/components/home/featured-grid";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { CtaBand } from "@/components/home/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedGrid />
      <WhyChooseUs />
      <CtaBand />
    </>
  );
}
