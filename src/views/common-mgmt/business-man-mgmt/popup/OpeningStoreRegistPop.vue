<template>
	<div class="text-center">
		<v-dialog v-model.trim="dialog" width="690">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					<h2>개통점 등록</h2>
				</v-card-title>
				<v-card-text>
					<div>
						<p>개통점명<span class="redfont">*</span></p>
						<v-text-field
							class="input_custom1"
							outlined
							v-model.trim="formData.openStoreName"
							placeholder="개통점명을 입력해주세요."
						></v-text-field>
					</div>
					<div>
						<p>통신사<span class="redfont">*</span></p>
						<div class="labelCont">
							<span v-for="item in infoDialogData.telecom" :key="item.id">
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
							oninput="this.value = this.value.replace(/[^0-9]/g, '');"
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
							outlined
							v-model.trim="formData.chargerName"
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
								@click="postDialog = !postDialog"
								v-model.trim="formData.returnZipCode"
								readonly
								:postDialog="postDialog"
								class="cur_p"
								id="postcode"
							/>
							<input
								type="text"
								placeholder="기본주소"
								@click="postDialog = !postDialog"
								v-model.trim="formData.returnAddr"
								readonly
								:postDialog="postDialog"
								class="cur_p"
								id="roadAddress"
							/>
							<post-api
								@postapi="addressData"
								:postDialog="postDialog"
								@closeDialog="dialogClose"
							></post-api>
							<input
								type="text"
								placeholder="상세주소 입력"
								v-model.trim="formData.returnAddrDetail"
								id="detailAddress"
							/>
						</div>
					</div>
				</v-card-text>
				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn outlined color="primary" text @click="insertStoreFnc">
						저장
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
import PostApi from '../../../../components/PostApi';
import { nullValidation } from '../../../../common/common';
import { insertStore } from '../../../../api/common-mgmt/businessman-mgmt/OpeningStoreMgmtApi.js';

export default {
	props: ['infoDialogData', 'storeIdData'],
	data() {
		return {
			postDialog: false,
			formData: {
				storeId: this.storeIdData,
				openStoreName: '',
				telecom: 5,
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
				delYn: 'N',
				useYn: 'Y',
			},
		};
	},
	components: {
		PostApi,
	},
	computed: {
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
				return this.$store.state.OpeningStoreMgmtModule.regiDialog;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.regiDialog = newValue;
			},
		},
	},
	methods: {
		dialogClose(data) {
			this.postDialog = data;
		},
		addressData(data) {
			this.formData.returnAddr = data.address;
			this.formData.returnZipCode = data.zonecode;
		},
		async insertStoreFnc() {
			try {
				this.formData.bizNo =
					this.formData.bizNoFront +
					this.formData.bizNoMiddle +
					this.formData.bizNoBack;

				// null check
				if (!nullValidation(this.formData, ['storeId'])) {
					return;
				}
				const result = await insertStore(this.formData);
				if (result.data.status === 200) {
					alert('등록되었습니다.');
					this.dialog = !this.dialog;
					this.filterData.pageNo = 1;
					this.$store.dispatch(
						'OpeningStoreMgmtModule/getList',
						this.filterData,
					);
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
				}
				// null 체크
			} catch (e) {
				console.log(e);
			}
		},
	},
};
</script>

<style>
.input_custom2 {
	width: 120px;
}
</style>
