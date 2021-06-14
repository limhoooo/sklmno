<template>
	<div
		class="searchingCont SalesMoveCont"
		style="height: 240px; display: block"
	>
		<div class="rowCont" style="margin-top: 0">
			<div
				class="radioCont SalesMoveRadioCont"
				style="width: 300px; padding: 4px 0; margin-left: 0"
			>
				<p>배송정보</p>
				<input
					type="radio"
					id="salesMove1"
					name="salesMove"
					value="PS"
					v-model.trim="formData.deliveryType"
					@change="deliveryFnc"
				/><label for="salesMove1">택배</label>
				<input
					type="radio"
					id="salesMove2"
					name="salesMove"
					value="QUICK"
					v-model.trim="formData.deliveryType"
					@change="deliveryFnc"
				/><label for="salesMove2">퀵</label>
				<input
					type="radio"
					id="salesMove3"
					name="salesMove"
					value="DIRECT"
					v-model.trim="formData.deliveryType"
					@change="deliveryFnc"
				/><label for="salesMove3">직접전달</label>
			</div>
			<div class="inputCont">
				<input
					type="text"
					placeholder="고객명"
					v-model.trim="formData.cusName"
				/>
			</div>
			<div class="inputCont">
				<input
					style="display: inline-block; width: 70px; margin-right: 5px"
					type="text"
					placeholder="연락처"
					v-model.trim="formData.cusPhone1"
					maxlength="3"
				/>-
				<input
					style="display: inline-block; width: 100px; margin-right: 5px"
					type="text"
					placeholder="연락처"
					v-model.trim="formData.cusPhone2"
					maxlength="4"
				/>-
				<input
					style="display: inline-block; width: 103px"
					type="text"
					placeholder="연락처"
					v-model.trim="formData.cusPhone3"
					maxlength="4"
				/>
			</div>
			<div class="inputCont inputCustom2">
				<input
					type="text"
					placeholder="기기 일련번호 입력"
					v-model.trim="formData.barcode"
				/>
			</div>
			<div class="inputCont inputCustom2">
				<input
					type="text"
					placeholder="유심 일련번호 입력"
					v-model.trim="formData.usimFullBarcode"
				/>
			</div>
		</div>
		<div class="rowCont">
			<div class="inputCont postCont" style="margin-left: 0">
				<input
					type="text"
					@click="postDialogFnc"
					placeholder="우편번호"
					v-model.trim="formData.zipCode"
					readonly
					:disabled="formData.deliveryType !== 'PS'"
				/>
				<post-api
					v-if="formData.deliveryType === 'PS'"
					@postapi="addressData"
					:postDialog="postDialog"
					@closeDialog="postDialogClose"
				></post-api>
			</div>
			<div class="inputCont">
				<input
					type="text"
					@click="postDialogFnc"
					placeholder="상세주소"
					v-model.trim="formData.addr1"
					:disabled="formData.deliveryType !== 'PS'"
					readonly
				/>
			</div>
			<div class="inputCont">
				<input
					type="text"
					placeholder="상세주소2"
					v-model.trim="formData.addr2"
					:disabled="formData.deliveryType !== 'PS'"
				/>
			</div>
			<div class="selectCont1" style="width: 200px">
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
			<div class="inputCont inputCustom2">
				<input
					type="text"
					placeholder="송장번호 입력"
					:disabled="formData.deliveryType !== 'PS'"
					v-model.trim="formData.invoiceNo"
				/>
			</div>
		</div>
		<div class="rowCont">
			<div class="inputCont" style="width: 100%; margin-left: 0">
				<input
					type="text"
					placeholder="메모입력"
					style="width: 1340px"
					v-model.trim="formData.deliveryMemo"
				/>
			</div>
		</div>
		<div class="btnCont SalesMoveBtnCont">
			<button @click="overlapDvcCodeFnc()">확인</button>
			<button
				style="background-color: #c8c8c8; margin-left: 10px"
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
	},
	methods: {
		async overlapSuccessFnc(dvcId) {
			this.overlapDvcId = dvcId;
			await this.insertList();
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
		async overlapDvcCodeFnc() {
			if (this.formData.deliveryType !== 'PS') {
				if (
					!nullValidation(this.formData, [
						'invoiceNo',
						'courier',
						'addr1',
						'addr2',
						'zipCode',
						'deliveryMemo',
						'usimFullBarcode',
						'selDvcId',
					])
				) {
					return;
				}
			} else {
				if (
					!nullValidation(this.formData, [
						'deliveryMemo',
						'usimFullBarcode',
						'selDvcId',
					])
				) {
					return;
				}
			}

			let data = {
				barcode: this.formData.barcode,
			};
			const result = await this.$store.dispatch(
				'commonModule/deviceOverlapCheck',
				data,
			);
			if (result.totalCnt === 1) {
				this.overlapDvcId = result.resultList[0].dvcId;
				await this.insertList();
			} else if (result.totalCnt > 1) {
				this.overlapDevicePopFnc(result.resultList);
			} else {
				alert('조회된 결과가 없습니다.');
			}
		},
		async insertList() {
			this.formData.selDvcId = this.overlapDvcId;
			await this.$store.dispatch('SalesMoveModule/insertList', this.formData);
			await this.getList();
			this.filterInit();
		},
		async getCourierItems() {
			await this.$store.dispatch('SalesMoveModule/commonCodeList');
		},
		async getList() {
			await this.$store.dispatch('SalesMoveModule/getList');
		},
	},
	async created() {
		await this.getCourierItems();
	},
};
</script>

<style scoped></style>
