<template>
	<div
		class="memoComp w100P font-size-12 posRe"
		style="position: sticky; height: 98%; overflow-y: hidden"
		:class="{ quickOpenForm: quickOpen }"
	>
		<div
			class="posFix sideMenuBar pd10 font-btn-color"
			:class="{ posFix1: quickOpen }"
		>
			<div>
				<!--v-if="this.applId !== 0"-->
				<TaskHistory :applId="applId"></TaskHistory>
				<Memo :applId="applId"></Memo>
			</div>
			<!--			&lt;!&ndash; 신규 작성 시, 메모 &ndash;&gt;-->
			<!--			<div v-if="this.applId === 0" class="mt-3 w100P">-->
			<!--				<h2 class="disIN w20P disBl">메모</h2>-->
			<!--				<div class="disIN w80P mt10">-->
			<!--					<button-->
			<!--						:class="{ activeTab: tabValue === 'ALL' }"-->
			<!--						class="disIN font-size-12 memoBtn"-->
			<!--						@click="activateTab('ALL')"-->
			<!--					>-->
			<!--						전체-->
			<!--					</button>-->
			<!--					<button-->
			<!--						:class="{ activeTab: tabValue === 'GROUP' }"-->
			<!--						class="disIN font-size-12 memoBtn"-->
			<!--						@click="activateTab('GROUP')"-->
			<!--					>-->
			<!--						그룹-->
			<!--					</button>-->
			<!--					<button-->
			<!--						:class="{ activeTab: tabValue === 'INDV' }"-->
			<!--						class="disIN font-size-12 memoBtn"-->
			<!--						@click="activateTab('INDV')"-->
			<!--					>-->
			<!--						개인-->
			<!--					</button>-->
			<!--				</div>-->
			<!--				<textarea-->
			<!--					type="text"-->
			<!--					class="memoText"-->
			<!--					style=""-->
			<!--					@input="insertMemo($event.target.value)"-->
			<!--				></textarea>-->
			<!--			</div>-->
		</div>
	</div>
</template>

<script>
import Memo from './Memo';
import TaskHistory from './TaskHistory';

export default {
	name: 'memoBoard',
	components: {
		Memo,
		TaskHistory,
	},
	props: {
		quickOpen: { type: Boolean },
		quickOpeningApplId: {
			type: Number,
		},
	},
	data() {
		return {
			applId: 0,
		};
	},
	computed: {
		AppFormCreFlag() {
			return this.$store.state.ApplicationFormCreationModule.AppFormCreFlag;
		},
	},
	methods: {},
	created() {
		if (this.quickOpeningApplId) {
			this.applId = this.quickOpeningApplId;
		}
		this.tabValue = 'ALL';
	},
};
</script>

<style scoped>
.memoComp {
	background: #f6f6f6;
	position: sticky;
}
.quickOpenForm {
	position: fixed;
	height: 70%;
	overflow-y: hidden;
}
.posFix {
	position: fixed;
	width: 100%;
	max-width: 338px;
}
.posFix1 {
	position: fixed;
	width: 100%;
	max-width: 338px;
	max-height: 82%;
	overflow-y: hidden;
}
</style>
