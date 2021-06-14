<template>
	<div class="searchingCont StockMoveCont" style="height: 240px">
		<div class="rowArea">
			<div class="inputCont">
				<input
					type="text"
					style="width: 245px"
					placeholder="보유처"
					v-model.trim="formData.holdPlc"
					disabled
				/>
			</div>
			<div class="selectCont1">
				<v-select
					v-if="this.$route.path === '/stock-move-transfer/stock-move'"
					v-model.trim="formData.nextStockId"
					outlined
					label="이동처"
					:items="codeList.moveItems"
					item-text="stockName"
					item-value="stockId"
				>
				</v-select>

				<v-select
					v-if="this.$route.path === '/stock-move-transfer/stock-transfer'"
					v-model.trim="formData.transStoreId"
					outlined
					label="이관처"
					:items="codeList.transItems"
					item-text="storeName"
					item-value="storeId"
				>
				</v-select>
				<div
					class="inputCont"
					v-if="this.$route.path === '/stock-move-transfer/faulty-transfer'"
				>
					<input
						type="text"
						style="width: 234px"
						placeholder="공급처"
						v-model.trim="formData.provName"
						disabled
					/>
				</div>
				<v-select
					v-if="this.$route.path === '/stock-move-transfer/sales-transfer'"
					v-model.trim="formData.transStoreId"
					outlined
					label="이관처"
					:items="codeList.transItems"
					item-text="storeName"
					item-value="storeId"
				>
				</v-select>
			</div>
			<div class="inputCont">
				<input
					type="text"
					style="width: 280px"
					placeholder="일련번호 입력"
					v-model="formData.barcode"
				/>
			</div>
			<div class="btnCont">
				<button
					v-if="this.$route.path === '/stock-move-transfer/faulty-transfer'"
					style="
						padding: 9px 40px;
						border-radius: 3px;
						background-color: #003a53;
					"
					@click="overlapDvcCodeFnc"
				>
					등록
				</button>
				<button
					v-else
					style="
						padding: 9px 40px;
						border-radius: 3px;
						background-color: #003a53;
					"
					@click="overlapDvcCodeFnc"
				>
					등록
				</button>
			</div>
		</div>
		<div class="rowArea" style="margin-top: 10px">
			<div
				class="radioCont SalesMoveRadioCont"
				style="margin-left: 0; width: 345px"
			>
				<p>배송정보</p>
				<input
					type="radio"
					id="salesMove1"
					name="salesMove"
					value="PS"
					@change="deliveryFnc"
					v-model.trim="formData.deliveryType"
				/><label for="salesMove1">택배</label>
				<input
					type="radio"
					id="salesMove2"
					name="salesMove"
					value="QUICK"
					@change="deliveryFnc"
					v-model.trim="formData.deliveryType"
				/><label for="salesMove2">퀵</label>
				<input
					type="radio"
					id="salesMove3"
					name="salesMove"
					value="DIRECT"
					@change="deliveryFnc"
					v-model.trim="formData.deliveryType"
				/><label for="salesMove3">직접전달</label>
			</div>
			<div class="selectCont1">
				<v-select
					v-model.trim="formData.courier"
					label="택배사"
					outlined
					:disabled="formData.deliveryType !== 'PS'"
					:items="codeList.courierItems"
					item-text="codeNm"
					item-value="codeSeq"
				></v-select>
			</div>
			<div class="inputCont">
				<input
					type="text"
					v-model.trim="formData.invoiceNo"
					placeholder="송장번호 입력"
					:disabled="formData.deliveryType !== 'PS'"
				/>
			</div>
		</div>
		<div class="rowArea" style="margin-top: 10px">
			<div class="inputCont">
				<input
					type="text"
					placeholder="메모입력"
					style="width: 900px"
					v-model.trim="formData.deliveryMemo"
				/>
			</div>
		</div>
		<div class="rowArea" style="margin-top: 20px">
			<div class="btnCont">
				<button @click="insertList()">확인</button>
				<button
					style="background-color: #c8c8c8; margin-left: 10px"
					@click="filterInit"
				>
					취소
				</button>
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
</template>

<script>
import {nullValidation} from '../../../../../common/common';
import overlapDevicePopup from '../../../../../components/device/overlapDevicePopup.vue';

export default {
	components: { overlapDevicePopup },
	data: () => ({
		overlapDevicePop: false,
		overlapDeviceData: [],
		overlapDvcId: '',
		overlapDeviceYn: 'N',
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
	},
	methods: {
		filterInit() {
			this.$store.commit('StockMoveFilterCommonModules/filterInit');
		},
		async insertList() {
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
						])
					) {
						return;
					}
				}
				await this.$store.dispatch('StockMoveModule/insertList', this.formData);
				this.filterInit();
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
						])
					) {
						return;
					}
				}
				await this.$store.dispatch(
					'StockTransferModule/insertList',
					this.formData,
				);
				this.filterInit();
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
						])
					) {
						return;
					}
				}
				await this.$store.dispatch(
					'FaultyTransferModule/insertList',
					this.formData,
				);
				this.filterInit();
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
						])
					) {
						return;
					}
				}
				await this.$store.dispatch(
					'SalesTransferModule/insertList',
					this.formData,
				);
				this.filterInit();
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
		async overlapSuccessFnc(dvcId) {
			this.overlapDvcId = dvcId;
			if (this.$route.path === '/stock-move-transfer/faulty-transfer') {
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
			let data = {
				barcode: this.formData.barcode,
			};
			const result = await this.$store.dispatch(
				'commonModule/deviceOverlapCheck',
				data,
			);
			if (result.totalCnt === 1) {
				this.overlapDvcId = result.resultList[0].dvcId;
				if (this.$route.path === '/stock-move-transfer/faulty-transfer') {
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
			} else {
				let data = {
					title: 'SELL_TRNS',
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
		await this.filterInit();
	},
};
</script>

<style></style>
