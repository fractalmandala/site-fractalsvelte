<script lang="ts">
	import { GraphActivity } from '@fractaldesign/machines-ui';
	import MachineDoc from '#lib/machines-ui/MachineDoc.svelte';
	import Example from '#lib/machines-ui/Example.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	function activityDays(start: string, length: number) {
		const [year, month, day] = start.split('-').map(Number);
		const origin = Date.UTC(year, month - 1, day);
		return Array.from({ length }, (_, index) => {
			const time = origin + index * 86_400_000;
			const date = new Date(time).toISOString().slice(0, 10);
			const dow = new Date(time).getUTCDay();
			const week = Math.floor(index / 7);
			let count = 0;
			if (dow > 0 && dow < 6) {
				const pulse = (week + dow) % 9;
				count =
					pulse === 0 ? 12 : pulse === 4 ? 7 : pulse % 3 === 0 ? 3 : index % 5 === 0 ? 1 : 0;
			} else if (index % 13 === 0) {
				count = 2;
			}
			return { date, count };
		});
	}

	const yearActivity = activityDays('2025-09-01', 371);

	const quarterActivity = activityDays('2026-06-01', 91);
</script>

<MachineDoc doc={data.component} crumbs={data.seo.breadcrumbs}>
	<Example>
		<GraphActivity title="COMMITS" palette="multi" days={yearActivity} />
	</Example>
	<Example>
		<GraphActivity
			title="SHIPPED"
			weekStartsOn={1}
			glyphs="ascii"
			days={quarterActivity}
			caption="Jun – Aug"
		/>
	</Example>
</MachineDoc>
