<template>
	<q-tabs class="bg-dark mode-switch" align="left"
		inline-label
		outside-arrows
		mobile-arrows
		v-model="mode"
	>
		<q-tab name="scene-editor" label="Scene Editor" draggable="false"/>
		<q-tab name="game-preview" label="Game Preview" draggable="false"/>
		<q-space/>
		<q-btn-dropdown v-if="mode=='game-preview'" auto-close stretch flat label="Resolution">
			<q-list>
				<q-item clickable @click="ratio = '16:9'" active-class="drop-active" :active="ratio == '16:9'">
					<q-item-section>16:9</q-item-section>
				</q-item>
				<q-item clickable @click="ratio = '16:10'" active-class="drop-active" :active="ratio == '16:10'">
					<q-item-section>16:10</q-item-section>
				</q-item>
				<q-item clickable @click="ratio = '4:3'" active-class="drop-active" :active="ratio == '4:3'">
					<q-item-section>4:3</q-item-section>
				</q-item>
				<q-item clickable @click="ratio = '1:1'" active-class="drop-active" :active="ratio == '1:1'">
					<q-item-section>1:1</q-item-section>
				</q-item>
			</q-list>
		</q-btn-dropdown>
	</q-tabs>
</template>

<script>
export default {

	data () {
		return {
			ratio : "16:9",
			mode : "scene-editor",
		};
	},

	watch: {
		ratio: function(val) {
			this.$emit('ratioChanged', val);
		},

		mode: function(val) {
			this.$emit('modeChanged', val);
		}
	}
}
</script>

<style lang="scss">
	.mode-switch {
		border-bottom: 1px solid $separator-dark-color;
	}

	.drop-active {
		background-color: rgba(255, 255, 255, .1);
		color: white !important;
	}
</style>
