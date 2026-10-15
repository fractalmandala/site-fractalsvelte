---
title: "Token reference"
description: "The type, space, radius, colour and motion tokens, and the classes each one emits."
source: "packages/fractalstyler/skills/fractalstyler/references/tokens.md"
---
# Fractalstyler — Token Reference

Every `--space-*` step is a class family: if `--space-md` exists, so do
`.gap-md`, `.pad-md` and `.mar-md` (plus the `.px`/`.py`/`.pt`… sides).
There is no second vocabulary to learn.

## Type Scale

Fixed rem rungs up to base, then compounded by `--text-scaling` (1.25).

| Token | Class | Value |
|:---|:---|:---|
| `--text-xs` | `.text-xs` | `0.67rem` |
| `--text-sm` | `.text-sm` | `0.75rem` |
| `--text-md` | `.text-md` | `0.875rem` |
| `--text-bs` | `.text-bs` | `1rem` |
| `--text-lg` | `.text-lg` | `calc(var(--text-bs) * var(--text-scaling))` |
| `--text-xl` | `.text-xl` | `calc(var(--text-lg) * var(--text-scaling))` |
| `--text-2xl` | `.text-2xl` | `calc(var(--text-xl) * var(--text-scaling))` |
| `--text-3xl` | `.text-3xl` | `calc(var(--text-2xl) * var(--text-scaling))` |
| `--text-4xl` | `.text-4xl` | `calc(var(--text-3xl) * var(--text-scaling))` |
| `--text-5xl` | `.text-5xl` | `calc(var(--text-4xl) * var(--text-scaling))` |

| Token | Class | Value |
|:---|:---|:---|
| `--text-scaling` | — | `1.25` |

## Space Scale

`--unit-space` (0.25rem) times a step multiplier. Every step feeds the
gap/pad/mar families in L1.

| Token | Class | Value |
|:---|:---|:---|
| `--unit-space` | — | `0.25rem` |

| Token | Class | Value |
|:---|:---|:---|
| `--space-xs` | `.gap-xs` `.pad-xs` `.mar-xs` + sides | `var(--unit-space)` |
| `--space-sm` | `.gap-sm` `.pad-sm` `.mar-sm` + sides | `calc(var(--unit-space) * 2)` |
| `--space-md` | `.gap-md` `.pad-md` `.mar-md` + sides | `calc(var(--unit-space) * 3)` |
| `--space-bs` | `.gap-bs` `.pad-bs` `.mar-bs` + sides | `calc(var(--unit-space) * 4)` |
| `--space-lg` | `.gap-lg` `.pad-lg` `.mar-lg` + sides | `calc(var(--unit-space) * 6)` |
| `--space-xl` | `.gap-xl` `.pad-xl` `.mar-xl` + sides | `calc(var(--unit-space) * 8)` |
| `--space-2xl` | `.gap-2xl` `.pad-2xl` `.mar-2xl` + sides | `calc(var(--unit-space) * 12)` |
| `--space-3xl` | `.gap-3xl` `.pad-3xl` `.mar-3xl` + sides | `calc(var(--unit-space) * 16)` |

## Radius

Six channels. Compositions read the tokens, never a literal radius.

| Token | Class | Value |
|:---|:---|:---|
| `--radius-xs` | `.radius-xs` | `2px` |
| `--radius-sm` | `.radius-sm` | `4px` |
| `--radius-md` | `.radius-md` | `8px` |
| `--radius-bs` | `.radius-bs` | `16px` |
| `--radius-lg` | `.radius-lg` | `32px` |
| `--radius-full` | `.radius-full` | `9999px` |

## Control & Component Metrics

Heights for inputs, selects and buttons; avatar and switch channels.

| Token | Class | Value |
|:---|:---|:---|
| `--avatar-size` | — | `32px` |
| `--switch-w` | — | `40px` |
| `--switch-h` | — | `22px` |
| `--switch-thumb` | — | `16px` |
| `--height-sm` | `.h-sm` | `20px` |
| `--height-md` | `.h-md` | `24px` |
| `--height-bs` | `.h-bs` | `28px` |
| `--height-lg` | `.h-lg` | `32px` |
| `--height-xl` | `.h-xl` | `40` |

## Motion Language

Durations, easings and the composed `--motion*` channels every transition reads.

