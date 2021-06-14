<template>
	<div class="wrapper disFX">
		<div class="routerCont w80P">
			<router-link class="routerStyle" style="color: #003a53" to=""
				>신청서</router-link
			>
			<application-form-creation-table></application-form-creation-table>
		</div>
		<memo-board></memo-board>
	</div>
</template>

<script>
import ApplicationFormCreationTable from './application-form-creation/ApplicationFormCreationTable.vue';
import memoBoard from '../../components/memoBoard.vue';

export default {
	name: 'ApplicationFormCreation',
	components: { ApplicationFormCreationTable, memoBoard },
};
</script>
