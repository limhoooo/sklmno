<template>
	<div>
		<div class="wrapper">
			<div class="pageTitle"><h2>요금 관리</h2></div>
			<div id="hpListCont">
				<router-link to="/charge-mgmt/chargelist">요금 목록</router-link>
				<router-link to="/charge-mgmt/chargerequest-list"
					>요금 요청목록</router-link
				>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
