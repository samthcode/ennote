type Note = {
	name: string;
	contents: string;
	tags: string[];
	id: string;
};

type Folder = { name: string; open: boolean; id: string; contents: Array<Note | Folder> };

type RootFolder = Array<Note | Folder>;

type FlatNote = Note;

type FlatFolder = { name: string; open: boolean; id: string; children: string[] };

type FlatRootFolder = Array<FlatNote | FlatFolder>;
