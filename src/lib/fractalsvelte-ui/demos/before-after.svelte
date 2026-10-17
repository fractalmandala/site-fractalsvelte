<script lang="ts">
	import { BeforeAfter } from '@fractaldesign/fractalsvelte-ui';

	let position = $state(50);
</script>

<div class="fs-measure-lg box gap-sm">
	<BeforeAfter bind:position beforeLabel="Light" afterLabel="Dark">
		{#snippet before()}
			<div
				class="box ycenter pad-xl full bg-surface text-primary page-heading-bs"
				data-theme="light"
			>
				Light surface
			</div>
		{/snippet}
		{#snippet after()}
			<div class="box ycenter xright pad-xl full bg-sunken text-theme page-heading-bs">
				Sunken surface
			</div>
		{/snippet}
	</BeforeAfter>
	<p class="text-body-sm text-muted ta-c">Divider at {Math.round(position)}%</p>
</div>
