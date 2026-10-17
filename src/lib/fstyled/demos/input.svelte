<script lang="ts">
	import { Input } from '@fractaldesign/fractalsvelte-ui/styler';
	import { Icon } from 'fractalicons';
	import { luSearch } from 'fractalicons/lucide';

	let email = $state('ada@fractal.dev');
	let password = $state('hunter2');
</script>

<div class="grid-2 gap-md wfull">
	<Input label="Email" type="email" bind:value={email} helperText="We never share it." />
	<Input label="Password" type="password" bind:value={password} clearable />
	<Input label="Handle" placeholder="@you" error="That handle is taken" variant="outline" />
	<Input label="Search" placeholder="Components…" variant="secondary" size="md">
		{#snippet leading()}<Icon icon={luSearch} />{/snippet}
	</Input>
</div>
