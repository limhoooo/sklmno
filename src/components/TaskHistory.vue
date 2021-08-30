<template>
	<div>
		<h2 class="mainBlack2">업무/수정</h2>
		<div class="topSearchBar mt-4">
			<div>
				<select
					class="w100P cur_p lh36 pl-3 backColorWhite borderRadi5Px borderContColor1"
					v-model.trim="formData.taskStatus"
				>
					<option selected value="">선택</option>
					<option
						v-for="item in statusList.TotalTaskStatus"
						:key="item.id"
						v-text="item.name"
						:value="item.value"
					></option>
				</select>
			</div>
			<div class="new-btnA1">
				<textarea
					class="w100P mt-1 lh36 pl-3 backColorWhite borderRadi5Px borderContColor1 outLineNone"
					type="text"
					placeholder="사유 입력"
					v-model.trim="formData.memoContents"
					style="resize: none"
				/>
				<button @click="insertTask">확인</button>
			</div>
		</div>
		<div class="middleSearchBar w100P mt-1 borderRadi3Px borderContColor1 mb-1">
			<div v-if="taskHistoryList.length === 0">
				<div
					style="
						padding: 10px;
						text-align: center;
						background-color: #fff;
						color: gray;
					"
				>
					데이터가 없습니다.
				</div>
			</div>
			<div
				class="disFX bgWhite pd5 mb-1"
				style="border-bottom: 1px solid #ddd"
				v-for="item in taskHistoryList"
				:key="item.id"
			>
				<div class="w100P">
					<div class="borderBottomColor1">
						<div class="disFx justify-lg-space-between">
							<span
								class="disIN font-bold pd5"
								:class="statusColor(item.taskStatus)"
							>
								{{ item.taskStatusMsg }}
							</span>
							<div class="disIN textRight pd5">
								<span class="mainBlack2">
									{{ item.name }}
								</span>
								<span> | </span>
								<span class="mainBlack2">
									{{ item.storeName }}
								</span>
							</div>
						</div>
					</div>
					<div>
						<span
							class="disBl pd5 lh25 mainBlack2 memoHtmlBox"
							style="word-break: break-all"
						>
							<span
								v-html="
									htmlParse(
										item.memoContents.replace(/(?:\r\n|\r|\n)/g, '<br />'),
									)
								"
							></span>
						</span>
					</div>
					<div class="textRight">
						<span
							class="mainBlack2 boldWt"
							v-text="dateTime(item.regiDateTime)"
						>
						</span>
						<span class="ml-3 font-gray">
							{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {compareTime, nullValidation2, statusColor, unescapeHtml,} from '../common/common';

export default {
	props: {
		applId: { type: Number, required: true },
		// required: true
	},
	components: {},
	data: () => ({
		formData: {
			// TODO 신청서 개발시 props 로 내려온 applId 연동 필요
			memoContents: '',
			taskStatus: '',
		},
	}),
	computed: {
		taskHistoryList() {
			return this.$store.state.TaskHistoryModule.taskHistoryList;
		},
		statusList() {
			return this.$store.state.TaskHistoryModule.statusList;
		},
	},
	methods: {
		htmlParse(html) {
			return unescapeHtml(html);
		},
		statusColor(taskStatus) {
			return statusColor(taskStatus);
		},
		dateTime(Time) {
			return compareTime(Time);
		},
		async getCommonCodeList() {
			let data = {
				initEnumData: ['TotalTaskStatus'],
			};
			await this.$store.dispatch('TaskHistoryModule/getStatusList', data);
		},
		filterInit() {
			// @ts-ignore
			this.$store.commit('TaskHistoryModule/filterInit');
			this.getCommonCodeList();
		},
		async insertTask() {
			let data = this.formData;
			if (!nullValidation2(data, ['taskStatus', 'memoContents'])) {
				return;
			}
			const result = await this.$store.dispatch(
				'TaskHistoryModule/insertTask',
				data,
			);
			if (result) {
				alert('등록되었습니다.');
				this.formData.taskStatus = '';
				this.formData.memoContents = '';
				await this.getHistoryList();
			}
		},
		async getHistoryList() {
			let data = {
				applId: this.formData.applId,
			};
			await this.$store.dispatch('TaskHistoryModule/getHistoryList', data);
		},
	},
	created() {
		this.formData.applId = this.applId;
		this.getHistoryList();
		this.filterInit();
	},
};
</script>

<style>
.memoHtmlBox p {
  margin-bottom: 0 !important;
  width: 100% !important;
  font-size: 11px;
}
.memoHtmlBox p:first-child {
  margin-top: 10px;
}
</style>
