<template>
	<div class="scene-editor" style="height: calc(100vh - 140px)" v-resize="handleResize">
		<div id="canvas" ref="canvas"></div>
	</div>
</template>

<script>

import { Engine, Camera } from 'alge';

export default {
	name: "SceneEditor",
	data() {
		return{
			width: 0,
			height: 0,
			engine : null,
		};
	},

	methods: {
		handleResize({ width, height }) {
			this.width = width;
			this.height = height;

			if (this.engine) {
				this.engine.getManager("Render").resize(width, height);
			}
		}
	},

	mounted() {
		this.engine = new Engine({
			container: "#canvas",
			fullscreen: true,
			gameScale: 3,
		});

		getComputedStyle(this.$refs.canvas).width;

		let canvas = this.$refs.canvas;

		this.handleResize({ width: getComputedStyle(canvas).width + 17, height: getComputedStyle(canvas).height});

		let mainScene = this.engine.getManager("Scene").createScene("main");

		let camera = new Camera("MainCamera");
		mainScene.addEntity(camera);

		this.engine.run();
	}
}
</script>

<style lang="scss" scoped>
	.scene-editor {
		// position: relative;
	}

	#canvas {
		width: 100%;
		height: 100%;
	}
</style>