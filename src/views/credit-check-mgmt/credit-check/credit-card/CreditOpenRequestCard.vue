<template>
	<div>
		<div
			class="cr_top_select1 posR"
			style="display: flex; flex-direction: column; width: 385px"
		>
			<div class="disFx justify-center h40">
				<!--				<select
					class="w150 borderSubColor3 borderRadi3Px lh36 font-size-12 normalWt"
					v-model.trim="selectData.saleStoreId"
					@change="saleStoreFnc"
				>
					<option hidden value="">영업점</option>
					<option
						v-for="(item, index) in codeList.saleStoreItems"
						:value="item.storeId"
						:key="index"
					>
						{{ item.storeName }}
					</option>
				</select>
				<select
					class="w150 borderSubColor3 borderRadi3Px lh36 font-size-12 ml20 normalWt"
					v-model.trim="selectData.openStoreId"
					@change="openStoreFnc($event.target.selectedIndex)"
				>
					<option hidden value="">개통점</option>
					<option
						v-for="(item, index) in codeList.openStoreItems"
						:value="item.openStoreId"
						:key="index"
						@change="openStoreFnc(item, index)"
					>
						{{ item.openStoreName }}
					</option>
				</select>-->
				<div class="selectCustom w150">
					<v-autocomplete
						style="font-size: 12px; font-weight: normal !important"
						placeholder="영업점"
						class="AutoCompleteCustom"
						outlined
						v-model.trim="selectData.saleStoreId"
						:items="codeList.saleStoreItems"
						item-text="storeName"
						item-value="storeId"
						@change="saleStoreFnc"
					></v-autocomplete>
				</div>
				<div class="selectCustom ml20 w150">
					<v-autocomplete
						style="font-size: 12px; font-weight: normal !important"
						placeholder="개통점"
						class="AutoCompleteCustom"
						outlined
						v-model.trim="selectData.openStoreId"
						:items="codeList.selectOpenStoreItems"
						item-text="openStoreName"
						item-value="openStoreId"
						@change="openStoreFnc"
						return-object
					></v-autocomplete>
				</div>
			</div>
			<div class="disFx justify-center mt10">
				<select
					class="w150 borderContColor3 borderRadi3Px lh36 font-size-12 normalWt posR"
					v-model.trim="selectData.joinType"
					@change="joinTypeFnc"
				>
					<option hidden value="">가입유형</option>
					<option
						v-for="(item, index) in codeList.joinTypeItems"
						:key="index"
						:value="item.value"
					>
						{{ item.name }}
					</option>
				</select>
				<select
					class="w150 borderContColor3 borderRadi3Px lh36 font-size-12 ml20 normalWt posR"
					v-model.trim="selectData.cusType"
					@change="cusTypeFnc"
				>
					<option hidden value="">고객유형</option>
					<option
						v-for="(item, index) in codeList.customerTypeItems"
						:key="index"
						:value="item.value"
					>
						{{ item.name }}
					</option>
				</select>
			</div>
		</div>
		<div class="disFx">
			<div>
				<textarea
					class="cr_textZone_form1"
					placeholder="신용조회 요청"
					v-model.trim="formData.requestText"
				></textarea>
				<textarea
					placeholder="신용조회 결과"
					class="cr_textZone_form1"
					style="border-top: 1px solid #dde7f5"
					v-model.trim="formData.responseText"
				></textarea>
			</div>
			<table class="cr_middle_table1 font-size-12">
				<template v-if="!selectData.cusType || !requestCard">
					<tr>
						<td>위 선택창에서 유형을 선택해주세요.</td>
					</tr>
				</template>
				<template v-if="selectData.cusType === 'INDV'">
					<tr>
						<td class="w80">고객명</td>
						<td class="w180">
							<input
								type="text"
								class="w100P outLineNone"
								v-model.trim="formData.cusName"
							/>
						</td>
					</tr>
					<tr>
						<td>주민등록번호</td>
						<td>
							<input
								type="text"
								class="w100P outLineNone"
								v-model.trim="formData.cusRegiNum"
								maxlength="13"
								@input="
									regiNumSplitFnc($event.target.value, 'cusRegiNum', 'formData')
								"
							/>
						</td>
					</tr>
					<template v-if="selectData.joinType === 'DVC_CHANGE'">
						<tr>
							<td>휴대폰번호</td>
							<td>
								<input
									type="text"
									class="w100P outLineNone"
									v-model.trim="formData.cusPhone"
									@input="
										phoneNumSplitFnc(
											$event.target.value,
											'cusPhone',
											'formData',
										)
									"
								/>
							</td>
						</tr>
					</template>
				</template>
				<!--  미성년자      -->
				<template v-if="selectData.cusType === 'MINORS'">
					<tr>
						<td class="w80">고객명</td>
						<td class="w180">
							<input
								type="text"
								class="w100P outLineNone"
								v-model.trim="formData.cusName"
							/>
						</td>
					</tr>
					<tr>
						<td>주민등록번호</td>
						<td>
							<input
								type="text"
								class="w100P outLineNone"
								v-model.trim="formData.cusRegiNum"
								maxlength="13"
								@input="
									regiNumSplitFnc($event.target.value, 'cusRegiNum', 'formData')
								"
							/>
						</td>
					</tr>
					<template v-if="selectData.joinType === 'DVC_CHANGE'">
						<tr>
							<td>휴대폰번호</td>
							<td>
								<input
									type="text"
									class="w100P outLineNone"
									v-model.trim="formData.cusPhone"
									@input="
										phoneNumSplitFnc(
											$event.target.value,
											'cusPhone',
											'formData',
										)
									"
								/>
							</td>
						</tr>
					</template>
					<tr>
						<td>법정대리인성명</td>
						<td>
							<input
								type="text"
								class="w100P outLineNone"
								v-model.trim="formData.courtProctorName"
							/>
						</td>
					</tr>
					<tr>
						<td>법정대리인<br />주민등록번호</td>
						<td>
							<input
								type="text"
								class="w100P outLineNone"
								v-model.trim="formData.courtProctorRegiNum"
								maxlength="13"
								@input="
									regiNumSplitFnc(
										$event.target.value,
										'courtProctorRegiNum',
										'formData',
									)
								"
							/>
						</td>
					</tr>
					<tr>
						<td>법정대리인<br />휴대폰번호</td>
						<td>
							<input
								type="text"
								class="w100P outLineNone"
								v-model.trim="formData.courtProctorPhone"
								@input="
									phoneNumSplitFnc(
										$event.target.value,
										'courtProctorPhone',
										'formData',
									)
								"
							/>
						</td>
					</tr>
				</template>
				<!--  개인사업자      -->
				<template v-if="selectData.cusType === 'INDV_BSNM'">
					<template v-if="formData.telecomName !== 'KT'">
						<tr>
							<td class="w80">사업자명</td>
							<td class="w180">
								<input
									type="text"
									class="w100P outLineNone"
									v-model.trim="formData.cusName"
								/>
							</td>
						</tr>
						<tr>
							<td>사업자번호</td>
							<td>
								<input
									type="text"
									class="w40P outLineNone"
									v-model.trim="formData.bizNum"
									maxlength="10"
								/>
							</td>
						</tr>
						<tr>
							<td>휴대폰번호</td>
							<td>
								<input
									type="text"
									class="w100P outLineNone"
									v-model.trim="formData.cusPhone"
									@input="
										phoneNumSplitFnc(
											$event.target.value,
											'cusPhone',
											'formData',
										)
									"
								/>
							</td>
						</tr>
					</template>
				</template>
				<!--  법인      -->
				<template v-if="selectData.cusType === 'CORP'">
					<tr>
						<td class="w80">법인명</td>
						<td class="w180">
							<input
								type="text"
								class="w100P outLineNone"
								v-model.trim="formData.bizName"
							/>
						</td>
					</tr>
					<tr>
						<td>사업자번호</td>
						<td>
							<input
								type="text"
								class="w100P outLineNone"
								v-model.trim="formData.bizNum"
								maxlength="10"
							/>
						</td>
					</tr>
					<template v-if="formData.joinType !== 'DVC_CHANGE'">
						<tr>
							<td>법인등록번호</td>
							<td>
								<input
									type="text"
									class="w100P outLineNone"
									v-model.trim="formData.bizRegiNum"
									maxlength="13"
									@input="
										regiNumSplitFnc(
											$event.target.value,
											'bizRegiNum',
											'formData',
										)
									"
								/>
							</td>
						</tr>
					</template>
					<template v-if="selectData.joinType === 'DVC_CHANGE'">
						<tr>
							<td>휴대폰번호</td>
							<td>
								<input
									type="text"
									class="w100P outLineNone"
									v-model.trim="formData.cusPhone"
									@input="
										phoneNumSplitFnc(
											$event.target.value,
											'cusPhone',
											'formData',
										)
									"
								/>
							</td>
						</tr>
					</template>
				</template>
				<!--  외국인      -->
				<template v-if="selectData.cusType === 'FOREIGN'">
					<tr>
						<td>고객명</td>
						<td>
							<input
								type="text"
								class="w100P outLineNone"
								v-model.trim="formData.cusName"
							/>
						</td>
					</tr>
					<tr>
						<td>외국인등록번호</td>
						<td>
							<input
								type="text"
								class="w100P outLineNone"
								v-model.trim="formData.licenseNum"
								maxlength="13"
								@input="
									regiNumSplitFnc($event.target.value, 'licenseNum', 'formData')
								"
							/>
						</td>
					</tr>
					<template v-if="selectData.joinType === 'DVC_CHANGE'">
						<tr>
							<td>휴대폰번호</td>
							<td>
								<input
									type="text"
									class="w100P outLineNone"
									v-model.trim="formData.cusPhone"
									@input="
										phoneNumSplitFnc(
											$event.target.value,
											'cusPhone',
											'formData',
										)
									"
								/>
							</td>
						</tr>
					</template>
					<tr v-if="formData.telecomName === 'SKT'">
						<td>체류코드</td>
						<td>
							<input
								type="text"
								class="w100P outLineNone ml5"
								v-model.trim="formData.stayCode"
							/>
						</td>
					</tr>
					<template>
						<tr>
							<td>발급일자</td>
							<td style="padding: 0">
								<div class="datePickerTable10 h30" style="margin-left: 10px">
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
												style="font-size: 11px; font-weight: bold; height: 100%"
												class="w100p"
												outlined
												readonly
												v-bind="attrs"
												v-on="on"
												append-icon="mdi-calendar"
												v-model.trim="formData.licenseIssueDate"
											></v-text-field>
										</template>
										<v-date-picker
											@input="menu1 = false"
											locale="ko-KR"
											v-model.trim="formData.licenseIssueDate"
										></v-date-picker>
									</v-menu>
								</div>
							</td>
						</tr>
					</template>
					<tr v-if="formData.telecomName === 'SKT'">
						<td>만료일자</td>
						<td style="padding: 0">
							<div class="datePickerTable10 h30" style="margin-left: 10px">
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
											style="font-size: 11px; font-weight: bold; height: 100%"
											class="w100p"
											outlined
											readonly
											v-bind="attrs"
											v-on="on"
											append-icon="mdi-calendar"
											v-model.trim="formData.licenseExpiredDate"
										></v-text-field>
									</template>
									<v-date-picker
										@input="menu2 = false"
										locale="ko-KR"
										v-model.trim="formData.licenseExpiredDate"
									></v-date-picker>
								</v-menu>
							</div>
						</td>
					</tr>
					<template v-if="formData.telecomName !== 'SKT'">
						<tr>
							<td>국적</td>
							<td>
								<select
									class="w100P font-size-12 outLineNone"
									v-model.trim="formData.ntnlCode"
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
						</tr>
					</template>
				</template>
				<template v-if="selectData.cusType">
					<tr v-for="(value, key) in requestCard" :key="value.index">
						<td>{{ key }}</td>
						<td>
							<input
								type="text"
								class="w100P outLineNone"
								v-model.trim="requestCard[key]"
							/>
						</td>
					</tr>
				</template>
			</table>
		</div>
		<textarea
			v-model.trim="formData.memoContents"
			class="cr_memo1 pad10 font-size-12"
			placeholder="메모를 입력해 주세요."
		></textarea>
		<div
			class="cr_bottom_cont1 disFx justify-lg-space-between font-size-12"
			style="
				position: absolute;
				bottom: 0;
				width: 385px;
				margin-top: 80px !important;
			"
		>
			<div class="disFx">
				<select
					class="w80 borderContColor3 borderRadi3Px"
					v-model.trim="formData.creditProcStatus"
					style="font-weight: normal !important"
				>
					<option value="REQ">요청</option>
					<option value="PROC">진행중</option>
					<option value="COMPL">완료</option>
					<option value="ERR">오류</option>
				</select>
			</div>
			<div class="cr_bottom_btn1">
				<button
					class="lh36 padW20 backColorBlue3 mainWhite borderRadi3Px"
					@click="formRequestFnc"
				>
					확인
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import numberSplit from '../../../../common/numberSplit.js';
import { nullValidation2 } from '@/common/common';

