<script lang="ts">
	import { AnimatedButton } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="row ycenter xcenter gap-sm wrap">
	<AnimatedButton>Animated</AnimatedButton>
	<AnimatedButton variant="secondary" shine={false}>Ripple only</AnimatedButton>
	<AnimatedButton variant="outline" ripple={false}>Sheen only</AnimatedButton>
	<AnimatedButton loading>Loading</AnimatedButton>
</div>
