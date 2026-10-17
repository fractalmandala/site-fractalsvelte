---
title:  Dimensions and Spacing
description: Reference guide for Level 1 dimension fractals, covering the 17 space families, literal utilities, negative margins, and responsive viewport bands.
id: 2
type: Usage Guide
slug: dimensions
---

Level 1 (L1) fractals translate Level 0 design tokens into physical dimensions. All spacing, sizing, radius, and margin utilities are loop-generated from `_02_dimensions.sass` across three distinct viewport bands: base, mobile (`-mob`), and desktop (`-desk`).

1. Fractalstyler2 divides spacing into 17 role-split families across three primary categories: gaps, paddings, and margins.
2. Gaps separate child elements inside flexboxes and grids. Token steps scale with the `--gap-scale` preset multiplier:


| Class Pattern    | CSS Property | What It Applies                                     |
| :---------------- | :------------ | :--------------------------------------------------- |
| `.gap-#{$step}`  | `gap`        | `calc(var(--space-#{$step}) * var(--gap-scale, 1))` |
| `.rgap-#{$step}` | `row-gap`    | `calc(var(--space-#{$step}) * var(--gap-scale, 1))` |
| `.cgap-#{$step}` | `column-gap` | `calc(var(--space-#{$step}) * var(--gap-scale, 1))` |


### Padding Families

Paddings control container breathing room. Token steps scale with the `--pad-scale` preset multiplier:


| Class Pattern          | CSS Property     | What It Applies                                     |
| :---------------------- | :---------------- | :--------------------------------------------------- |
| `.pad-#{$step}`        | `padding`        | `calc(var(--space-#{$step}) * var(--pad-scale, 1))` |
| `.pad-x-#{$step}`      | `padding-inline` | `calc(var(--space-#{$step}) * var(--pad-scale, 1))` |
| `.pad-y-#{$step}`      | `padding-block`  | `calc(var(--space-#{$step}) * var(--pad-scale, 1))` |
| `.pad-top-#{$step}`    | `padding-top`    | `calc(var(--space-#{$step}) * var(--pad-scale, 1))` |
| `.pad-right-#{$step}`  | `padding-right`  | `calc(var(--space-#{$step}) * var(--pad-scale, 1))` |
| `.pad-bottom-#{$step}` | `padding-bottom` | `calc(var(--space-#{$step}) * var(--pad-scale, 1))` |
| `.pad-left-#{$step}`   | `padding-left`   | `calc(var(--space-#{$step}) * var(--pad-scale, 1))` |


### Margin Families &amp; Negatives

Margins handle element offsets and external spacing. Negative margins use the `--` infix notation:


| Class Pattern           | CSS Property    | What It Applies                                          |
| :----------------------- | :--------------- | :-------------------------------------------------------- |
| `.marg-#{$step}`        | `margin`        | `calc(var(--space-#{$step}) * var(--gap-scale, 1))`      |
| `.marg--#{$step}`       | `margin`        | `calc(var(--space-#{$step}) * var(--gap-scale, 1) * -1)` |
| `.marg-x-#{$step}`      | `margin-inline` | `calc(var(--space-#{$step}) * var(--gap-scale, 1))`      |
| `.marg-y-#{$step}`      | `margin-block`  | `calc(var(--space-#{$step}) * var(--gap-scale, 1))`      |
| `.marg-top-#{$step}`    | `margin-top`    | `calc(var(--space-#{$step}) * var(--gap-scale, 1))`      |
| `.marg-bottom-#{$step}` | `margin-bottom` | `calc(var(--space-#{$step}) * var(--gap-scale, 1))`      |
| `.marg-left-#{$step}`   | `margin-left`   | `calc(var(--space-#{$step}) * var(--gap-scale, 1))`      |
| `.marg-right-#{$step}`  | `margin-right`  | `calc(var(--space-#{$step}) * var(--gap-scale, 1))`      |


Available fluid token steps: `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`.

---

## 2. Literal Pixel Utilities

