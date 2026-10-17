<script lang="ts">
	import { Blockquote } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-lg wfull">
	<Blockquote
		quote="Simplicity is prerequisite for reliability."
		author="Edsger Dijkstra"
		citation="EWD498"
	/>
	<Blockquote icon={false} author="Anonymous">
		<p class="text-body">A quote passed as children, without the icon.</p>
	</Blockquote>
</div>
