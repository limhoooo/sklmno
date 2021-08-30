<template>
	<div class="wrapper disFX">
		<book-mark path="/application-form-creation"></book-mark>
		<div :class="{ w80P: AppFormCreFlag !== undefined }">
			<router-link
				class="titleFontS mainBlack2 boldWt"
				style="color: #003a53; margin-bottom: 15px; display: inline-block"
				to=""
				>신청서</router-link
			>
			<template v-if="AppFlag <= 28177">
				<a
					v-if="role === 'A'"
					target="_blank"
					:href="`https://sklmno.kr/application/applicationEdit/${AppFormCreFlag}`"
					style="display: inline-block"
					class="ml5 backColorBlue2 padW10 lh26 mainWhite boldWt borderRadi3Px mr30"
					>구전산 신청서 바로가기</a
				>
				<span class="ml20 mainRed commentText1 boldWt"
					>※ 구전산 신청서입니다.
				</span>
			</template>
			<application-form-creation-table></application-form-creation-table>
		</div>
		<memo-board
			v-if="AppFormCreFlag"
			:quickOpeningApplId="Number(AppFormCreFlag)"
		></memo-board>
		<!--		<div v-if="this.AppFormCreFlag === undefined" class="memoBlur"></div>-->
	</div>
</template>

<script>
import ApplicationFormCreationTable from './application-form-creation/ApplicationFormCreationTable.vue';
import memoBoard from '../../components/memoBoard.vue';
import BookMark from '../../components/BookMark';

export default {
	name: 'ApplicationFormCreation',
	components: { BookMark, ApplicationFormCreationTable, memoBoard },
	computed: {
		role() {
			return this.$store.state.role;
		},
		AppFormCreFlag: {
			get() {
				return this.$store.state.ApplicationFormCreationModule.AppFormCreFlag;
			},
			set(newValue) {
				this.$store.state.ApplicationFormCreationModule.AppFormCreFlag = newValue;
			},
		},
		AppFlag: {
			get() {
				return this.$store.state.ApplicationFormCreationModule.AppFlag;
			},
			set(newValue) {
				this.$store.state.ApplicationFormCreationModule.AppFlag = newValue;
			},
		},
	},
	methods: {
		applIdFnc() {
			this.AppFormCreFlag = this.$route.query.applId;
		},
		applIdFlagFnc() {
			this.AppFlag = Number(this.$route.query.applId);
		},
	},
	created() {
		// 판매현황에서 들어온 신청서 번호
		this.applIdFnc();
		this.applIdFlagFnc();
	},
	watch: {
		$route(to) {
			if (to.path === '/application-form-creation') {
				window.location.reload();
			}
		},
	},
};
</script>

<style scoped>
.commentText1 {
	position: absolute;
	top: 68px;
	left: 23px;
}
</style>
