<template>
	<div>
		<div
			id="memoArea"
			class="memoArea invisibleScroll mt-1"
			:style="`max-height:${maxHeight}px;overflow-y: auto;`"
			@mouseover="ableToScroll = true"
			@mouseleave="ableToScroll = false"
			@scroll="memoScroll"
		>
			<div
				v-if="ableToScroll"
				style="position: absolute; top: 472px"
				:class="{ top650: activeAccordion }"
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
					style="top: 238px; left: 150px"
				></i>
			</div>
			<ul class="font-size-12">
				<li v-if="memoList.length === 0">
					<div
						style="padding: 10px; text-align: center; color: gray"
						class="borderRadi3Px borderContColor1 backColorWhite"
					>
						데이터가 없습니다.
					</div>
				</li>
				<li
					v-for="item in memoList"
					class="pd3 mb-1 borderContColor1 borderRadi3Px backColorWhite"
					:key="item.id"
				>
					<div class="borderBottomColor1 pd5">
						<div class="disIN w30P">
							<span
								class="disIN orangeTag pdW10"
								:class="tabColor(item.categoryMsg)"
								v-text="categoryMsg(item.categoryMsg, item.orgName)"
							>
							</span>
						</div>
						<div class="disIN w70P textRight">
							<span class="font-gray">
								{{ item.name }} | <b>{{ item.storeName }}</b>
							</span>
						</div>
					</div>
					<div>
						<span
							class="disBl pd3 lh25 font-black"
							v-if="item.memoContents"
							v-html="item.memoContents.replace(/(?:\r\n|\r|\n)/g, '<br />')"
						></span>
					</div>
					<div class="textRight">
						<span class="font-btn-color" v-text="dateTime(item.regiDateTime)">
						</span>
						<span class="ml-3 font-gray">
							{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
						</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { compareTime } from '../../common/common';

export default {
	props: {
		maxHeight: {
			type: Number,
			default: 230,
		},
	},
	data: () => ({
		ableToScroll: false,
		scrollUp: false,
		scrollDown: false,
	}),
	computed: {
		memoList() {
			return this.$store.state.memoModule.memoList;
		},
		tabValue() {
			return this.$store.state.memoModule.tabValue;
		},
		applId() {
			return this.$store.state.memoModule.applId;
		},
		activeAccordion() {
			return this.$store.state.TaskHistoryModule.activeAccordion;
		},
	},
	methods: {
		memoScroll() {
			let memoArea = document.getElementById('memoArea');
			memoArea.scrollTop > 0 ? (this.scrollUp = true) : (this.scrollUp = false);
			memoArea.scrollHeight - memoArea.scrollTop - 1 <= memoArea.clientHeight
				? (this.scrollDown = false)
				: (this.scrollDown = true);
		},
		tabColor(category) {
			if (category === '전체') {
				return 'active_blue';
			}
			if (category === '그룹') {
				return 'active_green';
			}
			if (category === '개인') {
				return 'active_orange';
			}
		},
		categoryMsg(category, orgName) {
			if (category === '전체') {
				return '전체';
			}
			if (category === '그룹') {
				return orgName;
			}
			if (category === '개인') {
				return '개인';
			}
		},
		dateTime(Time) {
			return compareTime(Time);
		},
		async getList() {
			let data = {
				applId: this.applId,
				category: this.tabValue,
			};
			await this.$store.dispatch('memoModule/getMemoList', data);
		},
	},
	async created() {
		await this.getList();
	},
};
</script>

<style scoped>
.memoArea {
	max-height: 284px !important;
}
.active_blue {
	background-color: #007ef2;
	color: #fff;
}
.active_green {
	background-color: #00aac1;
	color: #fff;
}
.active_orange {
	background-color: #ff7a00;
	color: #fff;
}
.top650 {
	top: 580px !important;
}
</style>
