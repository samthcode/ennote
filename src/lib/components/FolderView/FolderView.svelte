<script>
	import notes from '$lib/stores/notes';
	import { isNote } from '$lib/utils/notes';
	import FolderViewFolder from './FolderViewFolder.svelte';
	import FolderViewNote from './FolderViewNote.svelte';
</script>

<ul id="notes-and-folders">
	{#each $notes as noteOrFolder}
		{#if isNote(noteOrFolder)}
			<FolderViewNote note={noteOrFolder} />
		{:else}
			<FolderViewFolder folder={noteOrFolder} />
		{/if}
	{/each}
</ul>

<style lang="scss">
	#notes-and-folders {
		margin-left: $spacing-default;
	}
</style>
