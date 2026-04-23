---
name: design-md
description: Skill for defining and maintaining the project's single source of truth for design patterns and tokens.
---

# Design System Specification (Lumina Protocol)
This is the single source for the project's design system, providing tokens and patterns for developers and AI agents.

## Tokens
- **Background**: `#0F172A` (Slate 900)
- **Primary Pulse**: `#818CF8` (Indigo 400)
- **Secondary Echo**: `#C084FC` (Purple 400)
- **Tertiary Echo**: `#F472B6` (Pink 400)
- **Font**: Outfit (Display), Inter (Body)
- **Border Radius**: 8px (ROUND_EIGHT)
- **Glass Stroke**: 1px white (15% opacity)

## Layout & Components
- **Modern Cards**: Semi-transparent, backdrop-blur 20px, 1px high-light border.
- **Micro-Animations**: Use `framer-motion` for "breathing" and subtle hover lift.
- **High Friction**: Massive `display-md` headers next to tiny `label-sm` metadata.

# Instructions for Usage
- Always refer to this design MD when generating or editing screens.
- Ensure all new components follow the "Lumina" aesthetic.
