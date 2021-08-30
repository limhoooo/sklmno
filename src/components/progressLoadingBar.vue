<template>
	<div id="progressbar" v-if="loading">
		<v-progress-circular
			:size="50"
			color="primary"
			indeterminate
		></v-progress-circular>
	</div>
</template>

<script>
export default {
	props: {
		loading: {
			type: Boolean,
			required: true,
		},
	},
};
</script>

<style>
.v-progress-circular__overlay {
	-webkit-animation-play-state: inherit !important;
	animation-play-state: inherit !important;
}
</style>
