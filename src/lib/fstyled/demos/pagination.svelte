<script lang="ts">
	import { Pagination } from '@fractaldesign/fractalsvelte-ui/styler';

	let page = $state(4);
</script>

<div class="box xcenter gap-md">
	<Pagination bind:currentPage={page} totalPages={12} />
	<Pagination currentPage={2} totalPages={5} variant="outline" size="md" shape="round" />
	<p class="text-body-sm text-secondary">Page {page} of 12</p>
</div>
