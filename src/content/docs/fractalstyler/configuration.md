---
title: "Configuration API"
description: "Every Sass variable, runtime token, data-* axis and class family in the system."
source: "packages/fractalstyler/docs/references/configurations-api.md"
---
# Configurations API — every variable, token, attribute and class in the system

> This document is the *what*: every Sass configuration variable in
> `_00_config.sass`, every CSS custom property in `_00_tokens.sass`, every
> `data-*` axis, and every class family the loops and partials emit — with
> values, defaults, consumers, and who reads what.
>
> Sources read verbatim:
> `_00_config.sass`, `_00_fonts.sass`, `_00_tokens.sass`, `_01_base.sass`,
> `_02_dimensions.sass`, `_03_typography.sass`, `_04_containers.sass`,
> `_05_layouts.sass`, `_06_shells.sass`, `_07_interactions.sass`,
> `_08_visuals.sass`, `_09_own.sass`, `index.sass`.
> `colorpacks.sass` and `themeplates.sass` are raw Sass variable palettes
> (`$green90`-style ladder constants); they emit no classes and no tokens and
> are intentionally not part of this API.
>
> Three kinds of API — do not mix them:
>
> | Kind | Example | Set where / when |
> |---|---|---|
> | **A. Sass source variables** | `$steps`, `$gap-families`, `$frame-ratios`, `$shadow-specs` | `src/lib/styles/_00_config.sass` — edit in place, then recompile |
> | **B. Runtime CSS props + `data-*` modes** | `--space-md`, `data-mode="dark"`, `data-variant="ghost"` | In the browser, live, no recompile |
> | **C. Classes** (loop families + partial classes) | `.gap-md`, `.grid-4`, `button[data-variant="ghost"]` | Baked at compile time from A; themed at runtime by B |

---

## 1. A — Sass configuration (`_00_config.sass`)

The whole compile-time surface is seven variables. They are *not* `!default`
and have no `with (…)` override: they are the system's own config, edited in
place. Everything loop-generated (the entire L1 space ladder, the L3 frames,
the `--shade-*` elevation tokens) is expanded from them.

| Variable | Value | Consumed by | Effect of a change |
|---|---|---|---|
| `$steps` | `('xs' 'sm' 'md' 'bs' 'lg' 'xl' '2xl' '3xl')` — 8 steps | `_02_dimensions.sass` (gap/pad/mar loops), `scripts/update-registry.js` | Every space family is crossed with this list: a new step emits `.gap-…`/`.pad-…`/`.mar-…` rows for all 17 families — **only if** a matching `--space-<step>` token exists in `_00_tokens.sass`, else the emitted `var()` points at nothing |
| `$gap-families` | `(gap: gap, rgap: row-gap, cgap: column-gap)` — 3 families | `_02_dimensions.sass` | Key = class prefix, value = CSS property. Add `xgap: column-gap` and `.xgap-*` classes compile; remove a key and its classes cease to exist |
| `$pad-families` | `(pad: padding, px: padding-inline, py: padding-block, pt: padding-top, pr: padding-right, pb: padding-bottom, pl: padding-left)` — 7 families | `_02_dimensions.sass` | Same key→property contract. `px`/`py` are logical (inline/block, RTL-safe); named sides are physical |
| `$mar-families` | `(mar: margin, mx: margin-inline, my: margin-block, mt: margin-top, mr: margin-right, mb: margin-bottom, ml: margin-left)` — 7 families | `_02_dimensions.sass` | Same key→property contract. There are no negative-margin classes and no side-family aliases beyond these |
| `$frame-ratios` | `('16-9': '16 / 9', '9-16': '9 / 16', '4-3': '4 / 3', '3-4': '3 / 4', '3-2': '3 / 2', '2-3': '2 / 3', '1-1': '1 / 1')` — 7 ratios | `_05_layouts.sass` (`.frame-*` loop) | Key = class suffix, value = `aspect-ratio` literal. Add `'21-9': '21 / 9'` and `.frame-21-9` compiles |
| `$breakpoints` | `(md: 768px, bs: 1024px, lg: 1280px)` | `_06_shells.sass` (`$md`/`$bs`/`$lg` locals → rail visibility media queries) | Renaming or moving a key moves the rail seams. **Not** a complete seam inventory: `_05_layouts` and parts of `_06` hardcode `1025px`/`1281px`/`1441px`/`769px` literals; change both together |
| `$shadow-specs` | 8 steps, each `(y1, b1, a1, y2, b2, a2)` — key/ambient layer pairs | `:root` loop in `_00_config.sass` | Emits the `--shade-*` token per step (`var(--shadow-rim)` + two shadow layers). The `.shadow-*` classes read the separate `--shadow-*` channel tokens instead |

