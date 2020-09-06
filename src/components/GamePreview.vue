<template>
	<div class="preview" style="height: calc(100vh - 140px); width: 100%;" v-resize="handleResize" ref="preview">
		<div id="game-preview-canvas" ref="gamePreviewCanvas"></div>
	</div>
</template>

<script>

import { Engine, Camera } from 'alge';
import Hud from '../scene-editor/entities/Hud';
import Background from '../scene-editor/entities/Background';
import Player from '../scene-editor/entities/Player';
import EnemySpawner from '../scene-editor/entities/EnemySpawner';

export default {
	name: "GamePreview",

	props: {
		ratio: {
			type: String,
			default: "16:9"
		}
	},
	data() {
		return{
			width: 0,
			height: 0,
			aspectRatio: {
				width: 0,
				height: 0,
			},
			game : null,
		};
	},

	created() {
		let ar = this.ratio.split(':');
		this.aspectRatio.width = ar[0];
		this.aspectRatio.height = ar[1];
	},

	watch: {
		ratio: function(val) {
			let ar = val.split(':');
			this.aspectRatio.width = ar[0];
			this.aspectRatio.height = ar[1];

			let size = {
				width : parseFloat(getComputedStyle(this.$refs.preview).width, 10),
				height : parseFloat(getComputedStyle(this.$refs.preview).height, 10)
			}

			this.$refs.gamePreviewCanvas.style.width = this.aspectRatio.width + "px";
			this.$refs.gamePreviewCanvas.style.height = this.aspectRatio.height + "px";

			this.handleResize(size);
		}
	},

	mounted() {
		let size = {
			width : parseFloat(getComputedStyle(this.$refs.preview).width, 10),
			height : parseFloat(getComputedStyle(this.$refs.preview).height, 10)
		}

		this.$refs.gamePreviewCanvas.style.width = this.aspectRatio.width + "px";
		this.$refs.gamePreviewCanvas.style.height = this.aspectRatio.height + "px";

		this.handleResize(size);

		this.startGame();
	},

	methods: {
		handleResize({ width, height }) {
			this.width = width;
			this.height = height;

			let canvasEl = this.$refs.gamePreviewCanvas;
			let canvas = {
				width: parseFloat(getComputedStyle(canvasEl).width, 10),
				height: parseFloat(getComputedStyle(canvasEl).height, 10),
			};

			if ((this.width / this.height) > (canvas.width / canvas.height)) {
				canvasEl.style.height = this.height + "px";
				canvasEl.style.width = (this.height * this.aspectRatio.width / this.aspectRatio.height) + "px";
			}
			else {
				canvasEl.style.width = this.width + "px";
				canvasEl.style.height = (this.width * this.aspectRatio.height / this.aspectRatio.width) + "px";
			}

			if (this.game) {
				this.game.getManager("Render").resize(parseFloat(getComputedStyle(canvasEl).width, 10), parseFloat(getComputedStyle(canvasEl).height, 10));
			}
		},

		startGame() {
			this.game = new Engine({
				container: "#game-preview-canvas",
				fullscreen: true,
				gameScale: 3,
			});



			let mainScene = this.game.getManager("Scene").createScene("main");

			let camera = new Camera("MainCamera");
			mainScene.addEntity(camera);

			let hud = new Hud("HUD");
			mainScene.addEntity(hud);

			let bg = new Background("Background");
			mainScene.addEntity(bg);

			let player = new Player("Player");
			mainScene.addEntity(player);

			let enemySpawner = new EnemySpawner("EnemySpawner", {
				tags: ["Removable"]
			});

			mainScene.addEntity(enemySpawner);

			this.game.run();
		}
	}
}
</script>

<style lang="scss" scoped>

	.preview {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	#canvas {
		background-color: red;
	}
</style>