<script lang="ts">
	import { isNestedFolder } from '$lib/stores/notes';
	import { createEventDispatcher } from 'svelte';
	import FolderViewNote from './FolderViewNote.svelte';

	const dispatch = createEventDispatcher();

	export let folder: NestedFolder;

	$: innerListShown = folder.open;
</script>

<li class="folder-view__li">
	<span id="name">{folder.name}</span>
	<ul id="inner-list" class:shown={innerListShown}>
		{#each folder.contents as noteOrFolder}
			{#if !isNestedFolder(noteOrFolder)}
				<FolderViewNote note={noteOrFolder} on:selectnote />
			{:else}
				<svelte:self folder={noteOrFolder} on:selectnote />
			{/if}
		{/each}
	</ul>
</li>

<style lang="scss">
	#name {
		user-select: none;
		&:hover {
			cursor: pointer;
		}
	}
	#inner-list {
		list-style-position: inside;
		display: none;
		&.shown {
			display: block;
		}
	}
	li:not(.folder-view__li--addbtn) {
		list-style-type: disc;
	}
</style>