The header table of the file also fixes the step ladder semantics for humans:
key alpha tightens `0.14 → 0.02`, ambient alpha widens `0.00 → 0.08`, key blur
`1 → 24px`, ambient blur `0 → 64px` as steps grow.

---

## 2. B — runtime tokens (`_00_tokens.sass`)

Structure: two authoring mixins, `=light-theme-tokens` and
`=dark-theme-tokens`, are applied by `[data-mode='dark']` and
`[data-mode='light']` respectively. **A `data-mode` attribute on `<html>` is
mandatory** — the colour roles live inside the mode mixins, not `:root`;
without the attribute no colour token is defined. The `:root` block carries
everything mode-independent: type/space/radius scales, motion language,
control metrics, page chrome.

### 2.1 Colour roles (light / dark)

| Token | Light | Dark | Read by |
|---|---|---|---|
| `--white-fixed` | `#FFFFFF` | `#FFFFFF` | `.text-white`, `button[data-variant="primary"|"soft"|"destructive"]`, `a.btn` |
| `--black-fixed` | `#18181B` | `#18181B` | `.text-black` |
| `--bg` | `#F8F9FA` | `#121214` | `.bg-main`, `button[data-variant="outline"]`, `a.btn[data-variant="outline"]` |
| `--bg-surface` | `#FFFFFF` | `#1C1C20` | `.bg-surface`, `body`, `.app-header` |
| `--bg-panel` | `#FFFFFF` | `#1E1E22` | `.bg-panel`, `.card` |
| `--bg-sunken` | `#F0F1F3` | `#27272C` | `.bg-sunken` |
| `--bg-raised` | `#FFFFFF` | `#36363D` | `.bg-raised`, `.fsx-accordion-trigger:hover` |
| `--bg-extra` | `#EAECEF` | `#161618` | `.bg-extra` |
| `--bg-input` | `#F0F1F3` | `#27272C` | `.input`, `.select` |
| `--bg-button` | `#ECEEF1` | `#32323A` | reserved button fill channel — no consumer yet |
| `--text-primary` | `#18181B` | `#F4F4F6` | `.text-primary`, body, headings |
| `--text-secondary` | `#6B7280` | `#9D9DA8` | `.text-secondary` |
| `--text-muted` | `#9CA3AF` | `#63636E` | `.text-muted`, `.breadcrumb-*`, `.inputs-wrapper label` |
| `--text-inverse` | `#FFFFFF` | `#121214` | `.text-inverse` — flips with mode by design |
| `--state-surface` | `#F4F4F6` | `#27272C` | `button[data-variant="secondary"]`, `a.btn[data-variant="secondary"]` |
| `--state-hover` | `#ECEEF1` | `#33333C` | `a.nav-link:hover`, `button[data-variant="secondary"|"outline"|"ghost"]:hover`, `button.icon:hover` |
| `--state-selected` | `#E2E4E8` | `#3E3E4A` | selected-state channel — no consumer yet |
| `--border` | `#E5E7EB` | `#2E2E36` | `.border`, `.bt`/`.br`/`.bb`/`.bl`, `.input`, `.select`, `.card`, `.fsx-accordion-item` |
| `--border-subtle` | `#F0F1F3` | `#222228` | `.border-subtle`, `.bt-sub`/… |
| `--border-strong` | `#D1D5DB` | `#44444E` | `.border-strong`, `.bt-str`/…, `button[data-variant="secondary"]` |
| `--theme-color` | `#FFD000` | `#FFD000` | `.link`, `.text-theme`, `button[data-variant="primary"]`, `a.btn[data-variant="primary"]`, focus rims |
| `--theme-color-alt` | `#E5B800` | `#E5B800` | `.link:hover`, `.text-theme-alt`, `button[data-variant="primary"]:hover` |
| `--theme-color-sub` | `#FEF3C7` | `#332B12` | `.text-theme-sub`, `button[data-variant="soft"]` |
| `--accent-orange` | `#FF7A00` | `#FF7A00` | reserved accent channel — no consumer yet |
| `--accent-green` | `#10B981` | `#22C55E` | reserved accent channel — no consumer yet |
| `--success` / `--success-hover` | `#10B981` / `#059669` | `#22C55E` / `#34D399` | `.text-success`, `.bg-success` |
| `--warning` / `--warning-hover` | `#FFD000` / `#E5B800` | `#FFD000` / `#FCD34D` | `.text-warning`, `.bg-warning` |
| `--danger` / `--danger-hover` | `#EF4444` / `#DC2626` | `#EF4444` / `#F87171` | `.text-danger`, `.bg-danger`, `button[data-variant="destructive"]` |
| `--info` / `--info-hover` | `#3B82F6` / `#2563EB` | `#60A5FA` / `#93C5FD` | `.text-info`, `.bg-info` |
| `--ring` | `rgba(255, 208, 0, 0.4)` | `rgba(255, 208, 0, 0.45)` | `.input`/`.select` focus, `.fsx-accordion-trigger` focus |
| `--shadow-color` | `0 0 0` | `0 0 0` | every `--shadow-*` channel (RGB triplet) |
| `--shadow-rim` | `inset 0 1px 0 rgba(255, 255, 255, 0.6)` | `inset 0 1px 0 rgba(255, 255, 255, 0.08)` | prefixed onto `--shade-*` tokens |
| `--shadow-umbra` | *(undefined in light)* | `rgb(0 0 0 / 0.60)` | dark-only umbra channel — no consumer yet |
| `--shadow-xs` … `--shadow-3xl` | two-layer key+ambient; **alphas are per-mode** (light 0.04–0.10) | same ramp, higher alphas (0.20–0.45) | `.shadow-xs` … `.shadow-3xl` |

