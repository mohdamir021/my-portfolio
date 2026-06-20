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
	<!-- Fixed background: stays put while the page scrolls -->
	<div class="bg-fixed" aria-hidden="true"></div>

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

	/* Fixed, full-viewport background image + readability overlay.
	   Swap the image URL or gradient below to restyle the global backdrop. */
	.bg-fixed {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background:
			linear-gradient(180deg, rgba(17, 17, 27, 0.78), rgba(30, 30, 46, 0.85)),
			url('/images/profile-bg.png') center / cover no-repeat;
	}

	.main {
		position: relative;
		z-index: 1;
		margin-left: 240px;
		min-height: 100vh;
	}

	@media (max-width: 1023px) {
		.main {
			margin-left: 0;
		}
	}
</style>
