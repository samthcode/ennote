type Note = {
	name: string;
	contents: string;
	tags: string[];
	id: string;
	location: string;
};

type Root = Note[];

type Folder = {
	path: string;
	open: boolean;
};

type NestedNote = {
	name: string;
	id: string;
};

type NestedFolder = {
	name: string;
	contents: (NestedNote | NestedFolder)[];
	open: boolean;
};

type NestedRoot = (NestedNote | NestedFolder)[];