export default {
	name: 'CreditOpenRequestCard',
	mixins: [numberSplit],
	computed: {
		codeList: {
			get() {
				return this.$store.state.CreditCheckModule.codeList;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.codeList = newValue;
			},
		},
		requestCard: {
			get() {
				return this.$store.state.CreditCheckModule.requestCard;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.requestCard = newValue;
			},
		},
		selectedCtId: {
			get() {
				return this.$store.state.CreditCheckModule.selectedCtId;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.selectedCtId = newValue;
			},
		},
	},
	data: () => ({
		menu1: false,
		menu2: false,
		telFlag: '',
		selectData: {
			saleStoreId: '',
			openStoreId: '',
			joinType: '',
			cusType: '',
			parentHierarchy: '',
		},
		formData: {
			requestText: '',
			responseText: '',
			memoContents: '',
			creditProcStatus: 'REQ',
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
	}),
	methods: {
		formDataInit() {
			for (let data in this.formData) {
				this.formData[data] = '';
			}
			this.formData.creditProcStatus = 'REQ';
			this.formData.stayCode = null;
			this.formData.ntnlCode = null;
		},
		selectDataInit() {
			for (let data in this.selectData) {
				this.selectData[data] = '';
			}
		},
		saleStoreFnc() {
			this.requestCard = null;
			this.formDataInit();
			let openStoreId = { storeId: this.selectData.saleStoreId };
			this.$store.dispatch(
				'CreditCheckModule/getOpeningStoreSelectList',
				openStoreId,
			);
			if (
				this.selectData.saleStoreId &&
				this.selectData.openStoreId &&
				this.selectData.joinType
			) {
				let data = {
					openingStoreId: this.selectData.openStoreId,
					saleStoreId: this.selectData.saleStoreId,
					joinType: this.selectData.joinType,
				};
				this.$store.dispatch('CreditCheckModule/getCreditTemplate', data);
			}
		},
		openStoreFnc() {
			this.requestCard = null;
			this.formDataInit();

			// 영업점에 따른 개통점 리스트콜
			if (!this.selectData.saleStoreId) {
				alert('영업점을 선택해주세요.');
				return (this.selectData.openStoreId = {});
			}
			this.telFlag = this.selectData.openStoreId.telecom;
			this.selectData.parentHierarchy = this.selectData.openStoreId.parentHierarchy;
			// 영업점 데이터 통해 통신사정보 획득
			if (this.telFlag === 5) {
				this.telFlag = 'SKT';
			} else if (this.telFlag === 6) {
				this.telFlag = 'KT';
			} else if (this.telFlag === 7) {
				this.telFlag = 'LG';
			}
			if (
				this.selectData.saleStoreId &&
				this.selectData.openStoreId &&
				this.selectData.joinType
			) {
				let data = {
					openingStoreId: this.selectData.openStoreId.openStoreId,
					saleStoreId: this.selectData.saleStoreId,
					joinType: this.selectData.joinType,
				};
				this.$store.dispatch('CreditCheckModule/getCreditTemplate', data);
			}
		},
		joinTypeFnc() {
			this.formDataInit();
			this.requestCard = null;
			if (!this.selectData.saleStoreId) {
				alert('영업점을 선택해주세요.');
				return (this.selectData.joinType = '');
			} else if (!this.selectData.openStoreId) {
				alert('개통점을 선택해주세요.');
				return (this.selectData.joinType = '');
			}
			let data = {
				openingStoreId: this.selectData.openStoreId.openStoreId,
				saleStoreId: this.selectData.saleStoreId,
				joinType: this.selectData.joinType,
			};
			this.$store.dispatch('CreditCheckModule/getCreditTemplate', data);
		},
		cusTypeFnc() {
			this.formDataInit();
			if (!this.selectData.saleStoreId) {
				alert('영업점을 선택해주세요.');
				return (this.selectData.cusType = '');
			} else if (!this.selectData.openStoreId) {
				alert('개통점을 선택해주세요.');
				return (this.selectData.cusType = '');
			} else if (!this.selectData.joinType) {
				alert('가입유형을 선택해주세요.');
				return (this.selectData.cusType = '');
			}
			if (this.telFlag === 'KT' && this.selectData.cusType === 'INDV_BSNM') {
				alert(
					'선택하신 개통점(KT) 는 개인사업자의 신용조회를 지원하지 않습니다',
				);
				return (this.selectData.cusType = '');
			}
		},
		async formRequestFnc() {
			// 폼영역 요청버튼 fnc
			if (!this.selectData.saleStoreId) return alert('영업점을 선택해주세요.');
			if (!this.selectData.openStoreId) return alert('개통점을 선택해주세요.');
			if (!this.selectData.joinType) return alert('가입유형을 선택해주세요.');
			if (!this.selectData.cusType) return alert('고객유형을 선택해주세요.');

			if (!confirm('저장하시겠습니까?')) return;
			const json = JSON.stringify(this.requestCard);
			let data = [];
			data = {
				inquireBasicDto: {
					openingStoreId: this.selectData.openStoreId.openStoreId,
					saleStoreId: this.selectData.saleStoreId,
					joinType: this.selectData.joinType,
					cusType: this.selectData.cusType,
					parentHierarchy: this.selectData.parentHierarchy,
					creditProcStatus: this.formData.creditProcStatus,
					memoContents: this.formData.memoContents,
					ctId: this.selectedCtId,
				},
				inquireRequestDto: {
					cusName: this.formData.cusName,
					cusPhone: this.formData.cusPhone,
					licenseNum: this.formData.licenseNum,
					ntnlCode: this.formData.ntnlCode,
					licenseIssueDate: this.formData.licenseIssueDate,
					licenseNumConcat: this.formData.licenseNumConcat,
					licenseNum1: this.formData.licenseNum1,
					licenseNum2: this.formData.licenseNum2,
					cusPhone1: this.formData.cusPhone1,
					cusPhone2: this.formData.cusPhone2,
					cusPhone3: this.formData.cusPhone3,
					cusRegiNum: this.formData.cusRegiNum,
					cusRegiNum1: this.formData.cusRegiNum1,
					cusRegiNum2: this.formData.cusRegiNum2,
					stayCode: this.formData.stayCode,
					licenseExpiredDate: this.formData.licenseExpiredDate,
					sentenceReq: this.formData.requestText,
				},
				inquireResponseDto: {
					creditInquireResult: json,
					sentenceRes: this.formData.responseText,
				},
			};
			if (this.selectData.cusType === 'INDV') {
				data.inquireRequestDto = {};
				data.inquireRequestDto.cusName = this.formData.cusName;
				data.inquireRequestDto.cusPhone = this.formData.cusPhone;
				data.inquireRequestDto.cusPhone1 = this.formData.cusPhone1;
				data.inquireRequestDto.cusPhone2 = this.formData.cusPhone2;
				data.inquireRequestDto.cusPhone3 = this.formData.cusPhone3;
				data.inquireRequestDto.cusRegiNum = this.formData.cusRegiNum;
				data.inquireRequestDto.cusRegiNum1 = this.formData.cusRegiNum1;
				data.inquireRequestDto.cusRegiNum2 = this.formData.cusRegiNum2;
				data.inquireRequestDto.sentenceReq = this.formData.requestText;
			}
			if (this.selectData.cusType === 'MINORS') {
				data.inquireRequestDto = {};
				data.inquireRequestDto.cusName = this.formData.cusName;
				data.inquireRequestDto.cusPhone = this.formData.cusPhone;
				data.inquireRequestDto.cusPhone1 = this.formData.cusPhone1;
				data.inquireRequestDto.cusPhone2 = this.formData.cusPhone2;
				data.inquireRequestDto.cusPhone3 = this.formData.cusPhone3;
				data.inquireRequestDto.cusRegiNum = this.formData.cusRegiNum;
				data.inquireRequestDto.cusRegiNum1 = this.formData.cusRegiNum1;
				data.inquireRequestDto.cusRegiNum2 = this.formData.cusRegiNum2;
				data.inquireRequestDto.courtProctorName = this.formData.courtProctorName;
				data.inquireRequestDto.courtProctorPhone = this.formData.courtProctorPhone;
				data.inquireRequestDto.courtProctorPhone1 = this.formData.courtProctorPhone1;
				data.inquireRequestDto.courtProctorPhone2 = this.formData.courtProctorPhone2;
				data.inquireRequestDto.courtProctorPhone3 = this.formData.courtProctorPhone3;
				data.inquireRequestDto.courtProctorRegiNum = this.formData.courtProctorRegiNum;
				data.inquireRequestDto.courtProctorRegiNum1 = this.formData.courtProctorRegiNum1;
				data.inquireRequestDto.courtProctorRegiNum2 = this.formData.courtProctorRegiNum2;
				data.inquireRequestDto.sentenceReq = this.formData.requestText;
			}
			if (this.selectData.cusType === 'INDV_BSNM') {
				data.inquireRequestDto = {};
				data.inquireRequestDto.bizName = this.formData.bizName;
				data.inquireRequestDto.bizNum = this.formData.bizNum;
				data.inquireRequestDto.bizPhone = this.formData.bizPhone;
				data.inquireRequestDto.bizPhone1 = this.formData.bizPhone1;
				data.inquireRequestDto.bizPhone2 = this.formData.bizPhone2;
				data.inquireRequestDto.bizPhone3 = this.formData.bizPhone3;
				data.inquireRequestDto.sentenceReq = this.formData.requestText;
			}
			if (this.selectData.cusType === 'CORP') {
				data.inquireRequestDto = {};
				data.inquireRequestDto.bizName = this.formData.bizName;
				data.inquireRequestDto.bizNum = this.formData.bizNum;
				data.inquireRequestDto.bizPhone = this.formData.bizPhone;
				data.inquireRequestDto.bizPhone1 = this.formData.bizPhone1;
				data.inquireRequestDto.bizPhone2 = this.formData.bizPhone2;
				data.inquireRequestDto.bizPhone3 = this.formData.bizPhone3;
				data.inquireRequestDto.bizRegiNum = this.formData.bizRegiNum;
				data.inquireRequestDto.bizRegiNum1 = this.formData.bizRegiNum1;
				data.inquireRequestDto.bizRegiNum2 = this.formData.bizRegiNum2;
				data.inquireRequestDto.sentenceReq = this.formData.requestText;
			}

			for (let key in this.requestCard) {
				if (!this.requestCard[key]) {
					if (!this.formData.requestText) {
						if (this.validationRuleFnc()) return; // 필수값처리
					}
					data.inquireBasicDto.creditReqType = 'ITEMS';
				}
				if (this.formData.requestText) {
					data.inquireBasicDto.creditReqType = 'SENTENCE';
				}
			}
			const result = await this.$store.dispatch(
				'CreditCheckModule/insertCreditInquireStore',
				data,
			);
			if (result) {
				if (result.data.resultCode === '9999') {
					return alert('요청실패하였습니다.');
				} else {
					alert('저장완료하였습니다.');
				}
			}
			await this.$store.dispatch('CreditCheckModule/getCreditInquireCardList');
			await this.$store.dispatch('CreditCheckModule/getCreditInquireList');
			await this.formDataInit();
			await this.selectDataInit();
			this.requestCard = null;
		},
		validationRuleFnc() {
			if (this.crValidationFnc()) return true;
		},
		crValidationFnc() {
			const NEW = this.selectData.joinType === 'NEW'; // 신규가입
			const DVC_CHANGE = this.selectData.joinType === 'DVC_CHANGE'; // 기기변경
			const NUM_CHANGE = this.selectData.joinType === 'NUM_CHANGE'; // 번호이동
			const SKT = this.telFlag === 'SKT';
			const KT = this.telFlag === 'KT';
			const LG = this.telFlag === 'LG';
			const INDV = this.selectData.cusType === 'INDV';
			const MINORS = this.selectData.cusType === 'MINORS';
			const INDV_BSNM = this.selectData.cusType === 'INDV_BSNM';
			const CORP = this.selectData.cusType === 'CORP';
			const FOREIGN = this.selectData.cusType === 'FOREIGN';
			if (INDV) {
				if (
					!nullValidation2(this.formData, [
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
					!nullValidation2(this.formData, [
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
					!nullValidation2(this.formData, [
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
						!nullValidation2(this.formData, [
							'bizName', // 사업자명
							'bizNum', // 사업자번호
						])
					) {
						return true;
					}
				}
				if (NEW || NUM_CHANGE) {
					if (
						!nullValidation2(this.formData, [
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
						!nullValidation2(this.formData, [
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
						!nullValidation2(this.formData, [
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
						!nullValidation2(this.formData, [
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
							!nullValidation2(this.formData, [
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
		renderingFnc() {
			this.formDataInit();
			this.selectDataInit();
			this.requestCard = null;
			this.selectedCtId = null;
		},
	},
	created() {
		this.renderingFnc();
	},
	beforeDestroy() {
		this.formDataInit();
		this.selectDataInit();
	},
};
</script>

<style scoped>
.cr_textZone_form1 {
	width: 100%;
	height: 50%;
	min-height: 125px;
	padding: 10px;
	font-size: 11px;
	resize: none;
}
.cr_textZone_form1:focus {
	outline: none;
}
</style>
