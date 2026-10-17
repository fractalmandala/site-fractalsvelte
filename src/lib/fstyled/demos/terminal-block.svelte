<script lang="ts">
	import { TerminalBlock } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box wfull">
	<TerminalBlock
		title="zsh"
		animated
		lines={[
			{
				command: 'pnpm add @fractaldesign/fractalstyler',
				output: '+ @fractaldesign/fractalstyler 1.2.0'
			},
			{ command: 'pnpm styler:check', output: '✔ 129 file(s) clean' }
		]}
	/>
</div>
