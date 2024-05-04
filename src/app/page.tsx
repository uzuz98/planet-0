"use client";

import HeroSection from "@/sections/HeroSection";
import Projects from "@/sections/Project";
import TextHeading from "@/sections/TextHeading";

export default function Home() {
  return (
    <div className="h-full w-full">
      <HeroSection />
      <Projects />
      <TextHeading />
    </div>
  );
}
