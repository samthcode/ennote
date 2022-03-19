import { writable } from 'svelte/store';
import { browser } from '$app/env';

const defaultState: Folder[] = [
	{
		path: 'From Ennote',
		open: true
	}
];

export const folders = writable<Folder[]>(
	browser
		? localStorage.getItem('folders')
			? JSON.parse(localStorage.getItem('folders') as string)
			: defaultState
		: defaultState
);

folders.subscribe((value) => {
	if (browser) {
		localStorage.setItem('folders', JSON.stringify(value));
	}
});

export default folders;
