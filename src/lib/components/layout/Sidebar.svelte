<script lang="ts">
	import { Github, Linkedin } from 'lucide-svelte';
	import { page } from '$app/stores';

	let { activeSection = '' }: { activeSection?: string } = $props();

	const navItems = [
		{ id: 'hero', label: 'home' },
		{ id: 'about', label: 'about' },
		{ id: 'skills', label: 'skills' },
		{ id: 'projects', label: 'projects' },
		{ id: 'contact', label: 'contact' }
	];

	const socialIcons: Record<string, typeof Github> = {
		github: Github,
		linkedin: Linkedin
	};

	let meta = $derived($page.data.meta);
</script>

<aside class="sidebar">
	<div class="sidebar-top">
		<a href="#hero" class="logo">
			<span class="prompt">&gt;_</span>
			<span class="name">{meta?.name ?? 'Portfolio'}</span>
		</a>
	</div>

	<nav class="nav">
		{#each navItems as item}
			<a
				href="#{item.id}"
				class="nav-link"
				class:active={activeSection === item.id}
			>
				<span class="dollar">$</span>
				{item.label}
			</a>
		{/each}
	</nav>

	<div class="sidebar-bottom">
		{#if meta?.socials}
			{#each meta.socials as social}
				{@const Icon = socialIcons[social.icon]}
				{#if Icon}
					<a href={social.url} target="_blank" rel="noopener noreferrer" class="social-link" aria-label={social.label}>
						<Icon size={18} />
					</a>
				{/if}
			{/each}
		{/if}
	</div>
</aside>

<style>
	.sidebar {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		width: 240px;
		background: var(--crust);
		border-right: 1px solid var(--surface0);
		display: flex;
		flex-direction: column;
		padding: 2rem 0;
		z-index: 50;
	}

	.sidebar-top {
		padding: 0 1.5rem;
		margin-bottom: 3rem;
	}

	.logo {
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-size: 1.1rem;
		font-weight: 700;
	}

	.prompt {
		color: var(--teal);
		text-shadow: var(--glow-teal);
	}

	.name {
		color: var(--text);
	}

	.nav {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.65rem 1.5rem;
		color: var(--subtext0);
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		border-left: 2px solid transparent;
		transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
	}

	.nav-link:hover {
		color: var(--text);
		background: #94e2d508;
	}

	.nav-link.active {
		color: var(--teal);
		border-left-color: var(--teal);
		background: #94e2d510;
		text-shadow: var(--glow-teal);
	}

	.dollar {
		color: var(--overlay0);
		font-size: 0.8rem;
	}

	.sidebar-bottom {
		display: flex;
		gap: 1rem;
		padding: 0 1.5rem;
		margin-top: auto;
	}

	.social-link {
		color: var(--overlay1);
		transition: color 0.2s ease, text-shadow 0.2s ease;
	}

	.social-link:hover {
		color: var(--teal);
		text-shadow: var(--glow-teal);
	}

	@media (max-width: 1023px) {
		.sidebar {
			display: none;
		}
	}
</style>
