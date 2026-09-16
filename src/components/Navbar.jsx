import { useEffect, useState } from "react";
import "./Navbar.css";

const links = [
  ["00", "HOME", "home"],
  ["01", "PHILOSOPHY", "design"],
  ["02", "PERFORMANCE", "performance"],
  ["03", "ENGINEERING", "engineering"],
  ["04", "SPECS", "specifications"],
  ["05", "CONFIGURE", "configure"],
];

export default function Navbar() {
  const [activeSection, setActiveSection] =
    useState("home");

  const [menuOpen, setMenuOpen] =
    useState(false);

  // =========================================================
  // SCROLL TO SECTION
  // =========================================================

  const scrollToSection = (section) => {
    setMenuOpen(false);

    if (section === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const target =
      document.getElementById(section) ||
      document.querySelector(`.${section}`);

    if (!target) {
      console.warn(
        `Section not found: ${section}`
      );

      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // =========================================================
  // ACTIVE SECTION DETECTION
  // =========================================================

  useEffect(() => {
    const sections = links
      .map(([, , section]) => {
        if (section === "home") {
          return {
            name: "home",
            element:
              document.querySelector(".hero"),
          };
        }

        return {
          name: section,
          element:
            document.getElementById(section) ||
            document.querySelector(
              `.${section}`
            ),
        };
      })
      .filter((item) => item.element);

    const updateActiveSection = () => {
      const viewportPoint =
        window.innerHeight * 0.42;

      let current = "home";

      sections.forEach(
        ({ name, element }) => {
          const rect =
            element.getBoundingClientRect();

          if (
            rect.top <= viewportPoint &&
            rect.bottom >= viewportPoint
          ) {
            current = name;
          }
        }
      );

      setActiveSection(current);
    };

    updateActiveSection();

    window.addEventListener(
      "scroll",
      updateActiveSection,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateActiveSection
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateActiveSection
      );

      window.removeEventListener(
        "resize",
        updateActiveSection
      );
    };
  }, []);

  // =========================================================
  // CLOSE MOBILE MENU ON RESIZE
  // =========================================================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  // =========================================================
  // PREVENT TEXT SELECTION WHILE MENU OPEN
  // =========================================================

  useEffect(() => {
    document.body.classList.toggle(
      "velocity-menu-open",
      menuOpen
    );

    return () => {
      document.body.classList.remove(
        "velocity-menu-open"
      );
    };
  }, [menuOpen]);

  return (
    <>
      <header className="velocity-nav">
        {/* ===============================================
            BRAND
        =============================================== */}

        <button
          className="velocity-brand"
          type="button"
          onClick={() =>
            scrollToSection("home")
          }
          aria-label="Go to home"
        >
          VELOCITY
          <span> / X132</span>
        </button>

        {/* ===============================================
            DESKTOP NAVIGATION
        =============================================== */}

        <nav
          className="velocity-nav-links"
          aria-label="Primary navigation"
        >
          {links.map(
            ([number, label, section]) => (
              <button
                type="button"
                key={section}
                className={
                  activeSection === section
                    ? "active"
                    : ""
                }
                onClick={() =>
                  scrollToSection(section)
                }
              >
                <span>{number}</span>

                {label}
              </button>
            )
          )}
        </nav>

        {/* ===============================================
            RIGHT SIDE
        =============================================== */}

        <div className="velocity-nav-right">
          <button
            type="button"
            className="velocity-nav-configure"
            onClick={() =>
              scrollToSection("configure")
            }
          >
            CONFIGURE
          </button>

          <button
            type="button"
            className={`velocity-menu-button ${
              menuOpen ? "open" : ""
            }`}
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`velocity-mobile-menu ${
          menuOpen ? "open" : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <nav
          className="velocity-mobile-links"
          aria-label="Mobile navigation"
        >
          {links.map(
            ([number, label, section]) => (
              <button
                type="button"
                key={section}
                className={
                  activeSection === section
                    ? "active"
                    : ""
                }
                onClick={() =>
                  scrollToSection(section)
                }
              >
                <span>{number}</span>

                <strong>{label}</strong>

                <i>↗</i>
              </button>
            )
          )}
        </nav>

        <div className="velocity-mobile-footer">
          <span>VELOCITY / X132</span>
          <span>CONCEPT MACHINE / 2026</span>
        </div>
      </div>
    </>
  );
}