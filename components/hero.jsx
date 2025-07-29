"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  
  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return; // ✅ null check

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-20 sm:pt-24 md:pt-36 lg:pt-48 pb-6 sm:pb-10">
      <div className="space-y-4 sm:space-y-6 text-center px-4 sm:px-6">
        <div className="space-y-4 sm:space-y-6 mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold gradient-title leading-tight">
            Your AI Career Coach for
            <br className="hidden sm:block" />
            Professional Success
          </h1>

          <p className="mx-auto max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl px-4">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8">
              Get Started
            </Button>
          </Link>
          <Link href="" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 sm:px-8">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-4 sm:mt-5 md:mt-0 px-4">
          <div ref={imageRef} className="hero-image">
            <Image
              src={"/banner.png"}
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto w-full h-auto max-w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;