### 2.2 Mode-independent `:root` tokens

| Group | Tokens | Notes |
|---|---|---|
| Fonts | Default assigns `font-family: var(--font-sans)` to `body, html`. | `_00_fonts.sass` ships blank for users to declare their own `@font-face` fonts and assign `--font-sans` / `--font-mono`. |
| Type scale | `--text-scaling: 1.25`; `--text-xs` `0.67rem`, `--text-sm` `0.75rem`, `--text-md` `0.875rem`, `--text-bs` `1rem`; `--text-lg`+ each `calc(previous * var(--text-scaling))` up to `--text-5xl` | Fixed rem rungs to base, then compounded — not fluid interpolation |
| Space scale | `--unit-space: 0.25rem`; `--space-xs` = unit, `sm` ×2, `md` ×3, `bs` ×4, `lg` ×6, `xl` ×8, `2xl` ×12, `3xl` ×16 | The rung set must mirror `$steps` — see §1 |
| Radius | `--radius-xs: 2px`, `sm: 4px`, `md: 8px`, `bs: 16px`, `lg: 32px`, `full: 9999px` | Six channels; no literal-radius ladder exists |
| Control metrics | `--height-sm: 20px`, `--height-md: 24px`, `--height-bs: 28px`, `--height-lg: 32px`, `--height-xl: 40px` | `.h-sm`…`.h-lg` classes and `.input`/`.select`/`button`/`a.btn` read `--height-*`. `--height-xl` is currently token-only — no class consumes it |
| Avatar / switch | `--avatar-size: 32px`, `--switch-w: 40px`, `--switch-h: 22px`, `--switch-thumb: 16px` | Load-bearing pairings documented in the source |
| Motion | `--transin1..3`, `--transout1..3` (cubic-beziers); `--speed0: 50ms`, `--speed1: 90ms`, `--speed2: 140ms`, `--speed3: 220ms`; `--motionin1..3`/`--motionout1..3` = duration + easing | Every `transition:` in the system reads these |
| Page chrome | `--header-height: 64px`, `--footer-height: 32px`, `--fit-height` (their sum), `--prose-clamp: 65ch`, `--content-clamp: 1600px`, `--app-inline: var(--space-lg)`, `--card-min: 240px`, `--sidebar-width`/`-left`/`-right: 280px`, `--z-sticky: 100`, `--z-raised: 200`, `--z-modal: 300`, `--z-toast: 500` | Shell geometry the L4 classes read |
| Pop colors | `--greenpop1..4`, `--orangepop1..6`, `--yellowpop1..4` | Named accent literals, mode-independent. Ink classes `.orange1`…`.orange6`, `.yellow1`…`.yellow4`, `.green1`…`.green4` read them |
| Elevation (from `_00_config.sass`) | `--shade-xs` … `--shade-3xl` | Loop-generated from `$shadow-specs` — rim + key layer + ambient layer |

