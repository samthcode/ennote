<script lang="ts">
	import { isNestedFolder } from '$lib/stores/notes';
	import FolderViewNote from './FolderViewNote.svelte';

	export let folder: NestedFolder;

	$: innerListShown = folder.open;
</script>

<li>
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
	li {
		list-style-type: disc;
		@include overflow-ellipsis;
		padding-left: $spacing-default;
	}
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
</style>