When an interface requires an exact, non-fluid pixel dimension (for example, a 16px icon box or a 1px hairline border), literal utilities emit exact pixel values from a discrete ladder:

```
0, 1, 2, 4, 6, 8, 12, then every multiple of 8*
```

Fine at the bottom, where interfaces genuinely need 1px and 2px precision;
coarse above.

\*512 is the ceiling for sizing. Spacing and radius stop earlier, because the
families are not alike:


| Families             | Ceiling   | Why                                                                                                               |
| :-------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------- |
| `gap`, `pad`, `marg` | **64px**  | 24 of the 28 classes emitted per rung. Large spacing is the preset steps' job — `--space-3xl` is already \~120px. |
| `radius`             | **64px**  | `.radius-full` already handles pills, and the shape presets top out around 32px. A 512px corner is not a corner.  |
| `w`, `h`, `square`   | **512px** | A 512px width is an ordinary sidebar.                                                                             |


Tune with `$literal-fine`, `$literal-step`, `$literal-max`,
`$literal-space-max` and `$literal-radius-max` in `_01_config.sass`.

```html
<!-- Exact 12px gap, 16px padding, 8px radius -->
<div class="box gap-12 pad-16 radius-8">
  <div class="square-32 radius-full"></div>
</div>
```


| Utility Pattern                        | Values | Generated CSS                                     |
| :-------------------------------------- | :------ | :------------------------------------------------- |
| `.gap-{N}`, `.rgap-{N}`, `.cgap-{N}`   | ladder | `gap: {N}px`, `row-gap: {N}px`, etc.              |
| `.pad-{N}`, `.pad-x-{N}`, `.pad-y-{N}` | ladder | `padding: {N}px`, `padding-inline: {N}px`         |
| `.marg-{N}` / `.marg--{N}`             | ladder | `margin: {N}px` / `margin: -{N}px`                |
| `.radius-{N}`                          | ladder | `border-radius: {N}px` (`.radius-0` is the reset) |
| `.w-{N}`, `.h-{N}`                     | ladder | `width: {N}px`, `height: {N}px`                   |
| `.square-{N}`                          | ladder | `width: {N}px; height: {N}px`                     |


---

## 3. Sizing &amp; Viewport Keywords

Standard layout sizing utilities provide consistent width, height, and viewport bounding without arbitrary CSS declarations:

```html
<!-- Full viewport fitted shell container -->
<div class="box wfull hfull-vh-fitted min0">
  <main class="grow min0">...</main>
</div>
```

- `.wfull`: `width: 100%`
- `.hfull`: `height: 100%`
- `.full`: `width: 100%; height: 100%`
- `.min0`: `min-width: 0; min-height: 0` (prevents flex child blowout)
- `.grow`: `flex: 1 1 0%`
- `.shrink-0`: `flex-shrink: 0`
- `.hfull-vh`: `min-height: 100vh`
- `.hfull-vh-fitted`: `min-height: calc(100vh - var(--header-height, 48px) - var(--footer-height, 0px))` — for a **normal-flow** block that fills the screen between the chrome (header + block + footer = 100vh, nothing scrolls). Both fallbacks are load-bearing: an undefined custom property makes the whole `calc()` invalid at computed-value time, and the `min-height` silently disappears. Don't reuse this expression on a sticky or fixed element — the footer is not in the viewport there, so subtracting it only leaves a dead gap.

---

## 4. Responsive Viewport Bands (`-mob` &amp; `-desk`)

Every dimension, spacing, padding, margin, radius, and sizing utility is automatically emitted in two responsive variants using the 768px responsive seam:

- `-mob`: Applies only when viewport width is below 768px (`max-width: 767px`).
- `-desk`: Applies only when viewport width is 768px or greater (`min-width: 768px`).

```html
<!-- Compact 8px padding on mobile, spacious 24px padding on desktop -->
<div class="card pad-xs-mob pad-lg-desk radius-4-mob radius-12-desk">
  <!-- Stack vertically on mobile, row on desktop -->
  <div class="box-mob row-desk gap-sm ycenter">
    <div class="square-24-mob square-48-desk"></div>
    <span class="text-sm">Responsive Dimensions</span>
  </div>
</div>
```

