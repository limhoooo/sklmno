<template>
	<div>
		<div class="searchingCont NormalInStock" style="height: 250px">
			<div class="largeCont">
				<div class="leftCont" style="height: 120px">
					<div class="contentsArea">
						<div class="contRow">
							<div class="selectCustom" style="width: 310px; margin-left: 0">
								<v-select
									:items="codeList.prov"
									label="공급처"
									outlined
									item-text="provName"
									item-value="provId"
									v-model.trim="formData.provId"
								></v-select>
							</div>
							<div class="selectCustom" style="width: 310px">
								<v-select
									:items="codeList.telecom"
									label="통신사"
									outlined
									@change="selectFnc"
									item-text="codeNm"
									item-value="codeSeq"
									v-model.trim="formData.telecom"
								></v-select>
							</div>
							<div class="selectCustom" style="width: 300px">
								<v-select
									:items="codeList.stock"
									label="보유처"
									outlined
									item-text="stockName"
									item-value="stockId"
									v-model.trim="formData.stockId"
								></v-select>
							</div>
						</div>
						<div class="contRow">
							<div class="selectCustom" style="width: 170px; margin-left: 0">
								<v-select
									label="기기명"
									:items="codeList.goodsItems"
									item-text="goodsName"
									item-value="goodsId"
									outlined
									v-model.trim="formData.goodsId"
									@change="deviceCodeListFnc"
								></v-select>
							</div>
							<div class="selectCustom" style="width: 160px">
								<v-select
									label="용량"
									:items="codeList.capacityItems"
									item-text="capacity"
									item-value="capacity"
									v-model.trim="formData.capacity"
									@change="deviceColorList"
									outlined
								></v-select>
							</div>
							<div class="selectCustom" style="width: 160px">
								<v-select
									label="색상"
									:items="codeList.colorItems"
									item-text="colorName"
									item-value="colorName"
									v-model.trim="formData.colorName"
									outlined
								></v-select>
							</div>
							<div class="selectCustom" style="width: 160px">
								<v-select
									label="자급제"
									:items="codeList.unLockYn"
									item-text="text"
									item-value="value"
									v-model.trim="formData.unLockYn"
									outlined
								></v-select>
							</div>
							<div
								class="selectCustom textCustom"
								style="width: 250px; position: relative"
							>
								<input
									type="text"
									placeholder="일련번호 입력"
									v-model.trim="formData.barcode"
									@keyup.enter="barcodeScanFnc"
									@input="returnBarcodeFnc"
								/>
							</div>
						</div>
					</div>
					<div class="memoArea" style="margin-left: 10px">
						<div class="selectCustom" style="width: 380px">
							<textarea
								cols="50"
								rows="4"
								v-model.trim="formData.inStockMemo"
								placeholder="입고메모"
							></textarea>
						</div>
					</div>
				</div>
				<div class="rightCont">
					<button
						class="barcodeBtn"
						@click="insertWaitList"
						style="padding: 45px 50px"
					>
						등록
					</button>
				</div>
			</div>
			<div
				class="contRow"
				style="display: flex; justify-content: center; margin-top: 40px"
			>
				<div class="btnCont">
					<v-btn
						@click="insertList"
						style="
							padding: 20px 50px;
							background-color: #17a5ae;
							color: #fff;
							font-weight: bold;
						"
						>입고</v-btn
					>
					<v-btn
						style="
							margin-left: 10px;
							padding: 20px 50px;
							background-color: #aeaeae;
							color: #fff;
						"
						@click="allDeleteFnc"
						>취소</v-btn
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { nullValidation } from '../../../../../common/common';

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
		barcodeScanFnc() {
			this.scannerChkFnc();
		},
		returnBarcodeFnc() {
			if (this.formData.barcodeType === 'S') {
				this.formData.barcodeType = 'K';
			}
		},
	},
	created() {
		this.$barcodeScanner.init(this.scannerChkFnc);
	},
};
</script>
