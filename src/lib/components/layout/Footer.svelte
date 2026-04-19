<script lang="ts">
	import { page } from '$app/stores';

	let footer = $derived($page.data.meta?.footer);
</script>

<footer class="footer">
	<div class="divider">─────────────────────────────</div>
	{#if footer}
		<p class="copyright">{footer.copyright}</p>
		<p class="note">{footer.note}</p>
	{/if}
</footer>

<style>
	.footer {
		background: var(--mantle);
		text-align: center;
		padding: 2rem 1.5rem;
		font-family: var(--font-mono);
	}

	.divider {
		color: var(--surface1);
		font-size: 0.7rem;
		margin-bottom: 1rem;
		overflow: hidden;
	}

	.copyright {
		color: var(--subtext0);
		font-size: 0.75rem;
		margin: 0 0 0.25rem 0;
	}

	.note {
		color: var(--overlay0);
		font-size: 0.7rem;
		margin: 0;
	}
</style>
