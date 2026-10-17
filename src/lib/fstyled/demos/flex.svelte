<script lang="ts">
	import { Flex, Tag } from '@fractaldesign/fractalsvelte-ui/styler';
</script>

<Flex wrap gapX="lg" gapY="xs" justify="center" class="wfull">
	{#each ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'] as t (t)}
		<Tag variant="outline">{t}</Tag>
	{/each}
</Flex>
