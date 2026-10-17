<script lang="ts">
	import { Marquee, Badge, Tag } from '@fractaldesign/fractalsvelte-ui/styler';

	const words = ['Svelte', 'SvelteKit', 'fractalstyler', 'fractalicons', 'Runes', 'SMIL', 'Canvas'];
</script>

<div class="box gap-md wfull">
	<Marquee>
		{#each words as w (w)}<Badge variant="surface">{w}</Badge>{/each}
	</Marquee>
	<Marquee reverse speed={70} gap="md">
		{#each words as w (w)}<Tag variant="outline">{w}</Tag>{/each}
	</Marquee>
</div>
