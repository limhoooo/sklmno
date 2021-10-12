<template>
	<div class="disFx mb45">
		<div
			class="cr_sale_info_form1 posR"
			style="padding-bottom: 70px !important"
		>
			<h2>기본정보</h2>
			<table class="infoTable1 mt10">
				<tr>
					<td>개통점</td>
					<td>
						<select
							class="w180 borderContColor3 borderRadi3Px lh30"
							v-model.trim="inquireBasicDto.openingStoreId"
							@change="openStoreFnc($event.target.selectedIndex)"
						>
							<option hidden value="">선택해주세요.</option>
							<option
								v-for="(item, index) in codeList.openStoreItems"
								:value="item.openStoreId"
								:key="index"
							>
								{{ item.openStoreName }}
							</option>
						</select>
					</td>
					<td>가입유형</td>
					<td>
						<select
							class="w180 borderContColor3 borderRadi3Px lh30"
							v-model.trim="inquireBasicDto.joinType"
							@change="joinTypeFnc"
						>
							<option hidden value="">선택해주세요.</option>
							<option
								v-for="(item, index) in codeList.joinTypeItems"
								:value="item.value"
								:key="index"
							>
								{{ item.name }}
							</option>
						</select>
					</td>
					<td>고객유형</td>
					<td>
						<select
							class="w180 borderContColor3 borderRadi3Px lh30"
							v-model.trim="inquireBasicDto.cusType"
							@change="cusTypeFnc"
						>
							<option hidden value="">선택해주세요.</option>
							<option
								v-for="(item, index) in codeList.customerTypeItems"
								:value="item.value"
								:key="index"
							>
								{{ item.name }}
							</option>
						</select>
					</td>
				</tr>
			</table>

			<template v-if="inquireBasicDto.cusType === 'INDV'">
				<h2 class="mt20">고객정보</h2>
				<table class="infoTable1 mt10">
					<tr>
						<td style="width: 102px">고객명</td>
						<td>
							<input
								type="text"
								class="w180 borderContColor3 borderRadi3Px lh30 padW10"
								v-model.trim="inquireRequestDto.cusName"
							/>
						</td>
						<td style="width: 102px">주민등록번호</td>
						<td>
							<input
								type="text"
								class="w180 borderContColor3 borderRadi3Px lh30 padW10"
								v-model.trim="inquireRequestDto.cusRegiNum"
								maxlength="13"
								@input="
									regiNumSplitFnc(
										$event.target.value,
										'cusRegiNum',
										'inquireRequestDto',
									)
								"
							/>
						</td>
						<template v-if="this.inquireBasicDto.joinType === 'DVC_CHANGE'">
							<td style="width: 102px">휴대폰번호</td>
							<td>
								<input
									type="text"
									class="w180 borderContColor3 borderRadi3Px lh30 padW10"
									v-model.trim="inquireRequestDto.cusPhone"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="11"
									@input="
										phoneNumSplitFnc(
											$event.target.value,
											'cusPhone',
											'inquireRequestDto',
										)
									"
								/>
							</td>
						</template>
					</tr>
				</table>
			</template>
			<template v-if="inquireBasicDto.cusType === 'MINORS'">
				<h2 class="mt20">고객정보</h2>
				<table class="infoTable1 mt10">
					<tr>
						<td>고객명</td>
						<td>
							<input
								type="text"
								class="w180 borderContColor3 borderRadi3Px lh30 padW10"
								v-model.trim="inquireRequestDto.cusName"
							/>
						</td>
						<td>주민등록번호</td>
						<td>
							<input
								type="text"
								class="w180 borderContColor3 borderRadi3Px lh30 padW10"
								v-model.trim="inquireRequestDto.cusRegiNum"
								maxlength="13"
								@input="
									regiNumSplitFnc(
										$event.target.value,
										'cusRegiNum',
										'inquireRequestDto',
									)
								"
							/>
						</td>
						<template v-if="this.inquireBasicDto.joinType === 'DVC_CHANGE'">
							<td>휴대폰번호</td>
							<td>
								<input
									type="text"
									class="w180 borderContColor3 borderRadi3Px lh30 padW10"
									v-model.trim="inquireRequestDto.cusPhone"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="11"
									@input="
										phoneNumSplitFnc(
											$event.target.value,
											'cusPhone',
											'inquireRequestDto',
										)
									"
								/>
							</td>
						</template>
					</tr>
					<tr>
						<td>법정대리인<br />성명</td>
						<td>
							<input
								type="text"
								class="w180 borderContColor3 borderRadi3Px lh30 padW10"
								v-model.trim="inquireRequestDto.courtProctorName"
							/>
						</td>
						<td>법정대리인<br />주민등록번호</td>
						<td>
							<input
								type="text"
								class="w180 borderContColor3 borderRadi3Px lh30 padW10"
								v-model.trim="inquireRequestDto.courtProctorRegiNum"
								maxlength="13"
								@input="
									regiNumSplitFnc(
										$event.target.value,
										'courtProctorRegiNum',
										'inquireRequestDto',
									)
								"
							/>
						</td>
						<td>법정대리인<br />연락처</td>
						<td>
							<input
								type="text"
								class="w180 borderContColor3 borderRadi3Px lh30 padW10"
								v-model.trim="inquireRequestDto.courtProctorPhone"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								maxlength="11"
								@input="
									phoneNumSplitFnc(
										$event.target.value,
										'courtProctorPhone',
										'inquireRequestDto',
									)
								"
							/>
						</td>
					</tr>
				</table>
			</template>
			<template v-if="inquireBasicDto.cusType === 'INDV_BSNM'">
				<template v-if="telFlag === 'SKT' || telFlag === 'LG'">
					<h2 class="mt20">고객정보</h2>
					<table class="infoTable1 mt10">
						<tr>
							<td>사업자명</td>
							<td>
								<input
									type="text"
									class="w180 borderContColor3 borderRadi3Px lh30 padW10"
									v-model.trim="inquireRequestDto.bizName"
								/>
							</td>
							<td>사업자번호</td>
							<td>
								<input
									type="text"
									class="w180 borderContColor3 borderRadi3Px lh30 padW10"
									v-model.trim="inquireRequestDto.bizNum"
									maxlength="10"
								/>
							</td>
							<td>휴대폰번호</td>
							<td>
								<input
									type="text"
									class="w180 borderContColor3 borderRadi3Px lh30 padW10"
									v-model.trim="inquireRequestDto.bizPhone"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="11"
									@input="
										phoneNumSplitFnc(
											$event.target.value,
											'bizPhone',
											'inquireRequestDto',
										)
									"
								/>
							</td>
						</tr>
					</table>
				</template>
			</template>
			<template v-if="inquireBasicDto.cusType === 'CORP'">
				<h2 class="mt20">고객정보</h2>
				<table class="infoTable1 mt10">
					<tr>
						<td style="width: 102px">법인명</td>
						<td>
							<input
								type="text"
								class="w180 borderContColor3 borderRadi3Px lh30 padW10"
								v-model.trim="inquireRequestDto.bizName"
							/>
						</td>
						<template> </template>
						<td style="width: 102px">사업자번호</td>
						<td>
							<input
								type="text"
								class="w180 borderContColor3 borderRadi3Px lh30 padW10"
								v-model.trim="inquireRequestDto.bizNum"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								maxlength="10"
							/>
						</td>
						<template v-if="this.inquireBasicDto.joinType === 'DVC_CHANGE'">
							<td style="width: 102px">휴대폰번호</td>
							<td colspan="5">
								<input
									type="text"
									class="w180 borderContColor3 borderRadi3Px lh30 padW10"
									v-model.trim="inquireRequestDto.bizPhone"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="11"
									@input="
										phoneNumSplitFnc(
											$event.target.value,
											'bizPhone',
											'inquireRequestDto',
										)
									"
								/>
							</td>
						</template>
						<template
							v-if="
								this.inquireBasicDto.joinType === 'NEW' ||
								this.inquireBasicDto.joinType === 'NUM_CHANGE'
							"
						>
							<td style="width: 102px">법인번호</td>
							<td colspan="5">
								<input
									type="text"
									class="w180 borderContColor3 borderRadi3Px lh30 padW10"
									v-model.trim="inquireRequestDto.bizRegiNum"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="13"
									@input="
										regiNumSplitFnc(
											$event.target.value,
											'bizRegiNum',
											'inquireRequestDto',
										)
									"
								/>
							</td>
						</template>
					</tr>
				</table>
			</template>
			<template v-if="inquireBasicDto.cusType === 'FOREIGN'">
				<template v-if="inquireBasicDto.joinType === 'DVC_CHANGE'">
					<h2 class="mt20">고객정보</h2>
					<table class="infoTable1 mt10">
						<tr>
							<td>고객명</td>
							<td>
								<input
									type="text"
									class="w180 borderContColor3 borderRadi3Px lh30 padW10"
									v-model.trim="inquireRequestDto.cusName"
								/>
							</td>
							<td>외국인<br />등록번호</td>
							<td>
								<input
									type="text"
									class="w180 borderContColor3 borderRadi3Px lh30 padW10"
									v-model.trim="inquireRequestDto.licenseNum"
									maxlength="13"
									@input="
										regiNumSplitFnc(
											$event.target.value,
											'licenseNum',
											'inquireRequestDto',
										)
									"
								/>
							</td>
							<td>휴대폰번호</td>
							<td>
								<input
									type="text"
									class="w180 borderContColor3 borderRadi3Px lh30 padW10"
									v-model.trim="inquireRequestDto.cusPhone"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="11"
									@input="
										phoneNumSplitFnc(
											$event.target.value,
											'cusPhone',
											'inquireRequestDto',
										)
									"
								/>
							</td>
						</tr>
						<template v-if="this.telFlag === 'KT' || this.telFlag === 'LG'">
							<tr>
								<td>국적</td>
								<td>
									<select
										class="w180 borderContColor3 borderRadi3Px lh30"
										v-model.trim="inquireRequestDto.ntnlCode"
									>
										<option
											v-for="(item, index) in codeList.nationalItems"
											:key="index"
											:value="item.value"
										>
											{{ item.name }}
										</option>
									</select>
								</td>
								<td>발급일자</td>
								<td colspan="3">
									<div class="datePickerTable1 h40">
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
													class="w180"
													outlined
													readonly
													v-bind="attrs"
													v-on="on"
													append-icon="mdi-calendar"
													v-model.trim="inquireRequestDto.licenseIssueDate"
												></v-text-field>
											</template>
											<v-date-picker
												@input="menu1 = false"
												locale="ko-KR"
												v-model.trim="inquireRequestDto.licenseIssueDate"
											></v-date-picker>
										</v-menu>
									</div>
								</td>
							</tr>
						</template>
						<template v-if="this.telFlag === 'SKT'">
							<tr>
								<td>체류코드</td>
								<td>
									<select
										class="w180 borderContColor3 borderRadi3Px lh30"
										v-model.trim="inquireRequestDto.stayCode"
									>
										<option
											v-for="(item, index) in codeList.stayCodeItems"
											:key="index"
											:value="item.value"
										>
											{{ item.name }}
										</option>
									</select>
								</td>
								<td>만료일자</td>
								<td colspan="5">
									<div class="datePickerTable1 h40">
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
													class="w180"
													outlined
													readonly
													v-bind="attrs"
													v-on="on"
													append-icon="mdi-calendar"
													v-model.trim="inquireRequestDto.licenseExpiredDate"
												></v-text-field>
											</template>
											<v-date-picker
												@input="menu2 = false"
												locale="ko-KR"
												v-model.trim="inquireRequestDto.licenseExpiredDate"
											></v-date-picker>
										</v-menu>
									</div>
								</td>
							</tr>
						</template>
					</table>
				</template>
				<template
					v-if="
						inquireBasicDto.joinType === 'NEW' ||
						inquireBasicDto.joinType === 'NUM_CHANGE'
					"
				>
					<h2 class="mt20">고객정보</h2>
					<table class="infoTable1 mt10">
						<tr>
							<td>고객명</td>
							<td>
								<input
									type="text"
									class="w180 borderContColor3 borderRadi3Px lh30 padW10"
									v-model.trim="inquireRequestDto.cusName"
								/>
							</td>
							<td>외국인<br />등록번호</td>
							<td>
								<input
									type="text"
									class="w180 borderContColor3 borderRadi3Px lh30 padW10"
									v-model.trim="inquireRequestDto.licenseNum"
									maxlength="13"
									@input="
										regiNumSplitFnc(
											$event.target.value,
											'licenseNum',
											'inquireRequestDto',
										)
									"
								/>
							</td>
							<td>발급일자</td>
							<td colspan="3">
								<div class="datePickerTable1 h40">
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
												class="w180"
												outlined
												readonly
												v-bind="attrs"
												v-on="on"
												append-icon="mdi-calendar"
												v-model.trim="inquireRequestDto.licenseIssueDate"
											></v-text-field>
										</template>
										<v-date-picker
											@input="menu1 = false"
											locale="ko-KR"
											v-model.trim="inquireRequestDto.licenseIssueDate"
										></v-date-picker>
									</v-menu>
								</div>
							</td>
						</tr>
						<tr>
							<td>국적</td>
							<td>
								<select
									class="w180 borderContColor3 borderRadi3Px lh30"
									v-model.trim="inquireRequestDto.ntnlCode"
								>
									<option
										v-for="(item, index) in codeList.nationalItems"
										:key="index"
										:value="item.value"
									>
										{{ item.name }}
									</option>
								</select>
							</td>
							<template v-if="telFlag === 'SKT'">
								<td>체류코드</td>
								<td>
									<select
										class="w180 borderContColor3 borderRadi3Px lh30"
										v-model.trim="inquireRequestDto.stayCode"
									>
										<option
											v-for="(item, index) in codeList.stayCodeItems"
											:key="index"
											:value="item.value"
										>
											{{ item.name }}
										</option>
									</select>
								</td>
								<td>만료일자</td>
								<td colspan="5">
									<div class="datePickerTable1 h40">
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
													class="w180"
													outlined
													readonly
													v-bind="attrs"
													v-on="on"
													append-icon="mdi-calendar"
													v-model.trim="inquireRequestDto.licenseExpiredDate"
												></v-text-field>
											</template>
											<v-date-picker
												@input="menu2 = false"
												locale="ko-KR"
												v-model.trim="inquireRequestDto.licenseExpiredDate"
											></v-date-picker>
										</v-menu>
									</div>
								</td>
							</template>
						</tr>
					</table>
				</template>
			</template>
			<div
				class="disFx justify-end"
				style="position: absolute; width: 100%; bottom: 0; right: 25px"
			>
				<button
					@click="formRequestFnc"
					class="backColorBlue3 borderRadi3Px boldWt mt20 padW20 mainWhite lh30 mb20"
				>
					요청
				</button>
			</div>
		</div>
		<div class="cr_sale_info_form2 ml5 posR">
			<button class="templateUpBtn1" @click="templateFnc">템플릿편집</button>
			<div class="cr_select_cont1 disFx">
				<select
					class="w170 lh36 borderRadi3Px borderContColor3"
					v-model.trim="sentenceResFormData.openingStoreId"
					@change="openStoreFnc($event.target.selectedIndex)"
				>
					<option hidden value="">선택해주세요.</option>
					<option
						v-for="(item, index) in codeList.openStoreItems"
						:value="item.openStoreId"
						:key="index"
					>
						{{ item.openStoreName }}
					</option>
				</select>
				<select
					class="w170 lh36 borderRadi3Px borderContColor3 ml8"
					v-model.trim="sentenceResFormData.joinType"
					@change="sentenceJoinTypeFnc"
				>
					<option hidden value="">선택해주세요.</option>
					<option
						v-for="(item, index) in codeList.joinTypeItems"
						:value="item.value"
						:key="index"
					>
						{{ item.name }}
					</option>
				</select>
				<select
					class="w170 lh36 borderRadi3Px borderContColor3 ml8"
					v-model.trim="sentenceResFormData.cusType"
					@change="sentenceCusTypeFnc"
				>
					<option hidden value="">선택해주세요.</option>
					<option
						v-for="(item, index) in codeList.customerTypeItems"
						:value="item.value"
						:key="index"
					>
						{{ item.name }}
					</option>
				</select>
			</div>
			<textarea
				class="cr_memo3"
				:placeholder="placeholderTxt"
				v-model.trim="textData"
			></textarea>
			<div
				class="cr_btn_cont1 disFx justify-end"
				style="position: absolute; width: 100%; bottom: 0"
			>
				<button
					@click="copyRequest"
					class="backColorBlue3 borderRadi3Px boldWt mt20 padW20 mainWhite lh30 mr20 mb20"
				>
					요청
				</button>
			</div>
		</div>

		<template-edit-pop v-if="templateDialog"></template-edit-pop>
	</div>
