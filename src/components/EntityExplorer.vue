<template>
	<q-scroll-area style="height: 100%; width: 100%">
		<q-item-label header>Scene entities</q-item-label>
		<q-tree
		:nodes="simple"
		node-key="label"
		:expanded.sync="expanded"
		/>
		<!-- <q-separator /> -->
	</q-scroll-area>
</template>
<script>
export default {
	data() {
		return {
			expanded: [],
			simple: [{
				label: 'Player',
				icon: 'widgets',
				children: [{
						label: 'Sprite',
						icon: 'wallpaper',
						children: [
							{ label: 'Property 1' },
							{ label: 'Property 2' }
						]
					},
				]
			}]
		};
	},
};
</script>