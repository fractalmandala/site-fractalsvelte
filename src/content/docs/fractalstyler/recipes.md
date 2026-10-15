---
title: "Recipes"
description: "Verified compositions for common patterns, rendered live on this page."
source: "packages/fractalstyler/data/recipes.json"
---
Each recipe is a composition verified against the registry. The preview above each one is the markup below it, rendered by this site's own copy of fractalstyler.



## Segmented control

For: segmented control · mode switcher · view switcher · tab selector

<div class="border radius-sm pad-lg bg-surface relative">
<div class="row ycenter shrink-0 pad-xs bg-raised border radius-sm">
	<button data-variant="primary" data-size="sm" aria-pressed="true">View</button>
	<button data-variant="ghost" data-size="sm" aria-pressed="false">Split</button>
</div>
</div>

```svelte
<div class="row ycenter shrink-0 pad-xs bg-raised border radius-sm">
	<button data-variant="primary" data-size="sm" aria-pressed="true">View</button>
	<button data-variant="ghost" data-size="sm" aria-pressed="false">Split</button>
</div>
```

There is no .active class — the selected segment is the one carrying data-variant="primary" while its siblings stay ghost. Drive selection with aria-pressed and swap the variant when it changes.

## Search input bar

For: search · command search · filter input · omnibar

<div class="border radius-sm pad-lg bg-surface relative">
<div class="row ycenter gap-xs px-xs py-xs bg-surface border radius-sm grow min0">
	<span class="text-muted text-xs">⌕</span>
	<input class="input grow min0 text-sm" data-variant="ghost" type="search" placeholder="Search entries…" />
	<span class="text-xs text-muted shrink-0">⌘K</span>
</div>
</div>

```svelte
<div class="row ycenter gap-xs px-xs py-xs bg-surface border radius-sm grow min0">
	<span class="text-muted text-xs">⌕</span>
	<input class="input grow min0 text-sm" data-variant="ghost" type="search" placeholder="Search entries…" />
	<span class="text-xs text-muted shrink-0">⌘K</span>
</div>
```

Provide an accessible label when no visible label is present. There is no .kbd class — a bare span carries the shortcut hint.

## Responsive metrics grid

For: metrics · kpi · analytics · dashboard cards · stat grid

<div class="border radius-sm pad-lg bg-surface relative">
<div class="grid-4 gap-sm">
	<div class="card box ycenter xcenter gap-xs" data-variant="primary" data-pad="sm">
		<span class="text-xl weight-600 text-primary">99.98%</span>
		<span class="text-xs text-muted">Availability</span>
	</div>
</div>
</div>

```svelte
<div class="grid-4 gap-sm">
	<div class="card box ycenter xcenter gap-xs" data-variant="primary" data-pad="sm">
		<span class="text-xl weight-600 text-primary">99.98%</span>
		<span class="text-xs text-muted">Availability</span>
	</div>
</div>
```

Repeat the card child for each metric; grid-4 owns responsive column stepping. Card padding rides data-pad — cards have no data-size, and data-variant already paints the surface, so no .bg-* class is needed.

## Profile action row

For: profile row · user list · avatar actions · user card

<div class="border radius-sm pad-lg bg-surface relative">
<div class="row ycenter xbetween gap-sm pad-sm bg-surface border radius-md">
	<div class="row ycenter gap-sm min0">
		<span class="chip shrink-0">AV</span>
		<div class="box min0 gap-xs"><span class="text-sm weight-600 truncate">Alex Vance</span><span class="text-xs text-muted truncate">alex@example.com</span></div>
	</div>
	<button class="icon text-muted" aria-label="More actions">⋯</button>
</div>
</div>

```svelte
<div class="row ycenter xbetween gap-sm pad-sm bg-surface border radius-md">
	<div class="row ycenter gap-sm min0">
		<span class="chip shrink-0">AV</span>
		<div class="box min0 gap-xs"><span class="text-sm weight-600 truncate">Alex Vance</span><span class="text-xs text-muted truncate">alex@example.com</span></div>
	</div>
	<button class="icon text-muted" aria-label="More actions">⋯</button>
</div>
```

There is no .avatar class — .chip carries the initials. Give the image meaningful alt text when it conveys information not already present in adjacent text.

## Settings switch row

For: settings · toggle · switch · preference row

