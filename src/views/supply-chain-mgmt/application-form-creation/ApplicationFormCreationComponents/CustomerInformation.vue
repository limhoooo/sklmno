<template>
	<div>
		<h2 class="boldWt mb20">고객정보</h2>

		<div class="new_popTable1">
			<table class="w100P">
				<tr>
					<td>고객유형<span class="redfont">*</span></td>
					<td colspan="20">
						<!--						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.trim="customerData.cusType"
							@change="customerDialogFnc"
						>
							<option disabled>고객유형을 선택해주세요.</option>
							<option
								:key="index"
								v-for="(item, index) in selectItems.customerTypeItems"
								:value="item.value"
							>
								{{ item.name }}
							</option>
						</select>-->
						<div class="disFx">
							<div
								class="radioStyle ml30 h36 lh36"
								v-for="(item, index) in selectItems.customerTypeItems"
								:key="index"
							>
								<input
									type="radio"
									:id="`radio${item.value}`"
									name="radioS26"
									:value="item.value"
									v-model.trim="customerData.cusType"
									@change="customerDialogFnc"
									:checked="item.value"
								/><label class="ml-1" :for="`radio${item.value}`">{{
									item.name
								}}</label>
							</div>
						</div>
					</td>
				</tr>
				<tr v-if="customerData.cusType === 'MINORS'">
					<td>법정대리인성명<span class="redfont">*</span></td>
					<td>
						<input
							type="text"
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.trim="customerData.courtProctorName"
						/>
					</td>
					<td>법정대리인<br />주민등록번호<span class="redfont">*</span></td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							@input="
								regiNumSplitFnc(
									$event.target.value,
									'courtProctorRegiNum',
									'customerData',
								)
							"
							v-model.trim="customerData.courtProctorRegiNumConcat"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						/>
					</td>
					<td>연락처<span class="redfont">*</span></td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							@input="
								phoneNumSplitFnc(
									$event.target.value,
									'courtProctorPhone',
									'customerData',
								)
							"
							v-model="customerData.courtProctorPhone"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						/>
					</td>
				</tr>
				<tr v-if="customerData.cusType === 'MINORS'">
					<td>관계<span class="redfont">*</span></td>
					<td colspan="20">
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							v-model.trim="customerData.courtProctorRelation"
						/>
					</td>
				</tr>
				<!--				<tr v-if="customerDialog === true">
					<td>사업자명</td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							v-model.trim="customerData.bizName"
						/>
					</td>
					<td>사업자번호</td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							@input="
								bizNumSplitFnc($event.target.value, 'bizNum', 'customerData')
							"
							v-model="customerData.bizNum"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						/>
					</td>
					<td>연락처</td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							@input="
								phoneNumSplitFnc(
									$event.target.value,
									'bizPhone',
									'customerData',
								)
							"
							v-model="customerData.bizPhone"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						/>
					</td>
				</tr>-->
				<tr v-if="customerData.cusType === 'CORP'">
					<td>법인명<span class="redfont">*</span></td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							v-model.trim="customerData.bizName"
						/>
					</td>
					<td>사업자번호<span class="redfont">*</span></td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							@input="
								bizNumSplitFnc($event.target.value, 'bizNum', 'customerData')
							"
							v-model="customerData.bizNum"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						/>
					</td>
					<td>연락처<span class="redfont">*</span></td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							@input="
								phoneNumSplitFnc(
									$event.target.value,
									'bizPhone',
									'customerData',
								)
							"
							v-model="customerData.bizPhone"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						/>
					</td>
				</tr>
				<tr v-if="customerData.cusType === 'CORP'">
					<td>법인등록번호<span class="redfont">*</span></td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							@input="
								regiNumSplitFnc(
									$event.target.value,
									'bizRegiNum',
									'customerData',
								)
							"
							v-model="customerData.bizRegiNumConcat"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						/>
					</td>
					<td>고객명<span class="redfont">*</span></td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							v-model.trim="customerData.cusName"
						/>
					</td>
					<td>주민등록번호<span class="redfont">*</span></td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							@input="
								regiNumSplitFnc(
									$event.target.value,
									'cusRegiNum',
									'customerData',
								)
							"
							v-model="customerData.cusRegiNumConcat"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						/>
					</td>
				</tr>
				<tr>
					<template v-if="customerData.cusType !== 'CORP'">
						<td class="w140">
							<span>고객명</span
							><span class="redfont" v-if="customerData.cusType !== 'CORP'"
								>*</span
							>
						</td>
						<td class="w240">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10"
								type="text"
								v-model.trim="customerData.cusName"
								maxlength="20"
							/>
						</td>
						<template v-if="customerData.cusType !== 'FOREIGN'">
							<td class="w140">
								주민등록번호<span
									class="redfont"
									v-if="customerData.cusType !== 'CORP'"
									>*</span
								>
							</td>
							<td class="w240">
								<input
									class="borderRadi3Px borderContColor2 w220 h36 padW10"
									type="text"
									@input="
										regiNumSplitFnc(
											$event.target.value,
											'cusRegiNum',
											'customerData',
										)
									"
									v-model.trim="customerData.cusRegiNumConcat"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								/>
							</td>
						</template>
						<template v-if="customerData.cusType === 'FOREIGN'">
							<td>외국인등록번호<span class="redfont">*</span></td>
							<td>
								<!--								<div class="residentStyle1">
									<input
										class="borderRadi3Px borderContColor2 h36 padW10"
										type="text"
										v-model.trim="customerData.licenseNum1"
										maxlength="6"
										oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
									/>
									<span>-</span>
									<input
										class="borderRadi3Px borderContColor2 h36 padW10"
										type="text"
										v-model.trim="customerData.licenseNum2"
										maxlength="7"
										oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
									/>
								</div>-->
								<input
									class="borderRadi3Px borderContColor2 w220 h36 padW10"
									type="text"
									@input="
										regiNumSplitFnc(
											$event.target.value,
											'licenseNum',
											'customerData',
										)
									"
									v-model.trim="customerData.licenseNumConcat"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								/>
							</td>
						</template>
					</template>
					<td class="w140">요금감면</td>
					<td class="w240">
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.trim="customerData.chargeReductType"
						>
							<option disabled>요금감면을 선택해주세요.</option>
							<option
								v-for="(item, index) in selectItems.chargeReductTypeItems"
								:value="item.value"
								:key="index"
							>
								{{ item.name }}
							</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>휴대폰번호<span class="redfont">*</span></td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							@input="
								phoneNumSplitFnc(
									$event.target.value,
									'cusPhone',
									'customerData',
								)
							"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							v-model="customerData.cusPhone"
						/>
					</td>
					<td>비상연락망</td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							@input="
								phoneNumSplitFnc(
									$event.target.value,
									'emgPhone',
									'customerData',
								)
							"
							v-model="customerData.emgPhone"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						/>
					</td>
					<td>이메일</td>
					<td>
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							type="text"
							v-model.trim="customerData.cusEmail"
							maxlength="40"
						/>
					</td>
				</tr>
				<tr>
					<td>신분증진위</td>
					<td colspan="20">
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.trim="customerData.licenseAuthType"
							@change="resetLicenseAuthTypeFnc"
						>
							<option disabled>신분증 진위를 선택해주세요.</option>
							<option :value="null">해당없음</option>
							<option
								v-for="(item, index) in selectItems.licenseAuthTypeItems"
								:key="index"
								:value="item.value"
							>
								{{ item.name }}
							</option>
						</select>
					</td>
				</tr>
				<tr v-if="customerData.licenseAuthType === 'REGI_RGSTR_CARD'">
					<td>발급일자<span class="redfont">*</span></td>
					<td colspan="20" class="datePickerStyle1 w220">
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
									style="font-size: 12px"
									class="w220"
									outlined
									readonly
									v-model.trim="customerData.licenseIssueDate"
									v-bind="attrs"
									v-on="on"
									append-icon="mdi-calendar"
								></v-text-field>
							</template>
							<v-date-picker
								v-model.trim="customerData.licenseIssueDate"
								@input="menu1 = false"
								locale="ko-KR"
							></v-date-picker>
						</v-menu>
					</td>
				</tr>
				<tr v-if="customerData.licenseAuthType === 'DRIVER_LICENSE'">
					<td>발급일자<span class="redfont">*</span></td>
					<td class="datePickerStyle1 w220">
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
									style="font-size: 12px"
									class="w220"
									outlined
									readonly
									v-model.trim="customerData.licenseIssueDate"
									v-bind="attrs"
									v-on="on"
									append-icon="mdi-calendar"
								></v-text-field>
							</template>
							<v-date-picker
								v-model.trim="customerData.licenseIssueDate"
								@input="menu1 = false"
								locale="ko-KR"
							></v-date-picker>
						</v-menu>
					</td>
					<td>지역<span class="redfont">*</span></td>
					<td>
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model.trim="customerData.licenseIssueArea"
						>
							<option disabled>지역을 선택해주세요.</option>
							<option
								v-for="(item, index) in selectItems.driverAreaCodeItems"
								:key="index"
								:value="item.value"
							>
								{{ item.name }}
							</option>
						</select>
					</td>
					<td>면허번호<span class="redfont">*</span></td>
					<td>
						<div class="licenseStyle1 disFX">
							<input
								class="borderRadi3Px borderContColor2 licenseMax2 h36 padW10"
								type="text"
								v-model.trim="customerData.licenseNum1"
								maxlength="2"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span>-</span>
							<input
								class="borderRadi3Px borderContColor2 licenseMax6 h36 padW10"
								type="text"
								v-model.trim="customerData.licenseNum2"
								maxlength="6"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
							<span>-</span>
							<input
								class="borderRadi3Px borderContColor2 licenseMax2 h36 padW10"
								type="text"
								v-model.trim="customerData.licenseNum3"
								maxlength="2"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</div>
					</td>
				</tr>
				<tr v-if="customerData.licenseAuthType === 'DSBL_RGSTR_CARD'">
					<td>발급일자<span class="redfont">*</span></td>
					<td colspan="20" class="datePickerStyle1 w220">
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
									style="font-size: 12px"
									class="w220"
									outlined
									readonly
									v-model.trim="customerData.licenseIssueDate"
									v-bind="attrs"
									v-on="on"
									append-icon="mdi-calendar"
								></v-text-field>
							</template>
							<v-date-picker
								v-model.trim="customerData.licenseIssueDate"
								@input="menu1 = false"
								locale="ko-KR"
							></v-date-picker>
						</v-menu>
					</td>
				</tr>
				<tr v-if="customerData.licenseAuthType === 'NTNL_CARD'">
					<td>발급일자<span class="redfont">*</span></td>
					<td colspan="20" class="datePickerStyle1 w220">
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
									style="font-size: 12px"
									class="w220"
									outlined
									readonly
									v-model.trim="customerData.licenseIssueDate"
									v-bind="attrs"
									v-on="on"
									append-icon="mdi-calendar"
								></v-text-field>
							</template>
							<v-date-picker
								v-model.trim="customerData.licenseIssueDate"
								@input="menu1 = false"
								locale="ko-KR"
							></v-date-picker>
						</v-menu>
					</td>
				</tr>
				<tr v-if="customerData.licenseAuthType === 'FOREIGN_RGSTR_CARD'">
					<td>발급일자<span class="redfont">*</span></td>
					<td class="datePickerStyle1 w220 font-size-12">
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
									v-model.trim="customerData.licenseIssueDate"
									v-bind="attrs"
									v-on="on"
									append-icon="mdi-calendar"
								></v-text-field>
							</template>
							<v-date-picker
								v-model.trim="customerData.licenseIssueDate"
								@input="menu1 = false"
								locale="ko-KR"
							></v-date-picker>
						</v-menu>
					</td>
					<td>만료일자<span class="redfont">*</span></td>
					<td class="datePickerStyle1 w220">
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
									class="w220"
									style="font-size: 12px"
									outlined
									readonly
									v-model.trim="customerData.licenseExpiredDate"
									v-bind="attrs"
									v-on="on"
									append-icon="mdi-calendar"
								></v-text-field>
							</template>
							<v-date-picker
								v-model.trim="customerData.licenseExpiredDate"
								@input="menu2 = false"
								locale="ko-KR"
							></v-date-picker>
						</v-menu>
					</td>
					<td>체류코드<span class="redfont">*</span></td>
					<td>
						<div class="datePickerStyle1">
							<v-autocomplete
								style="font-size: 12px"
								:items="selectItems.stayCodeItems"
								item-text="name"
								item-value="value"
								v-model.trim="customerData.stayCode"
								outlined
								:attach="true"
								placeholder="검색해주세요."
							></v-autocomplete>
						</div>
					</td>
				</tr>
				<tr v-if="customerData.licenseAuthType === 'FOREIGN_RGSTR_CARD'">
					<td>국가<span class="redfont">*</span></td>
					<td colspan="3">
						<div class="datePickerStyle1 w220">
							<v-autocomplete
								style="font-size: 12px"
								:items="nationItems"
								item-text="name"
								item-value="value"
								v-model.trim="customerData.ntnlCode"
								outlined
								:attach="true"
								placeholder="검색해주세요."
							></v-autocomplete>
						</div>
					</td>
				</tr>
				<tr>
					<td>블랙리스트 검색</td>
					<td colspan="20">
						<div class="btnPlus2 w220">
							<input
								type="text"
								class="borderRadi3Px borderContColor2 w220 h36 padW10 lh36 disGray"
								v-model.trim="blackList"
								disabled
							/>
							<button
								style="font-size: 14px"
								class="backColorBlue3 borderRadi3Px"
								@click="getBlackListFnc"
							>
								확인
							</button>
						</div>
					</td>
				</tr>
				<tr>
					<td>주소<span class="redfont">*</span></td>
					<td colspan="20">
						<div class="btnPlus1 w290 floatL">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10"
								type="text"
								@click="postDialog = true"
								readonly
								v-model.trim="customerData.cusZipCode"
								placeholder="우편번호"
								@input="resetAddressFnc"
							/>
							<post-api
								@postapi="addressData"
								:postDialog="postDialog"
								@closeDialog="dialogClose"
							></post-api>
						</div>
						<input
							class="borderRadi3Px borderContColor2 w325 h36 padW10 ml10"
							type="text"
							v-model.trim="customerData.cusAddr"
							@click="postDialog = true"
							readonly
							placeholder="기본주소"
						/>
						<input
							class="borderRadi3Px borderContColor2 w280 h36 padW10 ml10"
							type="text"
							v-model.trim="customerData.cusAddrDetail"
							placeholder="상세주소"
							@input="resetAddressFnc"
						/>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import PostApi from '../../../../components/PostApi.vue';
