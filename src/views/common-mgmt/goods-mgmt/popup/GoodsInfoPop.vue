<template>
	<div>
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="690">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">
							휴대폰 정보 <span v-if="!roleVal">수정</span>
						</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text class="pad30">
						<p class="mainRed mj0">* 필수입력입니다</p>

						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td>상품명<span class="redfont">*</span></td>
									<td>
										<v-text-field
											class="input_custom1"
											outlined
											v-model.trim="formData.goodsName"
											placeholder="상품명을 입력해주세요."
											:disabled="roleVal"
										>
										</v-text-field>
									</td>
								</tr>
								<tr>
									<td>모델명<span class="redfont">*</span></td>
									<td>
										<v-text-field
											class="input_custom1"
											outlined
											v-model.trim="formData.modelName"
											placeholder="모델명을 입력해주세요."
											:disabled="roleVal"
										>
										</v-text-field>
									</td>
								</tr>
								<tr>
									<td>제조사</td>
									<td>
										<v-select
											attach
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
									</td>
								</tr>
								<tr>
									<td>통신망</td>
									<td>
										<v-select
											attach
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
									</td>
								</tr>
								<tr>
									<td>통신사</td>
									<td>
										<v-select
											attach
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
									</td>
								</tr>
							</table>
						</div>

						<div class="disFx justify-end mt10">
							<v-btn
								class="backColorMint1 mainWhite borderReset w80"
								v-if="!roleVal"
								text
								@click="updateDataFnc"
								outlined
							>
								저장
							</v-btn>
							<v-btn
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
								text
								@click="dialog = !dialog"
								outlined
							>
								취소
							</v-btn>
						</div>
					</v-card-text>
					<v-card-text style="padding-top: 0">
						<div class="disFx justify-lg-space-between">
							<div class="disFx">
								<p class="mj0" style="width: 80px !important">
									단종일자<span class="redfont">*</span>
								</p>
								<v-menu
									v-if="!roleVal"
									style="display: contents"
									v-model.trim="menu1"
									:close-on-content-click="false"
									:nudge-right="40"
									transition="scale-transition"
									offset-y
									min-width="auto"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model.trim="eosDate"
											append-icon="mdi-calendar"
											outlined
											readonly
											v-bind="attrs"
											v-on="on"
											class="datePickerInput input_custom1"
										></v-text-field>
									</template>
									<v-date-picker
										v-model.trim="eosDate"
										@input="menu1 = false"
										locale="ko-KR"
									></v-date-picker>
								</v-menu>
							</div>
							<v-btn
								color="primary"
								v-if="!roleVal"
								text
								@click="insertGoodsEosDate"
								outlined
							>
								저장
							</v-btn>
						</div>
						<div class="newTableStyle mt10">
							<table class="w100P">
								<thead>
									<tr>
										<th>단종일자</th>
										<th v-if="!roleVal">사용여부</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="goodsEosList.length === 0">
										<td colspan="10">데이터가 없습니다.</td>
									</tr>
									<tr v-else v-for="item in goodsEosList" :key="item.id">
										<td>
											{{ item.eosDate }}
										</td>
										<td v-if="!roleVal">
											<v-btn
												color="primary"
												v-if="!roleVal"
												text
												@click="deleteGoodsEosDate(item)"
												outlined
											>
												삭제
											</v-btn>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</v-card-text>
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
			menu1: false,
			maxEosDate: '',
			eosDate: '',
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
		goodsEosList() {
			return this.$store.state.MobilephoneListModule.goodsEosList;
		},
		roleVal() {
			return this.$store.state.role !== 'A';
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
					await this.getList();
					this.dialog = !this.dialog;
				}
			} catch (e) {
				console.log(e);
			}
		},
		async insertGoodsEosDate() {
			if (!this.eosDate) {
				alert('날짜를 입력해주세요.');
				return;
			}
			let data = {
				eosDate: this.eosDate,
				goodsId: this.infoDialogData.goodsId,
			};
			let result = await this.$store.dispatch(
				'MobilephoneListModule/insertGoodsEosDate',
				data,
			);
			if (result) {
				alert('저장되었습니다.');
				this.eosDate = '';
				await this.getGoodsEosList();
			}
		},
		async getGoodsEosList() {
			let data = {
				goodsId: this.infoDialogData.goodsId,
			};
			await this.$store.dispatch('MobilephoneListModule/getGoodsEosList', data);
			if (this.goodsEosList.length > 0) {
				this.maxEosDate = this.goodsEosList[0].eosDate;
			} else {
				this.maxEosDate = '';
			}
		},
		async deleteGoodsEosDate(item) {
			if (!confirm('삭제하시겠습니까?')) {
				return;
			}
			let data = {
				goodsEosId: item.goodsEosId,
				goodsId: this.infoDialogData.goodsId,
			};
			const result = await this.$store.dispatch(
				'MobilephoneListModule/deleteGoodsEosDate',
				data,
			);
			if (result) {
				alert('삭제되었습니다.');
				await this.getGoodsEosList();
			}
		},
	},
	watch: {
		eosDate: {
			handler: function (newVal) {
				if (newVal) {
					if (newVal <= this.maxEosDate) {
						alert(
							`기존 단종일자 : ${this.maxEosDate} \n기존 단종일자 이후 일자를 선택해주세요`,
						);
						this.eosDate = '';
					}
				}
			},
		},
	},
	async created() {
		await this.getGoodsEosList();
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
