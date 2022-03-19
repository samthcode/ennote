import { get, writable } from 'svelte/store';
import { browser } from '$app/env';
import { v4 as uuid } from 'uuid';
import folders from './folders';

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

// export const notes = writable<Root>(defaultState);

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
	fldrs: string[],
	endNote: NestedNote
): NestedFolder | NestedNote => {
	if (fldrs.length === 0) return endNote;
	const path = location.length !== 0 ? location.join('/') + '/' + fldrs[0] : fldrs[0];
	const existingFolder = get(folders).find((f) => f.path == path);
	return {
		path,
		name: fldrs[0],
		contents: [nestFolders([...location, fldrs[0]], fldrs.slice(1), endNote)],
		open: existingFolder ? existingFolder.open : false
	};
};

type NoteOrFolderContainer = NestedRoot | (NestedFolder | NestedNote)[];

const findDeepestNestingPlace = (
	res: NoteOrFolderContainer,
	location: string[]
): [NoteOrFolderContainer, string[], string[]] => {
	const findDeepestNestingPlaceN = (res: NoteOrFolderContainer, location: string[], n: number) => {
		const folders = res.filter((nof) => isNestedFolder(nof));
		for (const folder of folders) {
			if (location[n] == folder.name) {
				return findDeepestNestingPlaceN((folder as NestedFolder).contents, location, n + 1);
			}
		}
		return [res, location.slice(0, n), location.slice(n)];
	};
	return findDeepestNestingPlaceN(res, location, 0);
};

export const constructNestedRootFolder = (): NestedRoot => {
	const res: NestedRoot = [];
	for (const note of get(notes)) {
		if (note.location == '') {
			res.push(noteToNestedNote(note));
		} else {
			const [finalNestingPlace, startingLocation, remaining] = findDeepestNestingPlace(
				res,
				note.location.split('/')
			);

			finalNestingPlace.push(nestFolders(startingLocation, remaining, noteToNestedNote(note)));
		}
	}
	return res;
};
