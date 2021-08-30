<template>
	<div class="wrapper">
		<book-mark path="/move-status"></book-mark>
		<div class="mb20 mainBlack">
			<router-link class="mainBlack titleFontS boldWt" to=""
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
import BookMark from '../../../components/BookMark';

export default {
	components: {
		BookMark,
		MoveStatusFilter,
		MoveStatusList,
	},
};
</script>

<style></style>
