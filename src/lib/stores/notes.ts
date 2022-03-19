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

const nestFolders = (
	location: string[],
	folders: string[],
	endNote: NestedNote
): NestedFolder | NestedNote => {
	if (folders.length === 0) return endNote;
	return {
		path: location.join('/') + '/' + folders[0],
		name: folders[0],
		contents: [nestFolders([...location, folders[0]], folders.slice(1), endNote)],
		open: false
	};
};

export const constructNestedRootFolder = (): NestedRoot => {
	const res: NestedRoot = [];
	for (const note of get(notes)) {
		if (note.location == '') {
			res.push(noteToNestedNote(note));
		} else {
			const firstFolderName = note.location.split('/')[0];
			const finalFolder: NestedFolder = {
				path: firstFolderName,
				name: firstFolderName,
				contents: [],
				open: true
			};
			finalFolder.contents.push(
				nestFolders([firstFolderName], note.location.split('/').slice(1), noteToNestedNote(note))
			);
			res.push(finalFolder);
			console.log('constructNestedRootFolder - finalFolder', finalFolder);
		}
	}
	return res;
};
