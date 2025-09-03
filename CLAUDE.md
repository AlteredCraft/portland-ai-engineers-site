# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portland AI Engineers community website - a static HTML/CSS/JavaScript site showcasing the community, events, sponsorship opportunities, and presentation guidelines.

## Architecture & Structure

### Static Site Architecture
- Pure HTML/CSS/JavaScript - no build process or framework dependencies
- Bootstrap 5 for responsive layout and components
- Static files served directly - optimized for GitHub Pages deployment
- All pages share common navigation and footer structure

### Key Files
- `index.html` - Homepage with event listings and community overview
- `about.html` - Mission, values, and community principles
- `sponsorship.html` - Sponsorship tiers and benefits
- `present.html` - Guidelines for presenting at meetups
- `css/styles.css` - Custom CSS with CSS variables for theming
- `js/main.js` - Vanilla JavaScript for interactions (smooth scrolling, animations, navigation)

## Development Commands

### Run Local Development Server

```bash
# Using Python (with uv)
uv run python -m http.server 8000

# Using Node.js (requires http-server installed globally)
http-server -p 8000

# Then navigate to http://localhost:8000
```

### Deploy to GitHub Pages
Push changes to main branch - GitHub Pages automatically deploys from root directory.

## Code Patterns & Conventions

### HTML Structure
- Each page follows Bootstrap 5 structure with fixed navbar
- Sections use semantic HTML5 elements
- Common elements (navbar, footer) must be updated across all HTML files

### CSS Approach
- CSS variables defined in `:root` for consistent theming
- Gradient classes for visual elements
- Responsive utilities from Bootstrap enhanced with custom styles
- Animation classes added via JavaScript for scroll effects

### JavaScript Patterns
- All code wrapped in DOMContentLoaded listener
- Intersection Observer API for scroll animations
- Throttled scroll event handlers for performance
- No external JS dependencies beyond Bootstrap