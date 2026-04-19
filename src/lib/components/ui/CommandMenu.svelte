<script lang="ts">
	import { onMount } from 'svelte';
	import { Terminal } from 'lucide-svelte';
	import { getCommands, type Command } from '$lib/commands/index.js';

	let open = $state(false);
	let query = $state('');
	let selectedIndex = $state(0);
	let inputEl: HTMLInputElement | undefined = $state();

	const commands = getCommands();

	let filtered = $derived.by(() => {
		if (!query.trim()) return commands;
		const q = query.toLowerCase();
		return commands.filter(
			(cmd) =>
				cmd.label.toLowerCase().includes(q) ||
				cmd.description.toLowerCase().includes(q) ||
				cmd.category.toLowerCase().includes(q) ||
				cmd.keywords?.some((k) => k.includes(q))
		);
	});

	function openMenu() {
		open = true;
		query = '';
		selectedIndex = 0;
		requestAnimationFrame(() => inputEl?.focus());
	}

	function close() {
		open = false;
	}

	function toggle() {
		if (open) close();
		else openMenu();
	}

	function execute(cmd: Command) {
		cmd.action();
		close();
	}

	function handleGlobalKeydown(e: KeyboardEvent) {
		if (e.key === '/' && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			toggle();
		}
		if (!open && e.key === 'Escape') return;
		if (!open) return;
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
		}
	}

	function handleMenuKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (filtered[selectedIndex]) {
				execute(filtered[selectedIndex]);
			}
		} else if (e.key === 'Escape') {
			e.preventDefault();
			close();
		}
	}

	// Reset selection when filter changes
	$effect(() => {
		filtered;
		selectedIndex = 0;
	});

	onMount(() => {
		document.addEventListener('keydown', handleGlobalKeydown);
		return () => document.removeEventListener('keydown', handleGlobalKeydown);
	});
</script>

<!-- Floating trigger button -->
{#if !open}
	<button class="trigger-btn" onclick={openMenu} title="Command Menu (Ctrl+/)">
		<Terminal size={16} />
		<span class="trigger-keys"><kbd>Ctrl</kbd><span class="plus">+</span><kbd>/</kbd></span>
	</button>
{/if}

{#if open}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="overlay" onclick={close} onkeydown={() => {}}>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="menu" onclick={(e) => e.stopPropagation()}>
			<div class="input-row">
				<span class="prompt">&gt;_</span>
				<input
					bind:this={inputEl}
					bind:value={query}
					onkeydown={handleMenuKeydown}
					type="text"
					placeholder="Type a command..."
					spellcheck="false"
					autocomplete="off"
				/>
			</div>

			<div class="divider"></div>

			<div class="results">
				{#if filtered.length === 0}
					<div class="empty">No commands found.</div>
				{:else}
					{#each filtered as cmd, i}
						<button
							class="result-item"
							class:selected={i === selectedIndex}
							onmouseenter={() => (selectedIndex = i)}
							onclick={() => execute(cmd)}
						>
							<span class="result-category">[{cmd.category}]</span>
							<span class="result-label">{cmd.label}</span>
							<span class="result-desc">{cmd.description}</span>
						</button>
					{/each}
				{/if}
			</div>

			<div class="divider"></div>

			<div class="footer-hint">
				<span><kbd>↑↓</kbd> navigate</span>
				<span><kbd>Enter</kbd> select</span>
				<span><kbd>Esc</kbd> close</span>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Floating trigger button */
	.trigger-btn {
		position: fixed;
		bottom: 24px;
		right: 24px;
		z-index: 100;
		display: flex;
		align-items: center;
		gap: 8px;
		background: var(--mantle);
		border: 1px solid var(--surface1);
		border-radius: var(--radius);
		padding: 8px 14px;
		cursor: pointer;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--overlay1);
		opacity: 0.7;
		transition: opacity 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
		animation: fadeIn 1s ease 2s both;
	}

	.trigger-btn:hover {
		opacity: 1;
		border-color: var(--teal);
		box-shadow: var(--glow-teal);
		color: var(--teal);
	}

	.trigger-keys {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.trigger-keys .plus {
		color: var(--overlay0);
		font-size: 10px;
		margin: 0 1px;
	}

	.trigger-btn kbd {
		background: var(--surface0);
		border: 1px solid var(--surface1);
		border-radius: 3px;
		padding: 1px 5px;
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--subtext0);
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(8px); }
		to { opacity: 0.7; transform: translateY(0); }
	}

	@media (max-width: 1023px) {
		.trigger-btn {
			bottom: 16px;
			right: 16px;
		}
	}

	/* Overlay & menu */
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(17, 17, 27, 0.7);
		backdrop-filter: blur(4px);
		z-index: 9999;
		display: flex;
		justify-content: center;
		padding-top: 15vh;
	}

	.menu {
		background: var(--mantle);
		border: 1px solid var(--surface1);
		border-radius: var(--radius);
		width: 560px;
		max-width: 90vw;
		max-height: 420px;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.5), var(--glow-teal);
		align-self: flex-start;
		overflow: hidden;
	}

	.input-row {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 14px 16px;
	}

	.prompt {
		color: var(--teal);
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 700;
		flex-shrink: 0;
	}

	input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 14px;
		caret-color: var(--teal);
	}

	input::placeholder {
		color: var(--overlay0);
	}

	.divider {
		height: 1px;
		background: var(--surface1);
	}

	.results {
		flex: 1;
		overflow-y: auto;
		padding: 6px 0;
	}

	.empty {
		padding: 16px;
		color: var(--overlay1);
		font-family: var(--font-mono);
		font-size: 13px;
		text-align: center;
	}

	.result-item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 10px 16px;
		background: transparent;
		border: none;
		cursor: pointer;
		text-align: left;
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--text);
		transition: background 0.1s ease;
	}

	.result-item.selected {
		background: var(--surface0);
	}

	.result-category {
		color: var(--teal);
		font-size: 11px;
		flex-shrink: 0;
		font-weight: 700;
	}

	.result-label {
		flex-shrink: 0;
		color: var(--text);
	}

	.result-desc {
		color: var(--overlay1);
		font-size: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.footer-hint {
		display: flex;
		gap: 16px;
		padding: 8px 16px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--overlay0);
	}

	.footer-hint kbd {
		background: var(--surface0);
		border: 1px solid var(--surface1);
		border-radius: 3px;
		padding: 1px 5px;
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--subtext0);
	}
</style>
