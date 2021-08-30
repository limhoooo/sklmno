<template>
	<div>
		<div>
			<div class="new-mainCont posR">
				<div class="inStockRadioCont disFx lh40 posA">
					<p class="lh40 mr30 mj0 boldWt">입고 종류</p>
					<div
						class="radioStyle ml10 h40 w70"
						v-for="(item, index) in codeList.inStockTypeItems"
						:key="index"
					>
						<input
							:key="index"
							type="radio"
							:id="item.name"
							class="ml10"
							name="inStockType"
							:value="item.value"
							@change="inStockTypeFnc"
							v-model.trim="formData.inStockType"
						/><label :for="item.name">{{ item.name }}</label>
					</div>
				</div>
				<div class="disFx">
					<div class="inStockLeftCont">
						<div class="inStockLeftRowCont disFX h40 mb10">
							<div
								class="w100P mr10"
								v-if="formData.inStockType === 'INSTOCK_TYPE_02'"
							>
								<v-select
									attach
									label="이관처"
									outlined
									item-text="storeName"
									item-value="storeId"
									:items="codeList.transItems"
									v-model.trim="formData.transStoreId"
								></v-select>
							</div>
							<div class="w100P">
								<v-select
									attach
									:items="codeList.telecom"
									label="통신사"
									outlined
									item-text="codeNm"
									item-value="codeSeq"
									v-model.trim="formData.telecom"
									@change="selectFnc"
								></v-select>
							</div>
							<div class="w100P ml10">
								<v-select
									attach
									label="공급처"
									outlined
									item-text="provName"
									item-value="provId"
									:items="codeList.prov"
									v-model.trim="formData.provId"
								></v-select>
							</div>
							<div class="w100P ml10">
								<v-autocomplete
									style="font-size: 12px"
									:items="codeList.stockListItems"
									item-text="stockName"
									item-value="stockId"
									v-model.trim="formData.stockId"
									outlined
									:attach="true"
									placeholder="보유처"
								></v-autocomplete>
							</div>
						</div>
						<div class="inStockLeftRowCont disFx h40">
							<div class="w100P autoSearchIcon">
								<v-autocomplete
									style="font-size: 12px"
									:items="codeList.goodsItems"
									item-text="goodsName"
									item-value="goodsId"
									@change="deviceCodeListFnc"
									v-model.trim="formData.goodsId"
									outlined
									:attach="true"
									placeholder="기기명"
								></v-autocomplete>
							</div>
							<div class="w100P ml10">
								<v-select
									attach
									label="용량"
									:items="codeList.capacityItems"
									item-text="capacity"
									item-value="capacity"
									v-model.trim="formData.capacity"
									@change="deviceColorList"
									outlined
								></v-select>
							</div>
							<div class="w100P ml10">
								<v-select
									attach
									label="색상"
									:items="codeList.colorItems"
									item-text="colorName"
									item-value="colorName"
									v-model.trim="formData.colorName"
									outlined
								></v-select>
							</div>
							<div class="w100P ml10">
								<v-select
									attach
									label="자급제"
									:items="codeList.unLockYn"
									item-text="text"
									item-value="value"
									v-model.trim="formData.unLockYn"
									outlined
								></v-select>
							</div>
							<div class="w100P ml10">
								<input
									type="text"
									class="newInput1"
									placeholder="일련번호 입력"
									v-model.trim="formData.barcode"
									@keyup.enter="barcodeScanFnc"
									@input="returnBarcodeFnc"
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
			</div>

			<div class="inStockBtnCont txAnC mt20">
				<button
					class="w120 h40 backColorBlue2 borderRadi3Px mainWhite"
					@click="insertList"
				>
					입고
				</button>
				<button
					class="w120 h40 backColorGray1 borderRadi3Px mainWhite ml10"
					@click="allDeleteFnc"
				>
					취소
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { nullValidation } from '../../../../../common/common.js';

