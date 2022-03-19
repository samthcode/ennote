<script lang="ts">
	import folders from '$lib/stores/folders';
	import notes, { isNestedFolder, constructNestedRootFolder } from '$lib/stores/notes';
	import FolderViewFolder from './FolderViewFolder.svelte';
	import FolderViewNote from './FolderViewNote.svelte';
</script>

<ul id="folder-view-list">
	{#key $notes && $folders}
		{#each constructNestedRootFolder() as noteOrFolder}
			{#if !isNestedFolder(noteOrFolder)}
				<FolderViewNote note={noteOrFolder} on:selectnote />
			{:else}
				<FolderViewFolder folder={noteOrFolder} on:selectnote on:openfolder />
			{/if}
		{/each}
	{/key}
</ul>

<style lang="scss">
	#folder-view-list {
		@include overflow-ellipsis;
		list-style-position: inside;
	}
</style>
