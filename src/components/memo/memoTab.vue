<template>
	<div class="disIN textRight w80P groupBtnCont lh28">
		<button
			:class="{ active_blue: tabValue === 'ALL' }"
			class="ml-5 disIN font-size-12"
			@click="getMemoList('ALL')"
		>
			전체
		</button>
		<button
			:class="{ active_green: tabValue === 'GROUP' }"
			class="ml-5 disIN font-size-12"
			@click="getMemoList('GROUP')"
		>
			그룹
		</button>
		<button
			:class="{ active_orange: tabValue === 'INDV' }"
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
.active_blue {
	color: #007ef2;
}
.active_green {
	color: #00aac1;
}
.active_orange {
	color: #ff7a00;
}
</style>