export default {
	computed: {
		getList() {
			return this.$store.state.NormalInStockModule.getListData;
		},
		formData: {
			get() {
				return this.$store.state.NormalInStockModule.formData;
			},
			set(newValue) {
				return (this.$store.state.NormalInStockModule.formData = newValue);
			},
		},
		codeList: {
			get() {
				return this.$store.state.NormalInStockModule.codeList;
			},
			set(newValue) {
				return (this.$store.state.NormalInStockModule.codeList = newValue);
			},
		},
	},
	methods: {
		selectFnc() {
			this.codeList.capacityItems = [];
			this.codeList.colorItems = [];
			this.selectList();
			this.getGoodsSelectList();
		},
		async selectList() {
			let data = this.formData.telecom;
			await this.$store.dispatch('NormalInStockModule/selectCodeList', data);
		},
		async getGoodsSelectList() {
			let data = this.formData.telecom;
			await this.$store.dispatch(
				'NormalInStockModule/getGoodsSelectList',
				data,
			);
		},
		deviceCodeListFnc() {
			this.codeList.colorItems = [];
			this.getCapacityList();
		},
		async getCapacityList() {
			let data = this.formData.goodsId;
			await this.$store.dispatch(
				'NormalInStockModule/getGoodsSelectCapacityList',
				data,
			);
		},
		async deviceColorList() {
			let data = {
				goodsId: this.formData.goodsId,
				capacity: this.formData.capacity,
			};
			await this.$store.dispatch(
				'NormalInStockModule/getDeviceColorList',
				data,
			);
		},
		async insertWaitList() {
			if (this.formData.inStockType === 'INSTOCK_TYPE_01') {
				if (
					!nullValidation(this.$store.state.NormalInStockModule.formData, [
						'inStockMemo',
						'ddctAmt',
						'missProduct',
						'productFaultyYn',
						'productMissYn',
						'addDdctAmt',
						'inStockAmt',
						'ownStoreId',
						'goodsId',
						'capacity',
						'colorName',
						'unLockYn',
						'transStoreId',
					])
				) {
					return;
				} else if (this.formData.goodsId !== '') {
					if (
						!nullValidation(this.$store.state.NormalInStockModule.formData, [
							'inStockMemo',
							'ddctAmt',
							'missProduct',
							'productFaultyYn',
							'productMissYn',
							'addDdctAmt',
							'inStockAmt',
							'ownStoreId',
							'transStoreId',
						])
					) {
						return;
					}
				}
			}
			if (this.formData.inStockType === 'INSTOCK_TYPE_02') {
				if (
					!nullValidation(this.$store.state.NormalInStockModule.formData, [
						'inStockMemo',
						'ddctAmt',
						'missProduct',
						'productFaultyYn',
						'productMissYn',
						'addDdctAmt',
						'inStockAmt',
						'ownStoreId',
						'goodsId',
						'capacity',
						'colorName',
						'unLockYn',
					])
				) {
					return;
				} else if (this.formData.goodsId !== '') {
					if (
						!nullValidation(this.$store.state.NormalInStockModule.formData, [
							'inStockMemo',
							'ddctAmt',
							'missProduct',
							'productFaultyYn',
							'productMissYn',
							'addDdctAmt',
							'inStockAmt',
							'ownStoreId',
						])
					) {
						return;
					}
				}
			}
			Object.assign(this.formData, { goodsType: 'DVC' });
			await this.$store.dispatch(
				'NormalInStockModule/insertWaitList',
				this.$store.state.NormalInStockModule.formData,
			);
			this.formData.barcode = '';
			await this.getListData();
		},
		async insertList() {
			let conText = '입고 하시겠습니까?';
			if (confirm(conText) === true) {
				if (this.getList.length >= 1) {
					await this.$store.dispatch(
						'NormalInStockModule/insertList',
						this.$store.state.NormalInStockModule.getListData,
					);
					await this.getListData();
				} else {
					alert('입고목록이 존재하지 않습니다.');
				}
			}
		},
		async allDeleteFnc() {
			let checkArr = [];
			this.checkListIdArray = [];
			this.getList.forEach(item => {
				checkArr.push(item.waitId);
			});
			this.checkListIdArray = checkArr;
			let context = '입고목록을 취소하시겠습니까?';
			if (confirm(context) === true) {
				if (this.getList.length >= 1) {
					await this.$store.dispatch(
						'NormalInStockModule/deleteList',
						this.checkListIdArray,
					);
				} else {
					alert('취소할 목록이 존재하지 않습니다.');
				}
				await this.getListData();
			}
		},
		async getListData() {
			await this.$store.dispatch('NormalInStockModule/getList');
		},
		scannerChkFnc() {
			this.formData.barcodeType = 'S';
		},
		async barcodeScanFnc() {
			await this.scannerChkFnc();
			await this.insertWaitList();
		},
		returnBarcodeFnc() {
			if (this.formData.barcodeType === 'S') {
				this.formData.barcodeType = 'K';
			}
		},
		inStockTypeFnc() {
			this.formData.transStoreId = null;
		},
		getTransStoreList() {
			this.$store.dispatch('NormalInStockModule/getTransStoreList');
		},
		getEnumCommonCodeList() {
			this.$store.dispatch('NormalInStockModule/getEnumCommonCodeList');
		},
	},
	async created() {
		this.formData.inStockType = 'INSTOCK_TYPE_01';
		await this.$barcodeScanner.init(this.scannerChkFnc);
		await this.getTransStoreList();
		await this.getEnumCommonCodeList();
	},
};
</script>
