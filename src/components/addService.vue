<template>
	<div class="appService commonInput posR">
		<!-- props : UnderLine 시 outline 삭제	-->
		<div class="addServiceInput" :style="`width: ${width}px;`">
			<input
				class="borderContColor2 borderRadi3Px lh36"
				v-model.trim="searchText"
				type="text"
				:class="`input${border}`"
				:style="`width: ${width}px;`"
				@keyup.enter="inputFnc"
				@input="closeDialog"
				:disabled="disableYN"
			/>
			<button
				class="addServButton"
				@click="inputFnc"
				:disabled="disableYN"
			></button>
		</div>
		<div
			class="addServiceCont backColorWhite posA"
			:style="inputWidth"
			v-if="Dialog"
			v-click-outside="closeDialog"
		>
			<!-- 기본 생성되어 있는 태그들 -->
			<!--			<div class="tagCont disFX" v-for="(tag, index) in tagList" :key="index">
				<button
					class="backColorBlue2 boldWt"
					:value="tag"
					@click="tagSearchFnc(tag)"
				>
					#{{ tag }}
				</button>
			</div>-->

			<!--조회되는 리스트-->
			<div class="listCont backColorWhite w100P">
				<ul style="max-height: 300px; overflow: scroll">
					<li
						ref="serviceList"
						v-for="(item, index) in optionList"
						:key="index"
						:value="item"
						@click="addItem(item)"
						class="borderBottomColor1 pd5"
					>
						<div class="padW10 mb10">
							<h3 class="disIN mainBlack2" v-text="item.addSvcName"></h3>
							<!-- todo: 금액 데이터 잘 들어오는지 확인 -->
							<!-- <h3 class="disIN ml10">100,000 {{}} 원</h3>-->
							<h3 class="disIN ml30 subOrange1">{{ item.addSvcCharge }}원</h3>
						</div>
						<div class="padW10" v-text="item.addSvcMemo"></div>
					</li>
				</ul>
			</div>
		</div>
		<div class="mt10 w800">
			<!-- 선택시 쌓이는 항목 -->
			<div
				v-for="(item, index) in addServiceData"
				class="selectBtn1 backColorBlue1"
				:key="index"
			>
				<span class="mainBlue2"
					>{{ item.addSvcName }} ({{ item.addSvcCharge }} 원)</span
				>
				<button
					class="tagBtn mainBlue2"
					:disabled="disableYN"
					@click="subtractItem(item, index)"
				>
					x
				</button>
			</div>
		</div>
		<!--검색 시 뜨는 dialog-->
	</div>
</template>

<script lang="ts">
import { getTelecomAddServiceListWithTitle } from '../api/common/common';
import Vue from 'vue';

interface dataType {
	Dialog: boolean;
	tagList: Array<String>;
	searchText: string;
	optionList: Array<Object>;
	selectedItem: any;
}

export default Vue.extend({
	name: 'addService',
	data: (): dataType => ({
		Dialog: false,
		// 태그 관련 리스트들 하드코딩해서 작업하기로 함.
		tagList: ['관리자를 통해 태그를 추가 해주세요.'],
		searchText: '',
		optionList: [],
		selectedItem: [],
	}),
	computed: {
		inputWidth() {
			return `width: ${this.width}px`;
		},
		joinData(): any {
			return this.$store.state.ApplicationFormCreationModule.formData.join
				.openingTelecomCodeId;
		},
	},
	props: {
		addServiceData: {
			type: Array,
		},
		data: { type: Object, required: true },
		telecomId: { type: Number },
		itemText: { type: String, default: 'name' },
		itemValue: { type: String, default: 'value' },
		width: {
			type: Number,
			default: 670,
		},
		border: {
			type: String,
		},
		disableYN: {
			type: Boolean,
		},
		items: {
			type: Array,
		},
	},
	methods: {
		inputFnc() {
			this.Dialog = !this.Dialog;
			this.getTelecomAddServiceListFnc(this.searchText);
		},
		closeDialog() {
			if (this.Dialog) {
				this.Dialog = !this.Dialog;
			}
		},
		// todo: 무엇을 같이 던져줘야 하는지 chk
		tagSearchFnc(keyword: string) {
			this.getTelecomAddServiceListFnc(keyword);
		},
		addItem(item: any) {
			this.selectedItem.push(item);
			this.$emit('setNewAddSvcList', item);
			this.Dialog = !this.Dialog;
		},
		subtractItem(item: any, index: number) {
			let data = { item, index };
			this.$emit('minusAddSvcList', data);
		},
		async getTelecomAddServiceListFnc(keyword: string) {
			let data = [this.telecomId, keyword];
			const result = await getTelecomAddServiceListWithTitle(data);
			if (result) {
				if (keyword) {
					this.optionList = result.data.data;
				}
				if (result.data.resultCode === '9000') {
					alert('부가서비스 조회결과가 없습니다. 관리자에게 문의해 주세요.');
				}
				this.optionList = result.data.data;
			}
		},
		setNewData(data: Array<Object>) {
			this.$emit('setNewAddSvcList', data);
		},
		initFnc() {
			this.selectedItem = this.addServiceData;
		},
	},
	created() {
		this.initFnc();
	},
});
</script>

<style scoped>
.appService {
	position: relative;
}
.addServiceInput {
	position: relative;
}
.addServButton {
	position: absolute;
	background-image: url('../assets/img/search.png');
	width: 32px;
	height: 32px;
	right: 3px;
	top: 3px;
}
.appService .bgGray {
	width: 100%;
}
.appService .inputUnderLine {
	border: none;
	border-bottom: 1px solid #989898 !important;
	border-radius: 0 !important;
}
.appService .selectBtn1 {
	background-color: #fff;
	display: inline-block;
	padding: 5px 40px 5px 20px;
	margin: 3px;
	border-radius: 50px;
	position: relative;
}
.appService .selectBtn1 .tagBtn {
	position: absolute;
	top: 2px;
	right: 10px;
	padding: 3px;
	color: #17a5ae;
}
.appService .selectBtn1 button:disabled {
	color: rgba(0, 0, 0, 0.6);
}

.appService .tagCont button {
	padding: 5px 10px;
	background-color: #7397a4;
	border-radius: 50px;
	color: #fff;
	margin-top: 3px;
	margin-left: 10px;
}
.appService .addServiceCont {
	border: 1px solid rgba(0, 0, 0, 0.1);
	z-index: 10;
}
.appService .tagCont {
	flex-wrap: wrap;
	margin-bottom: 3px;
}
.appService .listCont .listContItem {
	padding: 10px 20px;
	border-top: 1px solid rgba(0, 0, 0, 0.3);
	cursor: pointer;
}
.listContItem li {
	padding: 10px 20px;
}
.appService .listCont .listContItem h3 {
	color: #003a53;
	font-size: 16px;
}
.appService .listCont .listContItem div {
	color: #7e7e7e;
}
</style>
