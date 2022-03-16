type Note = {
	name: string;
	contents: string;
	tags: string[];
	id: string;
	path: string;
};

type Root = Note[];

type Folder = {
	name: string;
	path: string;
	open: boolean;
};

type NestedNote = {
	name: string;
	id: string;
};

type NestedFolder = {
	name: string;
	id: string;
	contents: (NestedNote | NestedFolder)[];
};

type NestedRoot = (NestedNote | NestedFolder)[];