---

## 3. B — `data-*` attribute API

| Attribute | Where | Values | Effect |
|---|---|---|---|
| `data-mode` | `<html>` (mandatory) | `light` \| `dark` | Applies `=light-theme-tokens` / `=dark-theme-tokens` — the entire colour-role set |
| `data-shape` | `button`, `.button`, `a.btn`, `.input`, `.select`, `.card`, `.fsx-accordion-item` | `square` \| `modern` \| `curved` \| `round` | Corner treatment: `0` / `--radius-sm` / `--radius-md` / `--radius-full`. **`square` is only defined on `button`/`.button`, `a.btn`, `.input`, `.select`** — `.card` and the accordion item start from the unstyled default |
| `data-variant` | `button`, `.button`, `a.btn`, `.card`, `.fsx-accordion-item`, `.input`, `.select` | `primary` \| `secondary` \| `soft` \| `outline` \| `ghost` \| `link` \| `destructive` \| `iconbox` | Visual paint. Not universal: `.input`/`.select` answer only `primary`, `secondary`, `soft`, `outline`, `ghost` (no `link`, no `destructive`); `.card` adds no `destructive`; `a.btn` adds no `iconbox`/`icon`; `iconbox` is button-only |
| `data-size` | `button`, `.button`, `a.btn`, `.input`, `.select`, `.fsx-accordion-item` | `sm` \| `md` \| `bs` \| `lg` | Metrics variant: height + font-size channels, read from `--height-*`. **Not `.card`** — cards have no size axis |
| `data-pad` | `.card` only | `sm` \| `md` \| `bs` \| `lg` \| `xl` | Padding from `--space-*`. This is the card-only axis; no other class answers it |

`.button` is a real class as of 1.1.0: `button, .button` in `_07_interactions.sass`
is one selector list, so `<button class="button">` and a bare `<button>` are
styled identically and answer the same axes. `.button` is `(0,1,0)`, so ink
utilities like `.text-danger` still win on it by source order. The registry files
the whole button tree under the bare element name `"button"` — `.button` has its
own row, but `.button[data-variant="ghost"]` does not; look up
`button[data-variant="ghost"]`.

`iconbox` carries extra `data-size` rungs of its own — `icon-md`, `icon-bs`,
`icon-lg` — alongside the four standard sizes.

Class-attribute states (not `data-*`, but part of the same runtime surface):
`.app-shell.open` (left rail becomes a fixed drawer below 1025px),
`.fsx-accordion-item.open` (expands `.fsx-accordion-content`),
`.content-section.null|narrow-half|narrow-wide|narrow-full`,
`.hide-mobile`/`.hide-desktop`.

