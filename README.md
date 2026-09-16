# VELOCITY X132

### An Interactive 3D Motorcycle Experience

**VELOCITY X132** is a cinematic, interactive motorcycle showcase built for the web. The project combines real-time 3D rendering, scroll-driven storytelling, responsive layouts, and an interactive motorcycle configurator to create an immersive product experience.

Rather than presenting the motorcycle as a traditional static product page, VELOCITY X132 treats the machine as the central part of the interface. The motorcycle moves, changes orientation, reacts to different sections of the website, and becomes fully interactive inside the configurator.

> **PURE MOTION.**
> Engineered for those who refuse to stand still.

---

## ✦ Project Overview

VELOCITY X132 is designed as a concept motorcycle experience focused on three core ideas:

* **Performance**
* **Engineering**
* **Interaction**

A persistent 3D motorcycle exists across the website and transitions between different positions, scales, and viewing angles as the user explores the page.

The experience includes dedicated sections for philosophy, performance, engineering, technical specifications, customization, and the final brand presentation.

---

## ✦ Key Features

### Interactive 3D Motorcycle

A detailed GLB motorcycle model is rendered directly inside the browser using Three.js and React Three Fiber.

The motorcycle dynamically changes:

* Position
* Rotation
* Scale
* Viewing angle
* Material appearance

based on the current section and user interaction.

### Scroll-Driven Experience

GSAP and ScrollTrigger power the cinematic transitions throughout the website.

Scrolling controls:

* Motorcycle positioning
* Motorcycle orientation
* Section transitions
* Heading reveals
* Specification counters
* Engineering sequences
* Visual effects
* Showroom transitions

This creates a continuous experience rather than a collection of disconnected sections.

### Motorcycle Configurator

The **Configure** section transforms the motorcycle into an interactive showroom model.

Users can:

* Rotate the motorcycle automatically
* Drag the motorcycle manually
* Rotate using mouse input on desktop
* Rotate using touch gestures on mobile
* Select different body colors
* Switch between **Gloss** and **Matte** finishes
* Reset the motorcycle configuration

Available paint options include:

* Crimson Red
* Midnight Black
* Arctic Silver
* Racing Blue

### Responsive 3D Experience

The website has dedicated responsive behavior for desktop, tablet, and mobile devices.

The motorcycle receives different:

* Scale values
* Positions
* Camera framing
* Rotations
* Section layouts

depending on the viewport.

The mobile experience is therefore designed specifically for smaller screens rather than simply scaling down the desktop layout.

### Local Environment Lighting

The 3D scene uses a locally hosted EXR studio environment instead of relying on an external environment asset.

This improves reliability and prevents external HDR/EXR requests from breaking the WebGL scene.

### Performance Data

The X132 concept machine is presented with specifications including:

| Specification  |    Value |
| -------------- | -------: |
| Engine         |   998 CC |
| Maximum Power  |   215 HP |
| Maximum Torque |   113 NM |
| Top Speed      | 320 KM/H |
| Dry Weight     |   198 KG |
| Transmission   |  6-Speed |
| 0–100 KM/H     |  3.2 SEC |

---

# Tech Stack

## Frontend

**React**

Used for the component architecture, UI state, configurator controls, and overall application structure.

**Vite**

Used as the development server and production build system.

---

## 3D & WebGL

**Three.js**

Provides the underlying real-time 3D rendering and WebGL capabilities.

**React Three Fiber**

React renderer for Three.js used to build and control the 3D scene declaratively.

**React Three Drei**

Provides useful helpers for the Three.js environment, including environment lighting and contact shadows.

**GLTF / GLB**

The motorcycle is loaded as a `.glb` 3D asset.

**EXR Environment Map**

A local high-dynamic-range studio environment is used for reflections and realistic material lighting.

---

## Animation

**GSAP**

Used for high-performance interface and object animations.

**GSAP ScrollTrigger**

Connects animations and motorcycle transformations directly to scroll progress.

It powers many of the section transitions, text reveals, counters, and scroll-driven 3D sequences.

---

## Smooth Scrolling

**Lenis**

Provides smooth scrolling while remaining synchronized with GSAP ScrollTrigger.

---

## Styling

**CSS3**

The visual system is built using custom CSS with:

* Responsive media queries
* Fluid typography
* CSS Grid
* Flexbox
* Gradients
* Custom showroom elements
* Mobile-specific layouts
* Interactive states
* Responsive viewport units

---

## Fonts

The interface uses:

* **Space Grotesk**
* **Inter**

to maintain the minimal, technical and performance-focused visual language of the project.

---

# Project Structure

```text
velocity-x132/
│
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg
│   │
│   ├── models/
│   │   └── velocity-bike.glb
│   │
│   └── environments/
│       └── studio_small_03_1k.exr
│
├── src/
│   ├── components/
│   │   ├── Bike.jsx
│   │   ├── Scene.jsx
│   │   ├── Navbar.jsx
│   │   ├── Specifications.jsx
│   │   └── Configure.jsx
│   │
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── Philosophy.jsx
│   │   ├── Performance.jsx
│   │   ├── Engineering.jsx
│   │   └── Final.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── Global.css
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# Website Sections

### 00 / Home

Introduces the VELOCITY X132 through the **PURE MOTION** hero experience.

### 01 / Philosophy

Presents the design philosophy behind the concept machine.

### 02 / Performance

Displays the major performance figures through animated numerical data and 3D presentation.

### 03 / Engineering

Explores the machine from an engineering perspective using scroll-driven sequences and changing motorcycle views.

### 04 / Specifications

Presents the technical data of the X132 in a structured specification interface.

### 05 / Configure

Transforms the experience into an interactive digital showroom where the motorcycle can be rotated and customized.

### 06 / Velocity

Concludes the experience with the final VELOCITY X132 brand presentation.

---

# Getting Started

Clone the repository:

```bash
git clone https://github.com/hrsshhh17/velocity-x132.git
```

Enter the project:

```bash
cd velocity-x132
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL provided by Vite.

---

# Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files will be available inside:

```text
dist/
```

---

# Deployment

The project is designed to be deployed on **Vercel**.

With GitHub integration enabled, new pushes to the production branch can automatically trigger a new deployment.

Typical deployment configuration:

```text
Framework Preset : Vite
Build Command    : npm run build
Output Directory : dist
Install Command  : npm install
```

---

# Responsive Support

VELOCITY X132 is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

The 3D motorcycle presentation and interface layout adapt according to available screen space.

Touch interaction is supported inside the motorcycle configurator for mobile devices.

---

# Design Direction

The interface follows a minimal automotive design language inspired by modern performance-machine presentations.

The visual system uses:

* Deep black backgrounds
* Muted white typography
* Crimson accents
* Large editorial headings
* Technical labels
* Minimal interface elements
* Studio-style motorcycle lighting
* Motion-driven storytelling

The objective is to keep the motorcycle as the visual focus throughout the experience.

---

# Author

**Harsh Shukla**

B.Tech — Computer Science & Engineering

Full Stack / MERN Stack Developer

GitHub: **@hrsshhh17**

---

## VELOCITY / X132

**Engineered without compromise.
Defined by motion.**

`CONCEPT MACHINE / 2026`
