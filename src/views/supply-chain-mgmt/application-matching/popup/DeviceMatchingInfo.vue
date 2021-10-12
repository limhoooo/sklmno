<template>
	<div class="devicePopCont">
		<h2 class="boldWt mainBlack2">기기 상태 정보</h2>
		<div class="new_popTable1 mt10">
			<table class="w100P">
				<tr>
					<td class="w140">개통점(가입유형)</td>
					<td class="w220">
						<span>{{ applMatchingDetailObj.openStoreName }} </span>
						<span>({{ applMatchingDetailObj.joinTypeMsg }})</span>
						<!--						<input-->
						<!--							class="w90P padW10 borderRadi3Px borderContColor3 lh36"-->
						<!--							type="text"-->
						<!--							:value="applMatchingDetailObj.openStoreName"-->
						<!--							disabled-->
						<!--						/>-->
					</td>
					<td class="w140">영업점</td>
					<td class="w220">
						<span>
							{{ applMatchingDetailObj.saleStoreName }}
						</span>
						<!--						<input-->
						<!--							class="w90P padW10 borderRadi3Px borderContColor3 lh36"-->
						<!--							type="text"-->
						<!--							:value="applMatchingDetailObj.saleStoreName"-->
						<!--							disabled-->
						<!--						/>-->
					</td>
				</tr>
				<tr>
					<td>개통유형</td>
					<td>
						{{ applMatchingDetailObj.beforeOpeningTypeMsg }}
						<!--						<input-->
						<!--							class="w90P padW10 borderRadi3Px borderContColor3 lh36"-->
						<!--							type="text"-->
						<!--							:value="applMatchingDetailObj.beforeOpeningTypeMsg"-->
						<!--							disabled-->
						<!--						/>-->
					</td>
					<td>개통종류</td>
					<td>
						{{ applMatchingDetailObj.applTypeMsg }}
						<!--						<input-->
						<!--							class="w90P padW10 borderRadi3Px borderContColor3 lh36"-->
						<!--							type="text"-->
						<!--							disabled-->
						<!--							:value="applMatchingDetailObj.applTypeMsg"-->
						<!--						/>-->
					</td>
				</tr>
				<tr>
					<template v-if="applMatchingDetailObj.cusType !== 'CORP'">
						<td>고객명</td>
						<td>
							<span>
								{{ applMatchingDetailObj.cusName }}
							</span>
						</td>
					</template>
					<template v-if="applMatchingDetailObj.cusType === 'CORP'">
						<td>법인명</td>
						<td>
							<span>
								{{ applMatchingDetailObj.bizName }}
							</span>
						</td>
					</template>
					<!--						<input-->
					<!--							class="w90P padW10 borderRadi3Px borderContColor3 lh36"-->
					<!--							type="text"-->
					<!--							:value="applMatchingDetailObj.cusName"-->
					<!--							disabled-->
					<!--						/>-->
					<td>전화번호</td>
					<td>
						<span>
							{{
								applMatchingDetailObj.cusPhone1 +
								'-' +
								applMatchingDetailObj.cusPhone2 +
								'-' +
								applMatchingDetailObj.cusPhone3
							}}
						</span>
						<!--						<input-->
						<!--							class="w90P padW10 borderRadi3Px borderContColor3 lh36"-->
						<!--							type="text"-->
						<!--							:value="-->
						<!--								applMatchingDetailObj.cusPhone1 +-->
						<!--								'-' +-->
						<!--								applMatchingDetailObj.cusPhone2 +-->
						<!--								'-' +-->
						<!--								applMatchingDetailObj.cusPhone3-->
						<!--							"-->
						<!--							disabled-->
						<!--						/>-->
					</td>
				</tr>
				<tr>
					<td>주소</td>
					<td>
						<span class="w200" style="word-break: break-all">
							{{
								applMatchingDetailObj.cusAddr +
								applMatchingDetailObj.cusAddrDetail
							}}
						</span>
						<!--						<input-->
						<!--							class="w90P padW10 borderRadi3Px borderContColor3 lh36"-->
						<!--							type="text"-->
						<!--							:value="-->
						<!--								applMatchingDetailObj.cusAddr +-->
						<!--								applMatchingDetailObj.cusAddrDetail-->
						<!--							"-->
						<!--							disabled-->
						<!--						/>-->
					</td>
					<td>개통통신사</td>
					<td>
						<span>
							{{ applMatchingDetailObj.openingTelecomName }}
						</span>
						<!--						<input-->
						<!--							class="w90P padW10 borderRadi3Px borderContColor3 lh36"-->
						<!--							type="text"-->
						<!--							disabled-->
						<!--							:value="applMatchingDetailObj.openingTelecomName"-->
						<!--						/>-->
					</td>
				</tr>
				<tr>
					<td>제조사</td>
					<td>
						<span>
							{{ applMatchingDetailObj.makerName }}
						</span>
						<!--						<input-->
						<!--							class="w90P padW10 borderRadi3Px borderContColor3 lh36"-->
						<!--							type="text"-->
						<!--							disabled-->
						<!--							:value="applMatchingDetailObj.makerName"-->
						<!--						/>-->
					</td>
					<td>기기명/모델명</td>
					<td>
						<span>
							{{ applMatchingDetailObj.goodsName }}
							[ {{ applMatchingDetailObj.modelName }} ]
						</span>
						<!--						<input-->
						<!--							class="w90P padW10 borderRadi3Px borderContColor3 lh36"-->
						<!--							type="text"-->
						<!--							:value="-->
						<!--								applMatchingDetailObj.goodsName +-->
						<!--								' / ' +-->
						<!--								applMatchingDetailObj.modelName-->
						<!--							"-->
						<!--							disabled-->
						<!--						/>-->
					</td>
				</tr>
				<tr>
					<td>용량</td>
					<td>
						<span>
							{{ applMatchingDetailObj.capacity }}
						</span>
						<!--						<input-->
						<!--							class="w90P padW10 borderRadi3Px borderContColor3 lh36"-->
						<!--							type="text"-->
						<!--							:value="applMatchingDetailObj.capacity"-->
						<!--							disabled-->
						<!--						/>-->
					</td>
					<td>색상</td>
					<td>
						<span>
							{{ applMatchingDetailObj.color }}
						</span>
						<!--						<input-->
						<!--							class="w90P padW10 borderRadi3Px borderContColor3 lh36"-->
						<!--							type="text"-->
						<!--							:value="applMatchingDetailObj.color"-->
						<!--							disabled-->
						<!--						/>-->
					</td>
				</tr>
				<tr>
					<td>기기 일련번호</td>
					<td>
						<span>
							{{ applMatchingDetailObj.deviceRawBarcode }}
						</span>
						<!--						<input
							class="w90P padW10 borderRadi3Px borderContColor3 lh36"
							type="text"
							:value="applMatchingDetailObj.deviceRawBarcode"
							disabled
						/>-->
					</td>
					<td>유심 일련번호</td>
					<td>
						<span>
							{{ applMatchingDetailObj.usimRawBarcode }}
						</span>
						<!--						<input
							class="w90P padW10 borderRadi3Px borderContColor3 lh36"
							type="text"
							:value="applMatchingDetailObj.usimRawBarcode"
							disabled
						/>-->
					</td>
				</tr>
				<tr>
					<td>배송구분</td>
					<td>
						<span>
							{{ applMatchingDetailObj.deliveryTypeMsg }}
						</span>
						<!--						<input
							class="w90P padW10 borderRadi3Px borderContColor3 lh36"
							type="text"
							:value="applMatchingDetailObj.deliveryTypeMsg"
							disabled
						/>-->
					</td>
					<td>물류상태</td>
					<td>
						<span>
							{{ applMatchingDetailObj.logisticsTaskStatusMsg }}
						</span>
						<!--						<input
							class="w90P padW10 borderRadi3Px borderContColor3 lh36"
							type="text"
							:value="applMatchingDetailObj.logisticsTaskStatusMsg"
							disabled
						/>-->
					</td>
				</tr>
				<tr
					v-if="
						applMatchingDetailObj.deliveryType === 'PS' ||
						applMatchingDetailObj.deliveryType === 'PS_SALES'
					"
				>
					<td>택배사</td>
					<td>
						<span>
							{{ applMatchingDetailObj.courierName }}
						</span>
						<!--						<input
							class="w90P padW10 borderRadi3Px borderContColor3 lh36"
							:value="applMatchingDetailObj.courierName"
							type="text"
							disabled
						/>-->
					</td>
					<td>송장번호</td>
					<td>
						<span>
							{{ applMatchingDetailObj.invoiceNum }}
						</span>
						<!--						<input
							class="w90P padW10 borderRadi3Px borderContColor3 lh36"
							:value="applMatchingDetailObj.invoiceNum"
							type="text"
							disabled
						/>-->
					</td>
				</tr>
				<tr v-if="applMatchingDetailObj.deliveryType === 'QUICK'">
					<td>퀵전화번호</td>
					<td>
						<span v-if="applMatchingDetailObj.quickPhoneAttribute">
							{{
								applMatchingDetailObj.quickPhoneAttribute.phone1 +
								'-' +
								applMatchingDetailObj.quickPhoneAttribute.phone2 +
								'-' +
								applMatchingDetailObj.quickPhoneAttribute.phone3
							}}
						</span>
						<!--						<input
							v-if="applMatchingDetailObj.quickPhoneAttribute"
							:value="
								applMatchingDetailObj.quickPhoneAttribute.phone1 +
								'-' +
								applMatchingDetailObj.quickPhoneAttribute.phone2 +
								'-' +
								applMatchingDetailObj.quickPhoneAttribute.phone3
							"
							type="text"
							disabled
						/>-->
					</td>
					<td>퀵요금</td>
					<td>
						<span>
							{{ applMatchingDetailObj.quickCharge }}
						</span>
						<!--						<input
							:value="applMatchingDetailObj.quickCharge"
							type="text"
							disabled
						/>-->
					</td>
				</tr>
			</table>
		</div>
		<!--		<div class="rowHeader mt30">
			<p>기기 상태 정보</p>
		</div>
		<div class="rowCont">
			<div class="rowItem rowItemText">
				<span>개통점</span>
				<input
					type="text"
					:value="applMatchingDetailObj.openStoreName"
					disabled
				/>
			</div>
			<div class="rowItem rowItemText ml10P">
				<span>영업점</span>
				<input
					type="text"
					:value="applMatchingDetailObj.saleStoreName"
					disabled
				/>
			</div>
		</div>
		<div class="rowCont">
			<div class="rowItem rowItemText">
				<span>개통유형</span>
				<input
					type="text"
					:value="applMatchingDetailObj.beforeOpeningTypeMsg"
					disabled
				/>
			</div>
			<div class="rowItem rowItemText ml10P">
				<span>개통종류</span>
				<input
					type="text"
					disabled
					:value="applMatchingDetailObj.applTypeMsg"
				/>
			</div>
		</div>
		<div class="rowCont">
			<div class="rowItem rowItemText">
				<span>고객명</span>
				<input type="text" :value="applMatchingDetailObj.cusName" disabled />
			</div>
			<div class="rowItem rowItemText ml10P">
				<span>전화번호</span>
				<input
					type="text"
					:value="
						applMatchingDetailObj.cusPhone1 +
						'-' +
						applMatchingDetailObj.cusPhone2 +
						'-' +
						applMatchingDetailObj.cusPhone3
					"
					disabled
				/>
			</div>
		</div>
		<div class="rowCont">
			<div class="rowItem w100P rowItemText">
				<span>주소</span>
				<input
					type="text"
					:value="
						applMatchingDetailObj.cusAddr + applMatchingDetailObj.cusAddrDetail
					"
					disabled
				/>
			</div>
		</div>
		<div class="rowCont">
			<div class="rowItem rowItemText">
				<span>개통통신사</span>
				<input
					type="text"
					disabled
					:value="applMatchingDetailObj.openingTelecomName"
				/>
			</div>
			<div class="rowItem rowItemText ml10P"></div>
		</div>
		<div class="rowCont">
			<div class="rowItem rowItemText">
				<span>제조사</span>
				<input type="text" disabled :value="applMatchingDetailObj.makerName" />
			</div>
			<div class="rowItem rowItemText ml10P">
				<span>기기명 / 모델명</span>
				<input
					type="text"
					:value="
						applMatchingDetailObj.goodsName +
						' / ' +
						applMatchingDetailObj.modelName
					"
					disabled
				/>
			</div>
		</div>
		<div class="rowCont">
			<div class="rowItem rowItemText">
				<span>용량</span>
				<input type="text" :value="applMatchingDetailObj.capacity" disabled />
			</div>
			<div class="rowItem rowItemText ml10P">
				<span>색상</span>
				<input type="text" :value="applMatchingDetailObj.color" disabled />
			</div>
		</div>
		<div class="rowCont">
			<div class="rowItem rowItemText">
				<span>기기일련번호</span>
				<input
					type="text"
					:value="applMatchingDetailObj.deviceRawBarcode"
					disabled
				/>
			</div>
			<div class="rowItem rowItemText ml10P">
				<span>유심일련번호</span>
				<input
					type="text"
					:value="applMatchingDetailObj.usimRawBarcode"
					disabled
				/>
			</div>
		</div>
		<div class="rowCont">
			<div class="rowItem rowItemText">
				<span>배송구분</span>
				<input
					type="text"
					:value="applMatchingDetailObj.deliveryTypeMsg"
					disabled
				/>
			</div>
			<div class="rowItem rowItemText ml10P">
				<span>물류상태</span>
				<input
					type="text"
					:value="applMatchingDetailObj.logisticsTaskStatusMsg"
					disabled
				/>
			</div>
		</div>
		<div
			v-if="
				applMatchingDetailObj.deliveryType === 'PS' ||
				applMatchingDetailObj.deliveryType === 'PS_SALES'
			"
			class="rowCont"
		>
			<div class="rowItem rowItemText">
				<span>택배사</span>
				<input
					:value="applMatchingDetailObj.courierName"
					type="text"
					disabled
				/>
			</div>
			<div class="rowItem rowItemText ml10P">
				<span>송장번호</span>
				<input :value="applMatchingDetailObj.invoiceNum" type="text" disabled />
			</div>
		</div>
		<div v-if="applMatchingDetailObj.deliveryType === 'QUICK'" class="rowCont">
			<div class="rowItem rowItemText">
				<span>퀵전화번호</span>
				<input
					v-if="applMatchingDetailObj.quickPhoneAttribute"
					:value="
						applMatchingDetailObj.quickPhoneAttribute.phone1 +
						'-' +
						applMatchingDetailObj.quickPhoneAttribute.phone2 +
						'-' +
						applMatchingDetailObj.quickPhoneAttribute.phone3
					"
					type="text"
					disabled
				/>
			</div>
			<div class="rowItem rowItemText ml10P">
				<span>퀵요금</span>
				<input
					:value="applMatchingDetailObj.quickCharge"
					type="text"
					disabled
				/>
			</div>
		</div>-->
	</div>
</template>
<script>
export default {
	props: {
		applMatchingDetailObj: {
			type: Object,
		},
	},
	data: () => ({}),
	computed: {},
	methods: {},
	watch: {},
	async created() {},
};
</script>
