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
			<FolderViewNote root note={noteOrFolder} on:selectnote />
		{:else}
			<FolderViewFolder
				root
				folder={noteOrFolder}
				on:selectnote
				on:selectfolder
				on:addnoteorfolder
			/>
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
		@include overflow-ellipsis;
	}

	:global(.folder-view__li--notroot) {
		padding-left: $spacing-default;
	}

	:global(.folder-view__li--addbtn) {
		list-style-type: square;
	}
</style>
