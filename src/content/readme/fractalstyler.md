---
title: "@fractaldesign/fractalstyler"
source: "@fractaldesign/fractalstyler@1.2.0 README, from npm"
---
# Fractalstyler

A composition styling system — the class registry is the public API: compose
in markup, write no stylesheet. Ships as editable SASS and as plain compiled
CSS. MIT © [Fractal Mandala](https://github.com/fractalmandala)

**This library is a work in constant progress and breaking changes each bump.**

- Registry: [`docs/REGISTRY.api.md`](https://github.com/fractalmandala/fractalstyler/blob/main/docs/REGISTRY.api.md)
- Configuration: [`docs/references/configurations-api.md`](https://github.com/fractalmandala/fractalstyler/blob/main/docs/references/configurations-api.md)
- Agent skill: [`skills/fractalstyler/SKILL.md`](https://github.com/fractalmandala/fractalstyler/blob/main/skills/fractalstyler/SKILL.md)
- [VS Code Intellisense Extension](https://github.com/fractalmandala/fractalstyler/blob/main/fractalstyler-vscode/fractalstyler-0.4.0.vsix)
- [NPM](/fractalstyler)

## Using it in a project

Two ways to hold the styles, and an IDE layer you can add to either.

### 1. Install and use — track the package; upgrades come from npm

```sh
pnpm add -D @fractaldesign/fractalstyler
```

```sass
@use '@fractaldesign/fractalstyler/styles' as *
```

Plain CSS consumers need no SASS toolchain:

```js
import '@fractaldesign/fractalstyler/css'; // dist/css/fractalstyler.css
```

The classes are active once the import is in place. To keep the registry and
the configuration docs greppable inside your project, run:

```sh
npx @fractaldesign/fractalstyler init --track --docs
```

which places `REGISTRY.api.md` and
`references/configurations-api.md` into a `fractalstyler/` folder at your
project root (`--docs-dir` to choose another). Docs are snapshots — re-run
`init` after upgrading to refresh them.

### 2. Eject — the files become yours

Copies every styles layer, the palette modules and the registry builder into
your project, where you may edit them freely (including the `$`-variables in
`_00_config.sass`, in place):

```sh
npx @fractaldesign/fractalstyler eject
```

That leaves you `src/lib/styles/` (11 layers + a seeded `_09_own.sass`),
`src/lib/palette/`, and `scripts/build-registry.mjs`. Import your local tree,
regenerate your own registry after edits (`node scripts/build-registry.mjs`,
Node only), and the linter keeps enforcing the contract against your copy:

```sh
npx @fractaldesign/fractalstyler lint src/
```

Nothing existing is ever overwritten — on a name conflict your file is kept
and reported. Delete a kept file and re-run `eject` to re-place it.

> **Drift warning**: an ejected copy no longer tracks the package — upgrades
> stop coming from npm. This is the less advisable mode; it exists so a
> project that must own its styles can still start from the whole system.

### 3. Either mode, with or without the IDE extension

Both `init` and `eject` accept `--intellisense` / `--no-intellisense`. With it
on, the CLI writes `fractalstyler.stylesDirectory` to `.vscode/settings.json`
for the **Fractalstyler** VS Code extension (`fractaldesign.fractalstyler`) —
class completions and hovers inside `class="…"`, plus the sidebar/panel editor
for the styles files — pointing at wherever your styles now live
(`node_modules/…/dist/styles` in track mode, your local folder in eject mode).
It also checks the extension is installed and prints how to get it if not.

The setting is only a hint: the extension auto-detects the same folders and
works with no configuration at all. It picks the first of `src/lib/styles`,
`node_modules/@fractaldesign/fractalstyler/dist/styles`, `src/styles` or
`styles` that exists, so fractalstyler itself, an ejected copy, and an app
consuming the package from npm are all covered. Run **Fractalstyler: Pick
Styles Folder** to override it.

`npx @fractaldesign/fractalstyler init` with no flags asks the three questions
interactively; `--yes` takes the defaults (track + docs + intellisense).

### 4. Preset Controls

Optional runtime layer. Presets are plain `data-*` attributes written onto the
page — no build step, no stylesheet of its own, safe to leave out entirely.

| Axis | Attribute | Values | Reaches |
|---|---|---|---|
| Size | `data-size` | `sm` `md` `bs` `lg` | `button`, `input`, `select`, `input.input`, `select.select`, `a.btn` |
| Shape | `data-shape` | `square` `modern` `curved` `round` | same targets, plus `.card` |
| Variant | `data-variant` | `primary` … `iconbox` (see `libTypes.ts`) | **`input.input`, `select.select`, `button.button`, `a.btn`, `.card`** |
| Padding | `data-pad` | `sm` `md` `bs` `lg` `xl` | **`.card` only** |

The variant axis is class-qualified rather than element-qualified: only controls
that opted into the system's own class receive one. Bare `<input>`, `<select>`
and `<button>` are left alone. `.card` is the one non-control in the list — it is
a system class and answers `.card[data-variant]`, so variant paints cards as
well as controls. Size is the axis cards sit out: a card has no `data-size`
rule of its own, it sizes through `data-pad` and the layout classes. Any element
that already declares its own attribute keeps it — the preset only fills in what
is missing.

> `.button` is a real class. `_07_interactions.sass` styles buttons as
> `button, .button` — one selector list — so `<button class="button">` and a bare
> `<button>` are identical and answer the same axes. Prefer the bare element;
> `class="button"` is for opting in explicitly. It is `(0,1,0)`, the same as ink
> utilities like `.text-danger`, so those utilities still win on it.

Markup that already declares an attribute is never overwritten — the preset only
fills in the blanks. Choices persist to `localStorage` under `fractalstyler:presets`,
and a `MutationObserver` re-applies them to nodes added later.

There are two ways in. Either one works on its own; you never need both.

#### Mount the ready-made controls

`PresetControls` is a Svelte 5 component with one picker per axis plus a Reset
button. It is the shortest path — it calls `init()` on mount, so importing and
rendering it is the entire setup:

```svelte
<script>
	import { PresetControls } from '@fractaldesign/fractalstyler';
	// or, as a subpath so the component is the only thing pulled in:
	// import PresetControls from '@fractaldesign/fractalstyler/PresetControls';
</script>

<PresetControls />
```

It takes no props. Drop it wherever you want the pickers to live — commonly a
settings panel or a dev-only toolbar:

```svelte
{#if dev}
	<PresetControls />
{/if}
```

#### Or drive it from your own code

Every function calls `init()` itself before applying, so there is nothing to
wire up first. Call them from a click handler, a store subscription, a URL
parameter, anywhere:

```js
import { setPresetSize, setPresetShape, setPresetPad, setPresetVariant, resetPresets } from '@fractaldesign/fractalstyler';

setPresetSize('lg');       // size sweep
setPresetShape('round');   // shape sweep
setPresetPad('xl');        // .card padding sweep
setPresetVariant('soft');  // paint sweep — controls + .card
resetPresets();            // back to bs / modern / md / primary
```

`@fractaldesign/fractalstyler/presets` is available as a subpath if you would
rather not import from the package root — it ships the functions without the
component.

In a component, import them into the `<script>` block:

```svelte
<script>
	import { setPresetShape } from '@fractaldesign/fractalstyler';
</script>

<button onclick={() => setPresetShape('curved')}>Round the cards</button>
```

#### Reading the current value

`presetState` is the live state object. Read the axis you want off it — the
values are plain, already-narrowed unions:

```js
import { presetState } from '@fractaldesign/fractalstyler';

presetState.size;     // 'sm' | 'md' | 'bs' | 'lg'
presetState.shape;    // 'square' | 'modern' | 'curved' | 'round'
presetState.pad;      // 'sm' | 'md' | 'bs' | 'lg' | 'xl'
presetState.variant;  // 'primary' | 'secondary' | 'soft' | … | 'iconbox'
presetState.initialized; // boolean — has init() run yet?
```

**Read only after `initPresets()`.** The setters call `init()` for you; reading
does not. Until it has run, `presetState` holds the built-in defaults rather than
whatever the returning user last chose — so a stored `lg` reads back as `bs`:

```js
import { initPresets, presetState } from '@fractaldesign/fractalstyler';

initPresets();            // hydrate from localStorage, apply, start watching
presetState.size;         // now the user's real choice
```

Mounting `PresetControls` does the same thing on mount, so if the component is
on the page already you can read straight away. Guard on `initialized` if you
cannot be sure which case you are in:

```js
const size = presetState.initialized ? presetState.size : null;
```

The fields are Svelte 5 runes, so a template updates as the pickers change with
no extra wiring:

```svelte
<script>
	import { presetState } from '@fractaldesign/fractalstyler';
</script>

<p>Size is {presetState.size}, cards are padded {presetState.pad}.</p>
```

Read it reactively elsewhere with `$derived` or `$effect` rather than a bare
read — a plain read at the top of the script takes a one-time snapshot:

```svelte
<script>
	import { presetState } from '@fractaldesign/fractalstyler';

	// reactive — re-runs whenever the preset changes
	const summary = $derived(`${presetState.shape} · ${presetState.pad}`);

	// side-effect form
	$effect(() => {
		document.documentElement.dataset.size = presetState.size;
	});
</script>
```

Types `DataSize`, `DataShape` and `DataPad` come from `libTypes.ts` if you need
to annotate a variable or pass a value on.

To see what actually landed on a node rather than what was requested — useful
when a component declares its own attribute and opts out of the preset — read
the DOM attribute:

```js
document.querySelector('.card')?.getAttribute('data-pad'); // may be the markup's own value
```

#### Building your own picker

The setter types come from `libTypes.ts` — `DataSize`, `DataShape`, `DataPad` —
along with the runtime arrays `SIZES`, `SHAPES`, `VARIANTS`, `PADS`, so you can
build a custom control without re-listing values the registry already owns:

```svelte
<script lang="ts">
	import { setPresetSize, SIZES, presetState, type DataSize } from '@fractaldesign/fractalstyler';
</script>

<select
	class="select"
	value={presetState.size}
	onchange={(event) => setPresetSize(event.currentTarget.value as DataSize)}
>
	{#each SIZES as size}<option value={size}>{size}</option>{/each}
</select>
```

| Export | What it does |
|---|---|
| `setPresetSize(size)` | Sets the size sweep. Accepts `DataSize`. |
| `setPresetShape(shape)` | Sets the shape sweep. Accepts `DataShape`. |
| `setPresetPad(pad)` | Sets card padding. Accepts `DataPad`; `.card` only. |
| `setPresetVariant(variant)` | Sets the control paint. Accepts `DataVariant`; reaches `input.input`, `select.select`, `button.button`, `a.btn` and `.card`. |
| `resetPresets()` | Back to the defaults: `bs` / `modern` / `md` / `primary`. |
| `initPresets()` | Opt into the automatic behaviour alone — restores stored choices, applies them, and watches for new markup. No picker. **Call this before reading `presetState`.** |
| `presetState` | The live state object. Read `presetState.size`, `.shape`, `.pad`, `.variant`, `.initialized`. |
| `SIZES` `SHAPES` `VARIANTS` `PADS` | The runtime arrays behind each union. |
| `PresetControls` | The ready-made component. |

#### Notes

- Everything is browser-only. The setters no-op during SSR, so calling them at
  module scope in a shared file is safe.
- A preset never overwrites an attribute your markup already declares — it only
  fills in what is missing. If a card says `data-pad="sm"`, the pad control will
  not touch it, and reading that element's attribute returns `sm`, not the
  selected preset.
- `data-pad` is written to `.card` only, and `data-variant` only to
  `input.input`, `select.select`, `button.button` and `a.btn`. Size and shape
  sweep the full `presetApplication` set; padding and variant are the two
  class-qualified axes.
- Four axes, four setters. `presetState.variant` starts at `primary` and reads
  back `primary` until the variant preset is changed.

## CLI reference

```sh
npx @fractaldesign/fractalstyler init     # scaffold: mode, docs, intellisense
npx @fractaldesign/fractalstyler eject    # copy styles + palettes + builder
npx @fractaldesign/fractalstyler lint     # contract linter (self or <dir>)
npx @fractaldesign/fractalstyler help     # all options
```

| Option | Default | Meaning |
|---|---|---|
| `--track` / `--eject` | track | How the styles are held |
| `--docs` / `--no-docs` | docs | Copy registry + configuration docs |
| `--docs-dir <dir>` | `fractalstyler/` | Where docs land |
| `--styles-dir <dir>` | `src/lib/styles` | Eject target for the layers |
| `--palette-dir <dir>` | `src/lib/palette` | Eject target for the palettes |
| `--scripts-dir <dir>` | `scripts` | Eject target for the registry builder |
| `--intellisense` / `--no-intellisense` | ask | VS Code extension settings + check |
| `--yes` / `-y` | — | Non-interactive, take the defaults |

`lint` needs the Sass compiler (an optional peer of this package):
`pnpm add -D sass`. Its own flags (`--json`, `--own <file>`, `--registry <f>`)
pass through unchanged.

## MCP Server (Agent Co-pilot)

The package ships with a Model Context Protocol (MCP) server to guide AI coding agents:

```sh
npx @fractaldesign/fractalstyler mcp
```

Or configure in your MCP settings (Claude Desktop, Cursor, Antigravity):

```json
{
  "mcpServers": {
    "fractalstyler": {
      "command": "npx",
      "args": ["-y", "@fractaldesign/fractalstyler", "mcp"]
    }
  }
}
```

Exposes 8 agent tools:
- `guide_styling`: Intent-driven design advisor (gap, typography, layout, cards, buttons).
- `search_classes`: Fast search and filter over the 498 canonical classes.
- `get_tokens`: Inspect space, typography, radius, shadow, and surface tokens.
- `snap_to_tokens`: Snaps raw pixel values to nearest canonical token utility classes.
- `get_recipes`: Verified copy-paste recipes (segmented controls, metrics grids, dialogs, etc.).
- `css_to_classes`: Translates raw CSS declarations into pure Fractalstyler markup.
- `lint_markup`: Validates markup against closed-world styling contracts.
- `get_system_rules`: Returns system constraints and architecture primer.
