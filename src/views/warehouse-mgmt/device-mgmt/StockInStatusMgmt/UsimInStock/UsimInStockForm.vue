<template>
	<div>
		<div class="new-mainCont posR disFx">
			<div class="inStockLeftCont">
				<div class="inStockLeftRowCont disFX h40 mb10">
					<div class="w100P">
						<v-select
							attach
							label="공급처"
							outlined
							item-text="provName"
							item-value="provId"
							:items="codeList.provItems"
							v-model.trim="formData.provId"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="통신사"
							outlined
							item-text="codeNm"
							item-value="codeSeq"
							:items="codeList.telecomItems"
							v-model.trim="formData.telecom"
							@change="getUsimSelectList"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-autocomplete
							style="font-size: 12px"
							item-text="stockName"
							item-value="stockId"
							outlined
							:attach="true"
							placeholder="보유처"
							:items="codeList.stockListItems"
							v-model.trim="formData.stockId"
						></v-autocomplete>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40">
					<div class="w100P">
						<v-select
							attach
							label="유심명"
							outlined
							item-text="goodsName"
							item-value="goodsId"
							:items="codeList.usimItems"
							v-model.trim="formData.usimName"
							@change="getUsimTypeSelectList"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="유심종류"
							outlined
							item-text="capacity"
							:items="codeList.usimTypeItems"
							v-model.trim="formData.usimType"
						></v-select>
					</div>
					<div class="w100P ml10">
						<input
							type="text"
							class="newInput1"
							placeholder="일련번호 입력"
							v-model.trim="formData.usimBarcode"
							@keyup.enter="insertWaitList"
						/>
					</div>
				</div>
			</div>
			<div class="inStockMemoCont ml10">
				<textarea
					class="h100P newMemo w100P"
					cols="60"
					rows="3"
					v-model.trim="formData.inStockMemo"
					placeholder="입고메모"
				></textarea>
			</div>
			<div class="inStockButtonCont ml40">
				<button
					class="backColorMint1 mainWhite w100P h100P disIn borderRadi3Px"
					@click="insertWaitList"
				>
					등록
				</button>
			</div>
		</div>
		<div class="inStockBtnCont txAnC mt20">
			<button
				class="w120 h40 backColorBlue2 borderRadi3Px mainWhite"
				@click="insertList"
			>
				입고
			</button>
			<button class="w120 h40 backColorGray1 borderRadi3Px mainWhite ml10">
				취소
			</button>
		</div>
	</div>
</template>

<script>
import { nullValidation2 } from '../../../../../common/common.js';

export default {
	name: 'UsimInStockForm',
	computed: {
		codeList() {
			return this.$store.state.UsimInStockModule.codeList;
		},
		formData: {
			get() {
				return this.$store.state.UsimInStockModule.formData;
			},
			set(newValue) {
				this.$store.state.UsimInStockModule.formData = newValue;
			},
		},
		listData() {
			return this.$store.state.UsimInStockModule.listData;
		},
		allCheckedBox: {
			get() {
				return this.$store.state.UsimInStockModule.allCheckedBox;
			},
			set(newValue) {
				this.$store.state.UsimInStockModule.allCheckedBox = newValue;
			},
		},
		checkListIdArray: {
			get() {
				return this.$store.state.UsimInStockModule.checkListIdArray;
			},
			set(newValue) {
				this.$store.state.UsimInStockModule.checkListIdArray = newValue;
			},
		},
	},
	methods: {
		resetFormFnc() {
			for (let data in this.formData) {
				this.formData[data] = null;
			}
			for (let data in this.codeList) {
				this.codeList[data] = [];
			}
			this.checkListIdArray = [];
			this.allCheckedBox = '';
		},
		getCommonCodeList() {
			this.$store.dispatch('UsimInStockModule/getCommonCodeList');
		},
		async insertList() {
			let conText = '입고 하시겠습니까?';
			if (confirm(conText) === true) {
				let chk = false;
				for (let i = 0; i < this.listData.length; i++) {
					if (this.listData[i].rawBarcode.length > 20) {
						alert(
							'입고목록의 일련번호를 확인해주세요.\n(일련번호가 20자이상인 기기가 있습니다.)',
						);
						chk = true;
						return;
					}
				}
				if (chk) return;
				if (this.listData.length >= 1) {
					await this.$store.dispatch(
						'UsimInStockModule/insertList',
						this.listData,
					);
					await this.getWaitList();
				} else {
					alert('입고목록이 존재하지 않습니다.');
				}
			}
		},
		async insertWaitList() {
			let data = this.formData;
			if (
				!nullValidation2(data, [
					'provId',
					'telecom',
					'stockId',
					'usimBarcode',
					'usimName',
					'usimType',
				])
			) {
				return;
			}
			data.barcode = data.usimBarcode;
			data.goodsId = data.usimName;
			data.capacity = data.usimType;
			Object.assign(data, { goodsType: 'USIM' });
			Object.assign(data, { inStockStatus: 'NORMAL' });
			Object.assign(data, { inStockType: 'INSTOCK_TYPE_01' });
			await this.$store.dispatch('UsimInStockModule/insertWaitList', data);
			await this.getWaitList();
			this.formData.usimBarcode = '';
		},
		async getUsimSelectList() {
			let data = this.formData.telecom;
			await this.$store.dispatch('UsimInStockModule/getUsimSelectList', data);
			await this.getUsimTypeSelectList();
		},
		getUsimTypeSelectList() {
			let data = this.formData.usimName;
			this.$store.dispatch(
				'UsimInStockModule/getGoodsSelectCapacityList',
				data,
			);
		},
		getWaitList() {
			this.$store.dispatch('UsimInStockModule/getWaitInStockUsimList');
		},
	},
	async created() {
		await this.resetFormFnc();
		await this.getCommonCodeList();
	},
};
</script>

<style scoped></style>
