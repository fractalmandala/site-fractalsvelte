<script lang="ts">
	import { LinkButton } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luArrowRight } from 'fractalicons/lucide';
</script>

<div class="row ycenter xcenter gap-sm wrap">
	<LinkButton href="https://svelte.dev" external size="lg">Svelte docs</LinkButton>
	<LinkButton href="/fstyled" variant="primary" size="lg">All components</LinkButton>
	<LinkButton href="/fstyled/button" variant="ghost" size="lg">
		Button
		{#snippet trailing()}<Icon icon={luArrowRight} />{/snippet}
	</LinkButton>
</div>
