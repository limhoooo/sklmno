<template>
	<div>
		<div class="cr_top_select1 disFx justify-center posR">
			<span class="font-size-12 fakeLine7">{{ formData.openStoreName }}</span>
			<span class="font-size-12 ml20 fakeLine7">{{
				formData.joinTypeMsg
			}}</span>
			<span class="font-size-12 ml20">{{ formData.cusTypeMsg }}</span>
			<!--			<select-->
			<!--				class="w120 borderSubColor3 borderRadi3Px lh36 font-size-12"-->
			<!--				v-model.trim="formData.openStoreId"-->
			<!--			>-->
			<!--				<option-->
			<!--					v-for="(item, index) in codeList.openStoreItems"-->
			<!--					:value="item.openStoreId"-->
			<!--					:key="index"-->
			<!--				>-->
			<!--					{{ item.openStoreName }}-->
			<!--				</option>-->
			<!--			</select>-->
			<!--			<select-->
			<!--				class="w120 borderSubColor3 borderRadi3Px lh36 ml5 font-size-12"-->
			<!--				v-model.trim="formData.joinType"-->
			<!--			>-->
			<!--				<option-->
			<!--					v-for="(item, index) in codeList.joinTypeItems"-->
			<!--					:key="index"-->
			<!--					:value="item.value"-->
			<!--				>-->
			<!--					{{ item.name }}-->
			<!--				</option>-->
			<!--			</select>-->
			<!--			<select-->
			<!--				class="w120 borderSubColor3 borderRadi3Px lh36 ml5 font-size-12"-->
			<!--				v-model.trim="formData.cusType"-->
			<!--			>-->
			<!--				<option-->
			<!--					v-for="(item, index) in codeList.customerTypeItems"-->
			<!--					:key="index"-->
			<!--					:value="item.value"-->
			<!--				>-->
			<!--					{{ item.name }}-->
			<!--				</option>-->
			<!--			</select>-->
		</div>
		<div class="disFx">
			<div>
				<textarea
					class="cr_textZone_form1"
					placeholder="신용조회 요청"
					v-model.trim="formData.sentenceReq"
				></textarea>
				<textarea
					placeholder="신용조회 결과"
					class="cr_textZone_form1"
					style="border-top: 1px solid #dde7f5"
					v-model.trim="formData.sentenceRes"
				></textarea>
			</div>
			<table class="cr_middle_table1 font-size-12">
				<!--  개인      -->
				<template v-if="formData.cusType === 'INDV'">
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
								class="regiNumInput outLineNone"
								type="text"
								v-model.trim="formData.cusRegiNumConcat"
								maxlength="13"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								@input="
									regiNumSplitFnc($event.target.value, 'cusRegiNum', 'formData')
								"
							/>
						</td>
					</tr>
					<template v-if="formData.joinType === 'DVC_CHANGE'">
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
				<template v-if="formData.cusType === 'MINORS'">
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
								class="regiNumInput outLineNone"
								type="text"
								v-model.trim="formData.cusRegiNumConcat"
								maxlength="13"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								@input="
									regiNumSplitFnc($event.target.value, 'cusRegiNum', 'formData')
								"
							/>
						</td>
					</tr>
					<template v-if="formData.joinType === 'DVC_CHANGE'">
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
								class="regiNumInput"
								type="text"
								v-model.trim="formData.courtProctorRegiNumConcat"
								maxlength="13"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								:disabled="formData.creditProcStatus !== 'REQ'"
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
				<template v-if="formData.cusType === 'INDV_BSNM'">
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
				<template v-if="formData.cusType === 'CORP'">
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
									class="regiNumInput"
									type="text"
									v-model.trim="formData.bizRegiNumConcat"
									maxlength="13"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
									:disabled="formData.creditProcStatus !== 'REQ'"
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
					<template v-if="formData.joinType === 'DVC_CHANGE'">
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
				<template v-if="formData.cusType === 'FOREIGN'">
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
								class="regiNumInput"
								type="text"
								v-model.trim="formData.licenseNumConcat"
								maxlength="13"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								:disabled="formData.creditProcStatus !== 'REQ'"
								@input="
									regiNumSplitFnc($event.target.value, 'licenseNum', 'formData')
								"
							/>
						</td>
					</tr>
					<template v-if="formData.joinType === 'DVC_CHANGE'">
						<tr>
							<td>휴대폰번호</td>
							<td>
								<input
									type="text"
									class="w20P outLineNone"
									v-model.trim="formData.cusPhone1"
									maxlength="3"
								/>
								<span>-</span>
								<input
									type="text"
									class="w30P outLineNone ml5"
									v-model.trim="formData.cusPhone2"
									maxlength="4"
								/>
								<span>-</span>
								<input
									type="text"
									class="w30P outLineNone ml5"
									v-model.trim="formData.cusPhone3"
									maxlength="4"
								/>
							</td>
						</tr>
						<tr v-if="formData.telecomName !== 'SKT'">
							<td>국적</td>
							<td>
								<!--								<input
									type="text"
									class="w100P outLineNone ml5"
									v-model.trim="formData.ntnlCode"
								/>-->
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
					<template
						v-if="
							formData.telecomName !== 'SKT' ||
							(formData.telecomName === 'SKT' &&
								formData.joinType === 'DVC_CHANGE')
						"
					>
						<tr>
							<td>국적</td>
							<td>
								<!--								<input
									type="text"
									class="w100P outLineNone ml5"
									v-model.trim="formData.ntnlCode"
								/>-->
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
												style="font-size: 11px; height: 100%"
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
				</template>
				<tr
					v-for="(value, key) in formData.creditInquireResult"
					:key="value.index"
				>
					<td>{{ key }}</td>
					<td>
						<input
							type="text"
							class="w100P outLineNone"
							v-model.trim="formData.creditInquireResult[key]"
						/>
					</td>
				</tr>
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
			<!--			카드 요청시 상태값 변경 콜 확인버튼에서 실행-->
			<!--			@change="creditProcStatusFnc(formData, $event.target.value)"-->
			<div class="disFx">
				<select
					id="creditProcStatus"
					class="w80 borderContColor3 borderRadi3Px"
					v-model.trim="formData.creditProcStatus"
				>
					<option value="REQ">요청</option>
					<option value="PROC">진행중</option>
					<option value="COMPL">완료</option>
					<option value="ERR">오류</option>
					<option value="CANCEL">취소</option>
				</select>
			</div>
			<div class="cr_bottom_btn1">
				<button
					@click="crUpdateFnc(formData)"
					class="lh36 padW20 backColorBlue3 mainWhite borderRadi3Px"
				>
					확인
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import numberSplit from '../../../../common/numberSplit.js';

