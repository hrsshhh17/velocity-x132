import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Philosophy.css";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".philosophy-label", {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 45%",
          scrub: 1,
        },
      });

      gsap.from(".philosophy-line", {
        yPercent: 120,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "center 55%",
          scrub: 1,
        },
      });

      gsap.from(".philosophy-description", {
        opacity: 0,
        y: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 45%",
          end: "center 40%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="philosophy" id="design">
      <div className="philosophy-label">
        01 / PHILOSOPHY
      </div>

      <h2>
        <div className="philosophy-mask">
          <span className="philosophy-line">NOT BUILT</span>
        </div>

        <div className="philosophy-mask">
          <span className="philosophy-line muted">
            FOR EVERYONE.
          </span>
        </div>
      </h2>

      <p className="philosophy-description">
        Precision. Power. Control. Every line exists for a reason.
      </p>
    </section>
  );
}