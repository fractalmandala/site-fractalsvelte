<script lang="ts">
	import { Badge, MorphingTabs } from '@fractaldesign/fractalsvelte-ui';

	let morphTabVal = $state('tab1');
</script>

<div class="box gap-md wfull">
	<MorphingTabs
		bind:value={morphTabVal}
		items={[
			{ id: 'tab1', label: 'All Projects', badge: '12' },
			{ id: 'tab2', label: 'Active Tasks', badge: '5' },
			{ id: 'tab3', label: 'Deployment Logs' },
			{ id: 'tab4', label: 'Archive' }
		]}
	/>
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Badge variant="primary">Active Tab: {morphTabVal}</Badge>
	</div>
</div>
