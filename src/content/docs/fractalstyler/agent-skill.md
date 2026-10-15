---
title: "Agent skill"
description: "The rules a coding agent follows to compose with fractalstyler."
source: "packages/fractalstyler/skills/fractalstyler/SKILL.md"
---
# Fractalstyler Styling System & Style Guard

Operate within the `fractalstyler` registry as a **closed world**. Never invent a class or styling definition, even when the requested design is not immediately obvious.

## Mandatory Agent Workflow

1. **Consult the Registry First**:
   Read `docs/REGISTRY.api.md` or `references/fractals.md`. Search for existing utility classes, container bases, layouts, and shells before writing any markup.
2. **Review Recipes**:
   Check `data/recipes.json` for verified canonical compositions (segmented controls, search input bars, metrics grids, action rows, switches, modals).
3. **Compose Only from Verified Classes**:
   - Containers: `.box` (column), `.row` (horizontal), `.grid` (CSS grid).
   - Physical Alignment: **modifiers, never standalone** — they only resolve on a container: `.row.xcenter`, `.box.ycenter`, `.grid.xbetween`. There is no bare `.xcenter`.
   - Dimensions & Spacing: `.gap-*`/`.rgap-*`/`.cgap-*`, `.pad-*`, `.px-*` (inline) / `.py-*` (block) / `.pt-*` `.pr-*` `.pb-*` `.pl-*`, `.mar-*`/`.mx-*`/`.my-*`, `.wfull`/`.hfull`, `.h-sm`…`.h-lg`. **There is no `.pad-x-*`, `.pad-y-*` or `.w-*`.**
   - Visuals: `.bg-main`, `.bg-surface`, `.bg-panel`, `.bg-sunken`, `.bg-raised`, `.bg-extra`, `.bg-success`/`.bg-warning`/`.bg-danger`/`.bg-info`, `.border` (+`-subtle`/`-strong`), per-side `.bt`/`.br`/`.bb`/`.bl` (+`-str`/`-sub`), `.radius-*`, `.shadow-*`. **There is no `.border-top`/`.border-bottom`.**
   - Ink: `.orange1`…`.orange6`, `.yellow1`…`.yellow4`, `.green1`…`.green4`.
   - Typography: `.text-xs` .. `.text-5xl`, `.weight-300`…`.weight-800`, `.truncate`.
   - Interactions: `button` (or the equivalent `.button` class), `a.btn`, `.input`, `.select`, `.button-group`, `.split-button`, with `data-variant` (`primary`, `secondary`, `soft`, `outline`, `ghost`, `link`, `destructive`, `iconbox`), `data-shape` (`square`, `modern`, `curved`, `round`), `data-size` (`sm`, `md`, `bs`, `lg`), and `data-pad` (`.card` only: `sm`, `md`, `bs`, `lg`, `xl`).
4. **Attribute axes are not universal** — check before writing one:
   - `.card` supports `data-variant`, `data-shape` (`modern`/`curved`/`round` — no `square`) and `data-pad`. It has **no `data-size`**.
   - `.input` / `.select` support `primary`, `secondary`, `soft`, `outline`, `ghost` only — no `link`, no `destructive`.
   - `a.btn` supports every variant except `iconbox`/`icon`; `button` / `.button` support all of them.
   - `iconbox` is button-only, and carries extra `data-size` rungs: `icon-md`, `icon-bs`, `icon-lg`.
   - `registry.json` files the whole button tree under the **bare element** name `"button"`. `.button[data-variant="ghost"]` therefore has no row of its own — look up `button[data-variant="ghost"]`.
5. **Hard Boundaries**:
   - **NO in-component `<style>` blocks**: Components must remain pure markup and logic.
   - **NO inline `style="..."` attributes**: Inline styles are unconstrained ad-hoc CSS.
   - **NO raw hex colors (`#hex`)**: Every color must resolve through semantic tokens (`var(--bg)`, `var(--text-primary)`, `var(--border)`, etc.).
   - **NO arbitrary pixel dimensions (>2px)**: Literal pixels bypass the dimension ladder. Only 1-2px (borders, hairlines) may be literal.
   - **NO child combinators**: Selectors are plain descendants (`> *` is forbidden).
   - **Icons come from `fractalicons`**: never inline SVG or unicode glyphs.
6. **Mandatory Verification**:
   Before claiming task completion, always execute:
   ```bash
   pnpm lint
   pnpm check
   ```
   Both checks must pass with 0 errors.

## Global presets

The presets runtime (`presets.svelte.ts` + `PresetControls.svelte`) writes
`data-*` attributes onto live markup and never overrides attributes the markup
already declares. `data-pad` is scoped to `.card`; shape sweeps `button`,
`input`, `select`, `.card` and `a.btn`, size sweeps the same list minus `.card`,
and `data-variant` is class-qualified to `input.input`, `select.select`,
`button.button`, `a.btn` plus `.card`.

Prefer explicit attributes in authored markup. The preset layer is for the
`data-*` values you do not want to hand-write, and for driving a running app.

## Progressive Discovery Index

| Styling Task | File to Inspect | Responsibility |
|:---|:---|:---|
| Active files and cascade order | `src/lib/styles/index.sass` | Master composition contract. |
| Colors, semantic tokens, dark mode | `src/lib/styles/_00_tokens.sass` | Design token source of truth. |
| Global resets and typography defaults | `src/lib/styles/_01_base.sass` | Low-specificity element defaults. |
| Spacing, gaps, padding, dimensions | `src/lib/styles/_02_dimensions.sass` | L1 spacing & dimension ladders. |
| Text sizes, roles, weights, tracking | `src/lib/styles/_03_typography.sass` | L5 typography primitives, roles, and modifiers. |
| Flex/grid containers & axis alignment | `src/lib/styles/_04_containers.sass` | L2 structural layout containers. |
| Macro grid layouts & responsive columns | `src/lib/styles/_05_layouts.sass` | L3 column stepping (.grid-1..6). |
| Page frames, headers, sidebars, rails | `src/lib/styles/_06_shells.sass` | L4 application shell hierarchy. |
| Buttons, links, pills, states | `src/lib/styles/_07_interactions.sass` | L5 orthogonal interactive axes. |
| Backgrounds, ink, shadows, borders | `src/lib/styles/_08_visuals.sass` | L5 surface styling & decorative treatments. |
| Project-specific third-party overrides | `src/lib/styles/_09_own.sass` | Sanctioned extension point. |

## Handling Coverage Gaps

If a visual requirement cannot be expressed with existing canonical classes:
1. Do NOT write an ad-hoc inline style or component `<style>` block.
2. Check if an existing token in `_00_tokens.sass` can be composed.
3. If genuine new utility or shell class is required, add it to the designated layer partial in `src/lib/styles` with a trailing `// description` comment and run `pnpm registry`.
4. If it is a project-specific extension, declare it in `_09_own.sass`.
