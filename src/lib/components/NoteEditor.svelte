<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let note: Note;

	const dispatch = createEventDispatcher();

	const change = () => {
		dispatch('change', note);
	};
</script>

<input id="name" type="text" bind:value={note.name} on:change={change} />

<textarea bind:value={note.contents} on:change={change} />

<style lang="scss">
	$name-height: 2.5rem;
	#name {
		@include overflow-ellipsis;
		margin-bottom: $spacing-default;
		width: 100%;
		background-color: transparent;
		border: none;
		outline: none;
		font-size: 1.75rem;
		height: $name-height;
	}

	textarea {
		resize: none;
		width: 100%;
		background-color: transparent;
		border: none;
		outline: none;
		height: calc(100% - $spacing-default - $name-height);
	}
</style>
