<script lang="ts">
	import { isNestedFolder, constructNestedRootFolder } from '$lib/stores/notes';
	import FolderViewFolder from './FolderViewFolder.svelte';
	import FolderViewNote from './FolderViewNote.svelte';

	let nestedNotes: NestedRoot;
	$: nestedNotes = constructNestedRootFolder();
</script>

<ul id="folder-view-list">
	{#each nestedNotes as noteOrFolder}
		{#if !isNestedFolder(noteOrFolder)}
			<FolderViewNote note={noteOrFolder} on:selectnote />
		{:else}
			<FolderViewFolder
				folder={noteOrFolder}
				on:selectnote
			/>
		{/if}
	{/each}
</ul>

<style lang="scss">
	#folder-view-list {
		@include overflow-ellipsis;
		list-style-position: inside;
	}
</style>
