<script lang="ts">
	import notes from '$lib/stores/notes';
	import { isNote, constructNestedRootFolder } from '$lib/utils/notes';
	import FolderViewFolder from './FolderViewFolder.svelte';
	import FolderViewNote from './FolderViewNote.svelte';

	$: nestedNotes = constructNestedRootFolder($notes);
</script>

<ul id="folder-view-list">
	{#each nestedNotes as noteOrFolder}
		{#if isNote(noteOrFolder)}
			<FolderViewNote note={noteOrFolder} on:selectnote />
		{:else}
			<FolderViewFolder folder={noteOrFolder} on:selectnote />
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
