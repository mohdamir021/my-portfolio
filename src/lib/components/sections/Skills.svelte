<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import SkillCard from '$lib/components/ui/SkillCard.svelte';

	let data = $derived($page.data.skills);

	let visible = $state(false);
	let sectionEl: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) visible = true; },
			// Fire once ~40% of a viewport-height of the section has been revealed
			{ threshold: 0, rootMargin: '0px 0px -40% 0px' }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section id="skills" class="skills" bind:this={sectionEl}>
	<div class="container">
		<SectionLabel index="02" label="Skills" />

		{#if data}
			<p class="intro">{data.intro}</p>
			<div class="grid stagger-children" class:visible>
				{#each data.groups as group}
					<SkillCard {group} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.skills {
		padding: 6rem 3rem;
		/* Lighter panel — lets more of the fixed background peek through. */
		position: relative;
		background: rgba(17, 17, 27, 0.40);
	}

	.container {
		max-width: 900px;
		margin: 0 auto;
	}

	.intro {
		color: var(--subtext0);
		font-size: 0.9rem;
		margin: 0 0 2rem 0;
		max-width: 550px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
	}

	@media (max-width: 768px) {
		.skills {
			padding: 4rem 1.5rem;
		}

		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
