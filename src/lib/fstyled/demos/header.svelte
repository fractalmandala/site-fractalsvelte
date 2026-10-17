<script lang="ts">
	import { Header, SearchInput, ThemeToggle, Button } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-md wfull">
	<Header sticky={false}>
		{#snippet brand()}<span class="page-heading-bs">Fractal</span>{/snippet}
		{#snippet center()}<SearchInput placeholder="Search…" size="md" />{/snippet}
		{#snippet actions()}<ThemeToggle /><Button size="md">Sign in</Button>{/snippet}
	</Header>
</div>
