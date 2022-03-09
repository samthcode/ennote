<script lang="ts">
	let navOpen = false;
</script>

<div id="heading-area">
	<button id="open-nav-mobile" on:click={() => (navOpen = !navOpen)}>
		<div class="button-bar" />
		<div class="button-bar" />
		<div class="button-bar" />
	</button>
	<h1>Ennote</h1>
</div>
<nav class:nav-open={navOpen}>
	<a href="/">Home</a>
</nav>
<div id="main-content">
	<slot />
</div>

<style lang="scss">
	@import 'src/scss/variables';

	$nav-width: 20rem;
	$heading-area-height: 5rem;
	#heading-area {
		padding: $spacing-default;
		padding-left: $spacing-default;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		height: $heading-area-height;
		width: $nav-width;
		background-color: $neutral-400;
		h1 {
			display: inline;
		}
		display: flex;
		flex-direction: row;
		align-items: center;
		@media screen and (max-width: $mobile-width) {
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

	@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

	:global(*) {
		margin: 0;
		padding: 0;
		color: $white;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'Open Sans', sans-serif;
		height: 100%;
	}
</style>
