<script lang="ts">
	import { TerminalBlock } from '@fractaldesign/fractalsvelte-ui';
</script>

<div class="fs-measure-lg">
	<TerminalBlock
		title="bash — 80x24"
		lines={[
			{ command: 'pnpm create svelte@latest my-app' },
			{ command: 'pnpm add @fractaldesign/fractalsvelte-ui' },
			{ output: 'Documentation gate PASSED (106 components verified).' }
		]}
	/>
</div>
