<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="690">
				<v-card>
					<v-card-title class="headline grey lighten-2">
						<h2>
							휴대폰 정보
							<span v-if="!roleVal">수정</span>
						</h2>
					</v-card-title>

					<v-card-text>
						<p><span class="redfont">*</span>필수입력정보</p>
						<div>
							<p>상품명<span class="redfont">*</span></p>
							<v-col>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.goodsName"
									placeholder="상품명을 입력해주세요."
									:disabled="roleVal"
								>
								</v-text-field>
							</v-col>
						</div>
						<div>
							<p>모델명<span class="redfont">*</span></p>
							<v-col>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.modelName"
									placeholder="모델명을 입력해주세요."
									:disabled="roleVal"
								>
								</v-text-field>
							</v-col>
						</div>
						<div>
							<p>제조사</p>
							<v-select
								class="select_custom1"
								:items="infoDialogCodeData.maker"
								item-text="codeNm"
								item-value="codeSeq"
								outlined
								v-model.trim="formData.maker"
								name="division"
								:disabled="roleVal"
							>
							</v-select>
						</div>
						<div>
							<p>통신망</p>
							<v-select
								class="select_custom1"
								:items="infoDialogCodeData.network"
								item-text="codeNm"
								item-value="codeSeq"
								outlined
								v-model.trim="formData.network"
								name="division"
								:disabled="roleVal"
							>
							</v-select>
						</div>
						<div>
							<p>통신사</p>
							<v-select
								class="select_custom1"
								:items="infoDialogCodeData.telecom"
								item-text="codeNm"
								item-value="codeSeq"
								outlined
								v-model.trim="formData.telecom"
								name="division"
								:disabled="roleVal"
							>
							</v-select>
						</div>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="primary"
							v-if="!roleVal"
							text
							@click="updateDataFnc"
							outlined
						>
							저장
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
import { updateData } from '../../../../api/common-mgmt/goods-mgmt/MobilePhoneListApi.js';
import { nullValidation } from '../../../../common/common.js';

export default {
	props: ['infoDialogData', 'infoDialogCodeData'],
	data() {
		return {
			formData: {
				delYn: 'N',
				goodsId: 1,
				goodsName: '',
				maker: 1,
				matchingYn: 'N',
				modelName: '',
				network: 1,
				optionCnt: 1,
				telecom: 1,
				useYn: '',
			},
		};
	},
	computed: {
		dialog: {
			get() {
				return this.$store.state.MobilephoneListModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.infoDialog = newValue;
			},
		},
		roleVal() {
			let result;
			if (!this.$store.state.role) {
				result = true;
			} else {
				result = false;
			}
			return result;
		},
	},
	methods: {
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('MobilephoneListModule/getList', data);
		},
		async updateDataFnc() {
			try {
				if (!nullValidation(this.formData)) {
					return;
				}
				const result = await updateData(this.formData);
				if (result) {
					alert('수정되었습니다.');
					this.getList();
					this.dialog = !this.dialog;
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
	created() {
		this.formData.goodsId = this.infoDialogData.goodsId;
		this.formData.goodsName = this.infoDialogData.goodsName;
		this.formData.modelName = this.infoDialogData.modelName;
		this.formData.maker = this.infoDialogData.maker;
		this.formData.network = this.infoDialogData.network;
		this.formData.telecom = this.infoDialogData.telecom;
		this.formData.useYn = this.infoDialogData.useYn;
	},
};
</script>

<style></style>
