<template>
	<div>
		<div class="wrapper">
			<div class="pageTitle"><h2>상품관리</h2></div>
			<div id="hpListCont">
				<router-link to="/goods-mgmt/mobilephonelist">상품 목록</router-link>
				<router-link to="/goods-mgmt/mobilephone-requestlist"
					>상품 요청목록</router-link
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
