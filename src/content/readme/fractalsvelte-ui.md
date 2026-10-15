---
title: "@fractaldesign/fractalsvelte-ui"
source: "@fractaldesign/fractalsvelte-ui@0.7.0 README, from npm"
---
# @fractaldesign/fractalsvelte-ui

A massive, modern, token-driven **Svelte 5 Runes** component library for **SvelteKit**.

**91+ performant, beautifully crafted components, UI blocks, layouts, shells, and animated motion primitives** — with **zero Tailwind dependencies**, encapsulated scoped styles, and an AST-driven zero-drift documentation quality gate.

---

## Highlights

- ⚡ **100% Svelte 5 Runes**: Modern `$props()`, `$state()`, `$derived()`, `$bindable()`, and `Snippet` rendering (`{@render ...}`).
- 🚫 **Zero Tailwind**: Absolutely no Tailwind classes or postcss pipelines. Lean, standard, scoped CSS with zero style leakage.
- 🎨 **Consistent Token System**: Standard CSS custom properties (`--f-bg`, `--f-surface`, `--f-text`, `--f-primary`, `--f-border`, etc.) with built-in Light and Dark themes.
- 📦 **Encapsulated, Overridable Styles**: Every component holds its styling in a scoped `<style>` tag inside the `fractalsvelte-ui` cascade layer — self-contained, and your own CSS always wins.
- 📐 **Single Source of Truth Types**: Runtime `as const` arrays and derived TypeScript unions for variants, sizes, shapes, and intents.
- 🛡️ **AST-Driven Documentation Pipeline**: Learned directly from `documentation-flow.md`. Automatic AST property extraction and strict quality gate enforcement with `docs:check`.

---

## Component Catalog (91+ Components)

### 1. Actions & Triggers (`src/lib/components/actions/`)
- **`Button`**: Versatile interactive button with variants (`primary`, `secondary`, `soft`, `outline`, `ghost`, `destructive`, `surface`), sizes (`xs`–`xl`), shapes (`rounded`, `pill`, `square`), loading spinner, and dual button/anchor rendering.
- **`IconButton`**: Compact square/circle action button with accessible `aria-label`, hover tooltips, and scale tiers.
- **`ButtonGroup`**: Seamlessly attached or spaced cluster container supporting horizontal and vertical orientations.
- **`SplitButton`**: Dual-action split component combining a main action button with a dropdown trigger chevron button.
- **`LinkButton`**: Semantic anchor `<a>` styled with button aesthetics, external link indicators, and rel/target security attributes.
- **`CloseButton`**: Standardized dismissal trigger for dialogs, drawers, and banners with crisp vector SVG glyph.
- **`CopyButton`**: Clipboard copy utility with instant checkmark feedback and automatic 2-second timeout reversion.

### 2. Forms & Inputs (`src/lib/components/forms/`)
- **`Input`**: Text, email, and password field with visibility toggle eye, clear button, helper text, and error states.
- **`TextArea`**: Multi-line input with auto-resize option, max-length character counter, and error states.
- **`Checkbox`**: Accessible checkbox with custom checkmark/dash SVGs, indeterminate state, label, and description.
- **`Radio`**: Individual radio item with animated central indicator pip.
- **`RadioGroup`**: Option container managing bindable values with full keyboard arrow navigation.
- **`Switch`**: iOS/macOS style toggle switch with smooth sliding spring transitions and ARIA switch semantics.
- **`Select`**: Custom dropdown select with search filter, keyboard navigation, and checkmark indicators.
- **`Slider`**: Precision slider with custom track, fill bar, thumb, and dynamic value readout.
- **`RangeSlider`**: Dual-thumb range slider for min & max bounding with active fill bar.
- **`PinInput`**: Segmented OTP verification input with auto-advance, backspace regression, and paste handling.
- **`NumberInput`**: Stepper input with increment/decrement buttons, min/max clamping, and step precision.
- **`SearchInput`**: Search field pre-equipped with magnifying glass icon, clear button, and shortcut badge (`⌘K`).
- **`ColorPicker`**: Interactive color widget with swatch preview, hex text field, and palette presets.
- **`FileInput`**: Drag-and-drop file upload zone with file size/type check, file preview list, and removal triggers.
- **`FormField`**: Structural container binding inputs with labels, optional/required badges, and error alerts.

