<script lang="ts">
	import { Button, Toast } from '@fractaldesign/fractalsvelte-ui';

	const toasts = [
		{
			id: 'saved',
			intent: 'success',
			title: 'Changes saved',
			message: 'Your profile is up to date.'
		},
		{
			id: 'sync',
			intent: 'info',
			title: 'Syncing',
			message: 'Pulling the latest changes from main.'
		},
		{
			id: 'quota',
			intent: 'warning',
			title: 'Quota at 85%',
			message: 'Upgrade before the month ends.'
		},
		{
			id: 'failed',
			intent: 'danger',
			title: 'Deploy failed',
			message: 'The build exited with code 1.'
		}
	] as const;

	let shown = $state<string[]>(toasts.map((t) => t.id));
</script>

<div class="fs-measure-md box gap-sm">
	{#each toasts.filter((t) => shown.includes(t.id)) as t (t.id)}
		<Toast
			id={t.id}
			intent={t.intent}
			title={t.title}
			message={t.message}
			duration={t.id === 'sync' ? 6000 : 0}
			onclose={() => (shown = shown.filter((id) => id !== t.id))}
		/>
	{/each}
	<div class="row">
		<Button size="sm" variant="outline" onclick={() => (shown = toasts.map((t) => t.id))}>
			Show all again
		</Button>
	</div>
</div>
<p class="text-body-sm text-muted">
	A single toast, inline. Set <code>duration</code> to 0 to keep it until dismissed; use ToastStack to
	queue them at a screen corner.
</p>
