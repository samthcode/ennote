import { writable } from 'svelte/store';
import { constructNestedRootFolder } from './notes';

export const nestedNotes = writable<NestedRoot>(constructNestedRootFolder());

export const updateNestedNotes = () => {
	nestedNotes.set(constructNestedRootFolder());
};

export default nestedNotes;
