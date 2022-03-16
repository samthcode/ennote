export const isNestedFolder = (noteOrFolder: NestedFolder | NestedNote): noteOrFolder is NestedFolder => {
	return (noteOrFolder as NestedFolder).open !== undefined;
};
