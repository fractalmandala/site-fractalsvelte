<script lang="ts">
	import { CodeBlock } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<div class="box gap-md wfull">
	<CodeBlock
		filename="Button.svelte"
		language="svelte"
		showLineNumbers
		code={'<button data-variant="primary" data-size="md">\n\tSave\n</button>'}
	/>
	<CodeBlock language="sh" code="pnpm add @fractaldesign/fractalsvelte-ui" />
</div>
