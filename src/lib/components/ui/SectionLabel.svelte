<script lang="ts">
	let { index, label }: { index: string; label: string } = $props();
</script>

<div class="section-label">
	<span class="bracket">[</span>
	<span class="index">{index}</span>
	<span class="separator">//</span>
	<span class="name">{label.toUpperCase()}</span>
	<span class="bracket">]</span>
</div>

<style>
	.section-label {
		font-family: var(--font-display);
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		color: var(--teal);
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.bracket {
		color: var(--surface2);
	}

	.index {
		color: var(--overlay1);
	}

	.separator {
		color: var(--surface2);
	}

	.name {
		font-weight: 700;
	}
</style>