import {
	codeListData,
	customerFormData,
	dialogData,
} from '../../../../store/interface/supply-chain-mgmt/application-form-creation/AppFormCreationInterface';
import numberSplit from '../../../../common/numberSplit';

interface dataType {
	postDialog: boolean;
	menu1: boolean;
	menu2: boolean;
}

export default Vue.extend({
	name: 'CustomerInformation',
	mixins: [numberSplit],
	components: { PostApi },
	data: (): dataType => ({
		postDialog: false,
		menu1: false,
		menu2: false,
	}),
	computed: {
		customerDialog: {
			get(): boolean {
				return this.$store.state.ApplicationFormCreationModule.customerDialog;
			},
			set(newValue: boolean) {
				this.$store.state.ApplicationFormCreationModule.customerDialog = newValue;
			},
		},
		openingStoreData(): number {
			return this.$store.state.ApplicationFormCreationModule.formData.basic
				.openingStoreId;
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
		selectItems(): codeListData {
			return this.$store.state.ApplicationFormCreationModule.codeList;
		},
		addrDialog: {
			get(): dialogData {
				return this.$store.state.ApplicationFormCreationModule.dialogData;
			},
			set(newValue: dialogData) {
				this.$store.state.ApplicationFormCreationModule.dialogData = newValue;
			},
		},
		openingStoreTelecom(): any {
			return this.$store.state.ApplicationFormCreationModule
				.openingStoreTelecom;
		},
		nationItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.nationalCodeItems;
		},
		blackList: {
			get(): string {
				return this.$store.state.ApplicationFormCreationModule.blackList;
			},
			set(newValue: string) {
				this.$store.state.ApplicationFormCreationModule.blackList = newValue;
			},
		},
	},
	methods: {
		addressData(data: any) {
			this.customerData.cusAddr = data.address;
			this.customerData.cusZipCode = data.zonecode;
			this.resetAddressFnc();
		},
		dialogClose(data: any) {
			this.postDialog = data;
		},
		customerDialogFnc() {
			let openingStore = false;
			if (this.openingStoreTelecom === 5 || this.openingStoreTelecom === 7) {
				openingStore = true;
			}
			if (openingStore && this.customerData.cusType === 'INDV_BSNM') {
				this.customerDialog = true;
			} else {
				this.customerDialog = false;
			}
			if (this.customerData.cusType === 'FOREIGN') {
				this.customerData.licenseAuthType = 'FOREIGN_RGSTR_CARD';
			} else {
				this.customerData.licenseAuthType = null;
			}
			this.resetCusTypeFnc();
		},
		resetAddressFnc() {
			this.addrDialog.deliveryAddrDialog = false;
			this.addrDialog.paymentAddrDialog = false;
		},
		resetCusTypeFnc() {
			this.customerData.courtProctorName = null; // 법정대리인명
			this.customerData.courtProctorRegiNumConcat = null; // 법정대리인주민등록번호
			this.customerData.courtProctorRegiNum1 = null; // 법정대리인주민등록번호
			this.customerData.courtProctorRegiNum2 = null; // 법정대리인주민등록번호
			this.customerData.courtProctorPhone = null; // 법정대리인연락처
			this.customerData.courtProctorPhone1 = null; // 법정대리인연락처
			this.customerData.courtProctorPhone2 = null; // 법정대리인연락처
			this.customerData.courtProctorPhone3 = null; // 법정대리인연락처
			this.customerData.courtProctorRelation = null; // 법정대리인관계
			this.customerData.bizName = null; // 사업자명
			this.customerData.bizNum = null; // 사업자번호
			this.customerData.bizNum1 = null; // 사업자번호
			this.customerData.bizNum2 = null; // 사업자번호
			this.customerData.bizNum3 = null; // 사업자번호
			this.customerData.bizPhone = null; // 사업자연락처
			this.customerData.bizPhone1 = null; // 사업자연락처
			this.customerData.bizPhone2 = null; // 사업자연락처
			this.customerData.bizPhone3 = null; // 사업자연락처
			this.customerData.bizRegiNum1 = null; // 법인등록번호
			this.customerData.bizRegiNum2 = null; // 법인등록번호
			this.customerData.cusName = null; //
			this.customerData.cusRegiNumConcat = null; //
			this.customerData.cusRegiNum1 = null; //
			this.customerData.cusRegiNum2 = null; //
			this.customerData.licenseNum1 = null;
			this.customerData.licenseNum2 = null;
			this.customerData.licenseNum3 = null;
			this.customerData.licenseNumConcat = null;
		},
		resetLicenseAuthTypeFnc() {
			this.customerData.licenseIssueDate = null; // 발급일자
			this.customerData.licenseExpiredDate = null; // 만료일자
			this.customerData.licenseIssueArea = null; // 만료일자
			this.customerData.licenseNum1 = null; // 면허번호
			this.customerData.licenseNum2 = null; // 면허번호
			this.customerData.licenseNum3 = null; // 면허번호
			this.customerData.stayCode = null; // 체류코드
			this.customerData.ntnlCode = null; // 국가
		},
		async getBlackListFnc() {
			if (this.customerData.cusName === null) {
				return alert('고객명을 입력해주세요.');
			}
			if (
				this.customerData.cusPhone1 !== null &&
				this.customerData.cusPhone2 !== null &&
				this.customerData.cusPhone3 !== null
			) {
				let data = {
					blackName: this.customerData.cusName,
					blackPhone:
						this.customerData.cusPhone1 +
						this.customerData.cusPhone2 +
						this.customerData.cusPhone3,
				};
				await this.$store.dispatch(
					'ApplicationFormCreationModule/getDetailList',
					data,
				);
			} else {
				alert('고객 휴대폰번호를 입력해주세요.');
			}
		},
	},
});
</script>

<style scoped>
option:first-child {
	background-color: #f1f1f1;
	color: #000;
}
</style>
