<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';

	let data = $derived($page.data.projects);

	let visible = $state(false);
	let sectionEl: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) visible = true; },
			{ threshold: 0.1 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section id="projects" class="projects" bind:this={sectionEl}>
	<div class="container">
		<SectionLabel index="03" label="Projects" />

		{#if data?.projects}
			<div class="grid stagger-children" class:visible>
				{#each data.projects as project}
					<ProjectCard {project} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.projects {
		padding: 6rem 3rem;
	}

	.container {
		max-width: 900px;
		margin: 0 auto;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 768px) {
		.projects {
			padding: 4rem 1.5rem;
		}

		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
