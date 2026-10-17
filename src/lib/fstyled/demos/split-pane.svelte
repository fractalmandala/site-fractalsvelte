<script lang="ts">
	import { SplitPane } from '@fractaldesign/fractalsvelte-ui/styler';

	let collapsed = $state<'a' | 'b' | null>(null);
</script>

<div class="box gap-sm wfull">
	<SplitPane bind:collapsed>
		{#snippet paneA()}<div class="pad-md text-body-sm">
				Pane A — drag the divider, or focus it and use the arrow keys.
			</div>{/snippet}
		{#snippet paneB()}<div class="pad-md text-body-sm">Pane B</div>{/snippet}
	</SplitPane>
	<p class="text-body-sm text-secondary">Collapsed: {collapsed ?? 'none'}</p>
</div>
