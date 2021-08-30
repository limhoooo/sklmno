<template>
	<div class="wrapper">
		<book-mark path="/provider-mgmt"></book-mark>
		<div class="mb20 mainBlack">
			<router-link class="mainBlack titleFontS boldWt" to=""
				>공급처 관리</router-link
			>
		</div>
		<provider-mgmt-filter></provider-mgmt-filter>
		<provider-mgmt-list></provider-mgmt-list>
	</div>
</template>

<script>
import ProviderMgmtFilter from './ProviderMgmt/ProviderMgmtFilter';
import ProviderMgmtList from './ProviderMgmt/ProviderMgmtList';
import BookMark from '../../../components/BookMark';
export default {
	components: {
		BookMark,
		ProviderMgmtFilter,
		ProviderMgmtList,
	},
};
</script>
