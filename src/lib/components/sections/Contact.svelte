<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import { Github, Linkedin, Send, Mail } from 'lucide-svelte';

	let data = $derived($page.data.contact);

	let visible = $state(false);
	let sectionEl: HTMLElement;
	let submitted = $state(false);

	const socialIcons: Record<string, typeof Github> = {
		github: Github,
		linkedin: Linkedin
	};

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) visible = true; },
			// Fire once ~40% of a viewport-height of the section has been revealed
			{ threshold: 0, rootMargin: '0px 0px -40% 0px' }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		submitted = true;
	}
</script>

<section id="contact" class="contact" bind:this={sectionEl}>
	<div class="container" class:visible>
		<SectionLabel index="04" label="Contact" />

		{#if data}
			<h2 class="heading">{data.heading}</h2>
			<p class="subtext">{data.subtext}</p>

			<div class="contact-grid">
				{#if data.show_form}
					<form class="form" onsubmit={handleSubmit}>
						{#if submitted}
							<div class="success">
								<p><span class="prompt">&gt;</span> Message sent successfully.</p>
								<p class="subline">Thanks for reaching out. I'll get back to you soon.</p>
							</div>
						{:else}
							<div class="field">
								<label for="name">$ input <span class="label-text">name</span></label>
								<input type="text" id="name" name="name" required placeholder="Your name" />
							</div>
							<div class="field">
								<label for="email">$ input <span class="label-text">email</span></label>
								<input type="email" id="email" name="email" required placeholder="you@example.com" />
							</div>
							<div class="field">
								<label for="message">$ input <span class="label-text">message</span></label>
								<textarea id="message" name="message" rows="4" required placeholder="What's on your mind?"></textarea>
							</div>
							<button type="submit" class="submit-btn">
								<Send size={14} />
								Send message
							</button>
						{/if}
					</form>
				{/if}

				<div class="contact-info">
					<a href="mailto:{data.email}" class="email-link">
						<Mail size={16} />
						{data.email}
					</a>

					<div class="socials">
						{#each data.socials as social}
							{@const Icon = socialIcons[social.icon]}
							{#if Icon}
								<a href={social.url} target="_blank" rel="noopener noreferrer" class="social-btn" aria-label={social.label}>
									<Icon size={18} />
									<span>{social.label}</span>
								</a>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.contact {
		padding: 6rem 3rem;
		/* Fades from translucent into a near-solid crust toward the footer. */
		position: relative;
		background: linear-gradient(180deg, rgba(17, 17, 27, 0.45), rgba(17, 17, 27, 0.88));
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

	.heading {
		font-family: var(--font-display);
		font-size: 1.8rem;
		color: var(--text);
		margin: 0 0 0.5rem 0;
	}

	.subtext {
		color: var(--subtext0);
		font-size: 0.9rem;
		margin: 0 0 2.5rem 0;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 280px;
		gap: 3rem;
		align-items: start;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.field label {
		font-size: 0.75rem;
		color: var(--overlay0);
		font-family: var(--font-mono);
	}

	.label-text {
		color: var(--teal);
	}

	.field input,
	.field textarea {
		background: var(--mantle);
		border: 1px solid var(--surface1);
		border-radius: var(--radius);
		padding: 0.65rem 0.85rem;
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		transition: border-color 0.3s ease, box-shadow 0.3s ease;
		resize: vertical;
	}

	.field input:focus,
	.field textarea:focus {
		outline: none;
		border-color: var(--teal);
		box-shadow: var(--glow-teal);
	}

	.field input::placeholder,
	.field textarea::placeholder {
		color: var(--surface2);
	}

	.submit-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		align-self: flex-start;
		padding: 0.65rem 1.5rem;
		background: var(--teal);
		color: var(--crust);
		font-family: var(--font-mono);
		font-weight: 600;
		font-size: 0.85rem;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		transition: box-shadow 0.3s ease, transform 0.2s ease;
	}

	.submit-btn:hover {
		box-shadow: var(--glow-teal);
		transform: translateY(-1px);
	}

	.success {
		padding: 1.5rem;
		background: var(--mantle);
		border: 1px solid var(--green);
		border-radius: var(--radius);
	}

	.success p {
		margin: 0;
	}

	.success .prompt {
		color: var(--green);
	}

	.success .subline {
		color: var(--overlay1);
		font-size: 0.8rem;
		margin-top: 0.5rem;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.email-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--teal);
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		transition: text-shadow 0.2s ease;
	}

	.email-link:hover {
		text-shadow: var(--glow-teal);
	}

	.socials {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.social-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--subtext0);
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		transition: color 0.2s ease;
	}

	.social-btn:hover {
		color: var(--teal);
	}

	@media (max-width: 768px) {
		.contact {
			padding: 4rem 1.5rem;
		}

		.contact-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
