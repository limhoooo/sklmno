<template>
	<div class="wrapper newWrap">
		<book-mark path="/mgmt-target/mgmt-target-device"></book-mark>
		<div class="new-mainRoute">
			<router-link
				class="new-router-style1 w180 h45 lh45 borderSubRoute1 borderRadi3PxTop"
				to="/mgmt-target/mgmt-target-device"
				>관리대상기기</router-link
			>
			<router-link
				class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
				to="/mgmt-target/mediation-release"
				>조정출고</router-link
			>
			<span class="posA fakeRoutesLine1"></span>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import BookMark from '../../../components/BookMark';
export default {
	name: 'MgmtTargetDevice',
	components: { BookMark },
};
</script>

<style scoped></style>
