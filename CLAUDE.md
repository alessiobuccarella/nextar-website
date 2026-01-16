# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nextar is a single-page marketing website for a digital communications agency. Built with React 19, Vite 7, and Tailwind CSS 3.

## Development Commands

```bash
npm run dev      # Start development server (Vite with HMR)
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Architecture

This is a single-page application with all content in one component:

- `src/App.jsx` - The entire website as a single `NextarWebsite` component (~600 lines)
- `src/main.jsx` - React entry point with StrictMode
- `src/index.css` - Tailwind imports and custom scroll animation

### Key Libraries
- **AOS (Animate On Scroll)** - Used for scroll-triggered animations, initialized in App.jsx useEffect
- **lucide-react** - Icon library (Menu, X, Check, Star, ArrowRight, etc.)

### Styling
- Tailwind CSS with default configuration
- Orange/zinc color scheme with gradient accents
- All styling is inline via Tailwind utility classes
- Custom CSS animation for testimonials carousel in index.css

### Component Structure
App.jsx contains these sections (in order):
1. Header with fixed navbar and mobile menu
2. Hero section with video placeholder and stats
3. Services grid (6 cards)
4. Process/workflow steps (4 steps)
5. Pricing plans (3 tiers)
6. Testimonials carousel (auto-scrolling)
7. Contact CTA section
8. Footer

### Navigation
Navigation uses smooth scroll via `scrollToSection()` function that targets section IDs: `home`, `servizi`, `processo`, `prezzi`, `recensioni`, `contatti`.

## Configuration Files

- `vite.config.js` - Vite with @vitejs/plugin-react
- `tailwind.config.js` - Default Tailwind scanning index.html and src/**/*.{js,ts,jsx,tsx}
- `postcss.config.js` - Tailwind + Autoprefixer
- `eslint.config.js` - ESLint 9 flat config with react-hooks and react-refresh plugins