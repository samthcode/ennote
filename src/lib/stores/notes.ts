import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { v4 as uuid } from 'uuid';

const defaultState: RootFolder = [
	{
		name: 'From Ennote',
		contents: [
			{ name: 'Getting Started', contents: 'Getting Started with Ennote', tags: [], id: uuid() }
		]
	}
];

export const notes = writable<RootFolder>(
	browser
		? localStorage.getItem('notes')
			? JSON.parse(localStorage.getItem('notes'))
			: defaultState
		: defaultState
);

export default notes;
