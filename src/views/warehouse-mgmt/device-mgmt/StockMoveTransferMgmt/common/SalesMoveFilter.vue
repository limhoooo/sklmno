<template>
	<div>
		<div class="new-mainCont posR">
			<div class="w100P disFx h40 mb10">
				<div class="disFx w420">
					<p class="lh40 mj0 boldWt w250">배송정보</p>
					<div class="w1000 disFx">
						<span
							v-for="(item, index) in optionList.DeliveryType"
							:key="item.id"
						>
							<div class="radioStyle ml30 h40 lh40">
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
				</div>
				<div class="w150 ml10">
					<input
						class="newInput1"
						type="text"
						placeholder="고객명"
						v-model.trim="formData.cusName"
					/>
				</div>
				<div class="phoneStyle1 ml10 disFX">
					<input
						class="newInput1"
						type="text"
						placeholder="연락처"
						v-model.trim="formData.cusPhone1"
						maxlength="3"
					/>
					<span class="lh40">-</span>
					<input
						class="newInput1"
						type="text"
						placeholder="연락처"
						v-model.trim="formData.cusPhone2"
						maxlength="4"
					/>
					<span class="lh40">-</span>
					<input
						class="newInput1"
						type="text"
						placeholder="연락처"
						v-model.trim="formData.cusPhone3"
						maxlength="4"
					/>
				</div>
				<div class="w40P ml10 disFx">
					<input
						class="newInput1"
						type="text"
						placeholder="기기 일련번호 입력"
						:disabled="dvcCheck"
						v-model.trim="formData.barcode"
						@keyup.enter="deviceOverlapCheck('DVC')"
					/>
					<button
						style="height: 40px"
						:disabled="dvcCheck"
						@click="deviceOverlapCheck('DVC')"
						class="excelBtn w80"
					>
						등록
					</button>
				</div>
				<div class="w40P ml10 disFx">
					<input
						class="newInput1"
						type="text"
						placeholder="유심 일련번호 입력"
						v-model.trim="formData.usimBarcode"
						:disabled="usimCheck"
						@keyup.enter="deviceOverlapCheck('USIM')"
					/>
					<button
						style="height: 40px"
						:disabled="usimCheck"
						@click="deviceOverlapCheck('USIM')"
						class="excelBtn2 w80"
					>
						등록
					</button>
				</div>
			</div>
			<div class="w100P disFx h40 mb10">
				<div class="w100P postStyle1">
					<input
						type="text"
						class="newInput1"
						@click="postDialogFnc"
						placeholder="우편번호"
						v-model.trim="formData.zipCode"
						readonly
						:disabled="
							formData.deliveryType === 'QUICK' ||
							formData.deliveryType === 'DIRECT'
						"
					/>
					<post-api
						v-if="
							formData.deliveryType === 'PS' ||
							formData.deliveryType === 'PS_SALES'
						"
						@postapi="addressData"
						:postDialog="postDialog"
						@closeDialog="postDialogClose"
					></post-api>
				</div>
				<div class="w100P ml10">
					<input
						class="newInput1"
						type="text"
						@click="postDialogFnc"
						placeholder="상세주소"
						v-model.trim="formData.addr1"
						:disabled="
							formData.deliveryType === 'QUICK' ||
							formData.deliveryType === 'DIRECT'
						"
						readonly
					/>
				</div>
				<div class="w100P ml10">
					<input
						class="newInput1"
						type="text"
						placeholder="상세주소2"
						v-model.trim="formData.addr2"
						:disabled="
							formData.deliveryType === 'QUICK' ||
							formData.deliveryType === 'DIRECT'
						"
					/>
				</div>
				<div class="w100P ml10">
					<v-select
						:disabled="formData.deliveryType !== 'PS'"
						label="택배사"
						:items="codeList.courierItems"
						item-text="codeNm"
						item-value="codeSeq"
						v-model.trim="formData.courier"
						outlined
					></v-select>
				</div>
				<div class="w100P ml10">
					<input
						class="newInput1"
						type="text"
						placeholder="송장번호 입력"
						:disabled="
							formData.deliveryType === 'QUICK' ||
							formData.deliveryType === 'DIRECT'
						"
						v-model.trim="formData.invoiceNo"
					/>
				</div>
			</div>
			<div class="w100P disFx h60">
				<input
					class="newInput1 textAreaPad"
					type="text"
					placeholder="메모입력"
					v-model.trim="formData.deliveryMemo"
				/>
			</div>
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

		<overlap-device-popup
			v-if="overlapDevicePop"
			:overlapDialog="overlapDevicePop"
			:overlapDeviceData="overlapDeviceData"
			@overlapSuccessFnc="overlapSuccessFnc"
			@closeDialog="dialogClose"
		></overlap-device-popup>
	</div>
