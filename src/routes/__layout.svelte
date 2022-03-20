<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AddNoteDialogue from '$lib/components/AddNoteDialogue.svelte';
	import FolderView from '$lib/components/FolderView/FolderView.svelte';
	import currentNote from '$lib/stores/currentNote';
	import folders from '$lib/stores/folders';
	import notes, { addNote, constructNestedRootFolder } from '$lib/stores/notes';

	let navOpen = false;

	let nestedNotes = constructNestedRootFolder();

	const updateNestedNotes = () => {
		nestedNotes = constructNestedRootFolder();
	};

	const goHome = () => {
		goto('/');
	};

	const selectNote = ({ detail: { id } }) => {
		const note = $notes.find((note) => note.id == id);
		if (note == undefined) return;
		$currentNote = note;
		navOpen = false;
		// If we aren't on the homepage (where the user can actually see the note), go there
		if ($page.url.pathname !== '/') {
			goto('/');
		}
	};

	const openFolder = ({ detail: { path, open } }: CustomEvent<{ path: string; open: boolean }>) => {
		let folderIndex = $folders.findIndex((f) => f.path == path);
		if (folderIndex == -1) {
			const newFolder = {
				path,
				open
			};
			$folders.push(newFolder);
		} else {
			$folders[folderIndex].open = open;
		}
		$folders = $folders;

		updateNestedNotes();
	};

	const addNoteToRoot = ({
		detail: { name, location }
	}: CustomEvent<{ name: string; location: string }>) => {
		addNote(name, [], location);

		let folderPath = '';
		for (const folder of location.split('/')) {
			folderPath += folderPath == '' ? folder : '/' + folder;
			let folderIndex = $folders.findIndex((f) => f.path == folderPath);
			if (folderIndex == -1) {
				const newFolder = {
					path: folderPath,
					open: true
				};
				$folders.push(newFolder);
			} else {
				$folders[folderIndex].open = true;
			}
		}

		updateNestedNotes();
	};
</script>

<svelte:head>
	<script src="https://kit.fontawesome.com/ef69c66e38.js" crossorigin="anonymous"></script>
</svelte:head>

<div id="all">
	<div id="heading-area">
		<button id="open-nav-mobile" on:click={() => (navOpen = !navOpen)}>
			<div class="button-bar" />
			<div class="button-bar" />
			<div class="button-bar" />
		</button>
		<h1 on:click={goHome}>Ennote</h1>
	</div>
	<nav class:nav-open={navOpen}>
		<div id="add-note">
			<AddNoteDialogue on:addnote={addNoteToRoot} />
		</div>
		<FolderView bind:notes={nestedNotes} on:selectnote={selectNote} on:openfolder={openFolder} />
	</nav>
	<div id="footer" class:nav-open={navOpen}>
		<a href="/about">About</a><span>&copy; Sam T 2022</span>
	</div>
	<div id="main-content">
		<slot />
	</div>
</div>

<style lang="scss">
	#add-note {
		margin-bottom: $spacing-default;
	}
	#all {
		height: 100vh;
		height: -webkit-fill-available;
		width: 100vw;
		top: 0;
		left: 0;
		position: fixed;
	}

	$nav-width: 20rem;
	$heading-area-height: 5rem;

	#heading-area {
		padding: $spacing-default;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		height: $heading-area-height;
		width: $nav-width;
		background-color: $neutral-400;
		h1 {
			user-select: none;
			display: inline;
			&:hover {
				cursor: pointer;
			}
		}
		display: flex;
		flex-direction: row;
		align-items: center;
		@include constrained-media($mobile-width) {
			width: 100%;
		}
		#open-nav-mobile {
			display: none;
			@media screen and (max-width: $mobile-width) {
				background-color: $neutral-500;
				border-right: none;
				display: flex;
				flex-direction: column;
				border: none;
				width: 2rem;
				height: 2rem;
				border-radius: 1rem;
				align-items: center;
				justify-content: center;
				.button-bar {
					height: 0.2rem;
					width: 1rem;
					background-color: $white;
					&:not(:last-child) {
						margin-bottom: 0.2rem;
					}
					border-radius: 0.1rem;
				}
				margin-right: $spacing-default;
			}
		}
	}
	nav {
		width: $nav-width;
		position: fixed;
		z-index: 1;
		top: $heading-area-height;
		bottom: $heading-area-height;
		overflow-y: auto;
		left: 0;
		background-color: $neutral-400;
		padding: $spacing-default;
		@include overflow-ellipsis;
		@media screen and (max-width: $mobile-width) {
			width: 80%;
			left: -100%;
			transition: left 0.3s ease-out;
			&.nav-open {
				left: 0;
			}
		}
	}

	#footer {
		padding: $spacing-default;
		position: fixed;
		z-index: 1;
		bottom: 0;
		left: 0;
		height: $heading-area-height;
		width: $nav-width;
		@media screen and (max-width: $mobile-width) {
			width: 80%;
			left: -100%;
			transition: left 0.3s ease-out;
			&.nav-open {
				left: 0;
			}
		}
		background-color: $neutral-400;
		display: flex;
		align-items: center;
		justify-content: center;
		& > *:not(:last-child) {
			margin-right: $spacing-default;
		}
		a:hover {
			color: $primary;
		}
	}

	#main-content {
		margin-left: $nav-width;
		background-color: $neutral-500;
		height: 100%;
		padding: $spacing-default;
		@media screen and (max-width: $mobile-width) {
			box-sizing: border-box;
			margin-left: 0;
			margin-top: $heading-area-height;
			height: calc(100% - $heading-area-height);
		}
	}

	h1 {
		color: $primary;
	}
</style>
