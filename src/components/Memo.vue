<template>
	<div>
		<div class="bottomSearchBar mt-5 w100P">
			<h2 class="disIN w20P mainBlack2">메모</h2>
			<memo-tab></memo-tab>
			<memo-input></memo-input>
			<memo-list :maxHeight="maxHeight"></memo-list>
		</div>
	</div>
</template>

<script>
import memoTab from './memo/memoTab.vue';
import memoInput from './memo/memoInput.vue';
import memoList from './memo/memoList.vue';

export default {
	props: {
		applId: Number,
		// required: true
		maxHeight: Number,
	},

	components: {
		memoTab,
		memoInput,
		memoList,
	},
	created() {
		this.$store.state.memoModule.applId = this.applId;
	},
};
</script>

<style></style>
