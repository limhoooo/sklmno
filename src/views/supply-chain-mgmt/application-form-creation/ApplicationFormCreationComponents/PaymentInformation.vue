<template>
	<div class="sideBtnCont1">
		<div class="disFx mb20">
			<h2 class="disIn lh36">납부정보</h2>
			<span class="ml40">
				<div class="checkStyleCont4 ml40 floatL lh36">
					<input
						class="checkStyle"
						@change="paymentTypeFnc"
						type="checkbox"
						id="check1"
						v-model.trim="paymentCheckType"
						:disabled="
							this.joinData.joinType === 'NEW' ||
							this.joinData.joinType === 'NUM_CHANGE'
						"
						:checked="this.paymentData.paymentType === 'EXIST_SAME'"
					/><label for="check1">기존과 동일</label>
				</div>
			</span>
		</div>
		<div class="new_popTable1">
			<table class="w100P">
				<tr>
					<td class="w140">
						납부방법<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td class="w240">
						<div class="disFx">
							<div class="radioStyle h36 lh36 ml20">
								<input
									type="radio"
									id="radio1"
									name="radioS1"
									value="ACC_TRNS"
									v-model.trim="paymentData.paymentType"
									@click="paymentCheckType = false"
									@change="resetPaymentTypeFnc"
								/><label class="ml-1" for="radio1">계좌이체</label>
							</div>
							<div class="radioStyle h36 lh36 ml30">
								<input
									type="radio"
									id="radio2"
									name="radioS1"
									class="ml10"
									value="CARD_PAY"
									v-model.trim="paymentData.paymentType"
									@click="paymentCheckType = false"
									@change="resetPaymentTypeFnc"
								/><label class="ml-1" for="radio2">카드</label>
							</div>
							<div class="radioStyle h36 lh36 ml30">
								<input
									type="radio"
									id="radio3"
									name="radioS1"
									class="ml10"
									value="GIRO"
									v-model.trim="paymentData.paymentType"
									@click="paymentCheckType = false"
									@change="resetPaymentTypeFnc"
								/><label class="ml-1" for="radio3">지로</label>
							</div>
						</div>
					</td>
					<td class="w140">
						청구서종류<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td colspan="20">
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10 disGray"
							:disabled="paymentData.paymentType === 'EXIST_SAME'"
							v-model.trim="paymentData.billType"
						>
							<option value="" disabled>종류를 선택해주세요.</option>
							<option
								v-for="(item, index) in billTypeItems"
								:key="index"
								:value="item.value"
							>
								{{ item.name }}
							</option>
						</select>
					</td>
				</tr>
				<tr v-if="paymentData.paymentType === 'ACC_TRNS'">
					<td>
						은행정보<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.number="paymentData.bankCode"
						>
							<option disabled>은행정보를 선택해주세요.</option>
							<option
								v-for="(item, index) in bankCodeItems"
								:key="index"
								:value="item.value"
							>
								{{ item.name }}
							</option>
						</select>
					</td>
					<td>
						계좌번호<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							v-model.trim="paymentData.accountNum"
							maxlength="14"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						/>
					</td>
					<td>
						예금주<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							v-model.trim="paymentData.accountHolderName"
						/>
					</td>
				</tr>
				<tr v-if="paymentData.paymentType === 'ACC_TRNS'">
					<td>
						생년월일<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td class="datePickerStyle1 w220">
            <input
                class="borderRadi3Px borderContColor2 w220 h36 padW10"
                type="text"
                v-model.trim="paymentData.accountHolderBirth"
                maxlength='13'
            />
