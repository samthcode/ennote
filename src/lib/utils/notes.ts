export const isNote = (noteOrFolder: Note | Folder): noteOrFolder is Note => {
	return (noteOrFolder as Note).tags !== undefined;
};

const isFlatNote = (flatNoteOrFolder: FlatNote | FlatFolder): flatNoteOrFolder is FlatNote => {
	return (flatNoteOrFolder as FlatNote).tags !== undefined;
};

const flatNoteOrFolderToNoteOrFolder = (flatNoteOrFolder: FlatNote | FlatFolder): Note | Folder => {
	if (isFlatNote(flatNoteOrFolder)) {
		return flatNoteOrFolder as Note;
	} else {
		const folder = flatNoteOrFolder as FlatFolder;
		return {
			name: folder.name,
			open: folder.open,
			id: folder.id,
			contents: []
		};
	}
};

export const constructNestedRootFolder = (r: FlatRootFolder): RootFolder => {
	const res: RootFolder = [];

	const root = [...r];

	for (const folder of root.filter(
		(nof) =>
			!isFlatNote(nof) &&
			!root.some((nootof) => {
				if (isFlatNote(nootof)) return false;
				return nootof.children.includes(nof.id);
			})
	)) {
		root.splice(
			root.findIndex((nof) => nof.id === folder.id),
			1
		);
		const f = flatNoteOrFolderToNoteOrFolder(folder) as Folder;
		f.contents = populateChildren(root, (folder as FlatFolder).children);
		res.push(f);
	}
	for (const other of root) {
		res.push(flatNoteOrFolderToNoteOrFolder(other));
	}
	return res;
};

function populateChildren(root: FlatRootFolder, children: string[]): Array<Note | Folder> {
	return children.map((id) => {
		const element = root.find((nof) => nof.id === id);
		const e = flatNoteOrFolderToNoteOrFolder(element);
		root.splice(
			root.findIndex((nof) => nof.id === id),
			1
		);
		if (!isFlatNote(element)) {
			(e as Folder).contents = populateChildren(root, element.children);
		}
		return e;
	});
}
