import { Hero } from "@/components/home/Hero";
import { BrandStatement } from "@/components/home/BrandStatement";
import { ShoeExperience } from "@/components/3d/ShoeExperience";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { EditorialCampaign } from "@/components/home/EditorialCampaign";
import { HorizontalCollectionScroll } from "@/components/home/HorizontalCollectionScroll";
import { ShopPreview } from "@/components/home/ShopPreview";

export default function Home() {
  return (
    <main className="w-full bg-demon-marble">
      {/* Scene 01: Hero Campaign (Cinematic Inset & Text Parallax) */}
      <Hero />

      {/* Scene 02: Brand Philosophy & Statement (Masked Line Reveals & Parallax Frame) */}
      <BrandStatement />

      {/* Scene 03: 3D Studio Experience & Kinetic "FORM IN MOTION" Installation */}
      <ShoeExperience />

      {/* Scene 04: Apple-Style Keynote Sequence (4-stage physical study & sticky presentation) */}
      <FeaturedProduct />

      {/* Scene 05: Editorial Campaign (Dynamic concrete gallery study with macro textile counter-parallax) */}
      <EditorialCampaign />

      {/* Scene 06: Horizontal Runway Matrix (Traversing 5 core silhouettes driven by vertical scroll) */}
      <HorizontalCollectionScroll />

      {/* Scene 07: Collection Preview (Staggered responsive 4-column catalog preview) */}
      <ShopPreview />
    </main>
  );
}
