<script lang="ts">
	import { ExternalLink, Github } from 'lucide-svelte';

	let { project }: {
		project: {
			id: string;
			title: string;
			description: string;
			stack: string[];
			links: { github: string | null; live: string | null };
			image: string | null;
			featured: boolean;
			status: string;
		};
	} = $props();

	const statusColor: Record<string, string> = {
		live: 'var(--green)',
		wip: 'var(--yellow)',
		archived: 'var(--overlay0)',
		private: 'var(--mauve)'
	};
</script>

<div class="project-card" class:featured={project.featured}>
	<div class="card-image">
		{#if project.image}
			<img src={project.image} alt={project.title} loading="lazy" />
		{:else}
			<div class="image-placeholder" aria-hidden="true">
				<span class="placeholder-prompt">~/{project.id}</span>
				<span class="placeholder-cursor">█</span>
			</div>
		{/if}
		<div class="overlay">
			<p class="description">{project.description}</p>
			<div class="links">
				{#if project.links.github}
					<a href={project.links.github} target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
						<Github size={18} />
					</a>
				{/if}
				{#if project.links.live}
					<a href={project.links.live} target="_blank" rel="noopener noreferrer" aria-label="View live site">
						<ExternalLink size={18} />
					</a>
				{/if}
			</div>
		</div>
	</div>
	<div class="card-body">
		<div class="card-top">
			<h3 class="title">{project.title}</h3>
			<span class="status" style:color={statusColor[project.status] || 'var(--overlay0)'}>
				● {project.status}
			</span>
		</div>
		<div class="stack">
			{#each project.stack as tech}
				<span class="tech">{tech}</span>
			{/each}
		</div>
	</div>
</div>

<style>
	.project-card {
		background: var(--mantle);
		border: 1px solid var(--surface1);
		border-radius: var(--radius);
		overflow: hidden;
		transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
	}

	.project-card:hover {
		border-color: var(--teal);
		box-shadow: var(--glow-teal);
		transform: translateY(-4px);
	}

	.project-card.featured {
		border-left: 3px solid var(--teal);
	}

	.card-image {
		position: relative;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: var(--surface0);
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.project-card:hover .card-image img {
		transform: scale(1.05);
	}

	/* Terminal-style fallback when a project has no screenshot */
	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		background:
			linear-gradient(135deg, var(--mantle), var(--crust)),
			linear-gradient(var(--accent-grid) 1px, transparent 1px),
			linear-gradient(90deg, var(--accent-grid) 1px, transparent 1px);
		background-size: cover, 24px 24px, 24px 24px;
		font-family: var(--font-mono);
		font-size: 0.95rem;
		color: var(--teal);
		text-shadow: var(--glow-teal);
	}

	.placeholder-cursor {
		animation: blink 1s step-end infinite;
	}

	.overlay {
		position: absolute;
		inset: 0;
		background: #1e1e2ee6;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1.5rem;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.project-card:hover .overlay {
		opacity: 1;
	}

	.description {
		color: var(--subtext1);
		font-size: 0.8rem;
		text-align: center;
		line-height: 1.6;
		margin: 0 0 1rem 0;
	}

	.links {
		display: flex;
		gap: 1rem;
	}

	.links a {
		color: var(--teal);
		transition: color 0.2s ease, text-shadow 0.2s ease;
	}

	.links a:hover {
		text-shadow: var(--glow-teal);
	}

	.card-body {
		padding: 1rem 1.25rem;
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.title {
		font-family: var(--font-display);
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--text);
		margin: 0;
	}

	.status {
		font-size: 0.7rem;
		font-family: var(--font-mono);
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tech {
		font-size: 0.7rem;
		padding: 0.15rem 0.5rem;
		background: var(--surface0);
		color: var(--subtext0);
		border-radius: 2px;
		font-family: var(--font-mono);
	}
</style>
