<script lang="ts">
	// Renders every field a prop carries, from any library's manifest: name, type,
	// accepted values, default, requiredness, bindable, alias and look-restrictions.
	import type { DocProp } from '#lib/docs/model.js';

	let { props, kind }: { props: DocProp[]; kind?: DocProp['kind'] } = $props();
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
					<td class="px-md py-sm bb-sub ta-l va-top">
						<span class="box gap-xs">
							<span class="row ycenter gap-xs wrap">
								<code class="text-primary weight-500">{prop.name}</code>
								{#if prop.bindable}<span class="chip bg-sunken text-theme">bindable</span>{/if}
								{#if !prop.optional}<span class="chip bg-sunken text-warning">required</span>{/if}
								{#if prop.alias}<span class="chip bg-sunken text-muted">alias of {prop.alias}</span
									>{/if}
							</span>
							{#if prop.only?.length}
								<span class="text-body-sm text-muted lh15">
									Only the {prop.only.join(' and ')} look.
								</span>
							{/if}
							{#if prop.refs?.length}
								<span class="text-body-sm text-muted lh15">See also {prop.refs.join(', ')}.</span>
							{/if}
						</span>
					</td>
					<td class="px-md py-sm bb-sub ta-l va-top">
						<span class="box gap-xs">
							<code class="text-secondary">{prop.type}</code>
							{#if prop.values?.length}
								<span class="row gap-xs wrap">
									{#each prop.values as value (value)}
										<code class="chip bg-sunken text-muted">{value}</code>
									{/each}
								</span>
							{/if}
							{#if prop.description}
								<span class="text-body-sm text-secondary lh15">{prop.description}</span>
							{/if}
						</span>
					</td>
					<td class="px-md py-sm bb-sub ta-l va-top">
						<code class="text-muted">{prop.default ?? '—'}</code>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
{#if kind === 'callback'}
	<p class="text-body-sm text-muted lh15">Functions the component calls with an event payload.</p>
{/if}
