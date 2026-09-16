import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(".hero-kicker", {
        opacity: 0,
        y: 20,
        duration: 0.7,
      })
        .from(
          ".hero-title span",
          {
            yPercent: 120,
            duration: 1.1,
            stagger: 0.12,
          },
          "-=0.25"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            y: 10,
            duration: 0.8,
          },
          "-=0.4"
        );

      gsap.to(".hero-arrow", {
        y: 8,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-kicker">
        VELOCITY / X132
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <div className="title-line">
            <span>PURE</span>
          </div>

          <div className="title-line">
            <span>MOTION.</span>
          </div>
        </h1>

        <p className="hero-description">
          Engineered for those who refuse to stand still.
        </p>
      </div>

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <span className="hero-arrow">↓</span>
      </div>
    </section>
  );
}