<script lang="ts">
	import { isNestedFolder } from '$lib/stores/notes';
	import { createEventDispatcher } from 'svelte';
	import FolderViewNote from './FolderViewNote.svelte';

	export let folder: NestedFolder;

	const dispatch = createEventDispatcher();

	const openFolder = () => {
		dispatch('openfolder', { path: folder.path, open: !folder.open });
	};

	$: innerListShown = folder.open;
</script>

<li>
	<span id="name" on:click={openFolder}>{folder.name}</span>
	<ul id="inner-list" class:shown={innerListShown}>
		{#each folder.contents as noteOrFolder}
			{#if !isNestedFolder(noteOrFolder)}
				<FolderViewNote note={noteOrFolder} on:selectnote />
			{:else}
				<svelte:self folder={noteOrFolder} on:selectnote on:openfolder />
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
