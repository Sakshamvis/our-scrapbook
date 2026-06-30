# Our Digital Scrapbook

A premium, highly interactive, and romantic digital scrapbook designed as a special gift. This application is built with a focus on immersive UX, smooth animations, and premium visual aesthetics to simulate a realistic memory book.

## Tech Stack

*   **React (Vite)**: Core framework for building a fast, interactive single-page application.
*   **Tailwind CSS**: Utility-first CSS framework for custom, premium styling and themes.
*   **Framer Motion**: For elegant, fluid micro-interactions and page transitions.
*   **React Icons**: Comprehensive iconography for player controls, navigation, and heart decorations.
*   **Lenis**: Modern library for ultra-smooth inertia scrolling experiences.
*   **React Router DOM**: Standard router for declarative page navigation.
*   **tsParticles**: Lightweight particle effects engine to power floating romantic hearts and ambient sparkles.
*   **react-pageflip**: A realistic book page-turning simulation library.
*   **GSAP (GreenSock)**: Professional-grade animation library for complex timelines and SVG effects.
*   **clsx**: Utility for conditional CSS class joining.
*   **Oxlint**: Ultra-fast linting tool to maintain clean, error-free code.

## Folder Structure

The project follows a modular, scalable architecture organized as follows:

```
our-scrapbook/
├── public/                  # Static assets accessible directly
│   ├── photos/              # Personal photographs
│   ├── stickers/            # Digital decorative stickers/overlays
│   ├── textures/            # Paper, leather, or foil overlay textures
│   └── music/               # Background audio tracks
├── src/
│   ├── assets/              # React asset files (e.g., SVG icons)
│   ├── components/          # Reusable React components
│   │   ├── Book/            # pageflip book-related layout components
│   │   ├── Cover/           # Opening cover design
│   │   ├── Gallery/         # Photo gallery grids
│   │   ├── Timeline/        # Chronological relationship memories
│   │   ├── Letter/          # Interactive handwriting letters
│   │   ├── Music/           # Background music control widgets
│   │   ├── FloatingHearts/  # Canvas-based particle heart animations
│   │   ├── Loader/          # Custom heartbeat/premium load states
│   │   └── UI/              # Tiny reusable buttons, cards, wrappers
│   ├── data/                # Static data configurations
│   │   ├── gallery.js       # Gallery image metadata
│   │   ├── memories.js      # Timeline event items
│   │   ├── reasons.js       # List of reasons of love/appreciation
│   │   └── futurePlans.js   # Bucket list/future goals
│   ├── hooks/               # Custom React hooks (scroll, audio, etc.)
│   ├── pages/               # Top-level page views (Home.jsx)
│   ├── styles/              # Global and utility stylesheet styles
│   │   ├── globals.css      # Font loadings, resets, variables
│   │   └── scrapbook.css    # Custom component layouts & decorations
│   ├── utils/               # Helper utilities (formatters, calculations)
│   ├── App.jsx              # Main routing and App container
│   └── main.jsx             # Mounting script
├── package.json             # NPM package scripts and dependencies
└── vite.config.js           # Vite development server and plugin configuration
```

## Future Milestones

1.  **Phase 1: Project Architecture & Foundations** (Current)
    *   Set up build pipelines and package dependencies.
    *   Construct routing, folder structures, and custom font variables.
    *   Define Tailwind custom color theme config.
2.  **Phase 2: Ambient Atmosphere & Assets Ingestion**
    *   Implement Lenis smooth scrolling and ambient floating hearts with tsParticles.
    *   Set up background audio controller with play/pause and volume controls.
    *   Import and arrange image/sticker assets.
3.  **Phase 3: Interactive Page Flip Scrapbook**
    *   Configure `react-pageflip` to render sheets as realistic book pages.
    *   Integrate memory timeline grids and customized visual layouts.
4.  **Phase 4: Custom CSS Lettering & Premium Animations**
    *   Create a handwritten letter animation with responsive text elements.
    *   Introduce GSAP scroll-triggered reveal animations.
5.  **Phase 5: User Acceptance & Final Polishing**
    *   Incorporate feedback, optimize media sizes, and ensure zero-delay performance.
