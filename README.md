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

Everything under "Documentation" is copied from the packages themselves, then
rendered by [mdsvex](https://mdsvex.pngwn.io) with code highlighted by
`@fractaldesign/pop-mdsvex`. Every markdown element is mapped to fractalstyler
classes in `src/lib/mdsvex/DocLayout.svelte`.

| Source                                                 | Becomes                                |
| ------------------------------------------------------ | -------------------------------------- |
| Each package's README, from npm                        | The README section of its package page |
| fractalstyler `docs/`, `skills/`, VS Code README       | Guides under `/fractalstyler/docs/*`   |
| fractalstyler `data/recipes.json`                      | `/fractalstyler/docs/recipes`, live    |
| fractalsvelte-ui `src/lib/documentation/manifest.json` | `/fractalsvelte-ui/components/*`       |
| machines-ui `src/docs/data/components.json`            | `/machines-ui/components/*`            |

```sh
pnpm docs:sync   # both of the below
pnpm docs:copy   # package folders (../../packages, or $FRACTAL_PACKAGES) → src/content/docs, src/lib/generated/components
pnpm docs:npm    # npm READMEs, versions and descriptions → src/content/readme, src/lib/generated/registry.json
```

Run it after changing a package's docs or publishing, then rebuild. Generated
files are excluded from prettier so they stay verbatim. The project pages'
summaries, features and quick starts are written by hand in `src/lib/site.ts`.

## Commands

```sh
pnpm dev             # dev server
pnpm build           # prerenders every page
pnpm check           # svelte-check
pnpm lint:styles     # fractalstyler contract linter (.svelte + stylesheets)
pnpm check:classes   # after build: every class in the HTML resolves to the registry or _09_own
```
