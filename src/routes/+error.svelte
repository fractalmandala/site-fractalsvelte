<script lang="ts">
	import { page } from '$app/state';
	import Frame from '#lib/components/Frame.svelte';
</script>

<svelte:head>
	<title>{page.status} — fractalsvelte</title>
</svelte:head>

<main class="grow px-lg">
	<div class="content-section narrow-wide box xcenter gap-xl pt-3xl">
		<Frame caption="Error {page.status}" hot class="pad-2xl wfull">
			<div class="box xcenter gap-md">
				<p class="text-5xl weight-800 ls-tight-xl lh11 text-primary">{page.status}</p>
				<p class="text-body-lg text-secondary lh15">
					{page.error?.message ?? 'Something went wrong.'}
				</p>
				<a href="/" class="btn" data-variant="primary" data-shape="square">Back to all packages</a>
			</div>
		</Frame>
	</div>
</main>