</template>

<script>
import TemplateEditPop from '../../credit-check-mgmt/credit-check/popup/TemplateEditPop.vue';
import numberSplit from '../../../common/numberSplit.js';
import { nullValidation2 } from '../../../common/common.js';

export default {
	name: 'CreditCheckSaleInfo',
	mixins: [numberSplit],
	components: {
		TemplateEditPop,
	},
	computed: {
		templateDialog: {
			get() {
				return this.$store.state.CreditCheckModule.templateDialog;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.templateDialog = newValue;
			},
		},
		codeList: {
			get() {
				return this.$store.state.CreditCheckModule.codeList;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.codeList = newValue;
			},
		},
		cardPagingData: {
			get() {
				return this.$store.state.CreditCheckModule.cardPagingData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.cardPagingData = newValue;
			},
		},
	},
	data: () => ({
		menu1: false,
		menu2: false,
		textData: '',
		telFlag: '',
		parentHierarchy: '',
		placeholderTxt:
			'예시) 주식회사 대마 \n       홍길동\n       900111 /\n       01011111111 /',
		inquireBasicDto: {
			openingStoreId: '',
			joinType: '',
			cusType: '',
		},
		inquireRequestDto: {
			cusName: '',
			cusPhone: '',
			cusPhone1: '',
			cusPhone2: '',
			cusPhone3: '',
			cusRegiNum: '',
			cusRegiNum1: '',
			cusRegiNum2: '',
			courtProctorName: '',
			courtProctorRegiNum1: '',
			courtProctorRegiNum2: '',
			courtProctorPhone1: '',
			courtProctorPhone2: '',
			courtProctorPhone3: '',
			bizName: '',
			bizRegiNum1: '',
			bizRegiNum2: '',
			licenseNum1: '',
			licenseNum2: '',
			stayCode: null,
			ntnlCode: null,
			licenseExpiredDate: '',
			licenseIssueDate: '',
			licenseIssueArea: '',
		},
		sentenceResFormData: {
			openingStoreId: '',
			joinType: '',
			cusType: '',
		},
	}),
	methods: {
		formDataInit() {
			for (let data in this.inquireBasicDto) {
				this.inquireBasicDto[data] = '';
			}
			for (let data in this.inquireRequestDto) {
				this.inquireRequestDto[data] = '';
			}
			for (let data in this.sentenceResFormData) {
				this.sentenceResFormData[data] = '';
			}
			this.inquireRequestDto.stayCode = null;
			this.inquireRequestDto.ntnl = null;
		},
		joinTypeFnc() {
			// TODO 리펙토링
			if (!this.inquireBasicDto.openingStoreId) {
				alert('개통점을 선택해주세요.');
				return (this.inquireBasicDto.joinType = '');
			}
		},
		cusTypeFnc() {
			// TODO 리펙토링
			if (!this.inquireBasicDto.openingStoreId) {
				alert('개통점을 선택해주세요.');
				return (this.inquireBasicDto.cusType = '');
			} else if (!this.inquireBasicDto.joinType) {
				alert('가입유형을 선택해주세요.');
				return (this.inquireBasicDto.cusType = '');
			}
			if (
				this.telFlag === 'KT' &&
				this.inquireBasicDto.cusType === 'INDV_BSNM'
			) {
				alert(
					'선택하신 개통점(KT) 는 개인사업자의 신용조회를 지원하지 않습니다',
				);
				return (this.inquireBasicDto.cusType = '');
			}
		},
		sentenceJoinTypeFnc() {
			// TODO 리펙토링
			if (!this.sentenceResFormData.openingStoreId) {
				alert('개통점을 선택해주세요.');
				return (this.sentenceResFormData.joinType = '');
			}
		},
		sentenceCusTypeFnc() {
			// TODO 리펙토링
			if (!this.sentenceResFormData.openingStoreId) {
				alert('개통점을 선택해주세요.');
				return (this.sentenceResFormData.cusType = '');
			} else if (!this.sentenceResFormData.joinType) {
				alert('가입유형을 선택해주세요.');
				return (this.sentenceResFormData.cusType = '');
			}
			if (
				this.telFlag === 'KT' &&
				this.sentenceResFormData.cusType === 'INDV_BSNM'
			) {
				alert(
					'선택하신 개통점(KT) 는 개인사업자의 신용조회를 지원하지 않습니다',
				);
				return (this.sentenceResFormData.cusType = '');
			}
		},
		openStoreFnc(idx) {
			this.telFlag = this.codeList.openStoreItems[idx - 1].telecom;
			this.parentHierarchy = this.codeList.openStoreItems[
				idx - 1
			].parentHierarchy;
			if (this.telFlag === 5) {
				this.telFlag = 'SKT';
			} else if (this.telFlag === 6) {
				this.telFlag = 'KT';
			} else if (this.telFlag === 7) {
				this.telFlag = 'LG';
			}
		},
		getList(data) {
			this.$store.dispatch('CreditCheckModule/getCreditInquireList', data);
		},
		async formRequestFnc() {
			// 폼영역 요청버튼 fnc
			if (!this.inquireBasicDto.openingStoreId)
				return alert('개통점을 선택해주세요.');
			if (!this.inquireBasicDto.joinType)
				return alert('가입유형을 선택해주세요.');
			if (!this.inquireBasicDto.cusType)
				return alert('고객유형을 선택해주세요.');

			if (!confirm('요청하시겠습니까?')) return;
			let data = [];
			data = {
				inquireBasicDto: {
					openingStoreId: this.inquireBasicDto.openingStoreId,
					joinType: this.inquireBasicDto.joinType,
					cusType: this.inquireBasicDto.cusType,
					parentHierarchy: this.parentHierarchy,
					creditReqType: 'ITEMS',
				},
				inquireRequestDto: {
					cusName: this.inquireRequestDto.cusName,
					cusPhone: this.inquireRequestDto.cusPhone,
					licenseNum: this.inquireRequestDto.licenseNum,
					ntnlCode: this.inquireRequestDto.ntnlCode,
					licenseIssueDate: this.inquireRequestDto.licenseIssueDate,
					licenseNumConcat: this.inquireRequestDto.licenseNumConcat,
					licenseNum1: this.inquireRequestDto.licenseNum1,
					licenseNum2: this.inquireRequestDto.licenseNum2,
					cusPhone1: this.inquireRequestDto.cusPhone1,
					cusPhone2: this.inquireRequestDto.cusPhone2,
					cusPhone3: this.inquireRequestDto.cusPhone3,
					cusRegiNum: this.inquireRequestDto.cusRegiNum,
					cusRegiNum1: this.inquireRequestDto.cusRegiNum1,
					cusRegiNum2: this.inquireRequestDto.cusRegiNum2,
					stayCode: this.inquireRequestDto.stayCode,
					licenseExpiredDate: this.inquireRequestDto.licenseExpiredDate,
				},
				inquireResponseDto: {},
			};
			if (this.inquireBasicDto.cusType === 'INDV') {
				data.inquireRequestDto = {};
				data.inquireRequestDto.cusName = this.inquireRequestDto.cusName;
				data.inquireRequestDto.cusPhone = this.inquireRequestDto.cusPhone;
				data.inquireRequestDto.cusPhone1 = this.inquireRequestDto.cusPhone1;
				data.inquireRequestDto.cusPhone2 = this.inquireRequestDto.cusPhone2;
				data.inquireRequestDto.cusPhone3 = this.inquireRequestDto.cusPhone3;
				data.inquireRequestDto.cusRegiNum = this.inquireRequestDto.cusRegiNum;
				data.inquireRequestDto.cusRegiNum1 = this.inquireRequestDto.cusRegiNum1;
				data.inquireRequestDto.cusRegiNum2 = this.inquireRequestDto.cusRegiNum2;
			}
			if (this.inquireBasicDto.cusType === 'MINORS') {
				data.inquireRequestDto = {};
				data.inquireRequestDto.cusName = this.inquireRequestDto.cusName;
				data.inquireRequestDto.cusPhone = this.inquireRequestDto.cusPhone;
				data.inquireRequestDto.cusPhone1 = this.inquireRequestDto.cusPhone1;
				data.inquireRequestDto.cusPhone2 = this.inquireRequestDto.cusPhone2;
				data.inquireRequestDto.cusPhone3 = this.inquireRequestDto.cusPhone3;
				data.inquireRequestDto.cusRegiNum = this.inquireRequestDto.cusRegiNum;
				data.inquireRequestDto.cusRegiNum1 = this.inquireRequestDto.cusRegiNum1;
				data.inquireRequestDto.cusRegiNum2 = this.inquireRequestDto.cusRegiNum2;
				data.inquireRequestDto.courtProctorName = this.inquireRequestDto.courtProctorName;
				data.inquireRequestDto.courtProctorPhone = this.inquireRequestDto.courtProctorPhone;
				data.inquireRequestDto.courtProctorPhone1 = this.inquireRequestDto.courtProctorPhone1;
				data.inquireRequestDto.courtProctorPhone2 = this.inquireRequestDto.courtProctorPhone2;
				data.inquireRequestDto.courtProctorPhone3 = this.inquireRequestDto.courtProctorPhone3;
				data.inquireRequestDto.courtProctorRegiNum = this.inquireRequestDto.courtProctorRegiNum;
				data.inquireRequestDto.courtProctorRegiNum1 = this.inquireRequestDto.courtProctorRegiNum1;
				data.inquireRequestDto.courtProctorRegiNum2 = this.inquireRequestDto.courtProctorRegiNum2;
			}
			if (this.inquireBasicDto.cusType === 'INDV_BSNM') {
				data.inquireRequestDto = {};
				data.inquireRequestDto.bizName = this.inquireRequestDto.bizName;
				data.inquireRequestDto.bizNum = this.inquireRequestDto.bizNum;
				data.inquireRequestDto.bizPhone = this.inquireRequestDto.bizPhone;
				data.inquireRequestDto.bizPhone1 = this.inquireRequestDto.bizPhone1;
				data.inquireRequestDto.bizPhone2 = this.inquireRequestDto.bizPhone2;
				data.inquireRequestDto.bizPhone3 = this.inquireRequestDto.bizPhone3;
			}
			if (this.inquireBasicDto.cusType === 'CORP') {
				data.inquireRequestDto = {};
				data.inquireRequestDto.bizName = this.inquireRequestDto.bizName;
				data.inquireRequestDto.bizNum = this.inquireRequestDto.bizNum;
				data.inquireRequestDto.bizPhone = this.inquireRequestDto.bizPhone;
				data.inquireRequestDto.bizPhone1 = this.inquireRequestDto.bizPhone1;
				data.inquireRequestDto.bizPhone2 = this.inquireRequestDto.bizPhone2;
				data.inquireRequestDto.bizPhone3 = this.inquireRequestDto.bizPhone3;
				data.inquireRequestDto.bizRegiNum = this.inquireRequestDto.bizRegiNum;
				data.inquireRequestDto.bizRegiNum1 = this.inquireRequestDto.bizRegiNum1;
				data.inquireRequestDto.bizRegiNum2 = this.inquireRequestDto.bizRegiNum2;
			}
			if (this.validationRuleFnc()) return; // 필수값처리
			await this.$store.dispatch('CreditCheckModule/insertCreditInquire', data);
			let cardData = {
				creditProcStatus: 'REQ',
			};
			await this.$store.dispatch(
				'CreditCheckModule/getCreditInquireCardList',
				cardData,
			);
			await this.getList();
			await this.formDataInit();
		},
		validationRuleFnc() {
			if (this.crValidationFnc()) return true;
		},
		crValidationFnc() {
			const NEW = this.inquireBasicDto.joinType === 'NEW'; // 신규가입
			const DVC_CHANGE = this.inquireBasicDto.joinType === 'DVC_CHANGE'; // 기기변경
			const NUM_CHANGE = this.inquireBasicDto.joinType === 'NUM_CHANGE'; // 번호이동
			const SKT = this.telFlag === 'SKT';
			const KT = this.telFlag === 'KT';
			const LG = this.telFlag === 'LG';
			const INDV = this.inquireBasicDto.cusType === 'INDV';
			const MINORS = this.inquireBasicDto.cusType === 'MINORS';
			const INDV_BSNM = this.inquireBasicDto.cusType === 'INDV_BSNM';
			const CORP = this.inquireBasicDto.cusType === 'CORP';
			const FOREIGN = this.inquireBasicDto.cusType === 'FOREIGN';
			if (INDV) {
				if (
					!nullValidation2(this.inquireRequestDto, [
						'cusName', // 고객명
						'cusRegiNum1', // 고객주민번호
						'cusRegiNum2', // 고객주민번호
					])
				) {
					return true;
				}
			}
			if (MINORS) {
				if (
					!nullValidation2(this.inquireRequestDto, [
						'cusName', // 고객명
						'cusRegiNum1', // 고객주민번호
						'cusRegiNum2', // 고객주민번호
						'courtProctorName', // 법대이름
						'courtProctorPhone1', // 법대전화번호
						'courtProctorPhone2', // 법대전화번호
						'courtProctorPhone3', // 법대전화번호
						'courtProctorRegiNum1', // 법대주민번호
						'courtProctorRegiNum2', // 법대주민번호
					])
				) {
					return true;
				}
			}
			if (INDV_BSNM) {
				if (
					!nullValidation2(this.inquireRequestDto, [
						'bizName', // 사업자명
						'bizNum', // 사업자번호
					])
				) {
					return true;
				}
			}
			if (CORP) {
				if (DVC_CHANGE) {
					if (
						!nullValidation2(this.inquireRequestDto, [
							'bizName', // 사업자명
							'bizNum', // 사업자번호
						])
					) {
						return true;
					}
				}
				if (NEW || NUM_CHANGE) {
					if (
						!nullValidation2(this.inquireRequestDto, [
							'bizName', // 사업자명
							'bizRegiNum1', // 법인번호
							'bizRegiNum2', // 법인번호
							'bizNum', // 사업자번호
						])
					) {
						return true;
					}
				}
			}
			if (FOREIGN) {
				if (DVC_CHANGE && SKT) {
					if (
						!nullValidation2(this.inquireRequestDto, [
							'cusName', // 고객명
							'licenseNum1', // 외국인등록번호
							'licenseNum2', // 외국인등록번호
							'stayCode', // 체류코드
							'licenseExpiredDate', // 만료일자
						])
					) {
						return true;
					}
				}
				if ((DVC_CHANGE && KT) || (DVC_CHANGE && LG)) {
					if (
						!nullValidation2(this.inquireRequestDto, [
							'cusName', // 고객명
							'licenseNum1', // 외국인등록번호
							'licenseNum2', // 외국인등록번호
							'licenseIssueDate', // 발급일자
							'ntnlCode', // 국적
						])
					) {
						return true;
					}
				}
				if (NEW || NUM_CHANGE) {
					if (
						!nullValidation2(this.inquireRequestDto, [
							'cusName', // 고객명
							'licenseNum1', // 외국인등록번호
							'licenseNum2', // 외국인등록번호
							'licenseIssueDate', // 발급일자
							'ntnlCode', // 국적
						])
					) {
						return true;
					}
					if (SKT) {
						if (
							!nullValidation2(this.inquireRequestDto, [
								'cusName', // 고객명
								'licenseNum1', // 외국인등록번호
								'licenseNum2', // 외국인등록번호
								'licenseIssueDate', // 발급일자
								'ntnlCode', // 국적
								'licenseExpiredDate', // 만료일자
								'stayCode', // 체류코드
							])
						) {
							return true;
						}
					}
				}
			}
		},
		async copyRequest() {
			// 복붙 요청버튼 fnc
			if (!this.sentenceResFormData.openingStoreId)
				return alert('개통점을 선택해주세요.');
			if (!this.sentenceResFormData.joinType)
				return alert('가입유형을 선택해주세요.');
			if (!this.sentenceResFormData.cusType)
				return alert('고객유형을 선택해주세요.');
			if (!confirm('요청하시겠습니까?')) return;
			if (!this.textData) {
				return alert('요청목록을 작성해주세요.');
			}
			let data = [];
			data = {
				inquireBasicDto: {
					openingStoreId: this.sentenceResFormData.openingStoreId,
					joinType: this.sentenceResFormData.joinType,
					cusType: this.sentenceResFormData.cusType,
					parentHierarchy: this.parentHierarchy,
					creditReqType: 'SENTENCE',
				},
				inquireRequestDto: {
					sentenceReq: this.textData,
				},
				inquireResponseDto: {},
			};
			const result = await this.$store.dispatch(
				'CreditCheckModule/insertCreditInquire',
				data,
			);
			if (result) {
				alert('요청완료되었습니다.');
			}
			let cardData = {
				creditProcStatus: 'REQ',
			};
			await this.$store.dispatch(
				'CreditCheckModule/getCreditInquireCardList',
				cardData,
			);
			await this.getList();
			this.textData = '';
		},
		templateFnc() {
			// 템플릿편집버튼 fnc
			this.templateDialog = true;
		},
		renderingData() {
			this.telFlag = 0;
			this.parentHierarchy = '';
		},
	},
	async created() {
		await this.renderingData();
	},
};
</script>

<style scoped></style>
