<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="700">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">보유처 등록</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<div class="new_popTable1">
							<table class="w100P">
								<tr>
									<td class="w120">상위 보유처</td>
									<td>
										<input
											type="text"
											readonly
											v-if="activeGroupCheck"
											:value="activeGroupData.stockName"
											class="w100P lh30 padW10 borderRadi3Px borderContColor2"
										/>
										<input type="text" readonly v-else :value="storeName" />
									</td>
								</tr>
								<tr>
									<td>보유처</td>
									<td>
										<input
											type="text"
											v-model.trim="formData.stockName"
											placeholder="보유처명을 입력하세요."
											class="w100P lh30 padW10 borderRadi3Px borderContColor2"
										/>
									</td>
								</tr>
								<tr>
									<td>담당자</td>
									<td>
										<input
											type="text"
											v-model.trim="formData.chargerName"
											placeholder="담당자명을 입력하세요."
											class="w100P lh30 padW10 borderRadi3Px borderContColor2"
										/>
									</td>
								</tr>
								<tr>
									<td>담당자 연락처</td>
									<td>
										<input
											type="text"
											placeholder="앞자리"
											v-model.trim="formData.chargerPhone1"
											maxlength="3"
											onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
											class="w100 lh30 padW10 borderRadi3Px borderContColor2"
										/>
										<input
											type="text"
											placeholder="중간자리"
											v-model.trim="formData.chargerPhone2"
											maxlength="4"
											onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
											class="w100 lh30 padW10 borderRadi3Px borderContColor2"
										/>
										<input
											type="text"
											placeholder="뒷자리"
											v-model.trim="formData.chargerPhone3"
											maxlength="4"
											onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
											class="w100 lh30 padW10 borderRadi3Px borderContColor2"
										/>
									</td>
								</tr>
							</table>
						</div>

						<div class="disFx justify-end mt10">
							<v-btn
								text
								class="backColorMint1 mainWhite borderReset w80"
								@click="insertStockFnc"
							>
								등록
							</v-btn>
							<v-btn
								text
								@click="dialog = false"
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
							>
								취소
							</v-btn>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import { nullValidation } from '../../../../common/common';

export default {
	components: {},
	props: [],
	data() {
		return {
			postDialog: false,
			activeGroupCheck: false,
			formData: {
				stockName: '',
				chargerName: '',
				chargerPhone1: '',
				chargerPhone2: '',
				chargerPhone3: '',
				stockType: 'I',
				storeId: '',
			},
		};
	},
	computed: {
		activeGroupData: {
			get() {
				return this.$store.state.HoldStoreMgmtModule.activeGroupData[0];
			},
			set(newValue) {
				// 보유처 등록 후 active 삭제하기위함
				return (this.$store.state.HoldStoreMgmtModule.activeGroupData = newValue);
			},
		},
		storeName() {
			return this.$store.state.HoldStoreMgmtModule.storeName;
		},
		dialog: {
			get() {
				return this.$store.state.HoldStoreMgmtModule.regiDialog;
			},
			set(newValue) {
				this.$store.state.HoldStoreMgmtModule.regiDialog = newValue;
			},
		},
	},
	methods: {
		async insertStockFnc() {
			if (!nullValidation(this.formData, ['storeId'])) {
				return;
			}
			// 그룹 선택안할시 stockType 을 I 로 보냄
			const result = await this.$store.dispatch(
				'HoldStoreMgmtModule/insertStock',
				this.formData,
			);
			if (result) {
				// 리스트 재호출
				const data = this.$store.state.HoldStoreMgmtModule.filterData;
				await this.$store.dispatch('HoldStoreMgmtModule/getStockList', data);
				this.activeGroupData = [];
			}
		},
	},
	created() {
		if (this.activeGroupData) {
			this.activeGroupCheck = true;
			this.formData.chargerName = this.activeGroupData.chargerName;
			this.formData.chargerPhone1 = this.activeGroupData.chargerPhone1;
			this.formData.chargerPhone2 = this.activeGroupData.chargerPhone2;
			this.formData.chargerPhone3 = this.activeGroupData.chargerPhone3;
			this.formData.stockType = this.activeGroupData.stockType;
			this.formData.storeId = this.activeGroupData.storeId;
			this.formData.parentStockId = this.activeGroupData.stockId;
		}
	},
};
</script>

<style scoped>
.infoCont .rowCont {
	display: block;
	text-align: center;
}
.rowItem p {
	display: inline-block;
	width: 100px;
	border-bottom: 1px solid #c8c8c8;
	font-size: 12px;
	color: #7397a4;
	text-align: left;
}
.rowItem input[type='text'] {
	border-bottom: 1px solid #c8c8c8;
	line-height: 30px;
	font-size: 12px;
	width: 460px;
}
.rowItem input[type='text']::placeholder {
	color: #bebebe;
}
.rowItem input[type='text']:focus {
	outline: none;
}
.rowItem button {
	background-color: #003a53;
	padding: 5px 15px;
	color: #fff;
	border-radius: 3px;
	margin-left: 5px;
}
.customSelectBox2 {
	width: 460px;
	box-sizing: border-box;
	margin-top: 10px;
	height: 30px;
	display: inline-block;
	border-bottom: 1px solid #ccc;
	padding-bottom: 1px;
	font-size: 12px;
	color: #bebebe;
}
.customSelectBox2 .font-gray {
	color: #bebebe;
}
</style>
