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
- `src/lib/styles/_00_fonts.sass` self-hosts Google Sans Flex and Google Sans
  Code from `static/fonts/` (Flex is preloaded in `app.html`).
- `src/lib/styles/_09_own.sass` is the sanctioned extension layer: the dashed
  frame and its caption and corner marks, the hairline shelf, the section
  kicker, and base rules that keep monospace on code only.

The one exception is `og/`, outside `src/`: share-image templates rendered by
satori, which only understands inline styles. Their colours mirror
`_00_tokens.sass` in `og/tokens.ts`.

## Fonts

`fonts/source/` holds the full variable fonts. `pnpm fonts` (needs a `.venv`
with `fonttools` and `brotli`) trims them into `static/fonts/` (Flex: 1.9 MB →
~130 KB, weight and optical size kept) and writes the static TTFs the share
images need into `og/fonts/`.

## SEO

Production URL: `https://fractalsvelte.dev` (`SITE_URL` in `src/lib/seo.ts`).

- Every route's load returns a `seo` object (title ≤60, description ≤160,
  path, breadcrumbs, JSON-LD); `src/lib/components/Seo.svelte` in the layout
  turns it into the title, description, canonical, Open Graph, X card and one
  JSON-LD `@graph` (WebSite + Organization + BreadcrumbList + the page's own
  SoftwareSourceCode / TechArticle / CollectionPage nodes).
- Search copy for project and package pages is hand-written in `site.ts`
  (`seo` fields); guides and components derive theirs, components lead with the
  phrase people search ("A Svelte 5 split button component for SvelteKit…").
- `src/lib/server/pages.ts` lists every page once. It feeds:
  - `/og/<path>.png` — a 1200×630 share image per page (`og/Card.svelte`,
    rendered by `@ethercorps/sveltekit-og` at build time);
  - `/sitemap.xml` (with lastmod from npm publish dates) and `/robots.txt`;
  - `/llms.txt` and `/llms-full.txt` for AI assistants and AI search.
- Icons (`/favicon.png`, `/apple-touch-icon.png`, `/icon-192.png`,
  `/icon-512.png`) come from `og/Icon.svelte`; `/manifest.webmanifest` lists them.

Card text can't contain `&` or `<`: satori-html prints entities literally, so
`pages.ts` swaps them out.

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
pnpm build           # prerenders every page, share image and icon (Vercel output)
pnpm check           # svelte-check
pnpm lint:cui        # workspace cui-lint over every .svelte file (it only reads files passed explicitly)
pnpm check:classes   # after build: every class in the HTML resolves to the registry or _09_own
pnpm check:seo       # after build: titles, descriptions, canonicals, share images, JSON-LD, one h1
pnpm lint            # prettier
```

`fractalstyler lint` is not wired in: in consumer mode (1.2.0) it flags the
registry's own modifiers (`row ycenter`, `a.btn`, `.content-section.narrow-wide`)
and Svelte class expressions, and `fractalstyler lint .` audits the fractalstyler
package itself rather than this project.
