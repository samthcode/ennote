<script lang="ts">
	import { isNestedFolder } from '$lib/stores/notes';
	import FolderViewFolder from './FolderViewFolder.svelte';
	import FolderViewNote from './FolderViewNote.svelte';

	export let notes: NestedRoot;
</script>

<ul id="folder-view-list">
	{#each notes as noteOrFolder}
		{#if !isNestedFolder(noteOrFolder)}
			<FolderViewNote note={noteOrFolder} on:selectnote />
		{:else}
			<FolderViewFolder folder={noteOrFolder} on:selectnote on:openfolder />
		{/if}
	{/each}
</ul>

<style lang="scss">
	#folder-view-list {
		@include overflow-ellipsis;
		list-style: none;
	}
</style>
