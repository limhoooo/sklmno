<template>
	<div class="wrapper">
		<book-mark path="/sell-status"></book-mark>
		<div class="mb30">
			<h2 class="titleFontS">판매현황</h2>
		</div>
		<sell-status-filter></sell-status-filter>
		<sell-status-list></sell-status-list>
	</div>
</template>

<script>
import SellStatusFilter from './sell-mgmt/SellStatusFilter.vue';
import SellStatusList from './sell-mgmt/SellStatusList.vue';
import BookMark from '../../components/BookMark';

export default {
	name: 'SellMgmt',
	components: { BookMark, SellStatusFilter, SellStatusList },
};
</script>

<style scoped></style>
