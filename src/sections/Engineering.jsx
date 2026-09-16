import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Engineering.css";

gsap.registerPlugin(ScrollTrigger);

export default function Engineering() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ========================================================
      // INTRO — KICKER
      // ========================================================

      gsap.fromTo(
        ".engineering-kicker",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",

          scrollTrigger: {
            trigger: ".engineering-intro",
            start: "top 75%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );

      // ========================================================
      // INTRO — HEADING
      // ========================================================

      gsap.fromTo(
        ".engineering-line",
        {
          yPercent: 120,
        },
        {
          yPercent: 0,
          stagger: 0.12,
          ease: "none",

          scrollTrigger: {
            trigger: ".engineering-intro",
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // ========================================================
      // INTRO — DESCRIPTION
      // ========================================================

      gsap.fromTo(
        ".engineering-description",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",

          scrollTrigger: {
            trigger: ".engineering-intro",
            start: "top 55%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );

      // ========================================================
      // TECHNICAL HEADER
      // ========================================================

      gsap.fromTo(
        ".technical-header",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",

          scrollTrigger: {
            trigger: ".technical-header",
            start: "top 85%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );

      // ========================================================
      // EACH ENGINEERING PART
      //
      // Sequence:
      //
      // bottom -> dim
      // entering -> visible
      // center -> highlighted
      // leaving -> fade
      // ========================================================

      const parts = gsap.utils.toArray(".engineering-part");

      parts.forEach((part) => {
        const number =
          part.querySelector(".part-number");

        const category =
          part.querySelector(".part-category");

        const title =
          part.querySelector(".part-title");

        const description =
          part.querySelector(".part-description");

        const divider =
          part.querySelector(".part-divider");

        // ------------------------------------------------------
        // INITIAL STATE
        // ------------------------------------------------------

        gsap.set(part, {
          opacity: 0.12,
          y: 55,
        });

        // ------------------------------------------------------
        // APPEAR
        // ------------------------------------------------------

        gsap.to(part, {
          opacity: 1,
          y: 0,
          ease: "none",

          scrollTrigger: {
            trigger: part,
            start: "top 92%",
            end: "top 62%",
            scrub: 1,
          },
        });

        // ------------------------------------------------------
        // DISAPPEAR WHEN LEAVING TOP
        // ------------------------------------------------------

        gsap.to(part, {
          opacity: 0.08,
          y: -35,
          ease: "none",

          scrollTrigger: {
            trigger: part,
            start: "bottom 38%",
            end: "bottom 12%",
            scrub: 1,
          },
        });

        // ------------------------------------------------------
        // ACTIVE HIGHLIGHT
        // ------------------------------------------------------

        ScrollTrigger.create({
          trigger: part,

          start: "top 58%",
          end: "bottom 42%",

          onEnter: () => {
            part.classList.add("is-active");
          },

          onLeave: () => {
            part.classList.remove("is-active");
          },

          onEnterBack: () => {
            part.classList.add("is-active");
          },

          onLeaveBack: () => {
            part.classList.remove("is-active");
          },
        });

        // ------------------------------------------------------
        // DIVIDER DRAW
        // ------------------------------------------------------

        gsap.fromTo(
          divider,
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",

            scrollTrigger: {
              trigger: part,
              start: "top 90%",
              end: "top 68%",
              scrub: 1,
            },
          }
        );

        // ------------------------------------------------------
        // SMALL INTERNAL MOTION
        // ------------------------------------------------------

        gsap.fromTo(
          [number, category, title, description],
          {
            x: -15,
          },
          {
            x: 0,
            stagger: 0.03,
            ease: "none",

            scrollTrigger: {
              trigger: part,
              start: "top 88%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      });

      // ========================================================
      // FOOTER
      // ========================================================

      gsap.fromTo(
        ".engineering-footer",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,

          scrollTrigger: {
            trigger: ".engineering-footer",
            start: "top 90%",
            end: "top 70%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="engineering"
      id="engineering"
    >
      {/* ===================================================== */}
      {/* INTRO                                                 */}
      {/* ===================================================== */}

      <div className="engineering-intro">
        <span className="engineering-kicker">
          03 / ENGINEERING
        </span>

        <h2 className="engineering-heading">
          <div className="engineering-mask">
            <span className="engineering-line">
              PRECISION
            </span>
          </div>

          <div className="engineering-mask">
            <span className="engineering-line muted">
              IN EVERY PART.
            </span>
          </div>
        </h2>

        <p className="engineering-description">
          Every component has a reason.
          <br />
          Every detail serves motion.
        </p>
      </div>

      {/* ===================================================== */}
      {/* PARTS                                                 */}
      {/* ===================================================== */}

      <div className="engineering-stage">
        <div className="engineering-parts">

          {/* HEADER */}

          <div className="technical-header">
            <span>VELOCITY / X132</span>

            <h3>
              MACHINE
              <br />
              ANATOMY.
            </h3>

            <p>
              A closer look at the systems that define
              the machine.
            </p>
          </div>

          {/* ================================================= */}
          {/* 01 ENGINE                                        */}
          {/* ================================================= */}

          <article className="engineering-part">
            <div className="part-divider" />

            <div className="part-row">
              <span className="part-number">
                01
              </span>

              <span className="part-category">
                POWERTRAIN
              </span>

              <h4 className="part-title">
                ENGINE
              </h4>
            </div>

            <p className="part-description">
              The mechanical core of the machine,
              engineered for immediate response and
              relentless delivery.
            </p>
          </article>

          {/* ================================================= */}
          {/* 02 FUEL TANK                                     */}
          {/* ================================================= */}

          <article className="engineering-part">
            <div className="part-divider" />

            <div className="part-row">
              <span className="part-number">
                02
              </span>

              <span className="part-category">
                FUEL SYSTEM
              </span>

              <h4 className="part-title">
                FUEL TANK
              </h4>
            </div>

            <p className="part-description">
              Sculpted around the rider while keeping
              mass centralized for precise control.
            </p>
          </article>

          {/* ================================================= */}
          {/* 03 SUSPENSION                                    */}
          {/* ================================================= */}

          <article className="engineering-part">
            <div className="part-divider" />

            <div className="part-row">
              <span className="part-number">
                03
              </span>

              <span className="part-category">
                CONTROL
              </span>

              <h4 className="part-title">
                SUSPENSION
              </h4>
            </div>

            <p className="part-description">
              Tuned to maintain stability while
              translating every change in the road
              into controlled motion.
            </p>
          </article>

          {/* ================================================= */}
          {/* 04 BRAKING                                       */}
          {/* ================================================= */}

          <article className="engineering-part">
            <div className="part-divider" />

            <div className="part-row">
              <span className="part-number">
                04
              </span>

              <span className="part-category">
                CONTROL
              </span>

              <h4 className="part-title">
                BRAKING
              </h4>
            </div>

            <p className="part-description">
              Progressive stopping force designed
              around precision, feedback and rider
              confidence.
            </p>
          </article>

          {/* ================================================= */}
          {/* 05 EXHAUST                                       */}
          {/* ================================================= */}

          <article className="engineering-part">
            <div className="part-divider" />

            <div className="part-row">
              <span className="part-number">
                05
              </span>

              <span className="part-category">
                EXHAUST
              </span>

              <h4 className="part-title">
                EXHAUST SYSTEM
              </h4>
            </div>

            <p className="part-description">
              A mechanical signature shaped around
              flow, performance and the character of
              the machine.
            </p>
          </article>

          {/* ================================================= */}
          {/* 06 WHEELS                                        */}
          {/* ================================================= */}

          <article className="engineering-part">
            <div className="part-divider" />

            <div className="part-row">
              <span className="part-number">
                06
              </span>

              <span className="part-category">
                CONTACT
              </span>

              <h4 className="part-title">
                WHEELS
              </h4>
            </div>

            <p className="part-description">
              The final connection between machine
              and road, engineered for stability and
              immediate feedback.
            </p>
          </article>

          <div className="parts-end-line" />

          <div className="engineering-footer">
            <span>VELOCITY / X132</span>
            <span>ENGINEERED FOR MOTION</span>
          </div>

        </div>
      </div>
    </section>
  );
}