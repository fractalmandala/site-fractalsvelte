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
				<h1 class="hero-name lh11 text-primary">{page.status}</h1>
				<p class="text-body-lg text-secondary lh15">
					{page.error?.message ?? 'Something went wrong.'}
				</p>
				<a href="/" class="btn" data-variant="primary" data-shape="square">Back to all packages</a>
			</div>
		</Frame>
	</div>
</main>
