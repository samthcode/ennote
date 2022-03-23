<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';

	const { closeNav } = getContext('layout');

	export let note: Note;

	const dispatch = createEventDispatcher();

	const change = () => {
		dispatch('change', note);
	};
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
</svelte:head>

<div
	class="flex flex-col flex-wrap h-full overflow-x-hidden text-ellipsis whitespace-nowrap border-none"
>
	<input
		class="w-full bg-transparent outline-none"
		on:focus={closeNav}
		id="name"
		type="text"
		bind:value={note.name}
		on:change={change}
	/>
	<input
		on:focus={closeNav}
		id="location"
		type="text"
		class="border-none outline-none"
		bind:value={note.location}
		on:change={change}
	/>

	<textarea class="resize-none w-full border-none outline-none flex-grow text-xl bg-transparent" on:focus={closeNav} bind:value={note.contents} on:change={change} />
</div>

<style lang="scss">
	#name {
		padding-bottom: calc($spacing-default / 2);
		border-bottom: 2px solid $neutral-400;
		border-radius: 0;
		font-size: 1.75rem;
		height: 2.5rem;
	}
	#location {
		margin-top: calc($spacing-default / 2);
		height: 2rem;
		font-size: 1.25rem;
		line-height: 1.25rem;
		border-radius: 1rem;
		background-color: $primary;
		padding: 0.75rem;
	}
	textarea {
		margin-top: $spacing-default;
	}
</style>
