<script lang="ts">
	import currentNote from '$lib/stores/currentNote';

	import notes from '$lib/stores/notes';
	import { isNote, constructNestedRootFolder } from '$lib/utils/notes';
	import { createEventDispatcher } from 'svelte';
	import FolderViewFolder from './FolderViewFolder.svelte';
	import FolderViewNote from './FolderViewNote.svelte';

	const dispatch = createEventDispatcher();

	const selectNote = ({ detail: { id } }) => {
		if ($notes.find((nof) => nof.id === id)) {
			$currentNote = $notes.find((nof) => nof.id === id) as Note;
		}
		dispatch('noteselected');
	};

	$: nestedNotes = constructNestedRootFolder($notes);
</script>

<ul id="folder-view-list">
	{#each nestedNotes as noteOrFolder}
		{#if isNote(noteOrFolder)}
			<FolderViewNote note={noteOrFolder} on:selectnote={selectNote} />
		{:else}
			<FolderViewFolder folder={noteOrFolder} on:selectnote={selectNote} />
		{/if}
	{/each}
</ul>

<style lang="scss">
	#folder-view-list {
		@include overflow-ellipsis;
		list-style-position: inside;
	}

	:global(.folder-view__li) {
		padding-left: $spacing-small;
		@include overflow-ellipsis;
	}
</style>
