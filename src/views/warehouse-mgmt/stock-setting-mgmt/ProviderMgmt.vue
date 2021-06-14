<template>
	<div class="wrapper">
		<div class="routerCont">
			<router-link
				class="routerStyle"
				style="cursor: default; color: #003a53"
				to=""
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
export default {
	components: {
		ProviderMgmtFilter,
		ProviderMgmtList,
	},
};
</script>
