<template>
	<div class="titleDatePikcer">
		<h2>가입정보</h2>

		<div class="new_popTable1 mt20">
			<table class="w100P">
				<tr v-if="AppFormCreFlag !== undefined">
					<td class="w140">개통일자</td>
					<td class="w240 datePickerStyle1 clearBtn">
						<div class="posR w220">
							<v-menu
								v-model.trim="menu1"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
								:attach="true"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										class="w220"
										style="font-size: 12px"
										outlined
										readonly
										v-bind="attrs"
										v-on="on"
										append-icon="mdi-calendar"
										v-model.trim="basicData.openingDate"
										:disabled="
											!basicData.openingDate || storeVal === 'StoreGrade_S'
										"
									></v-text-field>
								</template>
								<v-date-picker
									@input="menu1 = false"
									locale="ko-KR"
									v-model.trim="basicData.openingDate"
								></v-date-picker>
							</v-menu>
							<!--            <button-->
							<!--                v-if="basicData.openingDate"-->
							<!--                class="resetBtn"-->
							<!--                :disabled="!basicData.openingDate"-->
							<!--                @click="resetDate('openingDate')"-->
							<!--            >-->
							<!--              x-->
							<!--            </button>-->
						</div>
					</td>
					<td class="w140">철회일자</td>
					<td class="datePickerStyle1 w240 clearBtn" colspan="3">
						<div class="posR w220">
							<v-menu
								v-model.trim="menu2"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
								:attach="true"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										style="font-size: 12px"
										outlined
										readonly
										v-bind="attrs"
										v-on="on"
										append-icon="mdi-calendar"
										:disabled="
											!basicData.cancelDate || storeVal === 'StoreGrade_S'
										"
										v-model.trim="basicData.cancelDate"
										class="w220"
									></v-text-field>
								</template>
								<v-date-picker
									@input="menu2 = false"
									locale="ko-KR"
									v-model.trim="basicData.cancelDate"
								></v-date-picker>
							</v-menu>
							<!--            <button-->
							<!--                v-if="basicData.cancelDate"-->
							<!--                class="resetBtn"-->
							<!--                :disabled="!basicData.cancelDate"-->
							<!--                @click="resetDate('cancelDate')"-->
							<!--            >-->
							<!--              x-->
							<!--            </button>-->
						</div>
					</td>
				</tr>
				<tr>
					<td>개통유형<span class="redfont">*</span></td>
					<td>
						<div class="disFx">
							<div class="radioStyle ml20 h36 lh36">
								<input
									type="radio"
									id="radio111"
									name="radioS24"
									value="BEFORE_OPENING"
									v-model.trim="basicData.beforeOpeningType"
								/><label class="ml-1" for="radio111">선개통</label>
							</div>
							<div class="radioStyle ml30 h36 lh36">
								<input
									type="radio"
									id="radio122"
									name="radioS24"
									value="AFTER_OPENING"
									class="ml10"
									v-model.trim="basicData.beforeOpeningType"
								/><label class="ml-1" for="radio122">후개통</label>
							</div>
						</div>
					</td>
					<td>개통종류<span class="redfont">*</span></td>
					<td colspan="3">
						<div class="disFx">
							<div class="radioStyle ml20 h36 lh36">
								<input
									type="radio"
									id="radio112"
									name="radio25"
									value="DVC_USIM"
									:checked="basicData.applType === 'DVC_USIM'"
									@click="applTypeFnc($event, 'DVC_USIM')"
								/><label class="ml-1" for="radio112">기기+유심</label>
							</div>
							<div class="radioStyle ml30 h36 lh36">
								<input
									type="radio"
									id="radio124"
									name="radio25"
									value="DVC"
									class="ml10"
									:checked="basicData.applType === 'DVC'"
									@click="applTypeFnc($event, 'DVC')"
								/><label class="ml-1" for="radio124">기기</label>
							</div>
							<div class="radioStyle ml30 h36 lh36">
								<input
									type="radio"
									id="radio125"
									name="radio25"
									value="USIM"
									class="ml10"
									:checked="basicData.applType === 'USIM'"
									@click="applTypeFnc($event, 'USIM')"
								/><label class="ml-1" for="radio125">유심</label>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						개통 휴대폰번호<span
							class="redfont"
							v-if="joinData.joinType !== 'NEW'"
							>*</span
						>
					</td>
					<td colspan="3">
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10 floatL"
							type="text"
							@input="
								phoneNumSplitFnc(
									$event.target.value,
									'openingPhone',
									'joinData',
								)
							"
							v-model="joinData.openingPhone"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						/>
						<div class="checkStyleCont4 ml40 floatL lh36">
							<input
								class="checkStyle"
								type="checkbox"
								id="check3"
								v-model.trim="phoneNumDialog"
								@change="phoneNumFnc"
							/>
							<label class="ml-1" for="check3">기존과 동일</label>
						</div>
					</td>
					<td class="w140" v-if="joinData.joinType === 'NEW'">
						개통 희망번호<span class="redfont">*</span>
					</td>
					<td class="w240" v-if="joinData.joinType === 'NEW'">
						<input
							type="text"
							maxlength="3"
							disabled
							class="disabledNum borderRadi3Px borderContColor2 w60 h36 padW10 floatL"
						/>
						<span class="floatL lh36">-</span>
						<input
							type="text"
							maxlength="4"
							disabled
							class="disabledNum borderRadi3Px borderContColor2 w60 h36 padW10 floatL"
						/>
						<span class="floatL lh36">-</span>
						<input
							class="borderRadi3Px borderContColor2 w60 h36 padW10 floatL"
							type="text"
							v-model.trim="joinData.openingHopeNum"
							maxlength="4"
							oninput=""
						/>
					</td>
				</tr>
				<tr>
					<td class="w140">개통 통신사<span class="redfont">*</span></td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10 disGray"
							type="text"
							v-model.trim="joinData.openingTelecomName"
							readonly
							disabled
						/>
					</td>
					<td>기존 통신사<span class="redfont">*</span></td>
					<td colspan="3">
						<div class="disFx">
							<div class="disFX">
								<div
									class="radioStylePop ml30 lh36"
									v-for="(item, index) in existTelecomItems"
									:key="index"
								>
									<input
										type="radio"
										:id="`exist${item.orderNum}`"
										:name="item.codeId"
										:value="item.codeSeq"
										v-model.trim="joinData.existTelecomCodeId"
										@change="exTelFnc"
									/>
									<label class="ml-1" :for="`exist${item.orderNum}`">{{
										item.codeNm
									}}</label>
								</div>
							</div>
							<div class="w220 ml30">
								<select
									class="borderRadi3Px borderContColor2 w220 h36 padW10 disabled"
									v-model.trim="thriftyPhone"
									:disabled="
										joinData.existTelecomCodeId === 42 ||
										joinData.existTelecomCodeId === 43 ||
										joinData.existTelecomCodeId === 44 ||
										joinData.existTelecomCodeId === 45
									"
								>
									<option value="0" disabled>종류를 선택해주세요.</option>
									<option
										v-for="(item, index) in thriftyPhoneItems"
										:key="index"
										:value="item.codeSeq"
									>
										{{ item.codeNm }}
									</option>
								</select>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>가입유형<span class="redfont">*</span></td>
					<td>
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.trim="joinData.joinType"
							@change="resetJoinTypeFnc"
						>
							<option
								v-for="(item, index) in joinTypeItems"
								:key="index"
								:value="item.value"
								v-if="
									joinData.joinType === item.value ||
									(joinData.joinType === 'DVC_CHANGE' &&
										item.value === 'TRADE_NEW') ||
									(joinData.joinType === 'TRADE_NEW' &&
										item.value === 'DVC_CHANGE')
								"
							>
								{{ item.name }}
							</option>
						</select>
					</td>
					<template v-if="joinData.joinType === 'NUM_CHANGE'">
						<td>인증방식<span class="redfont">*</span></td>
						<td>
							<select
								class="borderRadi3Px borderContColor2 w220 h36 padW10"
								@change="numChangeAuthTypeFnc"
								v-model.trim="joinData.numChangeAuthType"
							>
								<option disabled>인증방식을 선택해주세요.</option>
								<option
									v-for="(item, index) in numChangeAuthTypeItems"
									:key="index"
									:value="item.value"
								>
									{{ item.name }}
								</option>
							</select>
						</td>
						<template v-if="joinData.numChangeAuthType !== 'GIRO'">
							<td class="w140">인증번호<span class="redfont">*</span></td>
							<td class="w240">
								<input
									class="borderRadi3Px borderContColor2 w220 h36 padW10"
									type="text"
									v-model.trim="joinData.numChangeAuthTypeNum"
									maxlength="10"
								/>
							</td>
						</template>
					</template>
				</tr>
				<tr>
					<td class="w140">기기명<span class="redfont">*</span></td>
					<td class="w240">
						<div class="datePickerStyle1 w210">
							<v-autocomplete
								style="font-size: 12px"
								:items="goodsItems"
								item-text="goodsName"
								item-value="goodsId"
								v-model.trim="joinData.goodsId"
								outlined
								@change="deviceData"
								@click="alertFnc"
								:attach="true"
								placeholder="검색해주세요."
							></v-autocomplete>
						</div>
					</td>
					<td class="w140">
						용량<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td class="w240">
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.trim="joinData.capacity"
							@change="getColorListFnc"
						>
							<option disabled>용량을 선택해주세요.</option>
							<!--						<option value=''>선택해주세요.</option>-->
							<option
								v-for="(item, index) in capacityItems"
								:key="index"
								:value="item.capacity"
							>
								{{ item.capacity }}
							</option>
						</select>
					</td>
					<td class="w140">
						색상<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td class="w240">
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.trim="joinData.color"
						>
							<option disabled>색상을 선택해주세요.</option>
							<!--						<option disabled>을 선택해주세요.</option>-->
							<option
								v-for="(item, index) in colorItems"
								:key="index"
								:value="item.colorName"
							>
								{{ item.colorName }}
							</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>기기일련번호</td>
					<td>
						<matchingInput
							:formData="formData"
							:propsDeviceType="'DVC'"
							:AppFormCreFlag="AppFormCreFlagChk"
							:componentType="'SELL'"
							@deviceChange="deviceChangeFnc"
						></matchingInput>
					</td>
					<td>유심<span class="redfont">*</span></td>
					<td>
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.number="joinData.usimPaymentType"
						>
							<option disabled>유심을 선택해주세요.</option>
							<!--						<option disabled>을 선택해주세요.</option>-->
							<option
								v-for="(item, index) in usimPaymentTypeItems"
								:key="index"
								:value="item.value"
								v-if="
									item.value !== 'EXIST_USIM' || basicData.applType === 'DVC'
								"
							>
								{{ item.name }}
							</option>
						</select>
					</td>
					<td>유심종류</td>
					<td>
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.number="joinData.usimType"
						>
							<!--							<option :value="null">해당없음</option>-->
							<option value="NANO_USIM">나노</option>
							<option value="MICRO_USIM">마이크로</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>유심일련번호</td>
					<td colspan="5">
						<matchingInput
							:formData="formData"
							:propsDeviceType="'USIM'"
							:AppFormCreFlag="AppFormCreFlagChk"
							:componentType="'SELL'"
							@usimChange="usimChangeFnc"
						></matchingInput>
					</td>
				</tr>
				<tr>
					<td>약정유형<span class="redfont">*</span></td>
					<td>
						<div class="disFx">
							<div class="radioStylePop ml30 lh36">
								<input
									type="radio"
									id="radio9"
									name="radioS3"
									value="CHOICE_AGRMN"
									v-model.number="joinData.agreementType"
									@input="agreementPeriodTypeFnc"
								/>
								<label class="ml-1" for="radio9">선택약정</label>
							</div>
							<div class="radioStylePop ml30 lh36">
								<input
									type="radio"
									id="radio10"
									name="radioS3"
									class="ml10"
									value="PUBNOTI_SUPAMT"
									v-model.number="joinData.agreementType"
									@input="agreementPeriodTypeFnc"
								/>
								<label class="ml-1" for="radio10">공시지원금</label>
							</div>
						</div>
					</td>
					<td>할부기간<span class="redfont">*</span></td>
					<td>
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.number="joinData.instlPeriodType"
							@change="monthDvcAmtFnc"
						>
							<option disabled>할부기간을 선택해주세요.</option>
							<option
								v-for="(item, index) in installmentsPeriodTypeItems"
								:key="index"
								:value="item.value"
							>
								{{ item.name }}
							</option>
						</select>
					</td>
					<td>약정기간<span class="redfont">*</span></td>
					<td>
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.number="joinData.agreementPeriodType"
						>
							<option disabled>약정기간을 선택해주세요.</option>
							<option
								v-for="(item, index) in agreementPeriodTypeItems"
								:key="index"
								:value="item.value"
							>
								{{ item.name }}
							</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>요금제<span class="redfont">*</span></td>
					<td colspan="5">
						<div class="datePickerStyle1" @click="chargeIdFnc">
							<v-autocomplete
								style="font-size: 12px"
								:disabled="this.joinData.instlPeriodType === ''"
								:items="telecomChargeItems"
								item-text="chargeName"
								item-value="chargeId"
								v-model.trim="joinData.chargeId"
								outlined
								@change="telecomChargeItemsData"
								:attach="true"
								placeholder="검색해주세요."
								class="w420"
							></v-autocomplete>
						</div>
					</td>
				</tr>
				<tr>
					<td>부가서비스</td>
					<td colspan="5">
						<add-service
							class="posR"
							:data="{
								name: 'addServiceList',
								value: joinData.addServiceList,
							}"
							:telecomId="this.joinData.openingTelecomCodeId"
							:optionList="telecomAddServiceItems"
							width="220"
							:addServiceData="this.joinData.addServiceList"
							@setNewAddSvcList="setNewAddSvcList"
							@minusAddSvcList="minusAddSvcList"
						></add-service>
					</td>
				</tr>
				<tr>
					<td>
						출고가<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<div class="costStyle1">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10"
								@input="actualSellAmtFnc"
								type="text"
								v-model.number="joinData.releaseAmt"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span>원</span>
						</div>
					</td>
					<td class="w130">공시지원금</td>
					<td class="w240">
						<div class="costStyle1">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10"
								@input="actualSellAmtFnc"
								type="text"
								v-model.number="joinData.pubNotiSupportAmt"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span>원</span>
						</div>
					</td>
					<td class="w130">추가지원금</td>
					<td class="w240">
						<div class="costStyle1">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10"
								type="text"
								v-model.number="joinData.extraSupportAmt"
								@input="actualSellAmtFnc"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span>원</span>
						</div>
					</td>
				</tr>
				<tr>
					<td>프리할부/선수납</td>
					<td>
						<div class="costStyle1">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10 disGray"
								type="text"
								v-model.number="joinData.freeInstlAmt"
								:disabled="joinData.instlPeriodType === 'CASH'"
								@input="actualSellAmtFnc"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span>원</span>
						</div>
					</td>
					<td>기타할인금</td>
					<td>
						<div class="costStyle1">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10 disGray"
								type="text"
								v-model.number="joinData.etcDiscountAmt"
								@input="actualSellAmtFnc"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span>원</span>
						</div>
					</td>
					<td>실판매가</td>
					<td>
						<div class="costStyle1">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10 disGray"
								type="text"
								v-model.number="joinData.actualSellAmt"
								@input="monthDvcAmtFnc"
								disabled
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span>원</span>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						월기기금액
						<!--						<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>-->
					</td>
					<td class="padB20">
						<div class="costStyle1">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10 disGray"
								type="text"
								v-model.number="joinData.monthDvcAmt"
								disabled
							/>
							<span>원</span>
							<h4 class="font-red posA" v-if="this.textDialog" style="right: 0">
								* ({{ joinData.actualSellAmt }} +
								{{ joinData.monthDvcAmt * instData - joinData.actualSellAmt }})
								/ {{ instData }}개월
							</h4>
						</div>
					</td>
					<td>
						월기본료
						<!--						<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>-->
					</td>
					<td class="padB20">
						<div class="costStyle1">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10 disGray"
								type="text"
								disabled
								v-model.number="joinData.monthBasicAmt"
							/>
							<span>원</span>
						</div>
					</td>
					<td>
						월납부금액
						<!--						<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>-->
					</td>
					<td>
						<div class="costStyle1">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10 disGray"
								type="text"
								disabled
								v-model.number="joinData.monthPaymentAmt"
							/>
							<span>원</span>
							<h4 class="redfont floatR">* VAT 및 할부이자 포함</h4>
						</div>
					</td>
				</tr>
				<tr>
					<td>입금받을 금액</td>
					<td>
						<div class="costStyle1">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10"
								type="text"
								v-model.number="joinData.depositAmt"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span>원</span>
						</div>
					</td>
					<td>입금여부</td>
					<td colspan="3">
						<div class="disFx">
							<div></div>
							<div class="radioStylePop ml20 lh36">
								<input
									type="radio"
									id="radio11"
									name="radioS4"
									value="Y"
									v-model.trim="joinData.depositYn"
								/><label class="ml-1" for="radio11">예</label>
							</div>
							<div class="radioStylePop ml40 lh36">
								<input
									type="radio"
									id="radio12"
									name="radioS4"
									value="N"
									clas1s="ml10"
									v-model.trim="joinData.depositYn"
								/><label class="ml-1" for="radio12">아니오</label>
							</div>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  appCommonFormData,
  basicFormData,
  customerFormData,
  deliveryFormData,
  joinFormData,
  paymentFormData,
} from '../../../../store/interface/supply-chain-mgmt/application-form-creation/AppFormCreationInterface';
import addService from '../../../../components/addService.vue';
import deviceEnumMixin from '../../../../common/deviceEnumMixin.js';
import numberSplit from '../../../../common/numberSplit';
import matchingInput from '../../../../components/matchingInput.vue';

