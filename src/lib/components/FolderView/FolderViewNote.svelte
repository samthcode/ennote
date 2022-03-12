<script lang="ts">
	export let note: Note;
</script>

<li class="folder-view__li">{note.name}</li>

<style lang="scss">
	li {
		list-style-type: circle;
	}
</style>