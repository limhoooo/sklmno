<template>
	<div>
		<div class="new-mainCont posR">
			<div class="w100P disFx h40 mb10">
				<div class="disFx w100P ml10">
					<p class="lh40 mj0 boldWt w100">배송정보</p>
					<div class="disFx">
						<span
							v-for="(item, index) in optionList.DeliveryType"
							:key="item.id"
						>
							<div class="radioStyle h40 ml30 lh40">
								<input
									type="radio"
									:id="`salesMove${index}`"
									name="salesMove"
									:value="item.value"
									@change="deliveryFnc"
									v-model.trim="formData.deliveryType"
								/><label :for="`salesMove${index}`">
									{{ item.name }}
								</label>
							</div>
						</span>
					</div>

					<!--					<div class="radioStyle h40 w50 lh40">
						<input
							type="radio"
							id="salesMove1"
							name="salesMove"
							value="PS"
							@change="deliveryFnc"
							v-model.trim="formData.deliveryType"
						/><label for="salesMove1">택배</label>
					</div>
					<div class="radioStyle ml10 h40 w50 lh40">
						<input
							type="radio"
							id="salesMove2"
							name="salesMove"
							value="QUICK"
							@change="deliveryFnc"
							v-model.trim="formData.deliveryType"
						/><label for="salesMove2">퀵</label>
					</div>
					<div class="radioStyle h40 w70 lh40">
						<input
							type="radio"
							id="salesMove3"
							name="salesMove"
							value="DIRECT"
							@change="deliveryFnc"
							v-model.trim="formData.deliveryType"
						/><label for="salesMove3">직접전달</label>
					</div>-->
				</div>
			</div>
			<div class="w100P disFx h40 mb10">
				<div class="w100P">
					<input
						class="newInput1"
						type="text"
						placeholder="보유처"
						v-model.trim="formData.holdPlc"
						disabled
					/>
				</div>
				<div class="w100P ml10">
					<v-autocomplete
						style="font-size: 12px"
						v-if="this.$route.path === '/stock-move-transfer/stock-move'"
						v-model.trim="formData.nextStockId"
						outlined
						label="이동처"
						:items="codeList.moveItems"
						item-text="stockName"
						item-value="stockId"
					>
					</v-autocomplete>

					<v-autocomplete
						style="font-size: 12px"
						v-if="this.$route.path === '/stock-move-transfer/stock-transfer'"
						v-model.trim="formData.transStoreId"
						outlined
						label="이관처"
						:items="codeList.transItems"
						item-text="storeName"
						item-value="storeId"
					>
					</v-autocomplete>
					<div
						class="w100P h40"
						v-if="this.$route.path === '/stock-move-transfer/faulty-transfer'"
					>
						<input
							type="text"
							class="newInput1"
							placeholder="공급처"
							v-model.trim="formData.provName"
							disabled
						/>
					</div>
					<v-autocomplete
						style="font-size: 12px"
						v-if="this.$route.path === '/stock-move-transfer/sales-transfer'"
						v-model.trim="formData.transStoreId"
						outlined
						label="이관처"
						:items="codeList.transItems"
						item-text="storeName"
						item-value="storeId"
					>
					</v-autocomplete>
					<div
						class="w100P h40"
						v-if="this.$route.path === '/stock-move-transfer/rtn-transfer'"
					>
						<input
							type="text"
							class="newInput1"
							placeholder="공급처"
							v-model.trim="formData.provName"
							disabled
						/>
					</div>
				</div>
				<div class="w100P ml10 barcodeBtnStyle1">
					<input
						type="text"
						class="newInput1"
						placeholder="일련번호 입력"
						v-model="formData.barcode"
						@input="regDialog = false"
					/>
					<div>
						<button
							v-if="
								this.$route.path === '/stock-move-transfer/faulty-transfer' ||
								this.$route.path === '/stock-move-transfer/rtn-transfer'
							"
							@click="overlapDvcCodeFnc"
						>
							등록
						</button>
						<button v-else @click="overlapDvcCodeFnc">등록</button>
					</div>
				</div>
				<div class="w100P ml10">
					<v-select
						attach
						v-model.trim="formData.courier"
						label="택배사"
						outlined
						:disabled="
							formData.deliveryType === 'QUICK' ||
							formData.deliveryType === 'DIRECT'
						"
						:items="codeList.courierItems"
						item-text="codeNm"
						item-value="codeSeq"
					></v-select>
				</div>
				<div class="w100P ml10">
					<input
						class="newInput1"
						type="text"
						v-model.trim="formData.invoiceNo"
						placeholder="송장번호 입력"
						:disabled="
							formData.deliveryType === 'QUICK' ||
							formData.deliveryType === 'DIRECT'
						"
					/>
				</div>
			</div>
			<div class="w100P disFx h60">
				<div class="w100P h60">
					<input
						type="text"
						class="newInput1 textAreaPad"
						placeholder="메모입력"
						v-model.trim="formData.deliveryMemo"
					/>
				</div>
			</div>

			<overlap-device-popup
				v-if="overlapDevicePop"
				:overlapDialog="overlapDevicePop"
				:overlapDeviceData="overlapDeviceData"
				@overlapSuccessFnc="overlapSuccessFnc"
				@closeDialog="dialogClose"
			>
			</overlap-device-popup>
		</div>

		<div class="inStockBtnCont txAnC mt20">
			<button
				class="w120 h40 backColorBlue2 borderRadi3Px mainWhite"
				@click="insertList()"
			>
				확인
			</button>
			<button
				class="w120 h40 backColorGray1 borderRadi3Px mainWhite ml10"
				@click="filterInit"
			>
				취소
			</button>
		</div>
	</div>