export default {
	namespaced: true,
	data: () => ({
		menu1: false,
		menu2: false,
	}),
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
		cardPagingData: {
			get() {
				return this.$store.state.CreditCheckModule.cardPagingData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.cardPagingData = newValue;
			},
		},
		pagingData: {
			get() {
				return this.$store.state.CreditCheckModule.pagingData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.pagingData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.CreditCheckModule.filterData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.filterData = newValue;
			},
		},
		selectedCard: {
			get() {
				return this.$store.state.CreditCheckModule.selectedCard;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.selectedCard = newValue;
			},
		},
	},
	props: {
		formData: {
			type: Object,
		},
	},
	methods: {
		getList(data) {
			this.$store.dispatch('CreditCheckModule/getCreditInquireList', data);
		},
		async creditProcStatusFnc(item, next) {
			if (!confirm('수정하시겠습니까?')) {
				document.getElementById(
					`creditProcStatus`,
				).value = this.formData.creditProcStatus;
				return;
			}
			document.getElementById(`creditProcStatus`).value = next;
			let data = {
				inquireBasicDto: {
					creditInquireId: item.creditInquireId,
					creditProcStatus: item.creditProcStatus,
				},
			};
			await this.$store.dispatch(
				'CreditCheckModule/updateCreditInquireStatus',
				data,
			);
			let filter = this.filterData;
			filter.pageNo = 1;
			filter.perPageCnt = this.pagingData.perPageCnt;
			filter.cusType = filter.customerType;
			console.log(this.filterData);
			await this.getList(filter);
			/* 상단 카드리스트 */
			let cardData = {
				creditProcStatus: 'REQ',
				perPageCnt: this.cardPagingData.perPageCnt * this.cardPagingData.pageNo,
			};
			await this.$store.dispatch(
				'CreditCheckModule/getCreditInquireCardList',
				cardData,
			);
			this.selectedCard = null;
		},
		async crUpdateFnc(item) {
			if (!confirm('수정하시겠습니까?')) return;
			// obj -> json
			const json = JSON.stringify(item.creditInquireResult);
			// 확인버튼 fnc
			let data = {
				inquireBasicDto: {
					creditInquireId: item.creditInquireId,
					memoContents: item.memoContents,
					cusType: item.cusType,
					creditProcStatus: item.creditProcStatus,
					joinType: item.joinType,
					ctId: item.ctId,
					openingStoreId: item.openStoreId,
				},
				inquireRequestDto: {
					bizName: item.bizName,
					bizNum: item.bizNum,
					bizPhone: item.bizPhone,
					bizPhone1: item.bizPhone1,
					bizPhone2: item.bizPhone2,
					bizPhone3: item.bizPhone3,
					bizRegiNum1: item.bizRegiNum1,
					bizRegiNum2: item.bizRegiNum2,
					bizRegiNumConcat: item.joinType,
					courtProctorName: item.courtProctorName,
					courtProctorPhone: item.courtProctorPhone,
					courtProctorPhone1: item.courtProctorPhone1,
					courtProctorPhone2: item.courtProctorPhone2,
					courtProctorPhone3: item.courtProctorPhone3,
					courtProctorRegiNum1: item.courtProctorRegiNum1,
					courtProctorRegiNum2: item.courtProctorRegiNum2,
					courtProctorRegiNumConcat: item.courtProctorRegiNumConcat,
					creditInquireId: item.creditInquireId,
					cusName: item.cusName,
					cusPhone: item.cusPhone,
					cusPhone1: item.cusPhone1,
					cusPhone2: item.cusPhone2,
					cusPhone3: item.cusPhone3,
					cusRegiNum1: item.cusRegiNum1,
					cusRegiNum2: item.cusRegiNum2,
					cusRegiNumConcat: item.cusRegiNumConcat,
					licenseAuthType: item.licenseAuthType,
					licenseExpiredDate: item.licenseExpiredDate,
					licenseIssueArea: item.licenseIssueArea,
					licenseIssueDate: item.licenseIssueDate,
					licenseNum1: item.licenseNum1,
					licenseNum2: item.licenseNum2,
					licenseNum3: item.licenseNum3,
					licenseNumConcat: item.licenseNumConcat,
					ntnlCode: item.ntnlCode,
					sentenceReq: item.sentenceReq,
					stayCode: item.stayCode,
				},
				inquireResponseDto: {
					creditInquireId: item.creditInquireId,
					sentenceRes: item.sentenceRes,
					creditInquireResult: json,
				},
			};
			await this.$store.dispatch('CreditCheckModule/updateCreditInquire', data);
			this.filterData.perPageCnt = 20;
			await this.$store.dispatch(
				'CreditCheckModule/getCreditInquireList',
				this.filterData,
			);
		},
	},
};
</script>
<style scoped>
.fixText {
	width: 100%;
	height: 32px;
	padding: 0 10px;
	font-size: 12px;
	display: block;
	background-color: #fbfbfb;
}
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
