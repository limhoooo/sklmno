<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="690">
				<v-card>
					<v-card-title class="headline grey lighten-2">
						<h2>영업점 검색</h2>
					</v-card-title>

					<v-card-text>
						<p><span class="redfont">*</span>필수입력정보</p>
						<div style="width: 579px">
							<p style="width: 200px">
								사업자 번호<span class="redfont">*</span>
							</p>
							<v-text-field
								style="width: 80px; margin-left: 5px"
								class="input_custom1"
								outlined
								maxlength="3"
								placeholder="3자리"
								v-model.trim="formData.saleStore.bizNoFront"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							></v-text-field>
							<v-text-field
								style="width: 70px; margin-left: 5px"
								class="input_custom1"
								outlined
								maxlength="2"
								placeholder="2자리"
								v-model.trim="formData.saleStore.bizNoMiddle"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							></v-text-field>
							<v-text-field
								style="width: 150px; margin-left: 5px"
								class="input_custom1"
								outlined
								maxlength="5"
								placeholder="5자리"
								v-model.trim="formData.saleStore.bizNoBack"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							></v-text-field>
							<v-btn style="margin-left: 5px" @click="biznoExistsData"
								>검색</v-btn
							>
						</div>
						<div style="width: 579px">
							<p>검색결과</p>
							<v-text-field
								class="input_custom1"
								outlined
								readonly
								v-model.trim="searchResult"
							></v-text-field>
							<v-btn
								v-if="this.dialog != '0'"
								:disabled="this.dialog === '9000'"
								@click="insertStoreMapFnc"
								>등록</v-btn
							>
						</div>
						<div v-if="this.dialog === '9000'" style="width: 579px">
							<p></p>
							<p><span class="redfont">*</span>가입된 영업점이 없습니다.</p>
						</div>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="primary" text @click="dialog = !dialog" outlined>
							닫기
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>

		<v-snackbar v-model.trim="snackbar">
			{{ text }}
			<template v-slot:action="{ attrs }">
				<v-btn color="white" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
import { insertStoreMap } from '../../../../api/common-mgmt/businessman-mgmt/SaleStoreMgmtApi.js';
import { nullValidation } from '../../../../common/common';
import { existsData } from '../../../../api/member/login';

export default {
	props: ['dataListCall', 'parentStoreId'],
	data: () => ({
		searchResult: null,
		snackbar: false,
		text: `가입링크( url )를 참고해주세요.`,
		formData: {
			storeId: '',
			saleStore: {
				bizNoFront: '',
				bizNoBack: '',
				bizNoMiddle: '',
				bizNo: '',
				chargerPhone: '',
				returnAddr: '',
				returnAddrDetail: '',
				returnZipCode: '',
				saleStoreName: '',
				telecom: '1',
				useYn: 'Y',
			},
			member: {
				email: 'string',
				name: 'userName',
				phone: '010010',
				password: '1234',
				userStatus: '1',
				username: Math.floor(new Date().getTime() / 1000),
			},
		},
	}),
	computed: {
		dialog: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.regiDialog;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.regiDialog = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.filterData;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.filterData = newValue;
			},
		},
	},
	methods: {
		// daumPost에서 받은 data를 formData 내부에 저장
		addressData(data) {
			this.formData.saleStore.returnAddr = data.address;
			this.formData.saleStore.returnZipCode = data.zonecode;
		},
		async biznoExistsData() {
			let formdata = {
				bizNoFront: this.formData.saleStore.bizNoFront,
				bizNoMiddle: this.formData.saleStore.bizNoMiddle,
				bizNoBack: this.formData.saleStore.bizNoBack,
			};
			if (!nullValidation(formdata)) {
				return;
			}
			let data = {
				storeMapBizNo:
					this.formData.saleStore.bizNoFront +
					this.formData.saleStore.bizNoMiddle +
					this.formData.saleStore.bizNoBack,
			};
			const result = await existsData(data);
			this.dialog = result.data.resultCode;
			if (result.data.resultCode === '0000') {
				this.searchResult = [];
				this.searchResult = result.data.data.storeName;
				this.formData.storeId = result.data.data.storeId;
			} else {
				this.searchResult = [];
			}
		},

		async insertStoreMapFnc() {
			let data = {
				parentStoreId: this.parentStoreId,
				member: {
					storeId: this.formData.storeId,
				},
			};
			const result = await insertStoreMap(data);
			if (result) {
				alert('등록되었습니다.');
				this.dialog = !this.dialog;
				this.filterData.pageNo = 1;
				this.$store.dispatch('SaleStoreMgmtModule/getList', this.filterData);
			} else {
				alert('등록실패하였습니다.');
			}
			this.dataListCall();
		},
	},
};
</script>

<style></style>
