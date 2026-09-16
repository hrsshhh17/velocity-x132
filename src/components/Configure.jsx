import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Configure.css";

gsap.registerPlugin(ScrollTrigger);

const COLORS = [
  { name: "Crimson Red", value: "#a30f1b" },
  { name: "Midnight Black", value: "#111111" },
  { name: "Arctic Silver", value: "#aeb3b7" },
  { name: "Racing Blue", value: "#183e70" },
];

const FINISHES = [
  { name: "Gloss", value: "gloss" },
  { name: "Matte", value: "matte" },
];

export default function Configure() {
  const sectionRef = useRef(null);
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [activeFinish, setActiveFinish] = useState(FINISHES[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1.2,
        },
      });

      tl.fromTo(".configure-kicker",{opacity:0,y:15},{opacity:1,y:0,ease:"none"},0)
        .fromTo(".configure-line",{yPercent:110},{yPercent:0,stagger:0.08,ease:"none"},0.08)
        .fromTo(".configure-description",{opacity:0,y:15},{opacity:1,y:0,ease:"none"},0.18)
        .fromTo(".configure-controls",{opacity:0,y:22},{opacity:1,y:0,ease:"none"},0.25)
        .fromTo(".configure-summary",{opacity:0,y:12},{opacity:1,y:0,ease:"none"},0.32)
        .fromTo(".configure-drag-hint",{opacity:0},{opacity:1,ease:"none"},0.38);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const changeColor = (color) => {
    setActiveColor(color);
    window.dispatchEvent(
      new CustomEvent("velocity-bike-color", {
        detail: { color: color.value, name: color.name },
      })
    );
  };

  const changeFinish = (finish) => {
    setActiveFinish(finish);
    window.dispatchEvent(
      new CustomEvent("velocity-bike-surface", {
        detail: { finish: finish.value },
      })
    );
  };

  const resetConfiguration = () => {
    setActiveColor(COLORS[0]);
    setActiveFinish(FINISHES[0]);

    window.dispatchEvent(
      new CustomEvent("velocity-bike-reset")
    );
  };

  return (
    <section ref={sectionRef} className="configure" id="configure">
      <div className="configure-header">
        <div className="configure-kicker">05 / CONFIGURE</div>

        <h2 className="configure-heading">
          <span className="configure-mask">
            <span className="configure-line">MAKE IT</span>
          </span>
          <span className="configure-mask">
            <span className="configure-line muted">YOURS.</span>
          </span>
        </h2>

        <p className="configure-description">
          Define the finish.
          <br />
          Make the machine yours.
        </p>
      </div>

      <div className="showroom-platform" aria-hidden="true">
        <div className="showroom-platform-ring ring-one" />
        <div className="showroom-platform-ring ring-two" />
        <div className="showroom-platform-inner" />
      </div>

      <div
  className="configure-drag-zone"
  aria-label="Drag to rotate motorcycle"
/>

      <div className="configure-drag-hint">
        <span>←</span>
        <span>DRAG TO ROTATE</span>
        <span>→</span>
      </div>

      <div className="configure-controls">
        <div className="configure-control-block">
          <div className="configure-controls-header">
            <div>
              <span className="control-number">01</span>
              <span>BODY FINISH</span>
            </div>
            <span className="active-finish">{activeColor.name}</span>
          </div>

          <div className="configure-colors">
            {COLORS.map((color) => (
              <button
                key={color.name}
                type="button"
                className={`configure-color ${
                  activeColor.name === color.name ? "active" : ""
                }`}
                onClick={() => changeColor(color)}
              >
                <span
                  className="configure-color-dot"
                  style={{ backgroundColor: color.value }}
                />
                <span className="configure-color-name">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="configure-control-block surface-block">
          <div className="configure-controls-header">
            <div>
              <span className="control-number">02</span>
              <span>SURFACE</span>
            </div>
            <span className="active-finish">{activeFinish.name}</span>
          </div>

          <div className="surface-options">
            {FINISHES.map((finish) => (
              <button
                key={finish.value}
                type="button"
                className={`surface-option ${
                  activeFinish.value === finish.value ? "active" : ""
                }`}
                onClick={() => changeFinish(finish)}
              >
                <span className="surface-indicator" />
                <span>{finish.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="configure-summary">
          <div className="summary-label">CURRENT BUILD</div>
          <div className="summary-row">
            <span>PAINT</span>
            <strong>{activeColor.name}</strong>
          </div>
          <div className="summary-row">
            <span>SURFACE</span>
            <strong>{activeFinish.name}</strong>
          </div>

          <button
            className="configure-reset"
            type="button"
            onClick={resetConfiguration}
          >
            RESET CONFIGURATION
          </button>
        </div>
      </div>

      <div className="configure-tech-label">
        <span>X132</span>
        <span>/</span>
        <span>CONFIGURATOR</span>
      </div>

      <div className="configure-footer">
        <span>VELOCITY / X132</span>
        <span>INTERACTIVE MACHINE</span>
      </div>
    </section>
  );
}