</template>

<script>
import postApi from '../../../../../components/PostApi.vue';
import overlapDevicePopup from '../../../../../components/device/overlapDevicePopup.vue';
import { nullValidation } from '../../../../../common/common';

export default {
	components: { postApi, overlapDevicePopup },
	data: () => ({
		postDialog: false,
		overlapDevicePop: false,
		overlapDeviceData: [],
		overlapDvcId: '',
		overlapDeviceYn: 'N',
		goodsType: '',
		dvcCheck: false,
		usimCheck: false,
	}),
	computed: {
		formData: {
			get() {
				return this.$store.state.SalesMoveModule.formData;
			},
			set(newValue) {
				return (this.$store.state.SalesMoveModule.formData = newValue);
			},
		},
		codeList: {
			get() {
				return this.$store.state.SalesMoveModule.codeList;
			},
			set(newValue) {
				return (this.$store.state.SalesMoveModule.codeList = newValue);
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
		async overlapSuccessFnc(dvcId, barcode) {
			if (this.goodsType === 'DVC') {
				this.formData.selDvcId = dvcId;
				this.formData.barcode = barcode;
				this.dvcCheck = true;
			} else {
				this.formData.usimDvcId = dvcId;
				this.formData.usimBarcode = barcode;
				this.usimCheck = true;
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
		filterInit() {
			this.$store.commit('SalesMoveModule/fiterInit');
			this.dvcCheck = false;
			this.usimCheck = false;
		},
		deliveryFnc() {
			if (this.formData.deliveryType !== 'PS') {
				this.formData.courier = '';
				this.formData.invoiceNo = '';
				this.formData.zipCode = '';
				this.formData.addr1 = '';
				this.formData.addr2 = '';
			}
		},
		postDialogFnc() {
			if (this.formData.deliveryType !== 'PS') {
				return;
			}
			this.postDialog = !this.postDialog;
		},
		postDialogClose(data) {
			this.postDialog = data;
		},
		addressData(data) {
			this.formData.addr1 = data.address;
			this.formData.zipCode = data.zonecode;
		},
		async deviceOverlapCheck(type) {
			this.goodsType = type;
			let data;
			if (type === 'DVC') {
				if (!this.formData.barcode) {
					alert('기기일련번호를 입력해주세요.');
					return;
				}
				data = {
					barcode: this.formData.barcode,
					goodsType: 'DVC',
				};
			} else {
				if (!this.formData.usimBarcode) {
					alert('유심일련번호를 입력해주세요.');
					return;
				}
				data = {
					barcode: this.formData.usimBarcode,
					goodsType: 'USIM',
				};
			}
			const result = await this.$store.dispatch(
				'commonModule/deviceOverlapCheck',
				data,
			);
			if (result.totalCnt === 1) {
				if (type === 'DVC') {
					this.formData.selDvcId = result.resultList[0].dvcId;
					this.formData.barcode = result.resultList[0].rawBarcode;
					this.dvcCheck = true;
				} else {
					this.formData.selUsimId = result.resultList[0].dvcId;
					this.formData.usimBarcode = result.resultList[0].rawBarcode;
					this.usimCheck = true;
				}
			} else if (result.totalCnt > 1) {
				this.overlapDevicePopFnc(result.resultList);
			} else {
				alert('조회된 결과가 없습니다.');
			}
		},
		async insertList() {
			if (!this.formData.barcode && !this.formData.usimBarcode) {
				alert('기기 또는 유심 일련번호를 입력해주세요.');
				return;
			}
			await this.$store.dispatch('SalesMoveModule/insertList', this.formData);
			await this.getList();
			this.filterInit();
		},
		async getCourierItems() {
			await this.$store.dispatch('SalesMoveModule/commonCodeList');
		},
		async getCommonCodeList() {
			await this.$store.dispatch('StockMoveFilterCommonModules/getStatusList');
		},
		async getList() {
			await this.$store.dispatch('SalesMoveModule/getList');
		},
	},
	async created() {
		await this.getCommonCodeList();
		await this.getCourierItems();
	},
};
</script>

<style scoped>
.barcodeInput input[type='text']:disabled {
	background-color: #e1e1e1;
}
</style>
