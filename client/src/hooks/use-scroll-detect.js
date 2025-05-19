import { useState, useEffect } from "react";

export function useScrollDetect(threshold = 50) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setHasScrolled(scrollTop > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return hasScrolled;
}
