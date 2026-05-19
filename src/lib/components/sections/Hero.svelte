<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import BlinkCursor from '$lib/components/ui/BlinkCursor.svelte';
	import { ChevronDown } from 'lucide-svelte';

	let data = $derived($page.data.hero);

	let typedText = $state('');
	let showContent = $state(false);

	onMount(() => {
		const greeting = data?.greeting ?? '';
		let i = 0;
		const interval = setInterval(() => {
			typedText = greeting.slice(0, i + 1);
			i++;
			if (i >= greeting.length) {
				clearInterval(interval);
				setTimeout(() => (showContent = true), 300);
			}
		}, 60);

		return () => clearInterval(interval);
	});
</script>

<section id="hero" class="relative min-h-screen flex flex-col justify-center items-start px-12 py-16 max-md:px-6 max-md:py-12 overflow-hidden">
	<!-- Background image -->
	<div class="absolute inset-0 z-0 bg-cover object-fill bg-center bg-no-repeat opacity-25" style="background-image: url('/images/profile-bg.png');"></div>

	<!-- Scanlines overlay -->
	<div class="scanlines absolute inset-0 z-1 pointer-events-none"></div>

	<!-- Animated grid -->
	<div class="animated-grid absolute inset-0 z-1 pointer-events-none overflow-hidden">
		<div class="grid-line-h"></div>
		<div class="grid-line-h delay-1"></div>
		<div class="grid-line-h delay-2"></div>
		<div class="grid-line-v"></div>
		<div class="grid-line-v delay-3"></div>
		<div class="grid-line-v delay-4"></div>
	</div>

	<!-- Dark overlay to keep text readable -->
	<div class="absolute inset-0 z-1 bg-base/60"></div>

	<div class="max-w-[700px] z-2 relative">
		{#if data}
			<div class="flex items-center gap-3 mb-8 text-[0.9rem]">
				<span class="text-overlay0">{data.prompt}</span>
				<span class="text-green">{typedText}</span>
				<BlinkCursor />
			</div>

			<div class="transition-all duration-800 ease-out {showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}">
				<h1 class="font-[var(--font-display)] text-[3.5rem] max-md:text-[2.5rem] font-bold text-teal leading-tight mb-2 tracking-wide" style="text-shadow: var(--glow-teal);">
					{data.name}
				</h1>
				<p class="font-[var(--font-display)] text-[1.2rem] max-md:text-[1rem] text-text uppercase tracking-[0.15em] mb-3">
					{data.title}
				</p>
				<p class="text-subtext0 text-[0.95rem] mb-10 max-w-[500px]">
					{data.subtitle}
				</p>

				<div class="flex gap-4 flex-wrap">
					<a href={data.cta.href}
						class="px-6 py-2.5 bg-teal text-crust font-[var(--font-mono)] font-semibold text-[0.85rem] no-underline rounded-[var(--radius)] transition-all duration-300 hover:shadow-[var(--glow-teal)] hover:-translate-y-0.5">
						{data.cta.label}
					</a>
					<a href={data.cta_secondary.href}
						class="px-6 py-2.5 border border-surface2 text-subtext1 font-[var(--font-mono)] text-[0.85rem] no-underline rounded-[var(--radius)] transition-all duration-300 hover:border-teal hover:text-teal">
						{data.cta_secondary.label}
					</a>
				</div>
			</div>
		{/if}
	</div>

	<a href="#about" class="absolute bottom-8 left-1/2 -translate-x-1/2 text-overlay0 no-underline z-2 animate-bounce">
		<ChevronDown size={24} />
	</a>
</section>

<style>
	/* Animated grid lines */
	.animated-grid {
		--line-color: var(--teal);
		background-image:
			linear-gradient(var(--accent-grid) 1px, transparent 1px),
			linear-gradient(90deg, var(--accent-grid) 1px, transparent 1px);
		background-size: 40px 40px;
	}

	.grid-line-h,
	.grid-line-v {
		position: absolute;
	}

	/* Horizontal tracing line */
	.grid-line-h {
		left: -200px;
		height: 1px;
		width: 200px;
		background: linear-gradient(90deg, transparent, var(--line-color), transparent);
		opacity: 0.4;
		animation: trace-h 8s linear infinite;
	}

	.grid-line-h.delay-1 {
		animation-delay: 3s;
		top: 30%;
		opacity: 0.25;
	}

	.grid-line-h.delay-2 {
		animation-delay: 5.5s;
		top: 70%;
		opacity: 0.3;
	}

	/* Vertical tracing line */
	.grid-line-v {
		top: -200px;
		width: 1px;
		height: 200px;
		background: linear-gradient(180deg, transparent, var(--line-color), transparent);
		opacity: 0.4;
		animation: trace-v 10s linear infinite;
	}

	.grid-line-v.delay-3 {
		animation-delay: 2s;
		left: 60%;
		opacity: 0.25;
	}

	.grid-line-v.delay-4 {
		animation-delay: 6s;
		left: 85%;
		opacity: 0.3;
	}

	@keyframes trace-h {
		0% {
			left: -200px;
			top: 20%;
		}
		100% {
			left: calc(100% + 200px);
			top: 20%;
		}
	}

	@keyframes trace-v {
		0% {
			top: -200px;
			left: 35%;
		}
		100% {
			top: calc(100% + 200px);
			left: 35%;
		}
	}

	/* Unique paths for delayed lines */
	.grid-line-h.delay-1 {
		animation-name: trace-h2;
	}
	.grid-line-h.delay-2 {
		animation-name: trace-h3;
	}
	.grid-line-v.delay-3 {
		animation-name: trace-v2;
	}
	.grid-line-v.delay-4 {
		animation-name: trace-v3;
	}

	@keyframes trace-h2 {
		0% { left: -200px; top: 45%; }
		100% { left: calc(100% + 200px); top: 45%; }
	}

	@keyframes trace-h3 {
		0% { left: -200px; top: 75%; }
		100% { left: calc(100% + 200px); top: 75%; }
	}

	@keyframes trace-v2 {
		0% { top: -200px; left: 60%; }
		100% { top: calc(100% + 200px); left: 60%; }
	}

	@keyframes trace-v3 {
		0% { top: -200px; left: 82%; }
		100% { top: calc(100% + 200px); left: 82%; }
	}
</style>
