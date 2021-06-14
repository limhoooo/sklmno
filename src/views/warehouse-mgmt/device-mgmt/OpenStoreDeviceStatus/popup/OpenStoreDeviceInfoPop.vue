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
								<p>기기이력 상세조회</p>
							</div>
							<div class="rowHeader mt20">
								<p>보유처 정보</p>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>
										보유처
										<b class="orangefont">Before</b>
									</p>
									<input
										type="text"
										:value="infoDialogData.prevStockName"
										class="cursorDefault"
										readonly
									/>
								</div>
								<div class="rowItem ml10P">
									<p>
										보유처
										<b class="skybluefont">After</b>
									</p>
									<input
										type="text"
										:value="infoDialogData.nextStockName"
										class="cursorDefault"
										readonly
									/>
								</div>
							</div>
							<div class="rowHeader mt30">
								<p>기기 정보</p>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>통신사</p>
									<input
										type="text"
										:value="infoDialogData.telecomName"
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
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										"
										class="cursorDefault"
										readonly
									/>
								</div>
							</div>
							<div class="rowHeader mt30">
								<p>기기 상태 정보</p>
							</div>
							<div class="rowCont">
								<div class="rowItem rowItemText">
									<span>입고상태</span>
									<input
										type="radio"
										id="division01"
										value="NORMAL"
										v-model.trim="infoDialogData.inStockStatus"
										name="inStockStatus"
										disabled
									/>
									<label for="division01">정상</label>
									<input
										type="radio"
										id="division02"
										value="OPEN"
										v-model.trim="infoDialogData.inStockStatus"
										name="inStockStatus"
										disabled
									/>
									<label for="division02">개봉</label>
								</div>
								<div class="rowItem rowItemText ml10P">
									<span>제품상태</span>
									<input
										type="checkbox"
										id="division03"
										:checked="infoDialogData.productFaultyYn === 'Y'"
										name="productFaultyYn"
										disabled
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
										checked=""
										value="T"
										v-model.trim="infoDialogData.extrrStatus"
										name="extrrStatus"
										disabled
									/>
									<label for="division04">상</label>
									<input
										type="radio"
										id="division05"
										value="M"
										v-model.trim="infoDialogData.extrrStatus"
										name="extrrStatus"
										disabled
									/>
									<label for="division05">중</label>
									<input
										type="radio"
										id="division06"
										value="B"
										v-model.trim="infoDialogData.extrrStatus"
										name="extrrStatus"
										disabled
									/>
									<label for="division06">하</label>
									<input
										type="radio"
										id="division07"
										value="F"
										v-model.trim="infoDialogData.extrrStatus"
										name="extrrStatus"
										disabled
									/>
									<label for="division07">파손</label>
									<input
										id="구성품누락"
										class="ml10"
										type="checkbox"
										:checked="infoDialogData.productMissYn === 'Y'"
										name="productMissYn"
										disabled
									/>
									<label for="구성품누락">구성품누락</label>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>누락제품</p>
									<input
										type="text"
										v-model.trim="infoDialogData.missProduct"
										disabled
									/>
								</div>
								<div class="rowItem ml10P">
									<p>차감비</p>
									<input
										type="text"
										v-model.trim="infoDialogData.ddctAmt"
										disabled
									/>
								</div>
							</div>
							<div class="rowCont">
								<div class="rowItem">
									<p>반품비</p>
									<input
										type="text"
										v-model.trim="infoDialogData.returnStockAmt"
										disabled
									/>
								</div>
								<div class="rowItem ml10P rowItemText">
									<p>추가차감금액</p>
									<input
										type="text"
										style="width: 30%"
										v-model.trim="infoDialogData.addDdctAmt"
										disabled
									/>
									<input
										id="composiMissCk1"
										type="checkbox"
										:checked="infoDialogData.ddctReleaseAmtYn === 'Y'"
										disabled
									/>
									<label for="composiMissCk1">출고가 차감</label>
								</div>
							</div>
							<div class="rowHeader mt30">
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
						<!-- 로그인 계정 정보? -->
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

<script lang="ts">
import Vue from 'vue';
import { deviceHistory } from '../../../../../store/interface/warehouse-mgmt/interface';

export default Vue.extend({
	props: {
		infoDialogData: {
			type: Object,
			required: true,
		},
	},
	computed: {
		deviceHistory(): deviceHistory {
			return this.$store.state.OpenStoreDeviceStatusModule.deviceHistory;
		},
		dialog: {
			get(): boolean {
				return this.$store.state.OpenStoreDeviceStatusModule.infoDialog;
			},
			set(newValue: boolean) {
				this.$store.state.OpenStoreDeviceStatusModule.infoDialog = newValue;
			},
		},
	},
	methods: {
		async getRetrieveDeviceHistory() {
			let data = {
				dvcId: this.infoDialogData.dvcId,
			};
			await this.$store.dispatch(
				'OpenStoreDeviceStatusModule/getRetrieveDeviceHistory',
				data,
			);
		},
	},
	created() {
		// @ts-ignore
		this.getRetrieveDeviceHistory();
	},
});
</script>

<style></style>
