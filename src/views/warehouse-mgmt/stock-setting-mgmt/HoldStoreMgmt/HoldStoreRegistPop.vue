<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="700"
				style="border-radius: 0 !important"
			>
				<v-card style="background-color: #f2f2f2; border-radius: 0 !important">
					<v-card-text>
						<div
							class="infoCont"
							style="background-color: #fff; padding-top: 20px"
						>
							<div class="titleCont">
								<p>보유처 등록</p>
							</div>
							<div class="rowCont" style="margin-top: 15px">
								<div class="rowItem">
									<p>상위 보유처</p>
									<input
										type="text"
										readonly
										v-if="activeGroupCheck"
										:value="activeGroupData.stockName"
									/>
									<input type="text" readonly v-else :value="storeName" />
								</div>
							</div>
							<div class="rowCont" style="margin-top: 15px">
								<div class="rowItem">
									<p>보유처</p>
									<input
										type="text"
										v-model.trim="formData.stockName"
										placeholder="보유처명을 입력하세요."
									/>
								</div>
							</div>
							<!--							<div class="rowCont" style="margin-top: 15px">-->
							<!--								<div class="rowItem">-->
							<!--									<p>보유처 정렬</p>-->
							<!--									<input type="text" placeholder="보유처 정렬을 입력하세요." />-->
							<!--								</div>-->
							<!--							</div>-->
							<div class="rowCont" style="margin-top: 15px">
								<div class="rowItem">
									<p>담당자</p>
									<input
										type="text"
										v-model.trim="formData.chargerName"
										placeholder="담당자명을 입력하세요."
									/>
								</div>
							</div>
							<div class="rowCont" style="margin-top: 15px">
								<div class="rowItem">
									<p>담당자 연락처</p>
									<div
										style="
											width: 460px;
											display: inline-block;
											border-bottom: 1px solid #c8c8c8;
											text-align: left;
										"
									>
										<input
											type="text"
											placeholder="앞자리"
											v-model.trim="formData.chargerPhone1"
											maxlength="3"
											onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
											style="width: 38px; border-bottom: none"
										/>
										<span
											style="
												color: #c8c8c8;
												display: inline-block;
												margin: 0 3px;
											"
											>-</span
										>
										<input
											type="text"
											placeholder="중간자리"
											v-model.trim="formData.chargerPhone2"
											maxlength="4"
											onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
											style="
												width: 50px;
												border-bottom: none;
												text-align: center;
											"
										/>
										<span
											style="
												color: #c8c8c8;
												display: inline-block;
												margin: 0 3px;
											"
											>-</span
										>
										<input
											type="text"
											placeholder="뒷자리"
											v-model.trim="formData.chargerPhone3"
											maxlength="4"
											onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
											style="
												width: 50px;
												border-bottom: none;
												text-align: center;
											"
										/>
									</div>
								</div>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							<v-btn
								text
								style="background-color: #17a5ae"
								@click="insertStockFnc"
							>
								등록
							</v-btn>
							<v-btn
								text
								@click="dialog = false"
								style="background-color: #bdbdbd"
							>
								취소
							</v-btn>
						</div>
					</v-card-actions>
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
