<template>
	<div>
		<div class="wrapper newWrap">
			<book-mark path="/device-usim/device-status"></book-mark>
			<div class="new-mainRoute">
				<router-link
					class="new-router-style1 w180 h45 lh45 borderSubRoute1 borderRadi3PxTop"
					to="/device-usim/device-status"
					>기기현황</router-link
				>
				<router-link
					class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
					to="/device-usim/usim-status"
					>유심현황</router-link
				>
				<span class="posA fakeRoutesLine1"></span>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import BookMark from '../../../components/BookMark';
export default {
	name: 'DeviceUsimStatus',
	components: { BookMark },
};
</script>

<style scoped></style>
