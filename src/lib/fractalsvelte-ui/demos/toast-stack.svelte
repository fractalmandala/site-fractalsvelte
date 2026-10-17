<script lang="ts">
	import { Button, ToastStack } from '@fractaldesign/fractalsvelte-ui';

	let toastCounter = $state(0);
	let activeToasts = $state<
		{ id: string; title: string; message: string; intent?: any; duration: number }[]
	>([]);
	function triggerToast(intent: 'info' | 'success' | 'warning' | 'danger') {
		const id = `toast-${++toastCounter}`;
		const titles = {
			info: 'System Update',
			success: 'Changes Deployed',
			warning: 'Quota Warning',
			danger: 'Deployment Failed'
		};
		const msgs = {
			info: 'Syncing AST metadata across 106 components.',
			success: 'All verification checks passed with zero drift.',
			warning: 'API usage has reached 85% of monthly allowance.',
			danger: 'Connection timed out while querying database.'
		};
		activeToasts = [
			...activeToasts,
			{ id, title: titles[intent], message: msgs[intent], intent, duration: 3500 }
		];
	}
</script>

<div class="box gap-md wfull">
	<div class="row ycenter xcenter gap-sm wrap wfull">
		<Button size="sm" variant="primary" onclick={() => triggerToast('info')}>Toast Info</Button>
		<Button size="sm" variant="secondary" onclick={() => triggerToast('success')}
			>Toast Success</Button
		>
		<Button size="sm" variant="soft" onclick={() => triggerToast('warning')}>Toast Warning</Button>
		<Button size="sm" variant="destructive" onclick={() => triggerToast('danger')}
			>Toast Danger</Button
		>
	</div>
	<div class="text-body-sm text-muted ta-c">
		Click buttons to spawn stacked toast alerts with auto-dismiss timers and progress bars.
	</div>
	<ToastStack bind:toasts={activeToasts} position="bottom-right" />
</div>
