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

export const constructNestedRootFolder = (root: FlatRootFolder): RootFolder => {
	const res: RootFolder = [];

	for (const folder of root.filter((nof) => !isFlatNote(nof))) {
		const f = flatNoteOrFolderToNoteOrFolder(folder) as Folder;
		f.contents = populateChildren(root, (folder as FlatFolder).children);
		res.push(f);
	}
	for (const other of root) {
		if (
			!isFlatNote(other) ||
			root.some((nof) => {
				if (isFlatNote(nof)) return false;
				return (nof as FlatFolder).children.includes(other.id);
			})
		) {
			continue;
		}
		res.push(flatNoteOrFolderToNoteOrFolder(other));
	}
	return res;
};

function populateChildren(root: FlatRootFolder, children: string[]): Array<Note | Folder> {
	return children.map((id) => {
		const element = root.find((nof) => nof.id === id);
		const e = flatNoteOrFolderToNoteOrFolder(element);
		if (!isFlatNote(element)) {
			(e as Folder).contents = populateChildren(root, element.children);
		}
		return e;
	});
}
