<script lang="ts">
	import { isNote } from '$lib/utils/notes';
	import FolderViewNote from './FolderViewNote.svelte';

	export let folder: Folder;
</script>

<li>
	{folder.name}
	<ul>
		{#each folder.contents as noteOrFolder}
			{#if isNote(noteOrFolder)}
				<FolderViewNote note={noteOrFolder} />
			{:else}
				<svelte:self folder={noteOrFolder} />
			{/if}
		{/each}
	</ul>
</li>
