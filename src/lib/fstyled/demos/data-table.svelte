<script lang="ts">
	import { DataTable } from '@fractaldesign/fractalsvelte-ui/styler';

	const people = [
		{ name: 'Ada Lovelace', role: 'Engineer', commits: 412 },
		{ name: 'Grace Hopper', role: 'Admiral', commits: 1280 },
		{ name: 'Alan Turing', role: 'Researcher', commits: 87 },
		{ name: 'Katherine Johnson', role: 'Mathematician', commits: 640 }
	];
</script>

<DataTable
	class="wfull"
	columns={[
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'role', label: 'Role' },
		{ key: 'commits', label: 'Commits', sortable: true, align: 'right' }
	]}
	rows={people}
/>
