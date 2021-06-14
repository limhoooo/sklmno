<template>
	<div>
		<div class="wrapper">
			<div class="routerCont">
				<router-link
					class="routerStyle"
					style="color: #003a53"
					to="/stock-move-transfer/sales-move"
					>판매이동</router-link
				>
				<router-link
					class="routerStyle"
					style="color: #003a53"
					to="/stock-move-transfer/stock-move"
					>이동재고</router-link
				>
				<router-link
					class="routerStyle"
					style="color: #003a53"
					to="/stock-move-transfer/stock-transfer"
					>재고이관</router-link
				>
				<router-link
					class="routerStyle"
					style="color: #003a53"
					to="/stock-move-transfer/faulty-transfer"
					>불량이관</router-link
				>
				<router-link
					class="routerStyle"
					style="color: #003a53"
					to="/stock-move-transfer/sales-transfer"
					>판매이관</router-link
				>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>
