export const isNote = (noteOrFolder: Note | Folder): noteOrFolder is Note => {
	return (noteOrFolder as Note).tags !== undefined;
};