<div class="border radius-sm pad-lg bg-surface relative">
<div class="row ycenter xbetween gap-md py-sm bb">
	<div class="box gap-xs"><span class="text-sm weight-500">Enable telemetry</span><span class="text-xs text-muted">Collect anonymized traces.</span></div>
	<label class="checkbox-wrapper"><input type="checkbox" checked /><span>On</span></label>
</div>
</div>

```svelte
<div class="row ycenter xbetween gap-md py-sm bb">
	<div class="box gap-xs"><span class="text-sm weight-500">Enable telemetry</span><span class="text-xs text-muted">Collect anonymized traces.</span></div>
	<label class="checkbox-wrapper"><input type="checkbox" checked /><span>On</span></label>
</div>
```

There is no switch-track / switch-thumb / .checked class — the system ships no switch component, so use a native checkbox inside .checkbox-wrapper. Partition borders are .bb and .bt, not .border-bottom.

## Action dialog

For: dialog · modal · confirmation · alert modal

<div class="border radius-sm pad-lg bg-surface relative">
<dialog open class="relative bg-surface border radius-md">
	<header class="row ycenter xbetween px-md py-sm bb"><h3 class="text-sm weight-600">Confirm action</h3><button class="icon text-muted" aria-label="Close">×</button></header>
	<div class="box gap-sm pad-md"><p class="text-sm text-secondary">Review this action before continuing.</p></div>
	<footer class="row ycenter xright gap-xs px-md py-sm bt bg-raised"><button data-variant="ghost" data-size="sm">Cancel</button><button data-variant="primary" data-size="sm">Continue</button></footer>
</dialog>
</div>

```svelte
<dialog class="bg-surface border radius-md">
	<header class="row ycenter xbetween px-md py-sm bb"><h3 class="text-sm weight-600">Confirm action</h3><button class="icon text-muted" aria-label="Close">×</button></header>
	<div class="box gap-sm pad-md"><p class="text-sm text-secondary">Review this action before continuing.</p></div>
	<footer class="row ycenter xright gap-xs px-md py-sm bt bg-raised"><button data-variant="ghost" data-size="sm">Cancel</button><button data-variant="primary" data-size="sm">Continue</button></footer>
</dialog>
```

Use the native dialog API and return focus to the invoking control. There is no .dialog class and no .pad-0 (the ladder starts at .pad-xs) — put the padding on the inner regions instead.

## Dropdown action menu

For: dropdown · action menu · popover menu · context menu

<div class="border radius-sm pad-lg bg-surface relative pb-3xl">
<div class="relative">
	<button data-variant="ghost" aria-expanded="true" aria-haspopup="menu">Actions</button>
	<div class="absolute box gap-xs pad-xs bg-surface border shadow-md radius-md" role="menu">
		<button data-variant="ghost" data-size="sm" class="wfull ta-l" role="menuitem">Duplicate</button>
		<button data-variant="ghost" data-size="sm" class="wfull ta-l text-danger" role="menuitem">Delete</button>
	</div>
</div>
</div>

```svelte
<div class="relative">
	<button data-variant="ghost" aria-expanded="true" aria-haspopup="menu">Actions</button>
	<div class="absolute box gap-xs pad-xs bg-surface border shadow-md radius-md" role="menu">
		<button data-variant="ghost" data-size="sm" class="wfull ta-l" role="menuitem">Duplicate</button>
		<button data-variant="ghost" data-size="sm" class="wfull ta-l text-danger" role="menuitem">Delete</button>
	</div>
</div>
```

There is no .popover or .open class — show and hide the panel with the native hidden attribute or a framework conditional. .xleft is a container modifier and does not apply to buttons; use .ta-l to align menu item text.

## Application status bar

For: status bar · footer status · connection state · app footer

<div class="border radius-sm pad-lg bg-surface relative">
<footer class="app-footer row ycenter xbetween px-sm text-xs text-muted bt bg-surface">
	<div class="row ycenter gap-xs"><span class="chip">Connected</span></div>
	<div class="row ycenter gap-sm"><span>Ln 42, Col 18</span><span>UTF-8</span></div>
</footer>
</div>

```svelte
<footer class="app-footer row ycenter xbetween px-sm text-xs text-muted bt bg-surface">
	<div class="row ycenter gap-xs"><span class="chip">Connected</span></div>
	<div class="row ycenter gap-sm"><span>Ln 42, Col 18</span><span>UTF-8</span></div>
</footer>
```

Do not rely on color alone for connection state. There is no .square-6 class — .chip carries the state label.
