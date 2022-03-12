import { browser } from '$app/env';
import { writable } from 'svelte/store';

const currentNote = writable<Note>(
	browser
		? localStorage.getItem('currentNote')
			? JSON.parse(localStorage.getItem('currentNote'))
			: null
		: null
);

currentNote.subscribe((value) => {
	if (browser) {
		localStorage.setItem('currentNote', JSON.stringify(value));
	}
});

export default currentNote;
