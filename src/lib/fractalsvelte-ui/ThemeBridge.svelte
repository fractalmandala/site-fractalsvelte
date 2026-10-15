<script lang="ts">
	// The site switches colour on html[data-mode]; fractalsvelte-ui reads html[data-theme].
	// Mirror one onto the other while a docs page is open, so the previews follow the site.
	$effect(() => {
		const root = document.documentElement;
		const sync = () =>
			root.setAttribute('data-theme', root.dataset.mode === 'dark' ? 'dark' : 'light');
		sync();
		const observer = new MutationObserver(sync);
		observer.observe(root, { attributes: true, attributeFilter: ['data-mode'] });
		return () => {
			observer.disconnect();
			root.removeAttribute('data-theme');
		};
	});
</script>
