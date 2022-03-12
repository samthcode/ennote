<script>
	import currentNote from '$lib/stores/currentNote';
</script>

<svelte:head>
	<title>Ennote</title>
</svelte:head>

<h2>My Note</h2>

{#if $currentNote}
	{$currentNote.name}
{/if}
