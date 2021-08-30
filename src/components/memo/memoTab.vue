<template>
	<div class="disIN textRight w80P groupBtnCont lh28">
		<button
			:class="{ active: tabValue === 'ALL' }"
			class="ml-5 disIN font-size-12"
			@click="getMemoList('ALL')"
		>
			전체
		</button>
		<button
			:class="{ active: tabValue === 'GROUP' }"
			class="ml-5 disIN font-size-12"
			@click="getMemoList('GROUP')"
		>
			그룹
		</button>
		<button
			:class="{ active: tabValue === 'INDV' }"
			class="ml-5 disIN font-size-12"
			@click="getMemoList('INDV')"
		>
			개인
		</button>
	</div>
</template>

<script>
export default {
	computed: {
		tabValue: {
			get() {
				return this.$store.state.memoModule.tabValue;
			},
			set(newValue) {
				this.$store.state.memoModule.tabValue = newValue;
			},
		},
		applId() {
			return this.$store.state.memoModule.applId;
		},
	},
	methods: {
		async getMemoList(tab) {
			this.tabValue = tab;
			let data = {
				applId: this.applId,
				category: this.tabValue,
			};
			await this.$store.dispatch('memoModule/getMemoList', data);
		},
		currentTabInit() {
			this.tabValue = 'ALL';
		},
	},
	created() {
		this.currentTabInit();
	},
};
</script>
<style>
.active {
	color: #17a5ae;
}
</style>
