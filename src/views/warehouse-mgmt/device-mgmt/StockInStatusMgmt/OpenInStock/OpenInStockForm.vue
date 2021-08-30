<template>
	<div>
		<div class="new-mainCont posR">
			<div class="disFx">
				<div class="inStockLeftCont">
					<div class="inStockLeftRowCont disFx h40 mb10">
						<div class="w100P">
							<v-select
								attach
								:items="codeListItems.telecom"
								label="통신사"
								@change="selectFnc"
								outlined
								item-text="codeNm"
								item-value="codeSeq"
								v-model.trim="formData.telecom"
							></v-select>
						</div>
						<div class="w100P ml10">
							<v-select
								attach
								:items="codeListItems.prov"
								label="공급처"
								outlined
								item-text="provName"
								item-value="provId"
								v-model.trim="formData.provId"
							></v-select>
						</div>
						<div class="w100P ml10">
							<v-autocomplete
								style="font-size: 12px"
								:items="codeListItems.stock"
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
						<div class="w100P">
							<v-select
								attach
								label="기기명"
								:items="codeListItems.goodsItems"
								item-text="goodsName"
								item-value="goodsId"
								outlined
								v-model.trim="formData.goodsId"
								@change="deviceCodeListFnc"
							></v-select>
						</div>
						<div class="w100P ml10">
							<v-select
								attach
								label="용량"
								:items="codeListItems.capacityItems"
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
								:items="codeListItems.colorItems"
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
								:items="codeListItems.unLockYn"
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
						@click="registDialogFnc"
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
</template>

<script>
export default {
	computed: {
		getList() {
			return this.$store.state.OpenInStockModule.getListData;
		},
		formData: {
			get() {
				return this.$store.state.OpenInStockModule.formData;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.formData = newValue);
			},
		},
		codeListItems: {
			get() {
				return this.$store.state.OpenInStockModule.codeList;
			},
			set(newValue) {
				return (this.$store.state.OpenInStockModule.codeList = newValue);
			},
		},
	},
	methods: {
		selectFnc() {
			this.codeListItems.capacityItems = [];
			this.codeListItems.colorItems = [];
			this.getGoodsSelectList();
		},
		async getGoodsSelectList() {
			let data = this.formData.telecom;
			await this.$store.dispatch('OpenInStockModule/getGoodsSelectList', data);
		},
		deviceCodeListFnc() {
			this.codeListItems.colorItems = [];
			this.getCapacityList();
		},
		async getCapacityList() {
			let data = this.formData.goodsId;
			await this.$store.dispatch(
				'OpenInStockModule/getGoodsSelectCapacityList',
				data,
			);
		},
		async deviceColorList() {
			let data = {
				goodsId: this.formData.goodsId,
				capacity: this.formData.capacity,
			};
			await this.$store.dispatch('OpenInStockModule/getDeviceColorList', data);
		},
		registDialogFnc() {
			this.$store.state.OpenInStockModule.registDialog = !this.$store.state
				.OpenInStockModule.registDialog;
		},
		async insertList() {
			let conText = '입고 하시겠습니까?';
			if (confirm(conText) === true) {
				if (this.getList.length >= 1) {
					await this.$store.dispatch(
						'OpenInStockModule/insertList',
						this.$store.state.OpenInStockModule.getListData,
					);
					await this.getListData();
				} else {
					alert('입고목록이 존재하지 않습니다.');
				}
			}
		},
		async getListData() {
			let data = 'OPEN';
			await this.$store.dispatch('OpenInStockModule/getList', data);
		},
		async allDeleteFnc() {
			let checkArr = [];
			this.checkListIdArray = [];
			this.getList.forEach(item => {
				checkArr.push(item.waitId);
			});
			this.checkListIdArray = checkArr;
			if (this.getList.length >= 1) {
				await this.$store.dispatch(
					'OpenInStockModule/deleteList',
					this.checkListIdArray,
				);
			} else {
				alert('취소할 목록이 존재하지 않습니다.');
			}
			await this.getListData();
		},
		itemInit() {
			this.$store.commit('OpenInStockModule/itemsInit');
		},
		getCodeList() {
			this.$store.state.OpenInStockModule.codeList.stock = [];
			this.$store.dispatch('OpenInStockModule/getCommonCodeList');
		},
		scannerChkFnc() {
			this.formData.barcodeType = 'S';
		},
		async barcodeScanFnc() {
			await this.scannerChkFnc();
			await this.registDialogFnc();
		},
		returnBarcodeFnc() {
			if (this.formData.barcodeType === 'S') {
				this.formData.barcodeType = 'K';
			}
		},
	},
	async created() {
		await this.itemInit();
		await this.getCodeList();
		await this.getListData();
		await this.$barcodeScanner.init(this.scannerChkFnc);
	},
};
</script>

<style scoped></style>
