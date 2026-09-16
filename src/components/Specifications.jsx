import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Specifications.css";

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  {
    label: "ENGINE",
    value: 998,
    unit: "CC",
  },

  {
    label: "MAX POWER",
    value: 215,
    unit: "HP",
  },

  {
    label: "MAX TORQUE",
    value: 113,
    unit: "NM",
  },

  {
    label: "DRY WEIGHT",
    value: 198,
    unit: "KG",
  },

  {
    label: "TOP SPEED",
    value: 320,
    unit: "KM/H",
  },

  {
    label: "TRANSMISSION",
    value: 6,
    unit: "SPEED",
  },
];

export default function Specifications() {
  const sectionRef =
    useRef(null);

  useEffect(() => {
    const ctx = gsap.context(
      () => {
        gsap.set(
          ".specs-kicker",
          {
            opacity: 0,
            y: 16,
          }
        );

        gsap.set(
          ".specs-heading-line",
          {
            yPercent: 110,
          }
        );

        gsap.set(
          ".specs-description",
          {
            opacity: 0,
            y: 18,
          }
        );

        gsap.set(
          ".spec-item",
          {
            opacity: 0,
            y: 22,

            "--line-scale": 0,
          }
        );

        gsap.set(
          ".spec-unit",
          {
            opacity: 0,
            x: -6,
          }
        );

        gsap.set(
          ".specs-footer",
          {
            opacity: 0,
          }
        );

        const introTl =
          gsap.timeline({
            scrollTrigger: {
              trigger:
                sectionRef.current,

              start:
                "top 82%",

              end:
                "top 32%",

              scrub: 1.15,
            },
          });

        introTl
          .to(
            ".specs-kicker",
            {
              opacity: 1,
              y: 0,

              ease: "none",
            },

            0
          )

          .to(
            ".specs-heading-line",
            {
              yPercent: 0,

              stagger: 0.08,

              ease: "none",
            },

            0.08
          )

          .to(
            ".specs-description",
            {
              opacity: 1,
              y: 0,

              ease: "none",
            },

            0.2
          );

        const rowsTl =
          gsap.timeline({
            scrollTrigger: {
              trigger:
                ".specs-grid",

              start:
                "top 88%",

              end:
                "top 40%",

              scrub: 1.1,
            },
          });

        rowsTl
          .to(
            ".spec-item",
            {
              opacity: 1,
              y: 0,

              stagger: 0.07,

              ease: "none",
            },

            0
          )

          .to(
            ".spec-item",
            {
              "--line-scale": 1,

              stagger: 0.07,

              ease: "none",
            },

            0.05
          )

          .to(
            ".spec-unit",
            {
              opacity: 1,
              x: 0,

              stagger: 0.07,

              ease: "none",
            },

            0.1
          );

        const numbers =
          gsap.utils.toArray(
            ".specifications .spec-value"
          );

        numbers.forEach(
          (element) => {
            const finalValue =
              Number(
                element.dataset
                  .value
              );

            const counter = {
              value: 0,
            };

            gsap.to(counter, {
              value: finalValue,

              duration: 1.25,

              ease: "power2.out",

              scrollTrigger: {
                trigger: element,

                start:
                  "top 90%",

                toggleActions:
                  "play none none reverse",
              },

              onUpdate: () => {
                element.textContent =
                  Math.round(
                    counter.value
                  );
              },

              onReverseComplete:
                () => {
                  element.textContent =
                    "0";
                },
            });
          }
        );

        gsap.to(
          ".specs-footer",
          {
            opacity: 1,

            scrollTrigger: {
              trigger:
                sectionRef.current,

              start:
                "top 45%",

              end:
                "top 25%",

              scrub: 1,
            },
          }
        );
      },

      sectionRef
    );

    requestAnimationFrame(
      () => {
        ScrollTrigger.refresh();
      }
    );

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="specifications"
      id="specifications"
    >
      <div className="specs-content">
        <div className="specs-left">
          <div className="specs-kicker">
            <span className="specs-kicker-number">
              04
            </span>

            <span className="specs-kicker-divider">
              /
            </span>

            <span>
              SPECIFICATIONS
            </span>
          </div>

          <h2 className="specs-heading">
            <span className="specs-mask">
              <span className="specs-heading-line">
                MACHINE
              </span>
            </span>

            <span className="specs-mask">
              <span className="specs-heading-line muted">
                DATA.
              </span>
            </span>
          </h2>

          <p className="specs-description">
            Numbers stripped of noise.
            <br />
            Performance reduced to its essentials.
          </p>

          {/* MOBILE 3D BIKE SLOT */}

          <div
            className="specs-mobile-bike-space"
            aria-hidden="true"
          />

          <div className="specs-grid">
            {SPECS.map(
              (spec, index) => (
                <div
                  className="spec-item"
                  key={spec.label}
                >
                  <div className="spec-meta">
                    <span className="spec-index">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="spec-label">
                      {spec.label}
                    </span>
                  </div>

                  <div className="spec-value-wrap">
                    <span
                      className="spec-value"
                      data-value={
                        spec.value
                      }
                    >
                      0
                    </span>

                    <span className="spec-unit">
                      {spec.unit}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div
          className="specs-bike-space"
          aria-hidden="true"
        />
      </div>

      <div className="specs-footer">
        <span>
          VELOCITY / X132
        </span>

        <span className="specs-footer-center">
          MACHINE / PERFORMANCE
        </span>

        <span>
          TECHNICAL DATA / 04
        </span>
      </div>
    </section>
  );
}