interface dataType {
	phoneNumDialog: boolean;
	Interest: number;
	menu1: boolean;
	menu2: boolean;
	instData: number;
	textDialog: boolean;
}

export default Vue.extend({
	name: 'JoinInformation',
	mixins: [deviceEnumMixin, numberSplit],
	components: { addService, matchingInput },
	data: (): dataType => ({
		phoneNumDialog: false,
		Interest: 0.059, //이자 - 이자 변경시 이거 수정하면됩니다.
		menu1: false,
		menu2: false,
		instData: 0,
		textDialog: false,
	}),
	computed: {
		AppFlag: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.AppFlag;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.AppFlag = newValue;
			},
		},
		storeVal(): string {
			return this.$store.state.sg;
		},
		AppFormCreFlag(): string {
			return this.$store.state.ApplicationFormCreationModule.AppFormCreFlag;
		},
		deviceChange: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.deviceChange;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.deviceChange = newValue;
			},
		},
		usimChange: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.usimChange;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.usimChange = newValue;
			},
		},
		AppFormCreFlagChk(): boolean {
			return !!this.AppFormCreFlag;
		},
		addServiceFormData: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule
					.addServiceFormData;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.addServiceFormData = newValue;
			},
		},
		sct(): string {
			return this.$store.state.sct;
		},
		joinData: {
			get(): joinFormData {
				return this.$store.state.ApplicationFormCreationModule.formData.join;
			},
			set(newValue: joinFormData) {
				this.$store.state.ApplicationFormCreationModule.formData.join = newValue;
			},
		},
		basicData: {
			get(): basicFormData {
				return this.$store.state.ApplicationFormCreationModule.formData.basic;
			},
			set(newValue: basicFormData) {
				this.$store.state.ApplicationFormCreationModule.formData.basic = newValue;
			},
		},
		thriftyPhone: {
			get(): number {
				return this.$store.state.ApplicationFormCreationModule.thriftyPhone;
			},
			set(newValue: number) {
				this.$store.state.ApplicationFormCreationModule.thriftyPhone = newValue;
			},
		},
		customerData: {
			get(): customerFormData {
				return this.$store.state.ApplicationFormCreationModule.formData
					.customer;
			},
			set(newValue: customerFormData) {
				this.$store.state.ApplicationFormCreationModule.formData.customer = newValue;
			},
		},
		deliveryData: {
			get(): deliveryFormData {
				return this.$store.state.ApplicationFormCreationModule.formData
					.delivery;
			},
			set(newValue: deliveryFormData) {
				this.$store.state.ApplicationFormCreationModule.formData.delivery = newValue;
			},
		},
		paymentCheckType: {
			get(): boolean {
				return this.$store.state.ApplicationFormCreationModule.paymentCheckType;
			},
			set(newValue: boolean) {
				this.$store.state.ApplicationFormCreationModule.paymentCheckType = newValue;
			},
		},
		openingStoreData(): number {
			return this.$store.state.ApplicationFormCreationModule.formData.basic
				.openingStoreId;
		},
		callingPlanItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.callingPlanItems;
		},
		deviceItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.deviceItems;
		},
		joinTypeItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.joinTypeItems;
		},
		numChangeAuthTypeItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.numChangeAuthTypeItems;
		},
		usimPaymentTypeItems(): Array<Object> {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.usimPaymentTypeItems;
		},
		agreementPeriodTypeItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.agreementPeriodTypeItems;
		},
		installmentsPeriodTypeItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.installmentsPeriodTypeItems;
		},
		formData: {
			get(): appCommonFormData {
				return this.$store.state.ApplicationFormCreationModule.formData;
			},
			set(newValue: appCommonFormData) {
				this.$store.state.ApplicationFormCreationModule.formData = newValue;
			},
		},
		paymentData: {
			get(): paymentFormData {
				return this.$store.state.ApplicationFormCreationModule.formData.payment;
			},
			set(newValue: paymentFormData) {
				this.$store.state.ApplicationFormCreationModule.formData.payment = newValue;
			},
		},
		goodsItems: {
			get(): Object {
				return this.$store.state.ApplicationFormCreationModule.codeList
					.goodsItems;
			},
			set(newValue: Object) {
				this.$store.state.ApplicationFormCreationModule.codeList.goodsItems = newValue;
			},
		},
		capacityItems: {
			get(): Object {
				return this.$store.state.ApplicationFormCreationModule.codeList
					.capacityItems;
			},
			set(newValue: Object) {
				this.$store.state.ApplicationFormCreationModule.codeList.capacityItems = newValue;
			},
		},
		colorItems: {
			get(): Object {
				return this.$store.state.ApplicationFormCreationModule.codeList
					.colorItems;
			},
			set(newValue: Object) {
				this.$store.state.ApplicationFormCreationModule.codeList.colorItems = newValue;
			},
		},
		telecomAddServiceItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.telecomAddServiceItems;
		},
		telecomChargeItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.telecomChargeItems;
		},
		existTelecomItems: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.codeList
					.existTelecomItems;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.codeList.existTelecomItems = newValue;
			},
		},
		thriftyPhoneItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.thriftyPhoneItems;
		},
	},
	methods: {
		clearFnc() {
			this.basicData.openingDate = '';
		},
		openingPhoneNumFnc(value: string) {
			this.joinData.openingPhone1 = value.substring(0, 3);
			this.joinData.openingPhone2 = value.substring(3, 7);
			this.joinData.openingPhone3 = value.substring(7, 11);
		},
		resetDate(data: string) {
			if (data === 'openingDate') {
				this.basicData.openingDate = '';
			}
			if (data === 'cancelDate') {
				this.basicData.cancelDate = '';
			}
		},
		numChangeAuthTypeFnc() {
			if (this.joinData.numChangeAuthType === 'GIRO') {
				this.joinData.numChangeAuthTypeNum = null;
			}
			this.joinData.numChangeAuthTypeNum = null;
		},
		chargeIdFnc() {
			if (this.joinData.goodsId === null) {
				alert('기기를 검색해주세요.');
				return;
			}
			if (this.joinData.instlPeriodType === '') {
				alert('할부기간을 선택해주세요.');
				return;
			}
		},
		exTelFnc() {
			if (this.joinData.joinType === 'NEW') {
				this.joinData.openingHopeNum = '';
			}
			let exTel = this.joinData.existTelecomCodeId;
			if (exTel === 42 || exTel === 43 || exTel === 44 || exTel === 45) {
				this.thriftyPhone = 0;
			}
			if (
				(this.joinData.openingTelecomName === 'SKT' && exTel === 42) ||
				(this.joinData.openingTelecomName === 'KT' && exTel === 43) ||
				(this.joinData.openingTelecomName === 'LGU' && exTel === 44)
			) {
				this.joinData.joinType = 'DVC_CHANGE';
			} else if (exTel === 45) {
				this.joinData.joinType = 'NEW';
				this.paymentCheckType = false;
				this.paymentData.paymentType = 'ACC_TRNS';
			} else {
				this.joinData.joinType = 'NUM_CHANGE';
				this.paymentCheckType = false;
				this.paymentData.paymentType = 'ACC_TRNS';
			}
			this.joinData.numChangeAuthType = null;
			this.joinData.numChangeAuthTypeNum = null;
		},
		async agreementPeriodTypeFnc() {
			if (this.joinData.agreementType !== 'CHOICE_AGRMN') {
				this.joinData.pubNotiSupportAmt = 0;
			}
			if (this.joinData.goodsId === null || this.joinData.chargeId === null) {
				return;
			}
			let data = {
				chargeId: this.joinData.chargeId,
				goodsId: this.joinData.goodsId,
			};
			await this.getPubNotiInfo(data);
			await this.actualSellAmtFnc();
		},
		async telecomChargeItemsData(value: number) {
			this.joinData.releaseAmt = 0;
			this.joinData.releaseAmtDate = null;
			this.joinData.pubNotiSupportAmt = 0;
			this.joinData.monthBasicAmt = 0;
			this.joinData.chargeId = value;
			let data = {
				chargeId: this.joinData.chargeId,
				goodsId: this.joinData.goodsId,
			};
			await this.getPubNotiInfo(data);
			await this.actualSellAmtFnc();
			await this.monthDvcAmtFnc();
			await this.monthPaymentAmtFnc();
		},
		phoneNumFnc() {
			// @ts-ignore
			if (this.phoneNumDialog && this.customerData.cusPhone) {
				// @ts-ignore
				this.joinData.openingPhone = this.customerData.cusPhone;
				this.joinData.openingPhone1 = this.customerData.cusPhone1;
				this.joinData.openingPhone2 = this.customerData.cusPhone2;
				this.joinData.openingPhone3 = this.customerData.cusPhone3;
			} else {
				// @ts-ignore
				this.joinData.openingPhone = '';
				this.joinData.openingPhone1 = '';
				this.joinData.openingPhone2 = '';
				this.joinData.openingPhone3 = '';
			}
		},
		alertFnc() {
			if (this.openingStoreData === 0) {
				return alert('영업점 및 개통점을 선택해주세요.');
			}
		},
		resetJoinTypeFnc() {
			this.joinData.numChangeAuthType = null; // 인증방식
			this.joinData.numChangeAuthTypeNum = null; // 인증번호
		},
		async getPubNotiInfo(data: any) {
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getPubNotiInfo',
				data,
			);
		},
		// 실판매가 공식 = 출고가 - 공시지원금 - 추가지원금 - 프리할부/선수납 - 기타할부금
		actualSellAmtFnc() {
			this.joinData.actualSellAmt =
				this.joinData.releaseAmt -
				this.joinData.pubNotiSupportAmt -
				this.joinData.extraSupportAmt -
				this.joinData.freeInstlAmt -
				Number(this.joinData.etcDiscountAmt);
			this.monthDvcAmtFnc();
		},
		// 월기기금액 공식 = (실판매가*(이자/12)*(1+(이자/12))^이자)/((1+(이자/12))^할부기간-1)
		monthDvcAmtFnc() {
			if (this.joinData.instlPeriodType === 'CASH') {
				this.joinData.freeInstlAmt = 0;
			}
			this.textDialog = true;
			let join = this.joinData;
			let Int12 = this.Interest / 12;
			let insP = this.joinData.instlPeriodType;
			if (insP === 'CASH') {
				join.monthDvcAmt = 0;
				this.instData = 0;
				this.textDialog = false;
			}
			if (insP !== 'CASH') {
				if (this.joinData.instlPeriodType === 'MONTH_6') insP = 6;
				if (this.joinData.instlPeriodType === 'MONTH_12') insP = 12;
				if (this.joinData.instlPeriodType === 'MONTH_24') insP = 24;
				if (this.joinData.instlPeriodType === 'MONTH_30') insP = 30;
				if (this.joinData.instlPeriodType === 'MONTH_36') insP = 36;
				if (this.joinData.instlPeriodType === 'MONTH_48') insP = 48;
				if (this.joinData.instlPeriodType === 'MONTH_6') this.instData = 6;
				if (this.joinData.instlPeriodType === 'MONTH_12') this.instData = 12;
				if (this.joinData.instlPeriodType === 'MONTH_24') this.instData = 24;
				if (this.joinData.instlPeriodType === 'MONTH_30') this.instData = 30;
				if (this.joinData.instlPeriodType === 'MONTH_36') this.instData = 36;
				if (this.joinData.instlPeriodType === 'MONTH_48') this.instData = 48;
				let frontNum = join.actualSellAmt * Int12 * Math.pow(1 + Int12, insP);
				join.monthDvcAmt = Math.round(
					frontNum / (Math.pow(1 + Int12, insP) - 1),
				);
			}
			this.monthPaymentAmtFnc();
		},
		monthPaymentAmtFnc() {
			this.joinData.monthPaymentAmt =
				Number(this.joinData.monthDvcAmt) + Number(this.joinData.monthBasicAmt);
			// 부가서비스가 있을시 월 납부금액 공식
			if (this.joinData.addServiceList.length !== 0) {
				if (this.joinData.monthPaymentAmt !== 0) {
					for (let i = 0; i < this.joinData.addServiceList.length; i++) {
						this.joinData.monthPaymentAmt =
							this.joinData.monthPaymentAmt +
							this.joinData.addServiceList[i].addSvcCharge;
					}
				}
			}
		},
		resetPriceFnc() {
			this.joinData.releaseAmt = 0; // 출고가
			this.joinData.releaseAmtDate = null; // 출고가일자
			this.joinData.pubNotiSupportAmt = 0; // 공시지원금
			this.joinData.extraSupportAmt = 0; // 추가지원금
			this.joinData.freeInstlAmt = 0; // 프리할부/선수납
			this.joinData.etcDiscountAmt = 0; // 기타할인금
			this.joinData.actualSellAmt = 0; // 실판매가
			this.joinData.monthDvcAmt = 0; // 월기기금액
			this.joinData.monthBasicAmt = 0; // 월기본료
			this.joinData.monthPaymentAmt = 0; // 월납부금액
			this.joinData.depositAmt = 0; // 입금받을금액
			this.joinData.chargeId = null; // 요금제
		},
		setNewAddSvcList(itemList: any) {
			for (let i = 0; i < this.joinData.addServiceList.length; i++) {
				if (this.joinData.addServiceList[i].addSvcId === itemList.addSvcId) {
					alert('이미 포함 되어 있는 항목입니다.');
					return;
				}
			}
			this.joinData.addServiceList.push(itemList);
			if (this.joinData.monthPaymentAmt !== 0) {
				this.joinData.monthPaymentAmt =
					this.joinData.monthPaymentAmt + itemList.addSvcCharge;
			}
		},
		minusAddSvcList(item: any) {
			this.addServiceFormData.push(
				this.joinData.addServiceList.splice(item.index, 1),
			);
			if (this.joinData.monthPaymentAmt !== 0) {
				this.joinData.monthPaymentAmt =
					this.joinData.monthPaymentAmt - item.item.addSvcCharge;
			}
		},
		applTypeFnc(e: any, value: string) {
			if (
				this.joinData.deviceMatchingType !== null ||
				this.joinData.usimMatchingType !== null
			) {
				alert(
					'기기 또는 유심 매칭이 되어있는경우\n개통종류를 변경하실 수 없습니다.',
				);
				e.preventDefault();
				return false;
			}
			this.basicData.applType = value;
			this.joinData.usimPaymentType = null;
			if (this.basicData.applType === 'DVC') {
				//this.joinData.usimRawBarcode = null;
				//this.joinData.usimType = null;
			} else if (this.basicData.applType === 'USIM') {
				//this.joinData.deviceRawBarcode = null;
				this.joinData.usimType = 'NANO_USIM';
			} else {
				this.joinData.usimType = 'NANO_USIM';
			}
		},
		deviceChangeFnc(value: boolean) {
			this.deviceChange = value;
		},
		usimChangeFnc(value: boolean) {
			this.usimChange = value;
		},
	},
	created() {
		this.thriftyPhone = 0;
	},
});
</script>

<style scoped>
.hpStyle1 input[type='number'] {
	border: 1px solid #989898;
	width: 200px;
	padding: 0 10px;
	color: #003a53 !important;
	font-weight: bold;
	line-height: 30px;
}
.hpStyle1 input[type='number']::-webkit-outer-spin-button,
.hpStyle1 input[type='number']::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
.resetBtn {
	position: absolute;
	font-size: 18px;
	top: -4px;
	right: 80px;
	padding: 6px;
	color: #17a5ae;
}
option:first-child {
	background-color: #f1f1f1;
	color: #000;
}
.clearBtn {
	position: relative;
}
.clearBtn .posAbtn1 {
	position: absolute;
	color: #0037a1;
	top: 14px;
	left: 185px;
	font-weight: bold;
}
</style>
