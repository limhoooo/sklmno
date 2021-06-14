<template>
	<div class="wrapper">
		<div class="routerCont">
			<router-link class="routerStyle" style="color: #003a53" to=""
				>이동/이관현황</router-link
			>
		</div>
		<move-status-filter></move-status-filter>
		<move-status-list></move-status-list>
	</div>
</template>

<script>
import MoveStatusFilter from './MoveStatus/MoveStatusFilter.vue';
import MoveStatusList from './MoveStatus/MoveStatusList.vue';

export default {
	components: {
		MoveStatusFilter,
		MoveStatusList,
	},
};
</script>

<style></style>
