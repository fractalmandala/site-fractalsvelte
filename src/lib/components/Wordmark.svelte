<script lang="ts">
	let { mark, class: className = '' }: { mark: [string, string]; class?: string } = $props();
</script>

<span class={className}
	><span class="text-secondary">{mark[0]}</span><span class="text-theme">{mark[1]}</span></span
>
