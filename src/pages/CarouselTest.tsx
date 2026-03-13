import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import GoTwoCoverFlow from "@/components/GoTwoCoverFlow";
import PillCarousel from "@/components/ui/PillCarousel";

const TEST_ITEMS = [
  { id: "1", label: "Clothing",  image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
  { id: "2", label: "Footwear",  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" },
  { id: "3", label: "Grooming",  image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80" },
  { id: "4", label: "Vibe",      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
  { id: "5", label: "Accessory", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
  { id: "6", label: "Taste",     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
];

const CarouselTest = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="app-page h-screen flex flex-col overflow-hidden">
      <DashboardTopBar />
      <main
        className="flex-1 min-h-0 px-8 flex flex-col items-center justify-center gap-6"
        style={{ paddingBottom: "var(--footer-height)" }}
      >
        <p className="section-header text-center">Style & Fit</p>
        {isDesktop
          ? <PillCarousel items={TEST_ITEMS} onSelect={(id) => console.log("selected", id)} />
          : <GoTwoCoverFlow items={TEST_ITEMS} onSelect={(id) => console.log("selected", id)} />
        }
      </main>
      <AppSidebar />
    </div>
  );
};

export default CarouselTest;
