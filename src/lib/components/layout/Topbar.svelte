<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { page } from '$app/stores';

	let menuOpen = $state(false);

	const navItems = [
		{ id: 'hero', label: 'home' },
		{ id: 'about', label: 'about' },
		{ id: 'skills', label: 'skills' },
		{ id: 'projects', label: 'projects' },
		{ id: 'contact', label: 'contact' }
	];

	function handleNav() {
		menuOpen = false;
	}

	let meta = $derived($page.data.meta);
</script>

<header class="topbar">
	<a href="#hero" class="logo">
		<span class="prompt">&gt;_</span>
		<span class="name">{meta?.name ?? 'Portfolio'}</span>
	</a>
	<button class="menu-toggle" onclick={() => (menuOpen = !menuOpen)} aria-label="Toggle menu">
		{#if menuOpen}
			<X size={22} />
		{:else}
			<Menu size={22} />
		{/if}
	</button>
</header>

{#if menuOpen}
	<nav class="mobile-nav">
		{#each navItems as item}
			<a href="#{item.id}" class="nav-link" onclick={handleNav}>
				<span class="dollar">$</span>
				{item.label}
			</a>
		{/each}
	</nav>
{/if}

<style>
	.topbar {
		position: sticky;
		top: 0;
		z-index: 50;
		display: none;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.5rem;
		background: var(--crust);
		border-bottom: 1px solid var(--surface0);
	}

	.logo {
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 700;
	}

	.prompt {
		color: var(--teal);
		text-shadow: var(--glow-teal);
	}

	.name {
		color: var(--text);
	}

	.menu-toggle {
		background: none;
		border: none;
		color: var(--text);
		cursor: pointer;
		padding: 0.25rem;
	}

	.mobile-nav {
		display: none;
		flex-direction: column;
		position: fixed;
		top: 50px;
		left: 0;
		right: 0;
		background: var(--crust);
		border-bottom: 1px solid var(--surface0);
		z-index: 49;
		padding: 0.5rem 0;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		color: var(--subtext0);
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: 0.9rem;
		transition: color 0.2s ease, background 0.2s ease;
	}

	.nav-link:hover {
		color: var(--teal);
		background: #94e2d508;
	}

	.dollar {
		color: var(--overlay0);
	}

	@media (max-width: 1023px) {
		.topbar {
			display: flex;
		}

		.mobile-nav {
			display: flex;
		}
	}
</style>
