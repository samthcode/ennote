<script lang="ts">
	import notes from '$lib/stores/notes';
	import { isNote } from '$lib/utils/notes';
	import { createEventDispatcher } from 'svelte';
	import AddButton from '../AddButton.svelte';
	import FolderViewNote from './FolderViewNote.svelte';

	export let root: boolean = false;

	const dispatch = createEventDispatcher();

	export let folder: Folder;

	$: innerListShown = ($notes.find((nof) => nof.id === folder.id) as FlatFolder).open;

	const selectFolder = () => {
		// Open folder
		($notes[$notes.findIndex((nof) => nof.id === folder.id)] as FlatFolder).open = !(
			$notes.find((nof) => nof.id === folder.id) as FlatFolder
		).open;

		// Dispatch selectfolder
		dispatch('selectfolder', { id: folder.id });
	};

	const addNoteOrFolder = () => {
		dispatch('addnoteorfolder', folder.id);
	};
</script>

<li class="folder-view__li" class:folder-view__li--notroot={!root}>
	<span id="name" on:click={selectFolder}>{folder.name}</span>
	<ul id="inner-list" class:shown={innerListShown}>
		{#each folder.contents as noteOrFolder}
			{#if isNote(noteOrFolder)}
				<FolderViewNote note={noteOrFolder} on:selectnote />
			{:else}
				<svelte:self folder={noteOrFolder} on:selectnote on:selectfolder on:addnoteorfolder />
			{/if}
		{/each}
		<li class="folder-view__li--addbtn folder-view__li--notroot">
			<AddButton on:click={addNoteOrFolder} />
		</li>
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
	li:not(.folder-view__li--addbtn) {
		list-style-type: disc;
	}
</style>
