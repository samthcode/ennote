<script lang="ts">
	import { isNestedFolder } from '$lib/stores/notes';
	import { createEventDispatcher } from 'svelte';
	import FolderViewNote from './FolderViewNote.svelte';

	export let folder: NestedFolder;

	const dispatch = createEventDispatcher();

	const openFolder = () => {
		dispatch('openfolder', { path: folder.path, open: !folder.open });
	};

	$: innerListShown = folder.open;
</script>

<li>
	<span id="name" class="w-full inline-block" on:click={openFolder}>
		{#if innerListShown}
			<i class="fa-regular fa-folder-open" />
		{:else}
			<i class="fa-regular fa-folder-closed" />
		{/if}{folder.name}</span
	>
	<ul id="inner-list" class:shown={innerListShown}>
		{#each folder.contents as noteOrFolder}
			{#if !isNestedFolder(noteOrFolder)}
				<FolderViewNote note={noteOrFolder} on:selectnote />
			{:else}
				<svelte:self folder={noteOrFolder} on:selectnote on:openfolder />
			{/if}
		{/each}
	</ul>
</li>

<style lang="scss">
	li {
		padding-top: 0.25rem;
		list-style-type: none;
		@include overflow-ellipsis;
	}
	#name {
		user-select: none;
		&:hover {
			cursor: pointer;
		}
		height: 1.5rem;
		line-height: 1.5rem;
	}
	#inner-list {
		list-style-position: inside;
		display: none;
		&.shown {
			display: block;
		}
		padding-left: $spacing-default;
	}
</style>
