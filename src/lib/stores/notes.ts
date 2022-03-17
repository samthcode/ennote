import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { v4 as uuid } from 'uuid';

const defaultState: Root = [
	{
		name: 'Getting Started',
		contents: 'Getting Started with Ennote',
		tags: [],
		id: uuid(),
		location: ''
	}
];

export const notes = writable<Root>(
	browser
		? localStorage.getItem('notes')
			? JSON.parse(localStorage.getItem('notes') as string)
			: defaultState
		: defaultState
);

notes.subscribe((value) => {
	if (browser) {
		localStorage.setItem('notes', JSON.stringify(value));
	}
});

export default notes;
