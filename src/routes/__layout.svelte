<script lang="ts">
	import { goto } from '$app/navigation';

	import FolderView from '$lib/components/FolderView.svelte';

	let navOpen = false;

	const goHome = () => {
		goto('/');
	};
</script>

<div id="heading-area">
	<button id="open-nav-mobile" on:click={() => (navOpen = !navOpen)}>
		<div class="button-bar" />
		<div class="button-bar" />
		<div class="button-bar" />
	</button>
	<h1 on:click={goHome}>Ennote</h1>
</div>
<nav class:nav-open={navOpen}>
	<FolderView />

	<div id="footer"><a href="/about">About</a><span>&copy; Sam T 2022</span></div>
</nav>
<div id="main-content">
	<slot />
</div>

<style lang="scss">
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
		height: 100%;
		width: $nav-width;
		position: fixed;
		z-index: 1;
		top: $heading-area-height;
		left: 0;
		background-color: $neutral-400;
		padding: $spacing-default;
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
		height: 100vh;
		padding: $spacing-default;
		box-sizing: border-box;
		@media screen and (max-width: $mobile-width) {
			margin-left: 0;
			margin-top: $heading-area-height;
		}
	}

	h1 {
		color: $primary;
	}
</style>
