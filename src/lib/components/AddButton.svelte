<button on:click>+</button>

<style lang="scss">
	$button-dim: 16px;

	button {
		height: $button-dim;
		width: $button-dim;
		border-radius: calc($button-dim / 2);
		border: none;
		background-color: $neutral-500;
		text-align: center;
		font-size: $button-dim;
		line-height: $button-dim;
		&:hover {
			cursor: pointer;
		}
	}
</style>
