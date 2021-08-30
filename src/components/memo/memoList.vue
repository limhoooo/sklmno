<template>
	<div>
		<div class="memoArea mt-1" :style="`max-height:${maxHeight}px;overflow-y: auto;`">
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
							<span class="disIN orangeTag pdW10">{{ item.orgName }}</span>
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
import {compareTime} from '../../common/common';

export default {
	props: {
		maxHeight: {
			type: Number,
			default: 230,
		},
	},
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
	},
	methods: {
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

<style scoped></style>
