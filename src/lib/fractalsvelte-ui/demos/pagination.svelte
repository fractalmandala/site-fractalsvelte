<script lang="ts">
	import { Pagination } from '@fractaldesign/fractalsvelte-ui';

	let currentPage = $state(3);
</script>

<Pagination totalPages={10} bind:currentPage />