The presets runtime (`presets.svelte.ts`, `PresetControls.svelte`) writes these
attributes onto live markup. It never overwrites an attribute the markup
already declares. `data-pad` is written to `.card` only, `data-variant` reaches
`.card` alongside the opted-in controls, and `data-size` skips `.card`.

---

## 4. C — class registry (summary)

498 concrete classes across the layers; the full inventory with properties,
kinds and examples is [`../REGISTRY.api.md`](https://github.com/fractalmandala/fractalstyler/blob/main/../REGISTRY.api.md) (generated).

| Layer | Partial | Count | Contents |
|---|---|---|---|
| L0 | `_01_base.sass` | 2 | `.bdr` debug outline, `.mode-wipe` view-transition kill switch |
| L1 | `_02_dimensions.sass` | 154 | 17 space families × 8 steps (136), 6 radius channels, `.wfull`/`.hfull`/`.full`, `.minw0`/`.minh0`/`.min0`, `.h-sm`…`.h-lg`, `.hfull-vh`, `.hfull-vh-fitted` |
| L2 | `_04_containers.sass` | 71 | `.box` + 9 alignment modifiers, `.row` + 9, `.grid` + 15, `.wrap`, `.grow`, `.shrink-0`, position set, `.scroll-y`/`.scroll-x`, `.card` (+`data-variant`/`data-shape`/`data-pad`), `.chip`, `.prose-section`, `.nav-section`, `.page-header`, `.inputs-wrapper`, `.checkbox-wrapper` |
| L3 | `_05_layouts.sass` | 19 | `.grid-1`…`.grid-6` (divisor stepping), `.cspan-1`…`.cspan-8`, `.card-grid`, `.prose`, 7 `.frame-*` (from `$frame-ratios`), `.reel` |
| L4 | `_06_shells.sass` | 16 | `.app-shell` (+`.open` drawer compound), `.app-header` (+`.clamped`), `.app-main` (+`.clamped`), `.main-section`, `.sidebar-left`, `.sidebar-right`, `.app-footer`, `.content-section` (+`.null`/`.narrow-half`/`.narrow-wide`/`.narrow-full`), `.get` |
| L5 | `_03_typography.sass`, `_07_interactions.sass`, `_08_visuals.sass` | 195 | Typography scale/roles/modifiers, `.input`/`.select`, `button`/`.button`/`a.btn` (+`data-variant`/`data-shape`/`data-size`/`iconbox`), `.button-group`/`.split-button`, link family, bare backgrounds (`.bg-main`, `.bg-surface`, `.bg-panel`, `.bg-sunken`, `.bg-raised`, `.bg-extra`), status fills, border set (`.border` + `-subtle`/`-strong`, per-side `.bt`/`.br`/`.bb`/`.bl` + `-str`/`-sub`), shadows, pop-colour inks, visibility |
| Custom | `_09_own.sass` | 41 | `.site-logomotif`, `.logotype`, `.project-circle`, the `.mascot`/`.mascotgl` families, `.hero-name`, `.fsx-accordion` family (+`data-variant`/`data-shape`) |

Every class entry in `registry.json` carries: `class`, `kind`
(`family`/`class`/`modifier`/`child`/`variant`/`compound`/`element`),
`layer`, `property` (declarations, with `@media` steps inline), `file`,
`description`, `example`.

---

## 5. Fonts (`_00_fonts.sass`)

The library no longer bundles or imports external font files. It ships a blank `_00_fonts.sass` file for the user/consumer project to declare their custom `@font-face` rules and define `--font-sans` / `--font-mono`. `_01_base.sass` applies `font-family: var(--font-sans)` to `body, html`.

---

## 6. Token → defined-in → read-by index

| Token group | Defined in | Read by |
|---|---|---|
| `--shade-*` | `_00_config.sass` `:root` loop | (reserved elevation channel; `.shadow-*` classes read `--shadow-*` instead) |
| Colour roles (§2.1) | `_00_tokens.sass` mode mixins | L5 dress classes, interactions, body |
| `--font-sans` | user-supplied (`_00_fonts.sass`) | `body`, `html` |
| `--text-*` | `_00_tokens.sass` `:root` | `.text-*`, `.text-body*`, semantic type roles |
| `--space-*`, `--unit-space` | `_00_tokens.sass` `:root` | all 17 L1 space families |
| `--radius-*` | `_00_tokens.sass` `:root` | `.radius-*`, `.chip`, `.input`, `.select`, `.card`, `button[data-shape]`, `a.btn`, `a.nav-link` |
| `--height-*` | `_00_tokens.sass` `:root` | `.h-sm`…`.h-lg`, `.input`/`.select`, `button`, `a.btn`, `.fsx-accordion-trigger` |
| `--motion*`, `--speed*`, `--trans*` | `_00_tokens.sass` `:root` | every `transition:` in the system |
| `--header-height`, `--footer-height`, `--fit-height` | `_00_tokens.sass` `:root` | `.app-header`, `.app-main`, `.hfull-vh-fitted`, rails |
| `--prose-clamp`, `--content-clamp`, `--app-inline`, `--card-min` | `_00_tokens.sass` `:root` | `.prose`, `.app-header.clamped`, `.app-main.clamped`, shells, `.card-grid` |
| `--sidebar-width*`, `--z-*` | `_00_tokens.sass` `:root` | rails, `.app-header`, drawer |
| `--shadow-*`, `--shadow-color`, `--shadow-rim` | `_00_tokens.sass` mode mixins | `.shadow-*` classes, `--shade-*` composition |
| `--greenpop*`, `--orangepop*`, `--yellowpop*` | `_00_tokens.sass` `:root` | `.green1`…`.green4`, `.orange1`…`.orange6`, `.yellow1`…`.yellow4` |
| `--accent-orange`, `--accent-green`, `--bg-button`, `--state-selected`, `--shadow-umbra` | `_00_tokens.sass` mode mixins | *reserved — declared but not yet read by any class* |
---

## 7. Regeneration pipeline

| Script | Emits |
|---|---|
| `scripts/update-registry.js` | `registry.json`, `skills/fractalstyler/references/fractals.md`, `skills/fractalstyler/references/tokens.md` |
| `scripts/class-vocab.js` | `docs/REGISTRY.api.md` (reads `registry.json`) |
| `lint/browser.mjs --out docs/browser.html` | `docs/browser.html` (searchable registry browser) |
| `scripts/build-css.js` | `dist/css/fractalstyler.css` + `.min.css` (plain-CSS distribution) |
| `scripts/validate-deck.js` | exit 0/1 — every class named in docs/components resolves against the compiled stylesheet |
| `lint/cli.mjs` | exit 0/1 — token purity and contract lint |
| `svelte-package` (`pnpm build`) | `dist/` — `index.js`, `presets.svelte.js`, `ui/PresetControls.svelte`, styles partials |
| `cli/main.mjs` (`fractalstyler` bin) | consumer scaffolds: `npx @fractaldesign/fractalstyler init\|eject\|lint` — track or eject the styles, place these docs into a project, wire the VS Code extension |
| `mcp/server.mjs` (`fractalstyler-mcp` bin) | MCP server; reads `registry.json` and `data/recipes.json` from disk at start-up |

`pnpm registry` runs the first two; `pnpm browser` regenerates the browser
page; `pnpm build` runs `registry` → `svelte-package` → `build-css` → `publint`;
`pnpm check` runs the validator and the contract linter. Consumers get the same
registry builder after `eject` as `scripts/build-registry.mjs`.

Note: `validate-deck.js` does **not** walk `mcp/`, `cli/`, `data/` or the
presets runtime. Those surfaces drift silently — re-audit them by hand, or add
them to the validator, when the class inventory changes.
