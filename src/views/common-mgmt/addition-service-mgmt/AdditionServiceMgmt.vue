<template>
	<div>
		<div class="wrapper">
			<div class="pageTitle"><h2>부가서비스 관리</h2></div>
			<div id="hpListCont" class="flexBox">
				<div class="router">
					<router-link to="/additionservice-mgmt/additionservice-list"
						>부가서비스 목록</router-link
					>
					<router-link to="/additionservice-mgmt/additionservicerequest-list"
						>부가서비스 요청목록</router-link
					>
				</div>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {};
</script>