| Token | Class | Value |
|:---|:---|:---|
| `--transin1` | — | `cubic-bezier(0.470, 0.000, 0.745, 0.715)` |
| `--transin2` | — | `cubic-bezier(0.550, 0.055, 0.675, 0.190)` |
| `--transin3` | — | `cubic-bezier(0.755, 0.050, 0.855, 0.060)` |
| `--transout1` | — | `cubic-bezier(0.390, 0.575, 0.565, 1.000)` |
| `--transout2` | — | `cubic-bezier(0.215, 0.610, 0.355, 1.000)` |
| `--transout3` | — | `cubic-bezier(0.230, 1.000, 0.320, 1.000)` |
| `--speed0` | — | `50ms` |
| `--speed1` | — | `90ms` |
| `--speed2` | — | `140ms` |
| `--speed3` | — | `220ms` |
| `--motionin1` | — | `var(--speed0) var(--transin1)` |
| `--motionout1` | — | `var(--speed1) var(--transout1)` |
| `--motionin2` | — | `var(--speed2) var(--transin2)` |
| `--motionout2` | — | `var(--speed2) var(--transout2)` |
| `--motionin3` | — | `var(--speed3) var(--transin3)` |
| `--motionout3` | — | `var(--speed3) var(--transout3)` |

## Colour Roles

Name the role, never the hex. Values shown are the light default;
`[data-mode='dark']` remaps them via `=dark-theme-tokens`.

| Token | Class | Value |
|:---|:---|:---|
| `--white-fixed` | `.text-white` | `#FFFFFF` |
| `--black-fixed` | `.text-black` | `#18181B` |
| `--bg` | `.bg-main` | `#F8F9FA` |
| `--bg-surface` | `.bg-surface` | `#FFFFFF` |
| `--bg-panel` | `.bg-panel` | `#FFFFFF` |
| `--bg-sunken` | `.bg-sunken` | `#F0F1F3` |
| `--bg-raised` | `.bg-raised` | `#FFFFFF` |
| `--bg-extra` | `.bg-extra` | `#EAECEF` |
| `--bg-input` | — | `#F0F1F3` |
| `--bg-button` | — | `#ECEEF1` |
| `--text-primary` | .text-primary | `#18181B` |
| `--text-secondary` | .text-secondary | `#6B7280` |
| `--text-muted` | .text-muted | `#9CA3AF` |
| `--text-inverse` | .text-inverse | `#FFFFFF` |
| `--state-surface` | — | `#F4F4F6` |
| `--state-hover` | — | `#ECEEF1` |
| `--state-selected` | — | `#E2E4E8` |
| `--border` | — | `#E5E7EB` |
| `--border-subtle` | — | `#F0F1F3` |
| `--border-strong` | — | `#D1D5DB` |
| `--theme-color` | `.text-theme` | `#22c55e` |
| `--theme-color-alt` | `.text-theme-alt` | `#00df89` |
| `--theme-color-sub` | `.text-theme-sub` | `#10b981` |
| `--success` | `.text-success` `.bg-success` | `#10B981` |
| `--success-hover` | — | `#059669` |
| `--warning` | `.text-warning` `.bg-warning` | `#FFD000` |
| `--warning-hover` | — | `#E5B800` |
| `--danger` | `.text-danger` `.bg-danger` | `#EF4444` |
| `--danger-hover` | — | `#DC2626` |
| `--info` | `.text-info` `.bg-info` | `#3B82F6` |
| `--info-hover` | — | `#2563EB` |
| `--ring` | — | `rgba(255, 208, 0, 0.4)` |

## Elevation

`--shadow-*` channels are what the `.shadow-*` classes read; `--shade-*` are
loop-generated from `$shadow-specs` in `_00_config.sass` (rim + key + ambient).

