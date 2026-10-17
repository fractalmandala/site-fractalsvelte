<script lang="ts">
	import { SearchInput } from '@fractaldesign/fractalsvelte-ui/styler';

	let query = $state('');
</script>

<div class="box gap-sm wfull">
	<SearchInput bind:value={query} placeholder="Search components…" listenForShortcut />
	<SearchInput placeholder="Searching…" loading variant="outline" />
	<p class="text-body-sm text-secondary">
		Query: “{query}” · press ⌘K / Ctrl+K to focus the first field
	</p>
</div>
