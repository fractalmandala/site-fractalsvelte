<script lang="ts">
	import { GraphTable } from '@fractaldesign/machines-ui';
	import Example from '#lib/machines-ui/Example.svelte';
</script>

<Example>
	<GraphTable
		title="WHAT THE RESEARCH COST"
		headers={['Agent', 'Tokens', 'Tool calls', 'Time']}
		align={['left', 'right', 'right', 'right']}
		rows={[
			['Inks and paper', '115,207', '120', '16m'],
			['Overprint and drift', '135,218', '164', '16m'],
			['Naming the patterns', '186,716', '112', '18m']
		]}
		footer={['Total', '437,141', '396', '~50m']}
	/>
</Example>
<Example>
	<GraphTable
		title="TASTE, EXPLAINED"
		headers={['Decision', 'Reason']}
		align={['left', 'left']}
		rows={[
			['ease-out on enter', 'feels snappier'],
			['180ms, not 400ms', 'feels faster, more responsive'],
			['springs for gestures', 'they carry your momentum'],
			['scale 0.97 on press', 'it makes the UI feel alive'],
			['no animation at all', 'you open it hundreds of times']
		]}
	/>
</Example>
