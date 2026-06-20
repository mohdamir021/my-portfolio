<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import TerminalBlock from '$lib/components/ui/TerminalBlock.svelte';
	import { FileText } from 'lucide-svelte';

	let data = $derived($page.data.about);

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

<section id="about" class="about" bind:this={sectionEl}>
	<div class="container" class:visible>
		<SectionLabel index="01" label="About" />

		<div class="about-grid">
			<div class="bio-col">
				<TerminalBlock title="~/about">
					{#if data}
						{#each data.bio as paragraph}
							<p class="bio-line"><span class="prompt">&gt;</span> {paragraph}</p>
						{/each}

						<div class="fun-facts">
							{#each data.fun_facts as fact}
								<p class="fact"><span class="comment">//</span> {fact}</p>
							{/each}
						</div>

						{#if data.resume}
							<a href={data.resume} class="resume-link" target="_blank" rel="noopener noreferrer">
								<FileText size={14} />
								resume.pdf
							</a>
						{/if}
					{/if}
				</TerminalBlock>
			</div>

			<div class="avatar-col">
				{#if data?.avatar}
					<div class="avatar-frame">
						<img src={data.avatar} alt="Avatar" loading="lazy" />
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		padding: 6rem 3rem;
		/* Translucent panel over the fixed background — tweak the rgba alpha
		   to show more/less of the image, or swap for a color/image of your own. */
		position: relative;
		background: rgba(24, 24, 37, 0.55);
		border-top: 1px solid var(--surface0);
	}

	.container {
		max-width: 900px;
		margin: 0 auto;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}

	.container.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1fr 280px;
		gap: 3rem;
		align-items: start;
	}

	.bio-line {
		margin: 0 0 0.75rem 0;
	}

	.prompt {
		color: var(--teal);
		margin-right: 0.5rem;
	}

	.fun-facts {
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--surface0);
	}

	.fact {
		margin: 0 0 0.4rem 0;
		color: var(--overlay1);
		font-size: 0.8rem;
	}

	.comment {
		color: var(--surface2);
		margin-right: 0.5rem;
	}

	.resume-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 1.25rem;
		color: var(--teal);
		font-size: 0.8rem;
		text-decoration: none;
		font-family: var(--font-mono);
		transition: text-shadow 0.2s ease;
	}

	.resume-link:hover {
		text-shadow: var(--glow-teal);
	}

	.avatar-frame {
		border: 2px solid var(--teal);
		border-radius: var(--radius);
		overflow: hidden;
		box-shadow: var(--glow-teal);
		aspect-ratio: 1;
	}

	.avatar-frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 768px) {
		.about {
			padding: 4rem 1.5rem;
		}

		.about-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.avatar-col {
			order: -1;
			max-width: 200px;
			margin: 0 auto;
		}
	}
</style>
