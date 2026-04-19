<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Topbar from '$lib/components/layout/Topbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CommandMenu from '$lib/components/ui/CommandMenu.svelte';

	import { loadSavedTheme } from '$lib/commands/index.js';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let activeSection = $state('hero');
	let ready = $state(false);

	onMount(() => {
		ready = true;
		loadSavedTheme();

		const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
		const observers: IntersectionObserver[] = [];

		for (const id of sections) {
			const el = document.getElementById(id);
			if (!el) continue;

			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						activeSection = id;
					}
				},
				{ threshold: 0.3 }
			);
			observer.observe(el);
			observers.push(observer);
		}

		return () => observers.forEach((o) => o.disconnect());
	});
</script>

<div class="app" class:ready>
	<Sidebar {activeSection} />
	<Topbar />

	<main class="main">
		{@render children()}
		<Footer />
	</main>

	<CommandMenu />
</div>

<style>
	.app {
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.app.ready {
		opacity: 1;
	}

	.main {
		margin-left: 240px;
		min-height: 100vh;
	}

	@media (max-width: 1023px) {
		.main {
			margin-left: 0;
		}
	}
</style>
