<script lang="ts">
	import { ToastStack, Button } from '@fractaldesign/fractalsvelte-ui/styler';
	import type { ToastItem } from '@fractaldesign/fractalsvelte-ui/styler';

	let toasts = $state<ToastItem[]>([]);
	let n = 0;
	function push(intent: ToastItem['intent']) {
		n += 1;
		toasts = [
			...toasts,
			{
				id: `t${n}`,
				intent,
				title: `Toast #${n}`,
				message: 'Dismisses itself in 5s.',
				duration: 5000
			}
		];
	}
</script>

<div class="box gap-md wfull">
	<div class="row ycenter xcenter gap-sm wrap">
		<Button variant="secondary" onclick={() => push('success')}>Success toast</Button>
		<Button variant="secondary" onclick={() => push('danger')}>Danger toast</Button>
	</div>
	<p class="text-body-sm text-secondary ta-c">
		Floating toasts appear at the top-left of the window. Inline stack:
	</p>
	<ToastStack
		position="inline"
		toasts={[
			{
				id: 'i1',
				title: 'Inline toast',
				message: 'Placed where you put it.',
				intent: 'info',
				duration: 0
			}
		]}
	/>
</div>
<ToastStack bind:toasts />
