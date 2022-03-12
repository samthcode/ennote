<script lang="ts">
	import { isNote } from '$lib/utils/notes';
	import FolderViewNote from './FolderViewNote.svelte';

	export let folder: Folder;

	let innerListShown = false;
</script>

<li class="folder-view__li">
	<span id="name" on:click={() => (innerListShown = !innerListShown)}>{folder.name}</span>
	<ul id="inner-list" class:shown={innerListShown}>
		{#each folder.contents as noteOrFolder}
			{#if isNote(noteOrFolder)}
				<FolderViewNote note={noteOrFolder} />
			{:else}
				<svelte:self folder={noteOrFolder} />
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
	li {
		list-style-type: disc;
	}
</style>
