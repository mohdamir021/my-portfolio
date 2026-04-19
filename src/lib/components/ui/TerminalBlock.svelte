<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title = 'terminal', children }: { title?: string; children: Snippet } = $props();
</script>

<div class="terminal-block">
	<div class="terminal-header">
		<div class="dots">
			<span class="dot red"></span>
			<span class="dot yellow"></span>
			<span class="dot green"></span>
		</div>
		<span class="title">{title}</span>
		<div class="spacer"></div>
	</div>
	<div class="terminal-body">
		{@render children()}
	</div>
</div>

<style>
	.terminal-block {
		background: var(--mantle);
		border: 1px solid var(--surface1);
		border-radius: var(--radius);
		overflow: hidden;
		transition: border-color 0.3s ease, box-shadow 0.3s ease;
	}

	.terminal-block:hover {
		border-color: var(--teal);
		box-shadow: var(--glow-teal);
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 1rem;
		background: var(--crust);
		border-bottom: 1px solid var(--surface0);
	}

	.dots {
		display: flex;
		gap: 0.4rem;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.dot.red { background: var(--red); }
	.dot.yellow { background: var(--yellow); }
	.dot.green { background: var(--green); }

	.title {
		font-size: 0.7rem;
		color: var(--overlay0);
		font-family: var(--font-mono);
	}

	.spacer {
		flex: 1;
	}

	.terminal-body {
		padding: 1.25rem;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		line-height: 1.8;
		color: var(--subtext1);
	}
</style>
