"use client";

import { useEffect, useState } from "react";

export function useNavbarScroll(scrollThreshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      // Toggle scrolled state
      setIsScrolled(currentScroll > scrollThreshold);

      // Hide/show on scroll direction (only after 500px)
      if (currentScroll > lastScroll && currentScroll > 500) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollThreshold]);

  return { isScrolled, isHidden };
}
