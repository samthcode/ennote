<script>
	import NoteEditor from '$lib/components/NoteEditor.svelte';
	import currentNote from '$lib/stores/currentNote';
	import notes from '$lib/stores/notes';

	const currentNoteChanged = ({ detail: note }) => {
		const index = $notes.findIndex((nof) => nof.id === note.id);
		if (index === -1) {
			console.error(`currentNoteChanged(): Couldn't find note with id: ${note.id}.`);
			return;
		}
		$notes[index] = note;
		$currentNote = note;
	};
</script>

<svelte:head>
	<title>Ennote</title>
</svelte:head>

{#if $currentNote}
	<NoteEditor note={$currentNote} on:change={currentNoteChanged} />
{:else}
	<p>Select or create a note to begin...</p>
{/if}
