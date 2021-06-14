<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="690">
				<v-card>
					<v-card-title class="headline grey lighten-2">
						<h2 v-if="this.reqYn === 'N'">상품 등록</h2>
						<h2 v-else>상품 요청</h2>
					</v-card-title>

					<v-card-text class="textFieldCustomCont">
						<p><span class="redfont">*</span>필수입력정보</p>
						<div>
							<p>제조사<span class="redfont">*</span></p>
							<v-select
								class="select_custom1"
								:items="infoDialogData.maker"
								item-text="codeNm"
								item-value="codeSeq"
								outlined
								v-model.trim="formData.maker"
								name="division"
							>
							</v-select>
						</div>
						<div>
							<p>통신망<span class="redfont">*</span></p>
							<v-select
								class="select_custom1"
								:items="infoDialogData.network"
								item-text="codeNm"
								item-value="codeSeq"
								outlined
								v-model.trim="formData.network"
								name="division"
							>
							</v-select>
						</div>
						<div>
							<p>통신사<span class="redfont">*</span></p>
							<v-select
								class="select_custom1"
								:items="infoDialogData.telecom"
								item-text="codeNm"
								item-value="codeSeq"
								item-disabled="전체"
								outlined
								v-model.trim="formData.telecom"
								name="division"
							>
							</v-select>
						</div>
						<div>
							<p>상품명<span class="redfont">*</span></p>
							<v-col>
								<v-text-field
									class="input_custom1"
									outlined
									v-model.trim="formData.goodsName"
									placeholder="상품명을 입력해주세요."
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
								>
								</v-text-field>
							</v-col>
						</div>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							v-if="this.reqYn === 'N'"
							color="primary"
							text
							@click="insertDataFnc"
							outlined
						>
							등록
						</v-btn>
						<v-btn v-else color="primary" text @click="insertDataFnc" outlined>
							요청
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
import { insertData } from '../../../../api/common-mgmt/goods-mgmt/MobilePhoneListApi.js';
import { nullValidation } from '../../../../common/common.js';

export default {
	props: ['reqYn', 'infoDialogData'],
	data() {
		return {
			formData: {
				delYn: 'N',
				goodsId: 1,
				goodsName: '',
				modelName: '',
				maker: 0,
				matchingYn: 'N',
				network: this.infoDialogData.network[1].codeSeq,
				optionCnt: 1,
				telecom: this.infoDialogData.telecom[1].codeSeq,
				useYn: 'N',
				reqYn: this.reqYn,
			},
		};
	},
	computed: {
		dialog: {
			get() {
				return this.$store.state.MobilephoneListModule.registDialog;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.registDialog = newValue;
			},
		},
	},
	methods: {
		codeListShiftFnc() {
			/* TODO 리펙토링 */
			const findItem = this.infoDialogData.maker.find(item => {
				return item.codeSeq === '0';
			});
			const findItem1 = this.infoDialogData.telecom.find(item => {
				return item.codeSeq === '0';
			});
			const findItem2 = this.infoDialogData.network.find(item => {
				return item.codeSeq === '0';
			});

			if (findItem != undefined) {
				const idx = this.infoDialogData.maker.indexOf(findItem);
				this.infoDialogData.maker.splice(idx, 1);
			}

			if (findItem1 != undefined) {
				const idx = this.infoDialogData.telecom.indexOf(findItem1);
				this.infoDialogData.telecom.splice(idx, 1);
			}

			if (findItem2 != undefined) {
				const idx = this.infoDialogData.network.indexOf(findItem2);
				this.infoDialogData.network.splice(idx, 1);
			}
			this.formData.maker = this.infoDialogData.maker[0].codeSeq;
			this.formData.network = this.infoDialogData.network[0].codeSeq;
			this.formData.telecom = this.infoDialogData.telecom[0].codeSeq;
		},
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('MobilephoneListModule/getList', data);
		},
		async insertDataFnc() {
			try {
				if (!nullValidation(this.formData)) {
					return;
				}

				const result = await insertData(this.formData);
				if (result.data.status === 200) {
					alert('등록되었습니다.');
					this.dialog = !this.dialog;
					this.getList();
				} else {
					alert(`알수없는 오류가 발생했습니다.`);
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
	created() {
		/*this.infoDialogData.maker.shift();*/
		this.codeListShiftFnc();
	},
};
</script>
