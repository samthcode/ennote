<nav>
	<h1>Ennote</h1>
</nav>
<div id="main-content">
	<slot />
</div>

<style lang="scss">
	@import 'src/scss/variables';

	$nav-width: 20rem;
	nav {
		height: 100%;
		width: $nav-width;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		background-color: $neutral-500;

    h1 {
      margin: $spacing-default;
    }
	}

	#main-content {
		margin-left: $nav-width;
		background-color: $neutral-400;
		height: 100vh;
    padding: $spacing-default;
    box-sizing: border-box;
	}

	h1 {
		color: $primary;
	}

	@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

	:global(*) {
		margin: 0;
		padding: 0;
    color: $white;
	}

	:global(body) {
		font-family: 'Open Sans', sans-serif;
		height: 100%;
	}
</style>
