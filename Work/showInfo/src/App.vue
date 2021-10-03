<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	import info from "./components/info";
	export default {
		components: {
			info,
		},
	};
</script>

<style>
	#app {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(
			103.3deg,
			rgba(252, 225, 208, 1) 30%,
			rgba(255, 173, 214, 1) 55.7%,
			rgba(162, 186, 245, 1) 81.8%
		);
	}
</style>