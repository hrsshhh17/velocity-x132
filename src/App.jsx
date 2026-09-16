import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Scene from "./components/Scene";
import Navbar from "./components/Navbar";

import Hero from "./sections/Hero";
import Philosophy from "./sections/Philosophy";
import Performance from "./sections/Performance";
import Engineering from "./sections/Engineering";

import Specifications from "./components/Specifications";
import Configure from "./components/Configure";

import Final from "./sections/Final";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const lenis = new Lenis({
      smoothWheel: !reduceMotion,

      lerp: reduceMotion
        ? 1
        : 0.085,
    });

    lenis.on(
      "scroll",
      ScrollTrigger.update
    );

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    // =====================================================
    // RESPONSIVE REFRESH
    // =====================================================

    let resizeTimer;

    const refreshScrollTriggers = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 150);
    };

    window.addEventListener(
      "resize",
      refreshScrollTriggers
    );

    window.addEventListener(
      "orientationchange",
      refreshScrollTriggers
    );

    // Initial refresh
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    return () => {
      clearTimeout(resizeTimer);

      window.removeEventListener(
        "resize",
        refreshScrollTriggers
      );

      window.removeEventListener(
        "orientationchange",
        refreshScrollTriggers
      );

      gsap.ticker.remove(updateLenis);

      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* GLOBAL 3D CANVAS */}

      <Scene />

      {/* FIXED NAVIGATION */}

      <Navbar />

      {/* WEBSITE CONTENT */}

      <main
        className="velocity-main"
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Hero />

        <Philosophy />

        <Performance />

        <Engineering />

        <Specifications />

        <Configure />

        <Final />
      </main>
    </>
  );
}

export default App;