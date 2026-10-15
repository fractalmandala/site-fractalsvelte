<script lang="ts">


let { children } = $props()

</script>

<main class="app-main">
    <aside class="sidebar-left">
        left
    </aside>
    <section class="main-section">
        {@render children()}
    </section>
    <aside class="sidebar-right">
        right
    </aside>
</main>