<script lang="ts">
	import notes from '$lib/stores/notes';
	import { isNote, constructNestedRootFolder } from '$lib/utils/notes';
	import FolderViewFolder from './FolderViewFolder.svelte';
	import FolderViewNote from './FolderViewNote.svelte';
	import { createEventDispatcher } from 'svelte';
	import AddButton from '../AddButton.svelte';

	let dispatch = createEventDispatcher();

	const addNoteOrFolderToRoot = () => {
		dispatch('addnoteorfolder', null);
	};

	$: nestedNotes = constructNestedRootFolder($notes);
</script>

<ul id="folder-view-list">
	{#each nestedNotes as noteOrFolder}
		{#if isNote(noteOrFolder)}
			<FolderViewNote note={noteOrFolder} on:selectnote />
		{:else}
			<FolderViewFolder folder={noteOrFolder} on:selectnote on:selectfolder on:addnoteorfolder />
		{/if}
	{/each}
	<li class="folder-view__li--addbtn">
		<AddButton on:click={addNoteOrFolderToRoot} />
	</li>
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

	:global(.folder-view__li--addbtn) {
		padding-left: $spacing-small;
		list-style-type: square;
	}
</style>