---

## Sass Syntax & Spacing Generator Mechanics

The dimensional utilities in `_02_dimensions.sass` are generated deterministically through Sass loops and functional calculations:

### 1. The Literal Ladder Generator (`@for`, `math.div`, `list.append`)
Rather than hand-authoring hundreds of pixel utility classes, the ladder is built algorithmically:
```sass
$literals: $literal-fine
@for $i from 2 through math.div($literal-max, $literal-step)
	$literals: list.append($literals, $i * $literal-step)
```
- `math.div($literal-max, $literal-step)`: Uses the `sass:math` module function to divide the maximum ceiling (`256px`) by the step size (`8px`), yielding `32` rungs.
- `@for $i from 2 through ...`: Counts up from `2` through `32`, multiplying by `8` (`16, 24, 32, ... 256`).
- `list.append(...)`: From `sass:list`, appends each new step onto `$literal-fine` (`0, 1, 2, 4, 6, 8, 12`), creating the unified master progression.

### 2. Ladder Truncation (`@each`, `@if`)
Different utility families have different requirements:
```sass
$space-literals: ()
@each $n in $literals
	@if $n <= $literal-space-max
		$space-literals: list.append($space-literals, $n)
```
- `@each $n in $literals`: Traverses the full ladder.
- `@if $n <= $literal-space-max`: Limits spacing (`gap`, `pad`, `marg`) to 64px. While a 256px width is common for sidebars, a 256px gap is virtually never used. Truncating here cuts stylesheet output by over 60%.
- Similarly, `$radius-literals` is filtered with `$literal-radius-max: 64`.

### 3. Role-Split Multipliers (`calc`, `var`)
Spacing responds to the `data-layout` preset through CSS custom property multipliers:
- **Gaps & Margins**: `#{$prop}: calc(var(--space-#{$step}) * var(--gap-scale, 1))` — controls intra-element spacing. When `data-layout="tight"` is active, `--gap-scale` scales gaps down to `0.5`.
- **Paddings**: `#{$prop}: calc(var(--space-#{$step}) * var(--pad-scale, 1))` — controls container breathing room. When `data-layout="comfortable"` is active, `--pad-scale` scales paddings up to `2` while gaps remain at `1.125`.
- **Negative Margins**: `calc(var(--space-#{$step}) * var(--gap-scale, 1) * -1)` flips the sign for reverse spacing offsets (`.marg--#{$step}`). Literal pixel rungs simply prepend a minus sign: `-#{$n}px`.

### 4. Viewport Fitting Arithmetic (`calc`)
- `min-height: calc(100vh - var(--header-height, 48px) - var(--footer-height, 0px))`: Ensures full-viewport height for normal-flow content between header and footer chrome.
- Fallback parameters (`48px` and `0px` in `var(...)`) prevent the entire `calc()` from failing as invalid at computed-value time if the shell tokens are not in scope.

### 5. Wholesale Responsive Band Generation (`#{string.unquote($query)}`)
To produce the `-mob` and `-desk` variants across all 17 space families, radius, sizing, and shadows:
```sass
@each $mode, $query in $responsive-modes
	@media #{string.unquote($query)}
		// loops across gap, pad, marg, radius, size, shadow...
```
- `@each $mode, $query in $responsive-modes`: Iterates over the key-value map in `_01_config.sass` where `$mode` is `'mob'` or `'desk'`, and `$query` is `'all and (max-width: 767px)'` or `'all and (min-width: 768px)'`.
- `string.unquote($query)`: Built-in function from `sass:string` that strips surrounding quotation marks from the query string.
- `#{...}`: Sass interpolation syntax that evaluates the unquoted expression and writes it directly into the `@media` rule, resulting in clean native CSS media queries without invalid quotes.

---

[Next - Containers](./02-containers.md)