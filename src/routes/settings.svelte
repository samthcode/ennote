<script lang="ts">
	import { browser } from '$app/env';
	import ErrorAlert from '$lib/components/ErrorAlert.svelte';
	import currentNote from '$lib/stores/currentNote';

	import folders from '$lib/stores/folders';
	import notes from '$lib/stores/notes';

	const clearAll = () => {
		if (!confirm('Are you sure you want to remove every singe note and folder from your device?'))
			return;
		$notes = [];
		$folders = [];
		$currentNote = null;
		if (browser) location.reload();
	};
</script>

<h2>Settings</h2>

<div class="mt-6">
	<ErrorAlert>
		This page can cause irreversible damage to your notes. Use with extreme caution.
	</ErrorAlert>
</div>

<div id="btn-list">
	<button on:click={clearAll}>Clear all notes and folders</button> Clears all notes and folders stored
	on the device. Irreversible.
</div>

<style lang="scss">
	#btn-list {
		display: grid;
		grid-template-columns: max-content auto;
		gap: $spacing-default;
		align-items: center;
		margin-block: $spacing-default;
	}

	button {
		background-color: $neutral-400;
		border-radius: 2px;
		outline: none;
		border: none;
		padding: $spacing-small;
		&:hover {
			background-color: $neutral-300;
		}
	}
</style>
