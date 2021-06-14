<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="690">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					<h2>
						개통점 정보
						<span v-if="roleVal || storeId === formData.storeId">수정</span>
					</h2>
				</v-card-title>
				<v-card-text>
					<p><span class="redfont">*</span>필수입력정보</p>
					<div>
						<p>개통점명<span class="redfont">*</span></p>
						<v-text-field
							class="input_custom1"
							v-model.trim="formData.openStoreName"
							outlined
							placeholder="개통점명을 입력해주세요."
						></v-text-field>
					</div>
					<div>
						<p>통신사<span class="redfont">*</span></p>
						<div class="labelCont">
							<span
								v-for="item in infoDialogTelecomData.telecom"
								:key="item.id"
							>
								<input
									:id="`popup${item.codeNm}`"
									type="radio"
									:value="item.codeSeq"
									v-model.trim="formData.telecom"
									name="popTelecom"
								/>
								<label :for="`popup${item.codeNm}`">{{ item.codeNm }}</label>
							</span>
						</div>
					</div>
					<div style="width: 550px">
						<p style="width: 200px">
							사업자 번호<span class="redfont">*</span>
						</p>
						<v-text-field
							style="width: 80px"
							class="input_custom1"
							outlined
							maxlength="3"
							placeholder="3자리"
							v-model.trim="formData.bizNoFront"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						></v-text-field>
						<v-text-field
							style="width: 70px; margin-left: 5px"
							class="input_custom1"
							outlined
							maxlength="2"
							placeholder="2자리"
							v-model.trim="formData.bizNoMiddle"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						></v-text-field>
						<v-text-field
							style="width: 150px; margin-left: 5px"
							class="input_custom1"
							outlined
							maxlength="5"
							placeholder="5자리"
							v-model.trim="formData.bizNoBack"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						></v-text-field>
					</div>
					<div>
						<p>담당자명<span class="redfont">*</span></p>
						<v-text-field
							class="input_custom1"
							v-model.trim="formData.chargerName"
							outlined
							placeholder="담당자명을 입력해주세요."
						></v-text-field>
					</div>
					<div style="width: 600px">
						<p style="width: 200px">
							담당자 연락처<span class="redfont">*</span>
						</p>
						<v-text-field
							class="input_custom1 input_custom2"
							v-model.trim="formData.chargerPhone1"
							maxlength="3"
							outlined
							placeholder="앞자리"
							style="margin-right: 5px"
						></v-text-field>
						<v-text-field
							class="input_custom1 input_custom2"
							v-model.trim="formData.chargerPhone2"
							maxlength="4"
							outlined
							placeholder="중간자리"
							style="margin-right: 5px"
						></v-text-field>
						<v-text-field
							class="input_custom1 input_custom2"
							v-model.trim="formData.chargerPhone3"
							maxlength="4"
							outlined
							placeholder="뒷자리"
							style="margin-right: 5px"
						></v-text-field>
					</div>
					<div>
						<p>반품 주소<span class="redfont">*</span></p>
						<div id="addressCont">
							<input
								type="text"
								placeholder="우편번호"
								v-model.trim="formData.returnZipCode"
								id="postcode"
								:disabled="storeId !== formData.storeId"
							/>
							<input
								type="text"
								placeholder="기본주소"
								v-model.trim="formData.returnAddr"
								id="roadAddress"
								:disabled="storeId !== formData.storeId"
							/>
							<post-api
								@postapi="addressData"
								v-if="storeId === formData.storeId"
							></post-api>
							<input
								type="text"
								placeholder="상세주소 입력"
								v-model.trim="formData.returnAddrDetail"
								id="detailAddress"
								:disabled="storeId !== formData.storeId"
							/>
						</div>
					</div>
				</v-card-text>
				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						outlined
						color="primary"
						text
						@click="updateStoreFnc"
						v-if="roleVal || storeId === formData.storeId"
					>
						수정
					</v-btn>
					<v-btn outlined color="primary" text @click="dialog = !dialog">
						취소
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import PostApi from '../../../../components/PostApi.vue';
import { nullValidation } from '../../../../common/common';
import { updateStore } from '../../../../api/common-mgmt/businessman-mgmt/OpeningStoreMgmtApi.js';

export default {
	props: ['infoDialogData', 'infoDialogTelecomData'],
	// 상위 컴포넌트에서 props로 data를 받는다.
	data() {
		return {
			storeId: this.infoDialogData.storeId,
			formData: {
				storeId: 1,
				openStoreName: '',
				telecom: '1',
				bizNoFront: '',
				bizNoMiddle: '',
				bizNoBack: '',
				bizNo: '',
				chargerName: '',
				chargerPhone1: '',
				chargerPhone2: '',
				chargerPhone3: '',
				returnZipCode: '',
				returnAddr: '',
				returnAddrDetail: '',
				openStoreId: '',
				useYn: '',
				delYn: '',
			},
		};
	},
	components: {
		PostApi,
	},
	computed: {
		roleVal() {
			return this.$store.state.role;
		},
		filterData: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.filterData;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.filterData = newValue;
			},
		},
		dialog: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.infoDialog = newValue;
			},
		},
	},
	methods: {
		addressData(data) {
			this.formData.returnAddr = data.address;
			this.formData.returnZipCode = data.zonecode;
		},
		async updateStoreFnc() {
			try {
				this.formData.bizNo =
					this.formData.bizNoFront +
					this.formData.bizNoMiddle +
					this.formData.bizNoBack;
				// null check
				if (!nullValidation(this.formData)) {
					return;
				}
				const result = await updateStore(this.formData);
				if (result) {
					alert('수정되었습니다.');
					this.dialog = !this.dialog;
					this.filterData.pageNo = 1;
					this.$store.dispatch(
						'OpeningStoreMgmtModule/getList',
						this.filterData,
					);
				}
			} catch (e) {
				console.log(e);
			}
		},
		initFormData() {
			this.formData.openStoreId = this.infoDialogData.openStoreId;
			this.formData.storeId = this.infoDialogData.storeId;
			this.formData.openStoreName = this.infoDialogData.openStoreName;
			this.formData.telecom = this.infoDialogData.telecom;
			this.formData.bizNoFront = this.infoDialogData.bizNo.substring(0, 3);
			this.formData.bizNoMiddle = this.infoDialogData.bizNo.substring(3, 5);
			this.formData.bizNoBack = this.infoDialogData.bizNo.substring(
				5,
				this.infoDialogData.bizNo.length,
			);
			this.formData.bizNo = this.infoDialogData.bizNo;
			this.formData.chargerName = this.infoDialogData.chargerName;
			this.formData.chargerPhone1 = this.infoDialogData.chargerPhone1;
			this.formData.chargerPhone2 = this.infoDialogData.chargerPhone2;
			this.formData.chargerPhone3 = this.infoDialogData.chargerPhone3;
			this.formData.returnZipCode = this.infoDialogData.returnZipCode;
			this.formData.returnAddr = this.infoDialogData.returnAddr;
			this.formData.returnAddrDetail = this.infoDialogData.returnAddrDetail;
			this.formData.useYn = this.infoDialogData.useYn;
			this.formData.delYn = this.infoDialogData.delYn;
		},
	},
	created() {
		this.initFormData();
	},
};
</script>

<style></style>
