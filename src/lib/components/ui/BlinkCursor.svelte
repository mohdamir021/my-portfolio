<script lang="ts">
	let { character = '█' }: { character?: string } = $props();
</script>

<span class="cursor" aria-hidden="true">{character}</span>

<style>
	.cursor {
		animation: blink 1s step-end infinite;
		color: var(--teal);
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
</style>
