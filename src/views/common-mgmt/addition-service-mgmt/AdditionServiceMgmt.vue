<template>
	<div>
		<div class="wrapper newWrap">
			<book-mark path="/additionservice-mgmt/additionservice-list"></book-mark>
			<div class="new-mainRoute">
				<router-link
					class="new-router-style1 w180 h45 lh45 borderSubRoute1 borderRadi3PxTop"
					to="/additionservice-mgmt/additionservice-list"
					>부가서비스 목록</router-link
				>
				<router-link
					class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
					to="/additionservice-mgmt/additionservicerequest-list"
					>부가서비스 요청목록</router-link
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
	components: { BookMark },
};
</script>
