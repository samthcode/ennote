<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let note: NestedNote;
</script>

<li on:click={() => dispatch('selectnote', { id: note.id })}>
	<i class="fa-regular fa-file-lines" />{note.name}
</li>

<style lang="scss">
	li {
		list-style: none;
		i {
			margin-right: 0.5em;
			height: 0.75rem;
		}
		padding-top: 0.25rem;
		user-select: none;
		&:hover {
			cursor: pointer;
		}
		@include overflow-ellipsis;
	}
</style>
