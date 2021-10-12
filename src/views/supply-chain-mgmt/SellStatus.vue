<template>
	<div class="wrapper">
		<book-mark path="/sell-status"></book-mark>
		<div class="mb30">
			<h2 class="titleFontS">판매현황</h2>
		</div>
		<sell-status-filter></sell-status-filter>
		<sell-status-list></sell-status-list>
	</div>
</template>

<script>
import SellStatusFilter from './sell-mgmt/SellStatusFilter.vue';
import SellStatusList from './sell-mgmt/SellStatusList.vue';
import BookMark from '../../components/BookMark';

export default {
	name: 'SellMgmt',
	components: { BookMark, SellStatusFilter, SellStatusList },
	computed: {
		filterInitChk: {
			get() {
				return this.$store.state.SellStatusModule.filterInitChk;
			},
			set(newValue) {
				this.$store.state.SellStatusModule.filterInitChk = newValue;
			},
		},
	},
	// 컴포넌트 가드
	// this 사용 불가
	// page 에서만 사용가능한듯함
	beforeRouteEnter(to, from, next) {
		next(vm => {
			// 초기화
			vm.filterInitChk = false;
			// 신청서작성 및 수정페이지에서 들어올시
			if ('/application-form-creation' === from.path) {
				vm.filterInitChk = true;
			}
		});
	},
};
</script>

<style scoped></style>
