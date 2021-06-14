<template>
	<div>
		<div class="wrapper">
			<div class="routerCont">
				<router-link
					class="routerStyle"
					style="color: #003a53"
					to="/device/normal-in-stock"
					>정상입고</router-link
				>
				<router-link
					class="routerStyle"
					style="color: #003a53"
					to="/device/open-in-stock"
					>개봉입고</router-link
				>
				<router-link
					class="routerStyle"
					style="color: #003a53"
					to="/device/in-stock-status"
					>입고현황</router-link
				>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>
