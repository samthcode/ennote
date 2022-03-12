import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { v4 as uuid } from 'uuid';

const gettingStarted: FlatNote = {
	name: 'Getting Started',
	contents: 'Getting Started with Ennote',
	tags: [],
	id: uuid()
};

const defaultState: FlatRootFolder = [
	gettingStarted,
	{
		name: 'From Ennote',
		open: true,
		id: uuid(),
		children: [gettingStarted.id]
	}
];

export const notes = writable<FlatRootFolder>(
	browser
		? localStorage.getItem('notes')
			? JSON.parse(localStorage.getItem('notes'))
			: defaultState
		: defaultState
);

notes.subscribe((value) => {
	if (browser) {
		localStorage.setItem('notes', JSON.stringify(value));
	}
});

export default notes;
