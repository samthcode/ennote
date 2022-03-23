<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';

	const { closeNav } = getContext('nav');

	export let note: Note;

	const dispatch = createEventDispatcher();

	const change = () => {
		dispatch('change', note);
	};
</script>

<svelte:head>
	<meta name="viewport" content="maximum-scale=1" />
</svelte:head>

<div class="flex-container">
	<input on:focus={closeNav} id="name" type="text" bind:value={note.name} on:change={change} />

	<textarea on:focus={closeNav} bind:value={note.contents} on:change={change} />
</div>

<style lang="scss">
	.flex-container {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		height: 100%;
	}
	#name {
		@include overflow-ellipsis;
		padding-bottom: calc($spacing-default / 2);
		border: none;
		border-bottom: 2px solid $neutral-400;
		border-radius: 0;
		width: 100%;
		background-color: transparent;
		outline: none;
		font-size: 1.75rem;
		height: 2.5rem;
	}

	textarea {
		margin-top: calc($spacing-default / 2);
		resize: none;
		width: 100%;
		background-color: transparent;
		border: none;
		outline: none;
		flex-grow: 1;
	}
</style>