### 3. Data Display & Feedback (`src/lib/components/display/`)
- **`Badge`**: Status indicator pill across semantic intents (`primary`, `success`, `warning`, `danger`, `info`, `surface`, `outline`).
- **`Tag`**: Interactive chip component with icon snippet slot and dismiss button.
- **`Avatar`**: User portrait badge with image loader, fallback initials, and status presence dots.
- **`AvatarGroup`**: Stack container of overlapping avatars with excess overflow counter pill (`+N`).
- **`Kbd`**: Tactile keyboard key chip rendering physical keycaps and modifier glyphs.
- **`Alert`**: Contextual feedback callout supporting info, success, warning, and danger intents.
- **`Banner`**: Full-width announcement strip positioned at layout edges with action buttons.
- **`Progress`**: Linear progress bar with determinate percentages or indeterminate loading pulses.
- **`Meter`**: Scalar gauge evaluating low, high, and optimum target bands.
- **`Spinner`**: Rotating vector loader with configurable size and stroke thickness.
- **`Skeleton`**: Shimmer gradient placeholder box, circle, or text bar for loading states.
- **`EmptyState`**: Informative placeholder combining iconography, guidance copy, and primary action buttons.
- **`StatCard`**: Dashboard KPI card with prominent metric, directional trend delta badge, and sparklines.
- **`AspectRatio`**: Responsive container locking children to standard ratios (`16:9`, `4:3`, `1:1`, `21:9`).

### 4. Layout & Containers (`src/lib/components/layout/`)
- **`Card`**: Versatile container with header, title, description, body, footer, surfaces, and shadow depths.
- **`SelectableCard`**: Interactive card with selectable checkmark/radio dot indicator and active border glow.
- **`ClickableCard`**: Interactive card functioning as a link or button with hover lift and press feedback.
- **`Container`**: Responsive centered container with max-width breakpoints (`sm`–`xl`, `fluid`).
- **`Stack`**: Flex layout container for column/row ordering with token gaps and alignment.
- **`Flex`**: Granular flexbox container with direction, wrap behavior, and alignment.
- **`Grid`**: CSS grid container supporting 1–12 columns, `auto-fit`, and gap tokens.
- **`BentoGrid`**: Modern dashboard grid assembling modular bento layouts without gaps.
- **`BentoCell`**: Modular bento cell with `colSpan`, `rowSpan`, and gradient border glow options.
- **`Section`**: Page section component with eyebrow kicker, title, subtitle, and action slots.
- **`Divider`**: Separator line with solid/dashed/dotted styles and centered labels.

### 5. Navigation & Shells (`src/lib/components/navigation/`)
- **`AppShell`**: Responsive application scaffold with sticky Header, collapsible Sidebar, and main Content.
- **`Header`**: Top header bar with branding slots, center navigation, and action controls.
- **`TopNav`**: Horizontal navigation link bar with active indicator highlights and badge counters.
- **`SideNav`**: Collapsible vertical sidebar navigation supporting section headers, badges, and icons.
- **`BottomNav`**: Mobile bottom dock bar with route labels, icons, and safe-area insets.
- **`Breadcrumb`**: Semantic trail with customizable separators, home icon, and truncation.
- **`Pagination`**: Paged dataset controls with previous/next buttons, page numbers, and ellipsis.
- **`Stepper`**: Multi-step progress wizard with completed, current, and upcoming step indicators.
- **`Tabs`**: Tabbed interface with animated sliding underline or pill indicator and panels.
- **`SegmentedControl`**: Pill selection switch featuring a smooth sliding backdrop highlight.
- **`TreeList`**: Hierarchical expandable directory tree with rotating chevrons and selection states.
- **`MobileNav`**: Slide-out mobile drawer overlay with animated backdrop and Escape key listener.

### 6. Overlays & Dialogs (`src/lib/components/overlays/`)
- **`Dialog`**: Accessible modal dialog with backdrop blur, focus trap, Escape key dismissal, and transitions.
- **`AlertDialog`**: Destructive confirmation dialog directing initial focus safely to cancel.
- **`Drawer`**: Slide-out panel docking to left, right, top, or bottom with backdrop blur.
- **`Popover`**: Floating contextual container anchored to a trigger with 12 placement directions.
- **`Tooltip`**: Transient hover and focus tooltip with directional arrows and 4-way placement.
- **`DropdownMenu`**: Contextual action menu with items, shortcuts, danger actions, and separators.
- **`CommandPalette`**: Searchable command hub opened via shortcut (`⌘K` / `Ctrl+K`) with live filtering.

### 7. Typography & Code (`src/lib/components/typography/`)
- **`Heading`**: Semantic heading element (`h1`–`h6`) with typographic scale and gradient text options.
- **`Text`**: Body text supporting variants (`body`, `lead`, `muted`, `subtle`, `code`, `caption`, `bold`).
- **`Code`**: Inline monospace code chip with subtle borders and syntax highlighting colors.
- **`CodeBlock`**: Window-framed code display box with window control dots, language badges, and copy button.
- **`Blockquote`**: Stylized quotation container with vertical accent spine and attribution footer.
- **`Collapsible`**: Single animated disclosure section with rotating chevron and height transitions.
- **`Accordion`**: Stacked group of expandable content sections supporting single or multi-expand mode.

