import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Performance.css";

gsap.registerPlugin(ScrollTrigger);

const PERFORMANCE_DATA = [
  {
    value: 215,
    unit: "HP",
    label: "Peak Power",
  },
  {
    value: 320,
    unit: "KM/H",
    label: "Top Speed",
  },
  {
    value: 113,
    unit: "NM",
    label: "Peak Torque",
  },
  {
    value: 2.2,
    unit: "SEC",
    label: "0–100 KM/H",
  },
];

export default function Performance() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".performance-kicker", {
        opacity: 0,
        y: 20,

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 55%",
          scrub: 1,
        },
      });

      gsap.from(
        ".performance-heading .line",
        {
          yPercent: 120,
          stagger: 0.15,

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center 55%",
            scrub: 1,
          },
        }
      );

      gsap.from(".spec-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,

        scrollTrigger: {
          trigger: ".spec-grid",
          start: "top 85%",
          end: "top 55%",
          scrub: 1,
        },
      });

      const counters =
        gsap.utils.toArray(
          ".performance .spec-value"
        );

      counters.forEach((counter) => {
        const target = Number(
          counter.dataset.value
        );

        const obj = {
          value: 0,
        };

        gsap.to(obj, {
          value: target,
          duration: 1.6,
          ease: "power2.out",

          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            once: true,
          },

          onUpdate: () => {
            counter.textContent =
              target % 1 === 0
                ? Math.round(
                    obj.value
                  )
                : obj.value.toFixed(
                    1
                  );
          },
        });
      });

      gsap.fromTo(
        ".speed-line",
        {
          xPercent: 40,
          opacity: 0,
        },
        {
          xPercent: -35,
          opacity: 0.5,
          stagger: 0.08,

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 25%",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        ".performance-glow",
        {
          scale: 0.7,
          opacity: 0,
        },
        {
          scale: 1.15,
          opacity: 1,

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "center center",
            scrub: 1.4,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="performance"
      id="performance"
    >
      <div className="performance-effects">
        <div className="speed-line speed-line-1" />
        <div className="speed-line speed-line-2" />
        <div className="speed-line speed-line-3" />

        <div className="performance-glow" />
      </div>

      <div className="performance-kicker">
        02 / PERFORMANCE
      </div>

      <h2 className="performance-heading">
        <div className="mask">
          <span className="line">
            BUILT FOR
          </span>
        </div>

        <div className="mask">
          <span className="line muted">
            RAW PERFORMANCE.
          </span>
        </div>
      </h2>

      {/* mobile reserved bike area */}
      <div
        className="performance-bike-space"
        aria-hidden="true"
      />

      <div className="spec-grid">
        {PERFORMANCE_DATA.map(
          (spec) => (
            <div
              className="spec-card"
              key={spec.label}
            >
              <div className="spec-number-row">
                <span
                  className="spec-value"
                  data-value={spec.value}
                >
                  0
                </span>

                <span className="spec-unit">
                  {spec.unit}
                </span>
              </div>

              <p>{spec.label}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}