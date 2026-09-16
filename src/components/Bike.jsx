import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Bike() {
  const { size } = useThree();

  const bikeRef = useRef(null);
  const turntableRef = useRef(null);

  const lastScroll = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  const scrollVelocity = useRef(0);
  const configureActive = useRef(false);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const resumeAutoRotateAt = useRef(0);

  const { scene, nodes, materials } = useGLTF(
    "/models/velocity-bike.glb"
  );

  // =========================================================
  // RESPONSIVE OUTER SCALE
  // =========================================================

  const getResponsiveModelScale = () => {
    const width = size.width;

    /*
      IMPORTANT:
      Mobile poses below are already designed specifically
      for the mobile viewport.

      So don't shrink the model to 0.56 like before.
    */

    if (width <= 390) return 0.78;
    if (width <= 480) return 0.82;
    if (width <= 600) return 0.86;

    if (width <= 700) return 0.68;
    if (width <= 900) return 0.76;
    if (width <= 1150) return 0.88;

    return 1;
  };

  const responsiveModelScale =
    getResponsiveModelScale();

  // =========================================================
  // MESH HELPER
  // =========================================================

  const getMeshesFromNode = (node) => {
    if (!node) return [];

    const meshes = [];

    if (node.isMesh) {
      meshes.push(node);
    }

    node.traverse?.((child) => {
      if (
        child.isMesh &&
        !meshes.includes(child)
      ) {
        meshes.push(child);
      }
    });

    return meshes;
  };

  // =========================================================
  // FRAME
  // wheel movement + configurator auto rotation
  // =========================================================

  useFrame((state, delta) => {
    if (typeof window === "undefined") return;
  
    // ==========================================
    // WHEEL ROTATION FROM PAGE SCROLL
    // ==========================================
  
    const currentScroll = window.scrollY;
  
    const diff =
      currentScroll - lastScroll.current;
  
    lastScroll.current = currentScroll;
  
    scrollVelocity.current +=
      (diff - scrollVelocity.current) * 0.12;
  
    scrollVelocity.current *= 0.92;
  
    const spinAmount =
      scrollVelocity.current * 0.0025;
  
    if (nodes.front_tire) {
      nodes.front_tire.rotation.x -= spinAmount;
    }
  
    if (nodes.Back_tire) {
      nodes.Back_tire.rotation.x -= spinAmount;
    }
  
    // ==========================================
    // CONFIGURE SHOWROOM AUTO ROTATION
    // ==========================================
  
    if (
      configureActive.current &&
      turntableRef.current &&
      !isDragging.current &&
      performance.now() >=
        resumeAutoRotateAt.current
    ) {
      turntableRef.current.rotation.y +=
        delta * 0.38;
    }
  });

  // =========================================================
// CONFIGURATOR — AUTO ROTATION + MOUSE/TOUCH DRAG
// =========================================================

useEffect(() => {
  const configure = document.querySelector(".configure");
const dragZone = document.querySelector(".configure-drag-zone");

if (!configure || !dragZone) return;


  let pointerId = null;

  const handlePointerDown = (e) => {
    // Controls/buttons par drag start nahi karna
    if (
      e.target.closest(
        ".configure-controls, button, a, input, select, textarea"
      )
    ) {
      return;
    }

    if (!configureActive.current) return;

    pointerId = e.pointerId;

    isDragging.current = true;
    lastPointerX.current = e.clientX;

    // Auto rotation immediately stop
    resumeAutoRotateAt.current = Infinity;

    document.body.classList.add("bike-dragging");

    configure.style.cursor = "grabbing";

    try {
      dragZone.setPointerCapture(e.pointerId);
    } catch {
      // Safari / unsupported browser fallback
    }
  };

  const handlePointerMove = (e) => {
    if (
      !isDragging.current ||
      !turntableRef.current
    ) {
      return;
    }

    if (
      pointerId !== null &&
      e.pointerId !== pointerId
    ) {
      return;
    }

    const dx =
      e.clientX - lastPointerX.current;

    turntableRef.current.rotation.y +=
      dx * 0.009;

    lastPointerX.current = e.clientX;
  };

  const stopDragging = (e) => {
    if (!isDragging.current) return;

    isDragging.current = false;

    // 700ms baad auto rotation wapas
    resumeAutoRotateAt.current =
      performance.now() + 700;

    document.body.classList.remove(
      "bike-dragging"
    );

    configure.style.cursor = "grab";

    if (
      pointerId !== null &&
      dragZone.hasPointerCapture?.(pointerId)
    ) {
      try {
        dragZone.releasePointerCapture(pointerId);
      } catch {
        // ignore
      }
    }

    pointerId = null;
  };

  dragZone.addEventListener(
    "pointerdown",
    handlePointerDown
  );
  
  dragZone.addEventListener(
    "pointermove",
    handlePointerMove
  );
  
  dragZone.addEventListener(
    "pointerup",
    stopDragging
  );
  
  dragZone.addEventListener(
    "pointercancel",
    stopDragging
  );
  
  dragZone.addEventListener(
    "lostpointercapture",
    stopDragging
  );

  return () => {
    dragZone.removeEventListener(
      "pointerdown",
      handlePointerDown
    );
  
    dragZone.removeEventListener(
      "pointermove",
      handlePointerMove
    );
  
    dragZone.removeEventListener(
      "pointerup",
      stopDragging
    );
  
    dragZone.removeEventListener(
      "pointercancel",
      stopDragging
    );
  
    dragZone.removeEventListener(
      "lostpointercapture",
      stopDragging
    );
  
    document.body.classList.remove("bike-dragging");
  };
}, []);

  // =========================================================
  // MATERIAL SETUP
  // =========================================================

  useEffect(() => {
    if (nodes.fuel_tank?.material) {
      nodes.fuel_tank.material =
        nodes.fuel_tank.material.clone();

      nodes.fuel_tank.material.color?.set(
        "#a30f1b"
      );

      nodes.fuel_tank.material.metalness =
        0.9;

      nodes.fuel_tank.material.roughness =
        0.18;

      nodes.fuel_tank.material.needsUpdate =
        true;
    }

    if (nodes.saddle?.material) {
      nodes.saddle.material =
        nodes.saddle.material.clone();

      nodes.saddle.material.color?.set(
        "#111111"
      );

      nodes.saddle.material.roughness =
        0.65;

      nodes.saddle.material.metalness =
        0.05;

      nodes.saddle.material.needsUpdate =
        true;
    }

    const settings = [
      ["tire", "#090909", 0, 0.9],

      [
        "Black Metal",
        "#161616",
        0.85,
        0.3,
      ],

      [
        "Silver",
        "#bfc3c7",
        0.95,
        0.18,
      ],

      [
        "matte silver",
        "#73777c",
        0.8,
        0.42,
      ],

      [
        "copper",
        "#9b5b36",
        0.75,
        0.32,
      ],

      [
        "plastic",
        "#121212",
        0.08,
        0.75,
      ],

      [
        "Leather",
        "#0c0c0c",
        undefined,
        0.8,
      ],

      [
        "handle",
        "#101010",
        undefined,
        0.7,
      ],

      ["red  cloth", "#5c090f"],

      ["tail light", "#8b0000"],
    ];

    settings.forEach(
      ([
        name,
        color,
        metalness,
        roughness,
      ]) => {
        const material =
          materials[name];

        if (!material) return;

        material.color?.set(color);

        if (metalness !== undefined) {
          material.metalness =
            metalness;
        }

        if (roughness !== undefined) {
          material.roughness =
            roughness;
        }

        material.needsUpdate = true;
      }
    );
  }, [nodes, materials]);

  // =========================================================
  // CONFIGURE COLOR / SURFACE / RESET
  // =========================================================

  useEffect(() => {
    const getTankMaterials = () => {
      const tankMesh =
        scene.getObjectByName(
          "fuel_tank"
        ) || nodes.fuel_tank;

      if (!tankMesh?.material) {
        return [];
      }

      return (
        Array.isArray(tankMesh.material)
          ? tankMesh.material
          : [tankMesh.material]
      ).filter(Boolean);
    };

    const changeBodyColor = (event) => {
      const color =
        event.detail?.color;

      if (!color) return;

      getTankMaterials().forEach(
        (material) => {
          if (!material?.color) return;

          const target =
            material.color.clone();

          target.set(color);

          gsap.killTweensOf(
            material.color
          );

          gsap.to(material.color, {
            r: target.r,
            g: target.g,
            b: target.b,

            duration: 0.5,

            ease: "power2.out",

            overwrite: true,

            onUpdate: () => {
              material.needsUpdate =
                true;
            },
          });
        }
      );
    };

    const changeSurface = (event) => {
      const finish =
        event.detail?.finish ||
        "gloss";

      const values =
        finish === "matte"
          ? {
              roughness: 0.62,
              metalness: 0.58,
            }
          : {
              roughness: 0.18,
              metalness: 0.9,
            };

      getTankMaterials().forEach(
        (material) => {
          if (!material) return;

          gsap.to(material, {
            roughness:
              values.roughness,

            metalness:
              values.metalness,

            duration: 0.45,

            ease: "power2.out",

            overwrite: true,

            onUpdate: () => {
              material.needsUpdate =
                true;
            },
          });
        }
      );
    };

    const resetConfiguration = () => {
      window.dispatchEvent(
        new CustomEvent(
          "velocity-bike-color",
          {
            detail: {
              color: "#a30f1b",
            },
          }
        )
      );

      window.dispatchEvent(
        new CustomEvent(
          "velocity-bike-surface",
          {
            detail: {
              finish: "gloss",
            },
          }
        )
      );
    };

    window.addEventListener(
      "velocity-bike-color",
      changeBodyColor
    );

    window.addEventListener(
      "velocity-bike-surface",
      changeSurface
    );

    window.addEventListener(
      "velocity-bike-reset",
      resetConfiguration
    );

    return () => {
      window.removeEventListener(
        "velocity-bike-color",
        changeBodyColor
      );

      window.removeEventListener(
        "velocity-bike-surface",
        changeSurface
      );

      window.removeEventListener(
        "velocity-bike-reset",
        resetConfiguration
      );
    };
  }, [scene, nodes]);

  // =========================================================
  // SCROLL CHOREOGRAPHY
  // =========================================================

  useEffect(() => {
    if (!bikeRef.current) return;

    const uniqueMeshes = (array) => [
      ...new Set(
        array.filter(Boolean)
      ),
    ];

    // =======================================================
    // EXACT ENGINEERING GROUPS
    // =======================================================

    const partGroups = {
      engine: uniqueMeshes([
        ...getMeshesFromNode(
          nodes.Engine
        ),

        ...getMeshesFromNode(
          nodes.Engine_cap
        ),
      ]),

      tank: uniqueMeshes([
        ...getMeshesFromNode(
          nodes.fuel_tank
        ),

        ...getMeshesFromNode(
          nodes.Fuel_Tank_Cap
        ),
      ]),

      suspension: uniqueMeshes([
        nodes.Circle006,
        nodes.Circle006_1,
        nodes.Spring,
        nodes.Circle039,
        nodes.Circle039_1,
        nodes.back_suspension_Bottom,
      ]),

      braking: uniqueMeshes([
        nodes.Circle013_3,
        nodes.Cube015_2,
      ]),

      exhaust: uniqueMeshes([
        nodes.Cube011_4,
      ]),

      wheels: uniqueMeshes([
        nodes.Circle013_2,
        nodes.Cube003_2,
      ]),
    };

    const allHighlightMeshes =
      uniqueMeshes(
        Object.values(
          partGroups
        ).flat()
      );

    // clone materials so highlighting one
    // part does not affect another mesh

    allHighlightMeshes.forEach(
      (mesh) => {
        if (!mesh?.material) return;

        if (
          Array.isArray(
            mesh.material
          )
        ) {
          mesh.material =
            mesh.material.map((m) =>
              m?.clone
                ? m.clone()
                : m
            );
        } else if (
          mesh.material.clone
        ) {
          mesh.material =
            mesh.material.clone();
        }
      }
    );

    const originals = new Map();

    allHighlightMeshes.forEach(
      (mesh) => {
        const meshMaterials =
          Array.isArray(
            mesh.material
          )
            ? mesh.material
            : [mesh.material];

        meshMaterials.forEach(
          (material) => {
            if (
              !material ||
              originals.has(material)
            ) {
              return;
            }

            originals.set(
              material,
              {
                emissive:
                  material.emissive?.clone?.() ??
                  null,

                emissiveIntensity:
                  material.emissiveIntensity ??
                  0,
              }
            );
          }
        );
      }
    );

    const resetHighlights = () => {
      originals.forEach(
        (original, material) => {
          if (
            material.emissive &&
            original.emissive
          ) {
            material.emissive.copy(
              original.emissive
            );
          }

          if (
            "emissiveIntensity" in
            material
          ) {
            gsap.killTweensOf(
              material,
              "emissiveIntensity"
            );

            material.emissiveIntensity =
              original.emissiveIntensity;
          }

          material.needsUpdate = true;
        }
      );
    };

    const highlightGroup = (name) => {
      resetHighlights();

      (
        partGroups[name] || []
      ).forEach((mesh) => {
        const meshMaterials =
          Array.isArray(
            mesh.material
          )
            ? mesh.material
            : [mesh.material];

        meshMaterials.forEach(
          (material) => {
            if (
              !material?.emissive
            ) {
              return;
            }

            material.emissive.set(
              "#8f101c"
            );

            gsap.to(material, {
              emissiveIntensity:
                0.42,

              duration: 0.35,

              ease: "power2.out",

              overwrite: true,
            });

            material.needsUpdate =
              true;
          }
        );
      });
    };

    // =======================================================
    // HELPERS
    // =======================================================

    const setPose = (
      position,
      rotation,
      scale,
      duration = 0.75
    ) => {
      if (!bikeRef.current) return;

      gsap.to(
        bikeRef.current.position,
        {
          ...position,

          duration,

          ease: "power2.out",

          overwrite: "auto",
        }
      );

      gsap.to(
        bikeRef.current.rotation,
        {
          ...rotation,

          duration,

          ease: "power2.out",

          overwrite: "auto",
        }
      );

      gsap.to(
        bikeRef.current.scale,
        {
          x: scale,
          y: scale,
          z: scale,

          duration,

          ease: "power2.out",

          overwrite: "auto",
        }
      );
    };

    const ctx = gsap.context(() => {
      const mm =
        gsap.matchMedia();

      // =====================================================
      // DESKTOP / TABLET
      // =====================================================

      mm.add(
        "(min-width: 601px)",
        () => {
          // PHILOSOPHY

          gsap.to(
            bikeRef.current.position,
            {
              x: 2.2,
              y: -0.7,
              z: -0.6,

              ease: "none",

              scrollTrigger: {
                trigger:
                  ".philosophy",

                start: "top 90%",

                end:
                  "center center",

                scrub: 1,
              },
            }
          );

          gsap.to(
            bikeRef.current.rotation,
            {
              x: 0,
              y: -Math.PI / 2.2,
              z: 0,

              ease: "none",

              scrollTrigger: {
                trigger:
                  ".philosophy",

                start: "top 90%",

                end:
                  "center center",

                scrub: 1,
              },
            }
          );

          gsap.to(
            bikeRef.current.scale,
            {
              x: 1.5,
              y: 1.5,
              z: 1.5,

              ease: "none",

              scrollTrigger: {
                trigger:
                  ".philosophy",

                start: "top 90%",

                end:
                  "center center",

                scrub: 1,
              },
            }
          );

          // PERFORMANCE

          const performanceTl =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  ".performance",

                start:
                  "top 100%",

                end: "top 20%",

                scrub: 1.5,
              },
            });

          performanceTl
            .fromTo(
              bikeRef.current
                .position,

              {
                x: 2.2,
                y: -0.7,
                z: -0.6,
              },

              {
                x: 1.75,
                y: -0.45,
                z: -0.15,

                ease: "none",

                immediateRender:
                  false,
              },

              0
            )

            .fromTo(
              bikeRef.current
                .rotation,

              {
                x: 0,
                y:
                  -Math.PI /
                  2.2,
                z: 0,
              },

              {
                x: 0.02,
                y:
                  -Math.PI /
                  3.8,
                z: -0.03,

                ease: "none",

                immediateRender:
                  false,
              },

              0
            )

            .fromTo(
              bikeRef.current.scale,

              {
                x: 1.5,
                y: 1.5,
                z: 1.5,
              },

              {
                x: 1.2,
                y: 1.2,
                z: 1.2,

                ease: "none",

                immediateRender:
                  false,
              },

              0
            );

          // ENGINEERING INTRO

          const intro =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  ".engineering",

                start:
                  "top 100%",

                end: "top 25%",

                scrub: 1.4,
              },
            });

          intro
            .fromTo(
              bikeRef.current
                .position,

              {
                x: 1.75,
                y: -0.45,
                z: -0.15,
              },

              {
                x: 1.45,
                y: -0.45,
                z: -0.05,

                ease: "none",

                immediateRender:
                  false,
              },

              0
            )

            .fromTo(
              bikeRef.current
                .rotation,

              {
                x: 0.02,
                y:
                  -Math.PI /
                  3.8,
                z: -0.03,
              },

              {
                x: 0,
                y:
                  -Math.PI /
                  2,
                z: 0,

                ease: "none",

                immediateRender:
                  false,
              },

              0
            )

            .fromTo(
              bikeRef.current.scale,

              {
                x: 1.2,
                y: 1.2,
                z: 1.2,
              },

              {
                x: 1.4,
                y: 1.4,
                z: 1.4,

                ease: "none",

                immediateRender:
                  false,
              },

              0
            );

          // ENGINEERING BASE

          const base =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  ".engineering-stage",

                start:
                  "top 90%",

                end: "top 40%",

                scrub: 1.2,
              },
            });

          base
            .to(
              bikeRef.current
                .position,

              {
                x: 1.9,
                y: -0.4,
                z: -0.25,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current
                .rotation,

              {
                x: 0,
                y:
                  -Math.PI /
                  2.15,
                z: 0,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current.scale,

              {
                x: 1.25,
                y: 1.25,
                z: 1.25,

                ease: "none",
              },

              0
            );

          // ENGINEERING PARTS

          const parts =
            gsap.utils.toArray(
              ".engineering-part"
            );

          const names = [
            "engine",
            "tank",
            "suspension",
            "braking",
            "exhaust",
            "wheels",
          ];

          const poses = [
            [
              {
                x: 1.85,
                y: -0.55,
                z: 0.15,
              },

              {
                x: 0.03,
                y:
                  -Math.PI /
                  2,
                z: -0.02,
              },

              1.52,
            ],

            [
              {
                x: 1.9,
                y: -0.25,
                z: 0.05,
              },

              {
                x: -0.04,
                y:
                  -Math.PI /
                  2.35,
                z: 0,
              },

              1.45,
            ],

            [
              {
                x: 1.65,
                y: -0.42,
                z: -0.1,
              },

              {
                x: 0.02,
                y:
                  -Math.PI /
                  2.75,
                z: -0.02,
              },

              1.42,
            ],

            [
              {
                x: 1.48,
                y: -0.55,
                z: 0.05,
              },

              {
                x: 0.03,
                y:
                  -Math.PI /
                  3,
                z: -0.03,
              },

              1.5,
            ],

            [
              {
                x: 1.85,
                y: -0.48,
                z: -0.05,
              },

              {
                x: 0.02,
                y:
                  Math.PI /
                  2.15,
                z: 0.01,
              },

              1.5,
            ],

            [
              {
                x: 1.72,
                y: -0.6,
                z: -0.15,
              },

              {
                x: 0.01,
                y:
                  -Math.PI /
                  2.3,
                z: 0,
              },

              1.35,
            ],
          ];

          const activate = (i) => {
            const [p, r, s] =
              poses[i] || [];

            if (!p) return;

            setPose(p, r, s);

            highlightGroup(
              names[i]
            );
          };

          parts.forEach(
            (part, i) => {
              ScrollTrigger.create({
                trigger: part,

                start:
                  "top 58%",

                end:
                  "bottom 42%",

                onEnter: () =>
                  activate(i),

                onEnterBack: () =>
                  activate(i),

                onLeave:
                  resetHighlights,

                onLeaveBack:
                  resetHighlights,
              });
            }
          );

          // SPECIFICATIONS

          const specs =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  ".specifications",

                start:
                  "top 100%",

                end: "top 35%",

                scrub: 1.6,

                onEnter: () => {
                  resetHighlights();

                  bikeRef.current.visible =
                    true;
                },

                onEnterBack:
                  () => {
                    resetHighlights();

                    bikeRef.current.visible =
                      true;
                  },
              },
            });

          specs
            .to(
              bikeRef.current
                .position,

              {
                x: 1,
                y: -0.75,
                z: 0.35,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current
                .rotation,

              {
                x: 0,
                y: 0.5,
                z: 0,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current.scale,

              {
                x: 1.55,
                y: 1.55,
                z: 1.55,

                ease: "none",
              },

              0
            );

          // CONFIGURE

          const conf =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  ".configure",

                start:
                  "top 100%",

                end: "top 30%",

                scrub: 1.5,
              },
            });

          conf
            .fromTo(
              bikeRef.current
                .position,

              {
                x: 1,
                y: -0.75,
                z: 0.35,
              },

              {
                x: 0,
                y: -0.82,
                z: 0.15,

                ease: "none",

                immediateRender:
                  false,
              },

              0
            )

            .fromTo(
              bikeRef.current
                .rotation,

              {
                x: 0,
                y: 0.5,
                z: 0,
              },

              {
                x: 0,
                y: 0,
                z: 0,

                ease: "none",

                immediateRender:
                  false,
              },

              0
            )

            .fromTo(
              bikeRef.current.scale,

              {
                x: 1.55,
                y: 1.55,
                z: 1.55,
              },

              {
                x: 1.9,
                y: 1.9,
                z: 1.9,

                ease: "none",

                immediateRender:
                  false,
              },

              0
            );
        }
      );

      // =====================================================
      // MOBILE — COMPLETELY SEPARATE CHOREOGRAPHY
      // =====================================================

      mm.add(
        "(max-width: 600px)",
        () => {
          /*
            Canvas camera stays fixed.

            The Y coordinates below correspond to
            the empty model slots we create in CSS.
          */

          // =================================================
          // HOME
          // text upper half / bike lower half
          // =================================================

          gsap.set(
            bikeRef.current.position,
            {
              x: 0,
              y: -0.95,
              z: 0.15,
            }
          );

          gsap.set(
            bikeRef.current.rotation,
            {
              x: 0.02,
              y: -0.7,
              z: -0.015,
            }
          );

          gsap.set(
            bikeRef.current.scale,
            {
              x: 1.42,
              y: 1.42,
              z: 1.42,
            }
          );

          // =================================================
          // PHILOSOPHY
          // lower centered / more side-on
          // =================================================

          const philosophyMobile =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  ".philosophy",

                start:
                  "top 90%",

                end:
                  "top 25%",

                scrub: 1.1,
              },
            });

          philosophyMobile
            .to(
              bikeRef.current
                .position,

              {
                x: 0,
                y: -1.0,
                z: -0.05,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current
                .rotation,

              {
                x: 0,
                y:
                  -Math.PI /
                  2.25,
                z: 0,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current.scale,

              {
                x: 1.34,
                y: 1.34,
                z: 1.34,

                ease: "none",
              },

              0
            );

          // =================================================
          // PERFORMANCE
          // bike centered between heading and stats
          // =================================================

          const performanceMobile =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  ".performance",

                start:
                  "top 92%",

                end:
                  "top 25%",

                scrub: 1.15,
              },
            });

          performanceMobile
            .to(
              bikeRef.current
                .position,

              {
                x: 0,
                y: -0.28,
                z: 0,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current
                .rotation,

              {
                x: 0.02,
                y: -0.82,
                z: -0.02,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current.scale,

              {
                x: 1.26,
                y: 1.26,
                z: 1.26,

                ease: "none",
              },

              0
            );

          // =================================================
          // ENGINEERING INTRO
          // =================================================

          const engineeringMobile =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  ".engineering-intro",

                start:
                  "top 90%",

                end:
                  "top 20%",

                scrub: 1.15,
              },
            });

          engineeringMobile
            .to(
              bikeRef.current
                .position,

              {
                x: 0,
                y: -0.92,
                z: -0.08,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current
                .rotation,

              {
                x: 0.01,
                y:
                  -Math.PI /
                  2,
                z: 0,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current.scale,

              {
                x: 1.28,
                y: 1.28,
                z: 1.28,

                ease: "none",
              },

              0
            );

          // =================================================
          // MACHINE ANATOMY MOBILE
          // =================================================

          const mobileParts =
            gsap.utils.toArray(
              ".engineering-part"
            );

          const mobileNames = [
            "engine",
            "tank",
            "suspension",
            "braking",
            "exhaust",
            "wheels",
          ];

          /*
            Same centered location.
            Rotation changes per component so highlighted
            component can actually be seen.
          */

          const mobilePoses = [
            // ENGINE
            [
              {
                x: 0,
                y: -0.63,
                z: 0.08,
              },

              {
                x: 0.03,
                y:
                  -Math.PI /
                  2.05,
                z: -0.02,
              },

              1.24,
            ],

            // FUEL TANK
            [
              {
                x: 0,
                y: -0.55,
                z: 0.05,
              },

              {
                x: -0.03,
                y:
                  -Math.PI /
                  2.5,
                z: 0,
              },

              1.25,
            ],

            // SUSPENSION
            [
              {
                x: 0,
                y: -0.62,
                z: -0.05,
              },

              {
                x: 0.02,
                y:
                  -Math.PI /
                  2.7,
                z: -0.02,
              },

              1.22,
            ],

            // BRAKING
            [
              {
                x: 0,
                y: -0.67,
                z: 0.08,
              },

              {
                x: 0.03,
                y:
                  -Math.PI /
                  3,
                z: -0.03,
              },

              1.23,
            ],

            // EXHAUST
            [
              {
                x: 0,
                y: -0.62,
                z: 0,
              },

              {
                x: 0.02,
                y:
                  Math.PI /
                  2.15,
                z: 0.01,
              },

              1.23,
            ],

            // WHEELS
            [
              {
                x: 0,
                y: -0.66,
                z: -0.08,
              },

              {
                x: 0.01,
                y:
                  -Math.PI /
                  2.3,
                z: 0,
              },

              1.18,
            ],
          ];

          const activateMobilePart =
            (index) => {
              const [p, r, s] =
                mobilePoses[index] ||
                [];

              if (!p) return;

              bikeRef.current.visible =
                true;

              setPose(
                p,
                r,
                s,
                0.55
              );

              highlightGroup(
                mobileNames[index]
              );
            };

          mobileParts.forEach(
            (part, index) => {
              ScrollTrigger.create({
                trigger: part,

                /*
                  Active once heading/description are
                  near upper viewport.
                */

                start:
                  "top 42%",

                end:
                  "bottom 42%",

                onEnter: () =>
                  activateMobilePart(
                    index
                  ),

                onEnterBack: () =>
                  activateMobilePart(
                    index
                  ),

                onLeave:
                  resetHighlights,

                onLeaveBack:
                  resetHighlights,
              });
            }
          );

          // =================================================
          // SPECIFICATIONS MOBILE
          // centered bike in reserved slot
          // =================================================

          const specificationsMobile =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  ".specifications",

                start:
                  "top 90%",

                end:
                  "top 28%",

                scrub: 1.15,

                onEnter: () => {
                  resetHighlights();

                  bikeRef.current.visible =
                    true;
                },

                onEnterBack: () => {
                  resetHighlights();

                  bikeRef.current.visible =
                    true;
                },
              },
            });

          specificationsMobile
            .to(
              bikeRef.current
                .position,

              {
                x: 0,
                y: -0.16,
                z: 0.08,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current
                .rotation,

              {
                x: 0.015,
                y: 0.72,
                z: 0,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current.scale,

              {
                x: 1.22,
                y: 1.22,
                z: 1.22,

                ease: "none",
              },

              0
            );

          // =================================================
          // CONFIGURE MOBILE
          // centered but smaller than old version
          // =================================================

          const configureMobile =
            gsap.timeline({
              scrollTrigger: {
                trigger:
                  ".configure",

                start:
                  "top 90%",

                end:
                  "top 25%",

                scrub: 1.15,
              },
            });

          configureMobile
            .to(
              bikeRef.current
                .position,

              {
                x: 0,
                y: -0.38,
                z: 0.08,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current
                .rotation,

              {
                x: 0,
                y: 0,
                z: 0,

                ease: "none",
              },

              0
            )

            .to(
              bikeRef.current.scale,

              {
                x: 1.38,
                y: 1.38,
                z: 1.38,

                ease: "none",
              },

              0
            );
        }
      );

// =========================================================
// CONFIGURE — AUTO ROTATION ACTIVE WINDOW
// =========================================================

const configureSection =
  document.querySelector(".configure");

if (configureSection) {
  ScrollTrigger.create({
    trigger: configureSection,

    // Rotation ab bahut jaldi start nahi hogi
    start: "top 55%",

    // Configure ko almost leave karne tak active rahegi
    end: "bottom 12%",

    onEnter: () => {
      if (!bikeRef.current) return;

      configureActive.current = true;
      isDragging.current = false;

      resumeAutoRotateAt.current =
        performance.now();
    },

    onEnterBack: () => {
      if (!bikeRef.current) return;

      configureActive.current = true;
      isDragging.current = false;

      resumeAutoRotateAt.current =
        performance.now();
    },

    onLeave: () => {
      configureActive.current = false;
      isDragging.current = false;

      document.body.classList.remove(
        "bike-dragging"
      );
    },

    onLeaveBack: () => {
      configureActive.current = false;
      isDragging.current = false;

      document.body.classList.remove(
        "bike-dragging"
      );
    },
  });
}
      // =====================================================
      // FINAL SECTION
      // =====================================================

      const finalSection =
        document.querySelector(
          ".final-section"
        );

      if (finalSection) {
        const finalExit =
          gsap.timeline({
            scrollTrigger: {
              trigger:
                finalSection,

              start:
                "top 95%",

              end:
                "top 28%",

              scrub: 1.4,

              onEnter: () => {
                configureActive.current =
                  false;

                isDragging.current =
                  false;

                document.body.style.cursor =
                  "";

                document.body.classList.remove(
                  "bike-dragging"
                );

                bikeRef.current.visible =
                  true;
              },

              onEnterBack: () => {
                bikeRef.current.visible =
                  true;
              },

              onLeave: () => {
                bikeRef.current.visible =
                  false;
              },

              onLeaveBack: () => {
                bikeRef.current.visible =
                  true;
              },
            },
          });

        finalExit
          .to(
            bikeRef.current.position,
            {
              x: 0.4,
              y: -0.55,
              z: -1.5,

              ease: "none",
            },
            0
          )

          .to(
            bikeRef.current.rotation,
            {
              x: 0.03,
              y: -0.75,
              z: -0.02,

              ease: "none",
            },
            0
          )

          .to(
            bikeRef.current.scale,
            {
              x: 0.72,
              y: 0.72,
              z: 0.72,

              ease: "none",
            },
            0
          );
      }

      return () => {
        mm.revert();
      };
    });

    const refreshId =
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

    return () => {
      cancelAnimationFrame(
        refreshId
      );

      resetHighlights();

      configureActive.current =
        false;

      isDragging.current = false;

      document.body.style.cursor = "";

      document.body.classList.remove(
        "bike-dragging"
      );

      ctx.revert();
    };
  }, [scene, nodes]);

  // =========================================================
  // MODEL
  // =========================================================

  return (
    <group
      scale={[
        responsiveModelScale,
        responsiveModelScale,
        responsiveModelScale,
      ]}
    >
      <group
        ref={bikeRef}
        scale={[1.8, 1.8, 1.8]}
        position={[1.35, -0.9, 0]}
        rotation={[
          0,
          -Math.PI / 4,
          0,
        ]}
      >
        <group ref={turntableRef}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(
  "/models/velocity-bike.glb"
);