### 8. Motion & Animations (`src/lib/components/motion/`)
- **`AnimatedButton`**: Tactile spring physics button with micro-scale feedback, shine sweep, and ripple on click.
- **`AnimatedCard`**: Card with smooth hover elevation and border spotlight tracking cursor coordinates.
- **`Card3D`**: Interactive 3D tilt card tracking pointer coordinates with perspective and glare reflection.
- **`GlowCard`**: Radial spotlight glow border card that illuminates around cursor coordinates.
- **`ShimmerEffect`**: Shimmer light sweep overlay animation across child elements.
- **`Marquee`**: Infinite smooth horizontal marquee ticker with pause-on-hover and speed control.
- **`TextScramble`**: Cyberpunk / sci-fi decode text scramble animation running on mount or hover.
- **`RippleEffect`**: Touch and click container expanding radial ripples from click coordinates.
- **`FloatingBadge`**: Status pill with subtle sinusoidal breathing float animation and live pulse dot.
- **`CanvasMotion`**: Interactive background canvas rendering a constellation particle network.

### 9. UI Blocks & Domain Patterns (`src/lib/components/blocks/`)
- **`WorkflowNode`**: Node card for pipeline editors with header, input/output port pins, and status badge.
- **`FlowCanvas`**: Interactive infinite canvas grid with dot matrix background, drag panning, and zoom controls.
- **`HeroBlock`**: High-converting hero section with badge pill, headline, subtext, and CTAs.
- **`PricingCard`**: SaaS tier card with price interval, feature list with checkmarks, and CTA button.
- **`FeatureGrid`**: Responsive multi-column showcase (2, 3, or 4 columns) with icon headers.
- **`TerminalBlock`**: macOS-style CLI terminal window with window dots, copy button, and typing lines.
- **`ChatBubble`**: Conversational message bubble with user/assistant roles, avatar, and status ticks.
- **`Timeline`**: Vertical activity chronology with continuous spine track and semantic marker nodes.

---

## Documentation Flow Pipeline

Follows the canonical architecture defined in `documentation-flow.md`:

```
src/lib/components/**/*.svelte          ← Single source of truth
        │
        │  scripts/extract-docs.mjs
        │  └─ TypeScript AST → Props interface, extends clause, export types, docblocks
        ▼
src/lib/documentation/manifest.json     ← Generated AST Manifest
        │
        ├─ + descriptions/*.ts           ← Authored prose (1-3 sentences)
        ▼
routes/components/[name]/               ← Renders the live interactive record
```

### Commands

```sh
pnpm docs:extract     # AST -> manifest.json (re-extract after any component edit)
pnpm docs:check       # Validates manifest + descriptions, exits non-zero on drift
pnpm check            # Runs svelte-check with zero errors
pnpm build            # Builds SvelteKit documentation portal
pnpm prepack          # Generates npm package in dist/ via svelte-package + publint
```

---

## Installation & Usage

```sh
pnpm add @fractaldesign/fractalsvelte-ui
```

Requires Svelte 5. Works in any Svelte 5 / SvelteKit app.

### 1. Load the tokens once

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '@fractaldesign/fractalsvelte-ui/tokens.css';
  let { children } = $props();
</script>

{@render children()}
```

### 2. Import the components you need

```svelte
<script lang="ts">
  import { Button, Badge, Card } from '@fractaldesign/fractalsvelte-ui';
</script>

<Button variant="outline" size="lg" shape="pill">Execute Pipeline</Button>
<Badge variant="success">New</Badge>
```

Unused components are tree-shaken from production builds. If you'd rather import a single file (for example to keep dev-server startup lean), deep imports work too:

```ts
import Button from '@fractaldesign/fractalsvelte-ui/components/actions/Button.svelte';
```

Shared unions for building your own wrappers live in `/types`:

```ts
import { VARIANTS, SIZES, SHAPES, type Variant, type Size, type Shape } from '@fractaldesign/fractalsvelte-ui/types';
// Variant: 'primary' | 'secondary' | 'soft' | 'outline' | 'ghost' | 'destructive' | 'surface'
// Size:    'xs' | 'sm' | 'md' | 'lg' | 'xl'
// Shape:   'square' | 'rounded' | 'pill'
```

### 3. Style it your way — your CSS always wins

All library CSS (tokens, reset and component styles) ships inside the `fractalsvelte-ui` [cascade layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer). Unlayered CSS beats layered CSS regardless of specificity, so anything you write overrides the defaults without `!important` or selector hacks.

Every component accepts `class` (forwarded to its root element) plus any native HTML attributes (`style`, `id`, `data-*`, `aria-*`, event handlers):

```svelte
<Button class="cta" variant="primary">Buy</Button>

<style>
  /* Plain class selector — beats the library's [data-variant] rules */
  :global(.cta) {
    background: hotpink;
    border-radius: 0;
  }
</style>
```

Re-theme globally by overriding tokens:

```css
:root {
  --f-primary: #7c3aed;
  --f-radius-md: 4px;
}
```

Components also expose their state as data attributes (`data-variant`, `data-size`, `data-shape`, `data-state`, …), so you can target specific variants: `:global(.f-btn[data-variant='ghost'])`.

**Using Tailwind v4 or other layered CSS?** Layer order is set by first appearance, so declare it once at the top of your main CSS file to make your layers win:

```css
@layer fractalsvelte-ui, theme, base, components, utilities;
```

---

## License

MIT &copy; Fractal Design
