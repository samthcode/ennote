<script lang="ts">
	import { browser } from '$app/env';

	import folders from '$lib/stores/folders';
	import notes from '$lib/stores/notes';

	const clearAll = () => {
		$notes = [];
		$folders = [];
		if (!confirm('Are you sure you want to remove every singe note and folder from your device?'))
			return;
		if (browser) location.reload();
	};
</script>

<h2>Settings</h2>

<div class="error">
	This page can cause irreversible damage to your notes. Use with extreme caution.
</div>

<button on:click={clearAll}>Clear all notes and folders</button> Clears all notes and folders stored
on the device. Irreversible.

<style lang="scss">
	.error {
		margin-block: $spacing-default;
		background-color: red;
		border-radius: 2px;
		color: $white;
		margin-bottom: $spacing-small;
		padding: 0.5rem;
		word-break: break-word;
		white-space: normal;
		width: 100%;
	}

	button {
		background-color: $neutral-400;
		border-radius: 2px;
		outline: none;
		border: none;
		padding: $spacing-small;
		margin-right: $spacing-default;
	}
</style>
