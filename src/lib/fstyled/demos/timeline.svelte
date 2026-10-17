<script lang="ts">
	import { Timeline } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-xl wfull">
	<Timeline
		items={[
			{ title: 'Kickoff', time: 'Mon', description: 'Scope agreed.' },
			{
				title: 'Build',
				time: 'Wed',
				intent: 'info',
				active: true,
				description: 'Components in progress.'
			},
			{ title: 'Ship', time: 'Fri', intent: 'success' }
		]}
	/>
	<Timeline
		align="alternate"
		items={[
			{ title: 'Design', time: 'Q1' },
			{ title: 'Port', time: 'Q2', intent: 'warning' },
			{ title: 'Publish', time: 'Q3', intent: 'success' }
		]}
	/>
</div>
