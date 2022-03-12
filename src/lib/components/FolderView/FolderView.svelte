<script>
	import notes from '$lib/stores/notes';
	import { isNote, constructNestedRootFolder } from '$lib/utils/notes';
	import FolderViewFolder from './FolderViewFolder.svelte';
	import FolderViewNote from './FolderViewNote.svelte';
</script>

<ul id="folder-view-list">
	{#each constructNestedRootFolder($notes) as noteOrFolder}
		{#if isNote(noteOrFolder)}
			<FolderViewNote note={noteOrFolder} />
		{:else}
			<FolderViewFolder folder={noteOrFolder} />
		{/if}
	{/each}
</ul>

<style lang="scss">
	#folder-view-list {
		@include overflow-ellipsis;
		list-style-position: inside;
	}

	:global(.folder-view__li) {
		margin-left: $spacing-small;
		@include overflow-ellipsis;
	}
</style>
