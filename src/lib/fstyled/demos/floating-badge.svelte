<script lang="ts">
	import { FloatingBadge } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luSparkles } from 'fractalicons/lucide';
</script>

<div class="row ycenter xcenter gap-sm wrap">
	<FloatingBadge>Online</FloatingBadge>
	<FloatingBadge tone="warning" duration={1}>Degraded</FloatingBadge>
	<FloatingBadge tone="danger" pulse={false}>Offline</FloatingBadge>
	<FloatingBadge tone="info" dot={false}>
		{#snippet leading()}<Icon icon={luSparkles} />{/snippet}
		New
	</FloatingBadge>
</div>
