<script lang="ts">
	type Prop = {
		name: string;
		type: string;
		default: string | null;
		description: string | null;
		bindable: boolean;
		values?: string | null;
	};

	let { props }: { props: Prop[] } = $props();
</script>

<div class="scroll-x border radius-sm">
	<table class="wfull text-md">
		<thead>
			<tr>
				<th class="px-md py-sm bb ta-l text-primary weight-600">Name</th>
				<th class="px-md py-sm bb ta-l text-primary weight-600">Type</th>
				<th class="px-md py-sm bb ta-l text-primary weight-600">Default</th>
			</tr>
		</thead>
		<tbody>
			{#each props as prop (prop.name)}
				<tr>
					<td class="px-md py-sm bb-sub ta-l">
						<span class="box gap-xs">
							<code class="text-primary weight-500">{prop.name}</code>
							{#if prop.bindable}<span class="chip bg-sunken text-theme">bindable</span>{/if}
						</span>
					</td>
					<td class="px-md py-sm bb-sub ta-l">
						<span class="box gap-xs">
							<code class="text-secondary">{prop.type}</code>
							{#if prop.values}
								<code class="text-sm text-muted">{prop.values}</code>
							{/if}
							{#if prop.description}
								<span class="text-body-sm text-secondary lh15">{prop.description}</span>
							{/if}
						</span>
					</td>
					<td class="px-md py-sm bb-sub ta-l">
						<code class="text-muted">{prop.default ?? '—'}</code>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