</template>

<script>
import { nullValidation } from '../../../../../common/common';
import overlapDevicePopup from '../../../../../components/device/overlapDevicePopup.vue';

export default {
	components: { overlapDevicePopup },
	data: () => ({
		overlapDevicePop: false,
		overlapDeviceData: [],
		overlapDvcId: '',
		overlapDeviceYn: 'N',
		regDialog: false,
	}),
	computed: {
		formData: {
			get() {
				return this.$store.state.StockMoveFilterCommonModules.formData;
			},
			set(newValue) {
				return (this.$store.state.StockMoveFilterCommonModules.formData = newValue);
			},
		},
		codeList: {
			get() {
				return this.$store.state.StockMoveFilterCommonModules.codeList;
			},
			set(newValue) {
				return (this.$store.state.StockMoveFilterCommonModules.codeList = newValue);
			},
		},
		optionList: {
			get() {
				return this.$store.state.StockMoveFilterCommonModules.optionList;
			},
			set(newValue) {
				return (this.$store.state.StockMoveFilterCommonModules.optionList = newValue);
			},
		},
	},
	methods: {
		filterInit() {
			this.regDialog = false;
			this.$store.commit('StockMoveFilterCommonModules/filterInit');
		},
		async insertList() {
			if (this.regDialog === false) {
				alert('일련번호를 등록(확인)해주세요.');
				return;
			}
			if (this.$route.path === '/stock-move-transfer/stock-move') {
				this.formData.selDvcId = this.overlapDvcId;
				if (this.formData.deliveryType !== 'PS') {
					if (
						!nullValidation(this.formData, [
							'provId',
							'provName',
							'deliveryMemo',
							'transStoreId',
							'courier',
							'invoiceNo',
							'holdPlc',
						])
					) {
						return;
					}
				} else {
					if (
						!nullValidation(this.formData, [
							'provId',
							'provName',
							'deliveryMemo',
							'transStoreId',
							'holdPlc',
						])
					) {
						return;
					}
				}
				await this.$store.dispatch('StockMoveModule/insertList', this.formData);
				this.formData.courier = '';
				this.formData.barcode = '';
				this.formData.invoiceNo = '';
				await this.getList();
			} else if (this.$route.path === '/stock-move-transfer/stock-transfer') {
				this.formData.selDvcId = this.overlapDvcId;
				if (this.formData.deliveryType !== 'PS') {
					if (
						!nullValidation(this.formData, [
							'provId',
							'provName',
							'nextStockId',
							'deliveryMemo',
							'courier',
							'invoiceNo',
							'holdPlc',
						])
					) {
						return;
					}
				} else {
					if (
						!nullValidation(this.formData, [
							'provId',
							'provName',
							'nextStockId',
							'deliveryMemo',
							'holdPlc',
						])
					) {
						return;
					}
				}
				await this.$store.dispatch(
					'StockTransferModule/insertList',
					this.formData,
				);
				this.formData.courier = '';
				this.formData.barcode = '';
				this.formData.invoiceNo = '';
				await this.getList();
			} else if (this.$route.path === '/stock-move-transfer/faulty-transfer') {
				this.formData.selDvcId = this.overlapDvcId;
				if (this.formData.deliveryType !== 'PS') {
					if (
						!nullValidation(this.formData, [
							'provId',
							'nextStockId',
							'transStoreId',
							'deliveryMemo',
							'courier',
							'invoiceNo',
							'holdPlc',
						])
					) {
						return;
					}
				} else {
					if (
						!nullValidation(this.formData, [
							'provId',
							'nextStockId',
							'transStoreId',
							'deliveryMemo',
							'holdPlc',
						])
					) {
						return;
					}
				}
				await this.$store.dispatch(
					'FaultyTransferModule/insertList',
					this.formData,
				);
				this.formData.courier = '';
				this.formData.barcode = '';
				this.formData.invoiceNo = '';
				await this.getList();
			} else if (this.$route.path === '/stock-move-transfer/sales-transfer') {
				this.formData.selDvcId = this.overlapDvcId;
				if (this.formData.deliveryType !== 'PS') {
					if (
						!nullValidation(this.formData, [
							'provId',
							'provName',
							'nextStockId',
							'deliveryMemo',
							'courier',
							'invoiceNo',
							'holdPlc',
						])
					) {
						return;
					}
				} else {
					if (
						!nullValidation(this.formData, [
							'provId',
							'provName',
							'nextStockId',
							'deliveryMemo',
							'holdPlc',
						])
					) {
						return;
					}
				}
				await this.$store.dispatch(
					'SalesTransferModule/insertList',
					this.formData,
				);
				this.formData.courier = '';
				this.formData.barcode = '';
				this.formData.invoiceNo = '';
				await this.getList();
			} else {
				this.formData.selDvcId = this.overlapDvcId;
				if (this.formData.deliveryType !== 'PS') {
					if (
						!nullValidation(this.formData, [
							'provId',
							'nextStockId',
							'transStoreId',
							'deliveryMemo',
							'courier',
							'invoiceNo',
							'holdPlc',
						])
					) {
						return;
					}
				} else {
					if (
						!nullValidation(this.formData, [
							'provId',
							'nextStockId',
							'transStoreId',
							'deliveryMemo',
							'holdPlc',
						])
					) {
						return;
					}
				}
				await this.$store.dispatch(
					'ReturnTransferModule/insertList',
					this.formData,
				);
				this.formData.courier = '';
				this.formData.barcode = '';
				this.formData.invoiceNo = '';
				await this.getList();
			}
		},

		async getTransferItems() {
			if (
				this.$route.path === '/stock-move-transfer/stock-transfer' ||
				this.$route.path === '/stock-move-transfer/sales-transfer'
			) {
				await this.$store.dispatch(
					'StockMoveFilterCommonModules/getTransStoreList',
				);
			}
		},
		async overlapSuccessFnc(dvcId, dvcBarcode) {
			this.regDialog = true;
			this.overlapDvcId = dvcId;
			this.formData.barcode = dvcBarcode;
			if (
				this.$route.path === '/stock-move-transfer/faulty-transfer' ||
				this.$route.path === '/stock-move-transfer/rtn-transfer'
			) {
				this.faultyCodeFnc();
			} else {
				await this.getHoldItems();
			}
		},
		overlapDevicePopFnc(data) {
			this.overlapDevicePop = !this.overlapDevicePop;
			this.overlapDeviceData = data || [];
		},
		dialogClose(data, dialogName) {
			// 모달 닫기 emit
			this.$set(this, dialogName, data);
		},
		faultyCodeFnc() {
			this.getHoldItems();
			this.getProvItems();
		},
		async overlapDvcCodeFnc() {
			this.regDialog = true;
			let nullVal = {
				barcode: this.formData.barcode,
			};
			if (!nullValidation(nullVal)) {
				return;
			}
			this.formData.holdPlc = '';
			this.formData.provName = '';
			let data = {
				barcode: this.formData.barcode,
				goodsType: '',
			};
			const result = await this.$store.dispatch(
				'commonModule/deviceOverlapCheck',
				data,
			);
			if (result.totalCnt === 1) {
				this.overlapDvcId = result.resultList[0].dvcId;
				if (
					this.$route.path === '/stock-move-transfer/faulty-transfer' ||
					this.$route.path === '/stock-move-transfer/rtn-transfer'
				) {
					this.faultyCodeFnc();
				} else {
					await this.getHoldItems();
				}
			} else if (result.totalCnt > 1) {
				this.overlapDevicePopFnc(result.resultList);
			} else {
				alert('조회된 결과가 없습니다.');
			}
		},
		async getHoldItems() {
			let data = {
				selDvcId: this.overlapDvcId,
			};
			await this.$store.dispatch(
				'StockMoveFilterCommonModules/getDeviceStock',
				data,
			);
		},
		async getProvItems() {
			let data = { selDvcId: this.overlapDvcId };
			await this.$store.dispatch(
				'StockMoveFilterCommonModules/getDeviceProvInfo',
				data,
			);
		},
		async getMoveStockItems() {
			await this.$store.dispatch('StockMoveFilterCommonModules/moveStockItems');
		},
		async getMoveStockItemsFnc() {
			if (this.$route.path === '/stock-move-transfer/stock-move') {
				await this.getMoveStockItems();
			}
		},
		async getCourierItems() {
			await this.$store.dispatch('StockMoveFilterCommonModules/commonCodeList');
		},
		deliveryFnc() {
			if (this.formData.deliveryType !== 'PS') {
				this.formData.courier = '';
				this.formData.invoiceNo = '';
			}
		},
		async getCommonCodeList() {
			await this.$store.dispatch('StockMoveFilterCommonModules/getStatusList');
		},
		async getList() {
			if (this.$route.path === '/stock-move-transfer/stock-move') {
				let data = {
					title: 'STOCK_MOVE',
				};
				await this.$store.dispatch(
					'StockMoveFilterCommonModules/getList',
					data,
				);
			} else if (this.$route.path === '/stock-move-transfer/stock-transfer') {
				let data = {
					title: 'STOCK_TRNS',
				};
				await this.$store.dispatch(
					'StockMoveFilterCommonModules/getList',
					data,
				);
			} else if (this.$route.path === '/stock-move-transfer/faulty-transfer') {
				let data = {
					title: 'FAULTY_TRNS',
				};
				await this.$store.dispatch(
					'StockMoveFilterCommonModules/getList',
					data,
				);
			} else if (this.$route.path === '/stock-move-transfer/sales-transfer') {
				let data = {
					title: 'SELL_TRNS',
				};
				await this.$store.dispatch(
					'StockMoveFilterCommonModules/getList',
					data,
				);
			} else {
				let data = {
					title: 'RETURN_TRNS',
				};
				await this.$store.dispatch(
					'StockMoveFilterCommonModules/getList',
					data,
				);
			}
		},
	},
	async created() {
		await this.getMoveStockItemsFnc();
		await this.getTransferItems();
		await this.getCourierItems();
		await this.getCommonCodeList();
		await this.filterInit();
	},
};
</script>

<style></style>
