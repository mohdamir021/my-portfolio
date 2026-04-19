<script lang="ts">
	import { Monitor, Server, Terminal, Cpu } from 'lucide-svelte';

	let { group }: { group: { label: string; icon: string; items: string[] } } = $props();

	const icons: Record<string, typeof Monitor> = {
		monitor: Monitor,
		server: Server,
		terminal: Terminal,
		cpu: Cpu
	};

	const IconComponent = $derived(icons[group.icon] || Terminal);
</script>

<div class="skill-card">
	<div class="card-header">
		<span class="icon">
			<IconComponent size={18} />
		</span>
		<h3 class="label">{group.label}</h3>
	</div>
	<div class="tags">
		{#each group.items as item}
			<span class="tag">{item}</span>
		{/each}
	</div>
</div>

<style>
	.skill-card {
		background: var(--mantle);
		border: 1px solid var(--surface1);
		border-radius: var(--radius);
		padding: 1.5rem;
		transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
	}

	.skill-card:hover {
		border-color: var(--teal);
		box-shadow: var(--glow-teal);
		transform: translateY(-2px);
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.icon {
		color: var(--teal);
		display: flex;
	}

	.label {
		font-family: var(--font-display);
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text);
		margin: 0;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		font-size: 0.75rem;
		padding: 0.25rem 0.6rem;
		background: var(--surface0);
		color: var(--teal);
		border-radius: 2px;
		font-family: var(--font-mono);
	}
</style>
