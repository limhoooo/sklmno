<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="690">
				<v-card>
					<v-card-title class="headline grey lighten-2">
						<h2>
							영업점 정보
							<span v-if="roleVal"> 수정 </span>
						</h2>
					</v-card-title>

					<v-card-text>
						<p><span class="redfont">*</span>필수입력정보</p>
						<div>
							<p>영업점명<span class="redfont">*</span></p>
							<v-col>
								<v-text-field
									class="input_custom1"
									outlined
									placeholder="영업점명을 입력해주세요."
									v-model.trim="formData.saleStore.saleStoreName"
									:disabled="!roleVal"
								></v-text-field>
							</v-col>
						</div>
						<div>
							<p>통신사<span class="redfont">*</span></p>
							<div class="labelCont">
								<input
									type="radio"
									id="ModalSKTTel"
									name="telecom"
									value="5"
									v-model.trim="formData.saleStore.telecom"
									:disabled="!roleVal"
								/><label for="ModalSKTTel">SKT</label>
								<input
									type="radio"
									id="ModalKTTel"
									name="telecom"
									value="6"
									v-model.trim="formData.saleStore.telecom"
									:disabled="!roleVal"
								/><label for="ModalKTTel">KT</label>
								<input
									type="radio"
									id="ModalLGUTel"
									name="telecom"
									value="7"
									v-model.trim="formData.saleStore.telecom"
									:disabled="!roleVal"
								/><label for="ModalLGUTel">LGU</label>
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
								v-model.trim="formData.saleStore.bizNoFront"
								:disabled="!roleVal"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							></v-text-field>
							<v-text-field
								style="width: 70px; margin-left: 5px"
								class="input_custom1"
								outlined
								maxlength="2"
								placeholder="2자리"
								v-model.trim="formData.saleStore.bizNoMiddle"
								:disabled="!roleVal"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							></v-text-field>
							<v-text-field
								style="width: 150px; margin-left: 5px"
								class="input_custom1"
								outlined
								maxlength="5"
								placeholder="5자리"
								v-model.trim="formData.saleStore.bizNoBack"
								:disabled="!roleVal"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							></v-text-field>
						</div>
						<div>
							<p>담당자명<span class="redfont">*</span></p>
							<v-col>
								<v-text-field
									class="input_custom1"
									outlined
									placeholder="담당자명을 입력해주세요."
									v-model.trim="formData.saleStore.chargerName"
									:disabled="!roleVal"
								></v-text-field>
							</v-col>
						</div>
						<div style="width: 600px">
							<p style="width: 200px">
								담당자 연락처<span class="redfont">*</span>
							</p>
							<v-text-field
								style="width: 128px"
								class="input_custom1"
								outlined
								maxlength="3"
								placeholder="앞자리"
								v-model.trim="formData.saleStore.chargerPhone1"
								:disabled="!roleVal"
							></v-text-field>
							<v-text-field
								style="width: 128px; margin-left: 5px"
								class="input_custom1"
								outlined
								maxlength="4"
								placeholder="중간자리"
								v-model.trim="formData.saleStore.chargerPhone2"
								:disabled="!roleVal"
							></v-text-field>
							<v-text-field
								style="width: 128px; margin-left: 5px"
								class="input_custom1"
								outlined
								maxlength="4"
								placeholder="뒷자리"
								:disabled="!roleVal"
								v-model.trim="formData.saleStore.chargerPhone3"
							></v-text-field>
						</div>
						<div>
							<p>반품 주소<span class="redfont">*</span></p>
							<div id="addressCont">
								<input
									type="text"
									placeholder="우편번호"
									v-model.trim="formData.saleStore.returnZipCode"
									id="postcode"
									:disabled="!roleVal"
								/>
								<input
									type="text"
									placeholder="기본주소"
									v-model.trim="formData.saleStore.returnAddr"
									id="roadAddress"
									:disabled="!roleVal"
								/>
								<post-api v-if="roleVal" @postapi="addressData"></post-api>
								<input
									type="text"
									placeholder="상세주소 입력"
									v-model.trim="formData.saleStore.returnAddrDetail"
									id="detailAddress"
									:disabled="!roleVal"
								/>
							</div>
						</div>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							v-if="roleVal"
							color="primary"
							text
							@click="updateStoreFnc"
							outlined
						>
							수정
						</v-btn>
						<v-btn color="primary" text @click="dialog = !dialog" outlined>
							취소
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import PostApi from '../../../../components/PostApi.vue';
import { updateStore } from '../../../../api/common-mgmt/businessman-mgmt/SaleStoreMgmtApi.js';
import { nullValidation } from '../../../../common/common.js';

