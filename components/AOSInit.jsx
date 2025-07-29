"use client";
import { useEffect } from "react";
import "aos/dist/aos.css";

export default function AOSInit() {
  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({
        duration: 900,
        once: true,
        easing: "ease-out-cubic",
      });
    });
  }, []);
  return null;
} 