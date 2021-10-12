<template>
	<div>
		<h2 class="mainBlack2 disIN">업무/수정</h2>
		<button
			:class="{ active: activeAccordion }"
			style="padding: 2px 4px; margin-left: 4px; float: right"
			@click="activeAccordion = !activeAccordion"
		>
			{{ !activeAccordion ? '입력' : '닫기' }}
		</button>
		<div
			:class="{ openAccord: !activeAccordion }"
			class="mt-1 closeAccord posRe"
		>
			<div>
				<select
					class="w100P cur_p lh32 pl-3 backColorWhite borderRadi5Px borderContColor1"
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
					class="w100P mt-1 lh32 pl-3 backColorWhite borderRadi5Px borderContColor1 outLineNone"
					type="text"
					placeholder="사유 입력"
					v-model.trim="formData.memoContents"
					style="resize: none"
				/>
				<button @click="insertTask">확인</button>
			</div>
		</div>
		<div
			id="taskArea"
			class="middleSearchBar invisibleScroll w100P mt-1 borderRadi3Px borderContColor1 mb-1"
			@mouseover="ableToScroll = true"
			@mouseleave="ableToScroll = false"
			@scroll="taskScroll"
		>
			<!--			fas fa-chevron-down-->
			<div
				v-if="ableToScroll"
				style="position: absolute; top: 48px"
				:class="{ top180: activeAccordion }"
			>
				<i
					v-if="scrollUp"
					class="fas fa-sort-up arrowUp scrollArrow"
					aria-hidden="true"
					style="top: 5px; left: 150px"
				></i>
				<i
					v-if="scrollDown"
					class="fas fa-sort-down arrowDown scrollArrow"
					aria-hidden="true"
					style="top: 210px; left: 150px"
				></i>
			</div>
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
import {
	compareTime,
	nullValidation2,
	statusColor,
	unescapeHtml,
} from '../common/common';

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
		ableToScroll: false,
		scrollUp: false,
		scrollDown: false,
	}),
	computed: {
		taskHistoryList() {
			return this.$store.state.TaskHistoryModule.taskHistoryList;
		},
		statusList() {
			return this.$store.state.TaskHistoryModule.statusList;
		},
		activeAccordion: {
			get() {
				return this.$store.state.TaskHistoryModule.activeAccordion;
			},
			set(newValue) {
				this.$store.state.TaskHistoryModule.activeAccordion = newValue;
			},
		},
	},
	methods: {
		taskScroll() {
			let taskArea = document.getElementById('taskArea');
			taskArea.scrollTop > 0 ? (this.scrollUp = true) : (this.scrollUp = false);
			taskArea.scrollHeight - taskArea.scrollTop - 1 <= taskArea.clientHeight
				? (this.scrollDown = false)
				: (this.scrollDown = true);
		},
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
				this.activeAccordion = false;
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
		this.activeAccordion = false;
		this.formData.applId = this.applId;
		this.getHistoryList();
		this.filterInit();
	},
};
</script>

<style>
.openAccord {
	max-height: 0 !important;
	overflow: hidden;
	transition: max-height 0.2s ease-out;
}
.closeAccord {
	max-height: 120px;
	overflow: hidden;
	transition: max-height 0.2s ease-out;
}
.memoHtmlBox p {
	margin-bottom: 0 !important;
	width: 100% !important;
	font-size: 11px;
}
.memoHtmlBox p:first-child {
	margin-top: 10px;
}
.active {
	color: #17a5ae;
}
.top180 {
	top: 170px !important;
}
</style>