export default {
	components: {
		PostApi,
	},
	props: ['infoDialogData', 'dataListCall', 'parentStoreId'],
	data() {
		return {
			formData: {
				parentStoreId: this.parentStoreId,
				saleStore: {
					storeId: 0,
					bizNoFront: '',
					bizNoMiddle: '',
					bizNoBack: '',
					bizNo: '',
					chargerName: '',
					chargerPhone1: '',
					chargerPhone2: '',
					chargerPhone3: '',
					returnAddr: 'string',
					returnAddrDetail: 'string',
					returnZipCode: 'string',
					saleStoreName: 'string',
					telecom: '1',
					useYn: 'Y',
				},
				user: {
					email: 'string',
					userName: 'userName',
					userPhone: '010010',
					userPw: '1234',
					userStatus: '1',
				},
			},
		};
	},
	computed: {
		roleVal() {
			return this.$store.state.role;
		},
		dialog: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.infoDialog = newValue;
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
		addressData(data) {
			this.formData.returnAddr = data.address;
			this.formData.returnZipCode = data.zonecode;
		},
		async updateStoreFnc() {
			try {
				this.formData.saleStore.bizNo =
					this.formData.saleStore.bizNoFront +
					this.formData.saleStore.bizNoMiddle +
					this.formData.saleStore.bizNoBack;

				if (!nullValidation(this.formData.saleStore)) {
					return;
				}

				const result = await updateStore(this.formData);
				if (result) {
					alert('수정되었습니다.');
					this.dialog = !this.dialog;
					this.filterData.pageNo = 1;
					this.$store.dispatch('SaleStoreMgmtModule/getList', this.filterData);
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
	created() {
		this.formData.saleStore.saleStoreName = this.infoDialogData.saleStoreName;
		this.formData.saleStore.telecom = this.infoDialogData.telecom;
		this.formData.saleStore.bizNo = this.infoDialogData.bizNo.replace(
			/[^0-9]/g,
			'',
		);
		this.formData.saleStore.chargerName = this.infoDialogData.chargerName;
		this.formData.saleStore.chargerPhone1 = this.infoDialogData.chargerPhone1;
		this.formData.saleStore.chargerPhone2 = this.infoDialogData.chargerPhone2;
		this.formData.saleStore.chargerPhone3 = this.infoDialogData.chargerPhone3;
		this.formData.saleStore.returnZipCode = this.infoDialogData.returnZipCode;
		this.formData.saleStore.returnAddr = this.infoDialogData.returnAddr;
		this.formData.saleStore.returnAddrDetail = this.infoDialogData.returnAddrDetail;
		this.formData.saleStore.storeId = this.infoDialogData.storeId;
		this.formData.saleStore.bizNoFront = this.formData.saleStore.bizNo.substring(
			0,
			3,
		);
		this.formData.saleStore.bizNoMiddle = this.formData.saleStore.bizNo.substring(
			3,
			5,
		);
		this.formData.saleStore.bizNoBack = this.formData.saleStore.bizNo.substring(
			5,
			this.infoDialogData.bizNo.length,
		);
	},
};
</script>
