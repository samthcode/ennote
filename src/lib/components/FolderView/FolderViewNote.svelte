<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let note: Note;
</script>

<li class="folder-view__li" on:click={() => dispatch('selectnote', { id: note.id })}>
	{note.name}
</li>

<style lang="scss">
	li {
		list-style-type: circle;
		user-select: none;
		&:hover {
			cursor: pointer;
		}
	}
</style>
