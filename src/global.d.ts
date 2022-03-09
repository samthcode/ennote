type Note = {
	name: string;
	contents: string;
	tags: string[];
};

type Folder = { name: string; contents: Array<Note | Folder> };

type RootFolder = Array<Note | Folder>;
