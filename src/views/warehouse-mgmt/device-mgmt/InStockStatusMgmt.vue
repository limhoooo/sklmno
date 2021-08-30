<template>
	<div>
		<div class="wrapper newWrap">
			<div class="new-mainRoute">
				<div class="posR">
					<router-link
						class="new-router-style1 w180 h45 lh45 borderSubRoute1 borderRadi3PxTop"
						to="/device/normal-in-stock"
						>정상입고</router-link
					>
					<router-link
						class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
						to="/device/open-in-stock"
						>개봉입고</router-link
					>
					<router-link
						class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
						to="/device/usim-in-stock"
						>유심입고</router-link
					>
					<router-link
						class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
						to="/device/in-stock-status"
						>입고현황</router-link
					>
					<span class="posA fakeRoutesLine1"></span>
				</div>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>
