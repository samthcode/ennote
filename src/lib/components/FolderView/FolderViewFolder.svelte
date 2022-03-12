<script lang="ts">
	import notes from '$lib/stores/notes';
	import { isNote } from '$lib/utils/notes';
	import { createEventDispatcher } from 'svelte';
	import FolderViewNote from './FolderViewNote.svelte';

	const dispatch = createEventDispatcher();

	export let folder: Folder;

	$: innerListShown = ($notes.find((nof) => nof.id === folder.id) as FlatFolder).open;

	const setOpen = () => {
		($notes[$notes.findIndex((nof) => nof.id === folder.id)] as FlatFolder).open = !(
			$notes.find((nof) => nof.id === folder.id) as FlatFolder
		).open;
	};
</script>

<li class="folder-view__li">
	<span id="name" on:click={setOpen}>{folder.name}</span>
	<ul id="inner-list" class:shown={innerListShown}>
		{#each folder.contents as noteOrFolder}
			{#if isNote(noteOrFolder)}
				<FolderViewNote note={noteOrFolder} on:selecttodo />
			{:else}
				<svelte:self folder={noteOrFolder} on:selecttodo />
			{/if}
		{/each}
	</ul>
</li>

<style lang="scss">
	#name {
		user-select: none;
		&:hover {
			cursor: pointer;
		}
	}
	#inner-list {
		list-style-position: inside;
		display: none;
		&.shown {
			display: block;
		}
	}
	li {
		list-style-type: disc;
	}
</style>
