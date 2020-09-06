<template>
	<div class="resize-widget" v-bind:style="positionStyle" @click="handleClick" v-touch-pan.prevent.mouse="handlePan">
		<!-- <q-icon name="drag_indicator" style="font-size: 1em;" /> -->
	</div>
</template>

<script>
export default {
	props: {
		value: Number,
		direction: {
			type: String,
			default: "Horizontal",
		},
		position: {
			type: String,
			default: "Right",
		},
		default: Number,
	},

	data() {
		return {};
	},

	computed: {
		positionStyle() {
			switch (this.position) {
				case "Left":
					return {
						left: '0',
						right: "auto",
						top: '0',
						bottom: "auto",
					}
				case "Right":
					return {
						left: "auto",
						right: '0',
						top: '0',
						bottom: "auto",
					}
				case "Top":
					return {
						left: '0',
						right: "auto",
						top: '0',
						bottom: "auto",
					}
				case "Bottom":
					return {
						left: '0',
						right: "auto",
						top: "auto",
						bottom: '0',
					}
				
				default:
					return {}
			}
		},
	},

	methods: {
		handleClick() {
			const d = this.default || 300;
			if (this.value < d)
				this.$emit('resized', d);
		},

		handlePan ({ ...info }) {
			let v = 0;
			switch (this.direction) {
				case "Horizontal":
					if (this.position == "Left") v = this.value - info.delta.x;
					else v = this.value + info.delta.x;
					this.$emit('resized', v);
					break;
				
				case "Vertical":
					v = this.value + info.delta.y;
					this.$emit('resized', v);
					break;

				default:
					break;
			}
			
		}
	}
}
</script>

<style lang="scss" scoped>
	.resize-widget {
		width: 10px;
		position: absolute;
		height: 100%;
		// background-color: $separator-dark-color;
		// border-left: 1px solid $separator-dark-color;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: e-resize;
		// overflow: hidden;
		&:hover {
			background-color: rgba(255, 255, 255, .1);
			transition: $generic-hover-transition;
			transition-delay: 100ms;
		}
	}
</style>