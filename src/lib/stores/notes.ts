import { get, writable } from 'svelte/store';
import { browser } from '$app/env';
import { v4 as uuid } from 'uuid';

const defaultState: Root = [
	{
		name: 'Getting Started',
		contents: 'Getting Started with Ennote',
		tags: [],
		id: uuid(),
		location: 'From Ennote'
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

export const isNestedFolder = (
	noteOrFolder: NestedFolder | NestedNote
): noteOrFolder is NestedFolder => {
	return (noteOrFolder as NestedFolder).open !== undefined;
};

const noteToNestedNote = (note: Note): NestedNote => {
	return {
		name: note.name,
		id: note.id
	};
};

const nestFolders = (folders: string[], endNote: NestedNote): NestedFolder | NestedNote => {
	if (folders.length === 0) return endNote;
	return {name: folders[0], contents: [nestFolders(folders.slice(1), endNote)], open: false}
}

export const constructNestedRootFolder = (): NestedRoot => {
	const res: NestedRoot = [];
	for (const note of get(notes)) {
		if (note.location == '') {
			res.push(noteToNestedNote(note));
		} else {
			const finalFolder: NestedFolder = {
				name: note.location.split('/')[0],
				contents: [],
				open: false
			};
			finalFolder.contents.push(
				nestFolders(note.location.split('/').slice(1), noteToNestedNote(note))
			);
			res.push(finalFolder);
		}
	}
	return res;
};