| Token | Class | Value |
|:---|:---|:---|
| `--shadow-color` | — | `0 0 0` |
| `--shadow-rim` | — | `inset 0 1px 0 rgba(255, 255, 255, 0.6)` |
| `--shadow-xs` | `.shadow-xs` | `0 1px 2px rgb(var(--shadow-color) / 0.05)` |
| `--shadow-sm` | `.shadow-sm` | `0 1px 2px rgb(var(--shadow-color) / 0.06), 0 2px 4px rgb(var(--shadow-color) / 0.04)` |
| `--shadow-md` | `.shadow-md` | `0 2px 4px rgb(var(--shadow-color) / 0.05), 0 8px 16px rgb(var(--shadow-color) / 0.05)` |
| `--shadow-bs` | `.shadow-bs` | `0 2px 4px rgb(var(--shadow-color) / 0.05), 0 6px 14px rgb(var(--shadow-color) / 0.05)` |
| `--shadow-lg` | `.shadow-lg` | `0 4px 8px rgb(var(--shadow-color) / 0.06), 0 12px 24px rgb(var(--shadow-color) / 0.06)` |
| `--shadow-xl` | `.shadow-xl` | `0 8px 16px rgb(var(--shadow-color) / 0.07), 0 20px 36px rgb(var(--shadow-color) / 0.07)` |
| `--shadow-2xl` | `.shadow-2xl` | `0 12px 24px rgb(var(--shadow-color) / 0.08), 0 28px 48px rgb(var(--shadow-color) / 0.08)` |
| `--shadow-3xl` | `.shadow-3xl` | `0 16px 32px rgb(var(--shadow-color) / 0.10), 0 36px 64px rgb(var(--shadow-color) / 0.10)` |
| `--shadow-umbra` | — | `rgb(0 0 0 / 0.60)` |
| `--shade-xs` | — | `var(--shadow-rim), 0 1px 1px rgb(var(--shadow-color) / 0.14), 0 0px 0px rgb(var(--shadow-color) / 0.00)` |
| `--shade-sm` | — | `var(--shadow-rim), 0 1px 2px rgb(var(--shadow-color) / 0.12), 0 1px 3px rgb(var(--shadow-color) / 0.02)` |
| `--shade-md` | — | `var(--shadow-rim), 0 2px 4px rgb(var(--shadow-color) / 0.09), 0 3px 6px rgb(var(--shadow-color) / 0.04)` |
| `--shade-bs` | — | `var(--shadow-rim), 0 2px 4px rgb(var(--shadow-color) / 0.06), 0 6px 14px rgb(var(--shadow-color) / 0.06)` |
| `--shade-lg` | — | `var(--shadow-rim), 0 4px 8px rgb(var(--shadow-color) / 0.04), 0 12px 24px rgb(var(--shadow-color) / 0.08)` |
| `--shade-xl` | — | `var(--shadow-rim), 0 6px 12px rgb(var(--shadow-color) / 0.03), 0 20px 36px rgb(var(--shadow-color) / 0.09)` |
| `--shade-2xl` | — | `var(--shadow-rim), 0 8px 16px rgb(var(--shadow-color) / 0.02), 0 28px 48px rgb(var(--shadow-color) / 0.09)` |
| `--shade-3xl` | — | `var(--shadow-rim), 0 12px 24px rgb(var(--shadow-color) / 0.02), 0 36px 64px rgb(var(--shadow-color) / 0.08)` |
| `--shadow-color` | — | `0 0 0` |
| `--shadow-rim` | — | `inset 0 1px 0 rgba(255, 255, 255, 0.6)` |

## Fonts, Layout Constants & Page Chrome

Font stacks plus the page geometry the shells and viewport classes read.

| Token | Class | Value |
|:---|:---|:---|
| `--header-height` | — | `64px` |
| `--footer-height` | — | `32px` |
| `--fit-height` | — | `calc(var(--header-height) + var(--footer-height))` |
| `--prose-clamp` | — | `65ch` |
| `--content-clamp` | — | `1600px` |
| `--app-inline` | — | `var(--space-lg)` |
| `--card-min` | — | `240px` |
| `--sidebar-width` | — | `280px` |
| `--sidebar-width-left` | — | `280px` |
| `--sidebar-width-right` | — | `280px` |
| `--z-sticky` | — | `100` |
| `--z-raised` | — | `200` |
| `--z-modal` | — | `300` |
| `--z-toast` | — | `500` |

## Pop Colors

Named accent literals. The `.orange1`…`.orange6` ink classes read
`--orangepop*`; the green set is reserved for future use.

| Token | Class | Value |
|:---|:---|:---|
| `--greenpop1` | — | `#10b981` |
| `--greenpop2` | — | `#22c55e` |
| `--greenpop3` | — | `#00df89` |
| `--greenpop4` | — | `#00e676` |
| `--orangepop1` | `.orange1` | `#ff7a00` |
| `--orangepop2` | `.orange2` | `#f97316` |
| `--orangepop3` | `.orange3` | `#ea580c` |
| `--orangepop4` | `.orange4` | `#ff5e36` |
| `--orangepop5` | `.orange5` | `#ff9966` |
| `--orangepop6` | `.orange6` | `#ff9f1c` |

## Modes & Attribute Axes

`data-mode` on the root selects the token mixin: `light` (default) or `dark`.

| Attribute | Where | Values | Effect |
|:---|:---|:---|:---|
| `data-mode` | `<html>` | `light` \| `dark` | Swaps `=light-theme-tokens` / `=dark-theme-tokens` |
| `data-shape` | `.card`, `button`, `a.btn`, `.input`, `.select`, `.fsx-accordion-item` | `square` \| `modern` \| `curved` \| `round` | Corner treatment of the component |
| `data-variant` | `.card`, `button`, `a.btn`, `.input`, `.select`, `.fsx-accordion-item` | `primary` \| `secondary` \| `soft` \| `outline` \| `ghost` \| `link` \| `destructive` | Visual paint variant |
| `data-size` | `.card`, `button`, `a.btn`, `.input`, `.select`, `.fsx-accordion-item` | `sm` \| `md` \| `bs` \| `lg` | Metrics / scale variant |