<!--						<v-menu-->
<!--							v-model.trim="menu1"-->
<!--							:close-on-content-click="false"-->
<!--							:nudge-right="40"-->
<!--							transition="scale-transition"-->
<!--							offset-y-->
<!--							:attach="true"-->
<!--						>-->
<!--							<template v-slot:activator="{ on, attrs }">-->
<!--								<v-text-field-->
<!--									style="font-size: 12px"-->
<!--									class="w220"-->
<!--									outlined-->
<!--									readonly-->
<!--									v-model.trim="paymentData.accountHolderBirth"-->
<!--									v-bind="attrs"-->
<!--									v-on="on"-->
<!--									append-icon="mdi-calendar"-->
<!--								></v-text-field>-->
<!--							</template>-->
<!--							<v-date-picker-->
<!--								v-model.trim="paymentData.accountHolderBirth"-->
<!--								@input="menu1 = false"-->
<!--								locale="ko-KR"-->
<!--							></v-date-picker>-->
<!--						</v-menu>-->
					</td>
					<td>
						관계<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							v-model.trim="paymentData.accountHolderRelation"
						/>
					</td>
				</tr>
				<tr v-if="paymentData.paymentType === 'CARD_PAY'">
					<td>
						카드정보<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.number="paymentData.cardCompanyCode"
						>
							<option disabled>카드정보를 선택해주세요.</option>
							<option
								v-for="(item, index) in cardCompanyCodeItems"
								:key="index"
								:value="item.value"
							>
								{{ item.name }}
							</option>
						</select>
					</td>
					<td>
						카드번호<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<div class="disFx cardCodeStyle1">
							<input
								class="borderRadi3Px borderContColor2 h36 padW10"
								type="text"
								v-model.trim="paymentData.cardNum1"
								maxlength="4"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span class="lh36">-</span>
							<input
								class="borderRadi3Px borderContColor2 h36 padW10"
								type="text"
								v-model.trim="paymentData.cardNum2"
								maxlength="4"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span class="lh36">-</span>
							<input
								class="borderRadi3Px borderContColor2 h36 padW10"
								type="text"
								v-model.trim="paymentData.cardNum3"
								maxlength="4"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span class="lh36">-</span>
							<input
								class="borderRadi3Px borderContColor2 h36 padW10"
								type="text"
								v-model.trim="paymentData.cardNum4"
								maxlength="4"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</div>
					</td>
					<td>
						카드주<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							v-model.trim="paymentData.cardHolderName"
						/>
					</td>
				</tr>
				<tr v-if="paymentData.paymentType === 'CARD_PAY'">
					<td>
						주민등록번호<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<div class="residentStyle1">
							<input
								class="borderRadi3Px borderContColor2 h36 padW10"
								type="text"
								v-model.number="paymentData.cardHolderRegiNum1"
								maxlength="6"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span>-</span>
							<input
								class="borderRadi3Px borderContColor2 h36 padW10"
								type="text"
								v-model.number="paymentData.cardHolderRegiNum2"
								maxlength="7"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</div>
					</td>
					<td>
						유효기간<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td colspan="20">
						<div class="disFX validDateCont1">
							<input
								class="borderRadi3Px borderContColor2 h36 padW10"
								type="text"
								placeholder="MM(월)"
								v-model.trim="paymentData.cardValidityMm"
								maxlength="2"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<input
								class="borderRadi3Px borderContColor2 h36 padW10 ml5"
								type="text"
								placeholder="YY(년)"
								v-model.trim="paymentData.cardValidityYy"
								maxlength="2"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</div>
					</td>
				</tr>
				<tr v-if="paymentData.paymentType === 'GIRO'">
					<td>
						주소<span
							v-if="this.AppFlag > 28177 || !this.AppFlag"
							class="redfont"
							>*</span
						>
					</td>
					<td colspan="20">
						<div class="btnPlus1 w290 floatL">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10"
								placeholder="우편번호"
								@click="postDialog = true"
								readonly
								v-model.trim="paymentData.giroZipCode"
							/>
							<post-api
								@postapi="addressData"
								:postDialog="postDialog"
								@closeDialog="dialogClose"
							></post-api>
						</div>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10 ml20 w325 floatL"
							type="text"
							placeholder="기본주소"
							readonly
							@click="postDialog = true"
							v-model.trim="paymentData.giroAddr"
						/>
						<div class="checkStyleCont4 ml40 floatL lh36">
							<input
								class="checkStyle"
								type="checkbox"
								id="check2"
								v-model.trim="addrDialog"
								@change="addressFnc"
							/>
							<label class="ml-1" for="check2">고객 주소와 동일 </label>
						</div>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10 w100P mt10"
							type="text"
							placeholder="상세주소"
							v-model.trim="paymentData.giroAddrDetail"
						/>
					</td>
				</tr>
			</table>
		</div>

		<!--		<div class="sideBtn1">
			<input
				class="w20"
				@change="paymentTypeFnc"
				type="checkbox"
				id="check1"
				v-model.trim="paymentCheckType"
				:disabled="
					this.joinData.joinType === 'NEW' ||
					this.joinData.joinType === 'NUM_CHANGE'
				"
				:checked="this.paymentData.paymentType === 'EXIST_SAME'"
			/><label for="check1">기존과 동일</label>
		</div>-->
		<!--		<div class="formCont2 disFX">
			<div class="disFX" v-if="!paymentCheckType">
				<p>납부방법<span class="redfont">*</span></p>
				<div class="radioCont1">
					<input
						type="radio"
						id="radio1"
						name="radioS1"
						value="ACC_TRNS"
						v-model.trim="paymentData.paymentType"
						@click="paymentCheckType = false"
						@change="resetPaymentTypeFnc"
					/><label class="ml-1" for="radio1">계좌이체</label>
					<input
						type="radio"
						id="radio2"
						name="radioS1"
						class="ml10"
						value="CARD_PAY"
						v-model.trim="paymentData.paymentType"
						@click="paymentCheckType = false"
						@change="resetPaymentTypeFnc"
					/><label class="ml-1" for="radio2">카드</label>
					<input
						type="radio"
						id="radio3"
						name="radioS1"
						class="ml10"
						value="GIRO"
						v-model.trim="paymentData.paymentType"
						@click="paymentCheckType = false"
						@change="resetPaymentTypeFnc"
					/><label class="ml-1" for="radio3">지로</label>
				</div>
			</div>
			<div class="disFX" v-if="!paymentCheckType">
				<p>청구서종류<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select
						:disabled="paymentData.paymentType === 'EXIST_SAME'"
						v-model.trim="paymentData.billType"
					>
						<option value="" disabled>종류를 선택해주세요.</option>
						<option
							v-for="(item, index) in billTypeItems"
							:key="index"
							:value="item.value"
						>
							{{ item.name }}
						</option>
					</select>
				</div>
			</div>
		</div>
		<div
			class="formCont1 disFX"
			v-if="
				paymentData.paymentType === 'ACC_TRNS' ||
				paymentData.paymentType === 'CARD_PAY' ||
				paymentData.paymentType === 'GIRO'
			"
		>
			<div class="bgGray w90P pd10">
				<div v-if="paymentData.paymentType === 'ACC_TRNS'">
					<div class="disFX">
						<div class="disFX">
							<p>은행정보</p>
							<div class="normalSelectCont1">
								<select v-model.number="paymentData.bankCode">
									<option disabled>은행정보를 선택해주세요.</option>
									<option
										v-for="(item, index) in bankCodeItems"
										:key="index"
										:value="item.value"
									>
										{{ item.name }}
									</option>
								</select>
							</div>
						</div>
						<div class="disFX ml-5">
							<p>계좌번호</p>
							<input
								type="text"
								v-model.number="paymentData.accountNum"
								maxlength="14"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</div>
						<div class="disFX ml-5">
							<p>예금주</p>
							<input type="text" v-model.trim="paymentData.accountHolderName" />
						</div>
					</div>
					<div class="disFX mt-3">
						<div class="disFX">
							<p>생년월일</p>
							<div class="AppFormContDate" style="margin-left: 0">
								<div
									class="AppFormContDateCustom"
									style="display: inline-block"
								>
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
												outlined
												readonly
												v-model.trim="paymentData.accountHolderBirth"
												v-bind="attrs"
												v-on="on"
											></v-text-field>
										</template>
										<v-date-picker
											v-model.trim="paymentData.accountHolderBirth"
											@input="menu1 = false"
											locale="ko-KR"
										></v-date-picker>
									</v-menu>
								</div>
							</div>
						</div>
						<div class="disFX ml-5">
							<p>관계</p>
							<input
								type="text"
								v-model.trim="paymentData.accountHolderRelation"
							/>
						</div>
					</div>
				</div>
				<div v-if="paymentData.paymentType === 'CARD_PAY'">
					<div class="disFX">
						<div class="disFX">
							<p>카드정보</p>
							<div class="normalSelectCont1">
								<select v-model.number="paymentData.cardCompanyCode">
									<option disabled>카드정보를 선택해주세요.</option>
									<option
										v-for="(item, index) in cardCompanyCodeItems"
										:key="index"
										:value="item.value"
									>
										{{ item.name }}
									</option>
								</select>
							</div>
						</div>
						<div class="disFX ml-5" style="font-size: 11px">
							<p>카드번호</p>
							<div class="disFx cardCodeStyle1">
								<input
									type="text"
									v-model.number="paymentData.cardNum1"
									maxlength="4"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								/>
								<span>-</span>
								<input
									type="text"
									v-model.number="paymentData.cardNum2"
									maxlength="4"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								/>
								<span>-</span>
								<input
									type="text"
									v-model.number="paymentData.cardNum3"
									maxlength="4"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								/>
								<span>-</span>
								<input
									type="text"
									v-model.number="paymentData.cardNum4"
									maxlength="4"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								/>
							</div>
						</div>
					</div>
					<div class="disFX mt-3">
						<div class="disFX">
							<p>카드주</p>
							<input type="text" v-model.trim="paymentData.cardHolderName" />
						</div>
						<div class="disFX ml-5">
							<p>주민등록번호</p>
							<div class="residentStyle1">
								<input
									type="text"
									v-model.number="paymentData.cardHolderRegiNum1"
									maxlength="6"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								/>
								<span>-</span>
								<input
									type="text"
									v-model.number="paymentData.cardHolderRegiNum2"
									maxlength="7"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								/>
							</div>
						</div>
						<div class="disFX ml-5">
							<p>유효기간</p>
							<div class="disFX validDateCont1">
								<input
									type="text"
									placeholder="MM(월)"
									v-model.number="paymentData.cardValidityMm"
									maxlength="2"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								/>
								<input
									class="ml-5"
									type="text"
									placeholder="YY(년)"
									v-model.number="paymentData.cardValidityYy"
									maxlength="2"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								/>
							</div>
						</div>
					</div>
				</div>
				<div v-if="paymentData.paymentType === 'GIRO'">
					<div class="disFX">
						<div class="disFX">
							<p>주소</p>
							<div class="btnPlus1">
								<input
									type="text"
									placeholder="우편번호"
									@click="postDialog = true"
									readonly
									v-model.trim="paymentData.giroZipCode"
								/>
								<post-api
									@postapi="addressData"
									:postDialog="postDialog"
									@closeDialog="dialogClose"
								></post-api>
							</div>
						</div>
						<div class="disFX ml10">
							<input
								class="postStyle3"
								type="text"
								placeholder="기본주소"
								readonly
								@click="postDialog = true"
								v-model.trim="paymentData.giroAddr"
							/>
						</div>
						<div class="postCheck1 ml10">
							<input
								type="checkbox"
								id="check2"
								v-model.trim="addrDialog"
								@change="addressFnc"
							/>
							<label class="ml-1" for="check2">고객 주소와 동일 </label>
						</div>
					</div>
					<div class="disFX mt-3 postContAdd2">
						<input
							class="postStyle3"
							type="text"
							placeholder="상세주소"
							v-model.trim="paymentData.giroAddrDetail"
						/>
					</div>
				</div>
			</div>
		</div>-->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import PostApi from '../../../../components/PostApi.vue';
