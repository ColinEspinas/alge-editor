<template>
	<q-tab-panels v-model="mode" animated :keep-alive="true">
		<q-tab-panel name="scene-editor">
			<SceneEditor></SceneEditor>
		</q-tab-panel>
		<q-tab-panel name="game-preview">
			<GamePreview :ratio="previewRatio"></GamePreview>
		</q-tab-panel>
	</q-tab-panels>
</template>

<script>
import SceneEditor from './SceneEditor.vue';
import GamePreview from './GamePreview.vue';

export default {

	props: {
		previewRatio: {
			type: String,
			default: "16:9",
		},
		mode: {
			type: String,
			default: "scene-editor",
		}
	},

	data() {
		return {};
	},

	components: {
		SceneEditor,
		GamePreview,
	},
}
</script>

<style>
	.q-tab-panel {
		padding: 0 !important;
	}
</style>