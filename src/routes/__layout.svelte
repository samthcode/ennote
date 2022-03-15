<script lang="ts">
	import { goto } from '$app/navigation';
	import FolderView from '$lib/components/FolderView/FolderView.svelte';
	import currentNote from '$lib/stores/currentNote';
	import notes from '$lib/stores/notes';
	import { v4 as uuid } from 'uuid';

	let navOpen = false;

	const goHome = () => {
		goto('/');
	};

	const selectNote = ({ detail: { id } }) => {
		if ($notes.find((nof) => nof.id === id)) {
			$currentNote = $notes.find((nof) => nof.id === id) as Note;

			navOpen = false;
		}
	};

	const addBareFolder = (name: string, parent: string) => {
		const id: string = uuid();
		if (parent !== null) ($notes.find((nof) => nof.id === parent) as FlatFolder).children.push(id);
		$notes.push({ name, open: false, id, children: [] });
		$notes = $notes;
	};

	const addNoteOrFolder = ({ detail }) => {
		addBareFolder('Hello World', detail);
	};
</script>

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
		<FolderView on:selectnote={selectNote} on:addnoteorfolder={addNoteOrFolder} />

		<div id="footer" class:nav-open={navOpen}>
			<a href="/about">About</a><span>&copy; Sam T 2022</span>
		</div>
	</nav>
	<div id="main-content">
		<slot />
	</div>
</div>

<style lang="scss">
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
		height: calc(100% - $heading-area-height * 2);
		overflow-y: scroll;
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