import {
  customerFormData,
  joinFormData,
  paymentFormData,
} from '../../../../store/interface/supply-chain-mgmt/application-form-creation/AppFormCreationInterface';

interface dataType {
	postDialog: boolean;
	menu1: boolean;
}

export default Vue.extend({
	name: 'PaymentInformation',
	components: { PostApi },
	data: (): dataType => ({
		postDialog: false,
		menu1: false,
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
		paymentCheckType: {
			get(): boolean {
				return this.$store.state.ApplicationFormCreationModule.paymentCheckType;
			},
			set(newValue: boolean) {
				this.$store.state.ApplicationFormCreationModule.paymentCheckType = newValue;
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
		basicData: {
			get(): customerFormData {
				return this.$store.state.ApplicationFormCreationModule.formData
					.customer;
			},
			set(newValue: customerFormData) {
				this.$store.state.ApplicationFormCreationModule.formData.customer = newValue;
			},
		},
		addrDialog: {
			get(): boolean {
				return this.$store.state.ApplicationFormCreationModule.dialogData
					.paymentAddrDialog;
			},
			set(newValue: boolean) {
				this.$store.state.ApplicationFormCreationModule.dialogData.paymentAddrDialog = newValue;
			},
		},
		joinData: {
			get(): joinFormData {
				return this.$store.state.ApplicationFormCreationModule.formData.join;
			},
			set(newValue: joinFormData) {
				this.$store.state.ApplicationFormCreationModule.formData.join = newValue;
			},
		},
		billTypeItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.billTypeItems;
		},
		bankCodeItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.bankCodeItems;
		},
		cardCompanyCodeItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.cardCompanyCodeItems;
		},
	},
	methods: {
		addressData(data: any) {
			this.paymentData.giroZipCode = data.zonecode;
			this.paymentData.giroAddr = data.address;
		},
		dialogClose(data: any) {
			this.postDialog = data;
		},
		addressFnc() {
			if (this.addrDialog) {
				this.paymentData.giroZipCode = this.basicData.cusZipCode;
				this.paymentData.giroAddr = this.basicData.cusAddr;
				this.paymentData.giroAddrDetail = this.basicData.cusAddrDetail;
			} else {
				this.paymentData.giroZipCode = '';
				this.paymentData.giroAddr = '';
				this.paymentData.giroAddrDetail = '';
			}
		},
		paymentTypeFnc() {
			this.paymentData.billType = '';
			this.resetPaymentTypeFnc();
			this.paymentData.billType = '';
			if (this.paymentCheckType) {
				return (this.paymentData.paymentType = 'EXIST_SAME');
			} else {
				return (this.paymentData.paymentType = 'ACC_TRNS');
			}
		},
		resetPaymentTypeFnc() {
			this.paymentData.bankCode = null; // 은행정보
			this.paymentData.accountNum = null; // 계좌번호
			this.paymentData.accountHolderName = null; // 예금주
			this.paymentData.accountHolderBirth = null; // 생년월일
			this.paymentData.accountHolderRelation = null; // 관계
			this.paymentData.cardCompanyCode = null; // 카드정보
			this.paymentData.cardNum1 = null; // 카드번호
			this.paymentData.cardNum2 = null; // 카드번호
			this.paymentData.cardNum3 = null; // 카드번호
			this.paymentData.cardNum4 = null; // 카드번호
			this.paymentData.cardHolderName = null; // 카드주
			this.paymentData.cardHolderRegiNum1 = null; // 주민등록번호
			this.paymentData.cardHolderRegiNum2 = null; // 주민등록번호
			this.paymentData.cardValidityMm = null; // 유효기간MM
			this.paymentData.cardValidityYy = null; // 유효기간YY
			this.paymentData.giroZipCode = null; // 우편번호
			this.paymentData.giroAddr = null; // 기본주소
			this.paymentData.giroAddrDetail = null; // 상세주소
			this.addrDialog = false; // 고객주소와 동일
		},
	},
});
</script>

<style scoped>
.validDateCont1 input {
	width: 96px;
}
.cardCodeStyle1 input {
	width: 47px;
}
option:first-child {
	background-color: #f1f1f1;
	color: #000;
}
</style>
