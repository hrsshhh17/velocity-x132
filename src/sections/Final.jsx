import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Final.css";

gsap.registerPlugin(ScrollTrigger);

export default function Final() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 20%",
          scrub: 1.2,
        },
      });

      tl.fromTo(
        ".final-kicker",
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",
        },
        0
      )
        .fromTo(
          ".final-line",
          {
            yPercent: 120,
          },
          {
            yPercent: 0,
            stagger: 0.1,
            ease: "none",
          },
          0.08
        )
        .fromTo(
          ".final-rule",
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            ease: "none",
          },
          0.2
        )
        .fromTo(
          ".final-copy",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            ease: "none",
          },
          0.3
        )
        .fromTo(
          ".final-actions",
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            ease: "none",
          },
          0.38
        );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // =========================================================
  // BACK TO TOP
  // =========================================================

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // BACK TO CONFIGURE
  // =========================================================

  const backToConfigure = () => {
    const configure =
      document.getElementById("configure") ||
      document.querySelector(".configure");

    if (!configure) return;

    configure.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="final-section"
      id="velocity-final"
    >
      <div className="final-kicker">
        06 / VELOCITY
      </div>

      <div className="final-center">
        <h2 className="final-heading">
          <span className="final-mask">
            <span className="final-line">
              BUILT FOR
            </span>
          </span>

          <span className="final-mask">
            <span className="final-line muted">
              WHAT&apos;S NEXT.
            </span>
          </span>
        </h2>

        <div className="final-rule" />

        <div className="final-copy">
          <div className="final-wordmark">
            VELOCITY <span>X132</span>
          </div>

          <p>
            Engineered without compromise.
            <br />
            Defined by motion.
          </p>
        </div>

        <div className="final-actions">
          <button
            type="button"
            onClick={backToConfigure}
          >
            ← CONFIGURE AGAIN
          </button>

          <button
            type="button"
            onClick={backToTop}
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>

      <footer className="final-footer">
        <span>VELOCITY / X132</span>
        <span>CONCEPT MACHINE / 2026</span>
      </footer>
    </section>
  );
}