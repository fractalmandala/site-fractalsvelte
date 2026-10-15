# fractalsvelte

The showcase and documentation site for the fractaldesign packages: install
instructions, quick starts and full docs for every package.

| Project          | Packages                                                       |
| ---------------- | -------------------------------------------------------------- |
| fractalstyler    | `@fractaldesign/fractalstyler`                                 |
| fractalsvelte-ui | `@fractaldesign/fractalsvelte-ui`                              |
| machines-ui      | `@fractaldesign/machines-ui`                                   |
| fractalpop       | `@fractaldesign/pop`, `pop-svelte`, `pop-mdsvex`, `pop-remark` |

## Design: fractalstyler only

Every page is composed from the [fractalstyler](https://www.npmjs.com/package/@fractaldesign/fractalstyler)
class registry. There are no component `<style>` blocks, no inline styles and no
other CSS framework.

- `src/lib/styles/_00_tokens.sass` configures fractalstyler's tokens: fonts
  (Google Sans Flex; Google Sans Code for code only), the orange theme colour,
  the light and dark palettes, and the fractalpop token colours. It is the only
  file allowed to hold raw colour values.
- `src/lib/styles/_09_own.sass` is the sanctioned extension layer: the dashed
  frame and its caption and corner marks, the hairline shelf, the section
  kicker, and base rules that keep monospace on code only.

## Docs content

Each package's README is pulled from the npm registry, so the docs match what
`pnpm add` installs. Versions and descriptions come from the same sync.

```sh
pnpm docs:sync   # refresh src/content/*.md and src/lib/generated/registry.json
```

Run it after publishing a package, then rebuild. The project pages' summaries,
features and quick starts are written by hand in `src/lib/site.ts`.

## Commands

```sh
pnpm dev             # dev server
pnpm build           # prerenders every page
pnpm check           # svelte-check
pnpm lint:styles     # fractalstyler contract linter (.svelte + stylesheets)
pnpm check:classes   # after build: every class in the HTML resolves to the registry or _09_own
```
