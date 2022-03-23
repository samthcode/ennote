<script lang="ts">
	import NoteEditor from '$lib/components/NoteEditor.svelte';
	import currentNote from '$lib/stores/currentNote';
	import folders from '$lib/stores/folders';
	import notes from '$lib/stores/notes';
	import { getContext } from 'svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		for (const [i, folder] of $folders.entries()) {
			if (!$notes.some((note) => note.location.startsWith(folder.path))) {
				console.log(folder);
				$folders.splice(i, 1);
			}
		}
		$folders = $folders;
		console.log('onMount - $folders', $folders);
	});

	const { updateNestedNotes } = getContext('layout');

	const currentNoteChanged = ({ detail: note }) => {
		const index = $notes.findIndex((nof) => nof.id === note.id);
		if (index === -1) {
			console.error(`currentNoteChanged - Couldn't find note with id: ${note.id}.`);
			return;
		}
		$notes[index].name = note.name;
		$notes[index].contents = note.contents;
		$notes[index].tags = note.tags;
		if (
			$notes[index].location != note.location &&
			note.location.match(/^(?:(?:[a-zA-Z0-9-_ .]+?\/)*[a-zA-Z0-9-_ .]+)?$/)
		) {
			$notes[index].location = note.location;
			let folderPath = '';
			for (const folder of note.location.split('/')) {
				folderPath += folderPath == '' ? folder : '/' + folder;
				let folderIndex = $folders.findIndex((f) => f.path == folderPath);
				if (folderIndex == -1) {
					const newFolder = {
						path: folderPath,
						open: true
					};
					$folders.push(newFolder);
				} else {
					$folders[folderIndex].open = true;
				}
			}
			updateNestedNotes();
		}
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
