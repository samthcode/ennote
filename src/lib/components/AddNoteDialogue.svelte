<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let name: HTMLInputElement;
	let location: HTMLInputElement;

	let error = '';

	const addNote = () => {
		if (name.value.trim() == '') {
			error = "The note's name may not be empty (or completely whitespace).";
			return;
		}
		if (!name.value.match(/^[a-zA-Z0-9- ._]+$/)) {
			error =
				"Please constrain your note name to alphabetical characters, numbers, or some select symbols such as: 'this is my-note_here.'";
			return;
		}
		if (!location.value.match(/^(?:(?:[a-zA-Z0-9-_ .]+?\/)*[a-zA-Z0-9-_ .]+)?$/)) {
			error =
				"Please constrain your path to this format: 'base folder/other_folder/.../final-folder";
			return;
		}

		dispatch('addnote', { name: name.value, location: location.value });

		name.value = '';
		location.value = '';
		error = '';
	};
</script>

{#if error !== ''}
	<div id="error">Error: {error}</div>
{/if}
<input type="text" id="name" bind:this={name} on:focus={() => (error = '')} />
<div id="loc-and-btn">
	<input type="text" id="location" bind:this={location} on:focus={() => (error = '')} />
	<button on:click={addNote}><i class="fa-regular fa-square-plus" /></button>
</div>

<style lang="scss">
	#error {
		background-color: red;
		border-radius: 2px;
		color: $white;
		margin-bottom: $spacing-small;
		padding: 0.5rem;
		word-break: break-word;
		white-space: normal;
		width: 100%;
	}
	#loc-and-btn {
		display: flex;
		height: 2rem;
		width: 100%;
		flex-direction: row;
	}
	#name {
		display: block;
		width: 100%;
		margin-bottom: $spacing-small;
	}
	#location {
		flex-grow: 1;
		width: 100%;
	}
	input {
		background-color: $neutral-500;
		border: none;
		outline: none;
		color: $white;
		height: 2rem;
		line-height: 2rem;
		font-size: 1.1rem;
		padding: 0.5rem;
	}
	button {
		margin-left: $spacing-small;
		font-size: 2rem;
		line-height: 2rem;
		background-color: transparent;
		border: none;
		&:hover {
			cursor: pointer;
		}
	}
</style>
