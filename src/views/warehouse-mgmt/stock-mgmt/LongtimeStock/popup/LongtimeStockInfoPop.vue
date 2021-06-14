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
							class="infoCont pdLR30 popUpCustomSt1"
							style="background-color: #fff; padding-top: 20px"
						>
							<div class="titleCont">
								<p>재고 확인 조회</p>
							</div>
							<div class="rowHeader mt20">
								<p>기기정보</p>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>통신사</p>
									<input
										type="text"
										:value="getTelecomName(infoDialogData.telecom)"
										class="cursorDefault"
										readonly
									/>
								</div>
								<div class="rowItem ml10P">
									<p>제조사</p>
									<input
										type="text"
										:value="infoDialogData.makerName"
										class="cursorDefault"
										readonly
									/>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>기기명</p>
									<input
										type="text"
										:value="infoDialogData.goodsName"
										class="cursorDefault"
										readonly
									/>
								</div>
								<div class="rowItem ml10P">
									<p>모델명</p>
									<input
										type="text"
										:value="infoDialogData.modelName"
										class="cursorDefault"
										readonly
									/>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>용량</p>
									<input
										type="text"
										:value="infoDialogData.capacity"
										class="cursorDefault"
										readonly
									/>
								</div>
								<div class="rowItem ml10P">
									<p>색상</p>
									<input
										type="text"
										:value="infoDialogData.colorName"
										class="cursorDefault"
										readonly
									/>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>일련번호</p>
									<input
										type="text"
										:value="infoDialogData.rawBarcode"
										class="cursorDefault"
										readonly
									/>
								</div>
								<div class="rowItem ml10P">
									<p>입고단가</p>
									<input
										type="text"
										:value="
											infoDialogData.inStockAmt
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'
										"
										class="cursorDefault"
										readonly
									/>
								</div>
							</div>
							<div class="rowHeader mt20">
								<p>기기 상태 정보</p>
							</div>
							<div class="rowCont">
								<div class="rowItem rowItemText">
									<span>입고상태</span>
									<input
										type="radio"
										checked
										id="division01"
										value="NORMAL"
										name="inStockState"
										disabled
										:checked="
											infoDialogData.deviceStatusListDto.inStockStatus ===
											'NORMAL'
										"
									/>
									<label for="division01">정상</label>
									<input
										type="radio"
										id="division02"
										value="OPEN"
										name="inStockState"
										disabled
										:checked="
											infoDialogData.deviceStatusListDto.inStockStatus ===
											'OPEN'
										"
									/>
									<label for="division02">개봉</label>
								</div>
								<div class="rowItem rowItemText ml10P">
									<span>제품상태</span>
									<input
										type="checkbox"
										id="division03"
										name="productState"
										disabled
										:checked="
											infoDialogData.deviceStatusListDto.productFaultyYn === 'Y'
										"
									/>
									<label for="division03">불량</label>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem w100P rowItemText">
									<span>외장상태</span>
									<input
										type="radio"
										id="division04"
										checked
										value="T"
										name="outStockState"
										disabled
										:checked="
											infoDialogData.deviceStatusListDto.extrrStatus === 'T'
										"
									/>
									<label for="division04">상</label>
									<input
										type="radio"
										id="division05"
										value="M"
										name="outStockState"
										disabled
										:checked="
											infoDialogData.deviceStatusListDto.extrrStatus === 'M'
										"
									/>
									<label for="division05">중</label>
									<input
										type="radio"
										id="division06"
										value="B"
										name="outStockState"
										disabled
										:checked="
											infoDialogData.deviceStatusListDto.extrrStatus === 'B'
										"
									/>
									<label for="division06">하</label>
									<input
										type="radio"
										id="division16"
										value="F"
										name="outStockState"
										disabled
										:checked="
											infoDialogData.deviceStatusListDto.extrrStatus === 'F'
										"
									/>
									<label for="division16">파손</label>
									<input
										id="composiMissCk"
										type="checkbox"
										disabled
										:checked="
											infoDialogData.deviceStatusListDto.productMissYn === 'Y'
										"
									/>
									<label for="composiMissCk">구성품누락</label>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>누락제품</p>
									<input
										type="text"
										:value="infoDialogData.deviceStatusListDto.missProduct"
										disabled
									/>
								</div>
								<div class="rowItem ml10P">
									<p>차감비</p>
									<input
										type="text"
										:value="infoDialogData.deviceStatusListDto.ddctAmt"
										disabled
									/>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>반품비</p>
									<input
										type="text"
										:value="infoDialogData.returnStockAmt"
										disabled
									/>
								</div>
								<div class="rowItem ml10P rowItemText">
									<p>추가차감금액</p>
									<input
										type="text"
										style="width: 30%"
										:value="infoDialogData.deviceStatusListDto.addDdctAmt"
										disabled
									/>
									<input
										id="composiMissCk1"
										type="checkbox"
										:checked="
											infoDialogData.deviceStatusListDto.ddctReleaseAmtYn ===
											'Y'
										"
										disabled
									/>
									<label for="composiMissCk1">출고가 차감</label>
								</div>
							</div>
							<div class="rowHeader mt20">
								<p>이력조회</p>
							</div>
							<div class="rowItem w100P">
								<p
									style="width: 100%; border-bottom: 1px solid #ddd"
									v-for="item in deviceHistory"
									:key="item.id"
								>
									<span style="font-size: 15px" class="mr5">{{
										item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss')
									}}</span>
									<span>{{ item.storeName }}</span> |
									<span class="mr5">{{ item.regiUserName }}</span>
									<span class="historyNoti">
										{{ item.stockTypeMsg }}
									</span>
									<br /><span style="color: #333" class="countingCutsom">
										{{ item.memo }}
									</span>
								</p>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<div class="memberCont"></div>
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							<v-btn
								text
								@click="dialog = false"
								style="background-color: #bdbdbd"
							>
								닫기
							</v-btn>
						</div>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import { getTelecomName } from '../../../../../common/common';

export default {
	props: ['infoDialogData'],
	data: () => ({
		formData: {},
	}),
	computed: {
		deviceHistory() {
			return this.$store.state.LongtimeStockModule.deviceHistory;
		},
		dialog: {
			get() {
				return this.$store.state.LongtimeStockModule.infoDialog;
			},
			set(newValue) {
				this.$store.state.LongtimeStockModule.infoDialog = newValue;
			},
		},
	},
	methods: {
		getTelecomName(data) {
			return getTelecomName(data);
		},
		async getRetrieveDeviceHistory() {
			let data = {
				dvcId: this.infoDialogData.dvcId,
			};
			await this.$store.dispatch(
				'LongtimeStockModule/getRetrieveDeviceHistory',
				data,
			);
		},
	},
	created() {
		this.getRetrieveDeviceHistory();
	},
};
</script>

<style scoped>
.rowItemText span {
	font-size: 12px;
	color: #7397a4;
	margin-right: 10px;
}
.rowItemText label {
	font-size: 12px;
	color: #7397a4;
	margin-left: 3px;
	margin-right: 5px;
}
</style>
