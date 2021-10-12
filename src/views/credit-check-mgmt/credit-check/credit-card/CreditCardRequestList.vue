<template>
	<span>
		<!--  개인      -->
		<template v-if="item.creditReqType === 'ITEMS'">
			<template v-if="item.cusType === 'INDV'">
				<ul class="itemRequestUl">
					<li class="itemRequestLi">
						<span>고객명</span>
						<div class="itemRequestInput">
							<input
								class="textInput"
								type="text"
								v-model.trim="item.cusName"
							/>
						</div>
					</li>
					<li class="itemRequestLi">
						<span>주민등록번호</span>
						<div class="itemRequestInput">
							<input
								class="regiNumInput"
								type="text"
								v-model.trim="item.cusRegiNumConcat"
								maxlength="13"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								@input="
									$event.target.value,
										regiNumSplitFnc($event.target.value, 'cusRegiNum', 'item')
								"
							/>
						</div>
					</li>
					<li class="itemRequestLi" v-if="item.joinType === 'DVC_CHANGE'">
						<span>휴대폰번호</span>
						<div class="itemRequestInput">
							<input
								type="text"
								v-model.trim="item.cusPhone"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								maxlength="11"
								@input="
									phoneNumSplitFnc($event.target.value, 'cusPhone', 'item')
								"
							/>
						</div>
					</li>
				</ul>
			</template>
			<!--  미성년자      -->
			<template v-if="item.cusType === 'MINORS'">
				<ul class="itemRequestUl">
					<li class="itemRequestLi">
						<span>고객명</span>
						<div class="itemRequestInput">
							<input
								class="textInput"
								type="text"
								v-model.trim="item.cusName"
							/>
						</div>
					</li>
					<li class="itemRequestLi">
						<span>주민등록번호</span>
						<div class="itemRequestInput">
							<input
								class="regiNumInput"
								type="text"
								v-model.trim="item.cusRegiNumConcat"
								maxlength="13"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								@input="
									regiNumSplitFnc($event.target.value, 'cusRegiNum', 'item')
								"
							/>
						</div>
					</li>
					<li class="itemRequestLi" v-if="item.joinType === 'DVC_CHANGE'">
						<span>휴대폰번호</span>
						<div class="itemRequestInput">
							<input
								type="text"
								class="w180 borderRadi3Px lh30"
								v-model.trim="item.cusPhone"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								maxlength="11"
								@input="
									phoneNumSplitFnc($event.target.value, 'cusPhone', 'item')
								"
							/>
						</div>
					</li>
					<li class="itemRequestLi">
						<span style="text-align: left; line-height: 16px"
							>법정대리인<br />성명</span
						>
						<div class="itemRequestInput">
							<input
								class="textInput"
								type="text"
								v-model.trim="item.courtProctorName"
							/>
						</div>
					</li>
					<li class="itemRequestLi" style="line-height: 28px">
						<span style="text-align: left; line-height: 16px"
							>법정대리인<br />주민등록번호<br
						/></span>
						<div class="itemRequestInput">
							<input
								class="regiNumInput"
								type="text"
								v-model.trim="item.courtProctorRegiNumConcat"
								maxlength="13"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								@input="
									regiNumSplitFnc(
										$event.target.value,
										'courtProctorRegiNum',
										'item',
									)
								"
							/>
						</div>
					</li>
					<li class="itemRequestLi" style="line-height: 28px">
						<span style="text-align: left; line-height: 16px"
							>법정대리인<br />휴대폰번호<br
						/></span>
						<div class="itemRequestInput">
							<input
								type="text"
								class="w180 borderRadi3Px lh30"
								v-model.trim="item.courtProctorPhone"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								maxlength="11"
								@input="
									phoneNumSplitFnc(
										$event.target.value,
										'courtProctorPhone',
										'item',
									)
								"
							/>
						</div>
					</li>
				</ul>
			</template>
			<!--  개인사업자      -->
			<template v-if="item.cusType === 'INDV_BSNM'">
				<template v-if="item.telecomName !== 'KT'">
					<ul class="itemRequestUl">
						<li class="itemRequestLi">
							<span>사업자명</span>
							<div class="itemRequestInput">
								<input
									class="textInput"
									type="text"
									v-model.trim="item.bizName"
								/>
							</div>
						</li>
						<li class="itemRequestLi">
							<span>사업자번호</span>
							<div class="itemRequestInput">
								<input
									class="textInput"
									type="text"
									maxlength="10"
									v-model.trim="item.bizNum"
								/>
							</div>
						</li>
						<li class="itemRequestLi">
							<span>휴대폰번호</span>
							<div class="itemRequestInput">
								<input
									type="text"
									class="w180 borderRadi3Px lh30"
									v-model.trim="item.bizPhone"
									oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
									maxlength="11"
									@input="
										phoneNumSplitFnc($event.target.value, 'bizPhone', 'item')
									"
								/>
							</div>
						</li>
					</ul>
				</template>
			</template>
			<!--  법인      -->
			<template v-if="item.cusType === 'CORP'">
				<ul class="itemRequestUl">
					<li class="itemRequestLi">
						<span>법인명</span>
						<div class="itemRequestInput">
							<input
								class="textInput"
								type="text"
								v-model.trim="item.bizName"
							/>
						</div>
					</li>
					<li class="itemRequestLi">
						<span>사업자번호</span>
						<div class="itemRequestInput">
							<input
								class="textInput"
								type="text"
								maxlength="10"
								v-model.trim="item.bizNum"
							/>
						</div>
					</li>
					<li class="itemRequestLi" v-if="item.joinType !== 'DVC_CHANGE'">
						<span>법인번호</span>
						<div class="itemRequestInput">
							<input
								class="regiNumInput"
								type="text"
								v-model.trim="item.bizRegiNumConcat"
								maxlength="13"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								@input="
									regiNumSplitFnc($event.target.value, 'bizRegiNum', 'item')
								"
							/>
						</div>
					</li>
					<li class="itemRequestLi" v-if="item.joinType === 'DVC_CHANGE'">
						<span>휴대폰번호</span>
						<div class="itemRequestInput">
							<input
								type="text"
								class="w180 borderRadi3Px lh30"
								v-model.trim="item.bizPhone"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								maxlength="11"
								@input="
									phoneNumSplitFnc($event.target.value, 'bizPhone', 'item')
								"
							/>
						</div>
					</li>
				</ul>
			</template>
			<!--  외국인      -->
			<template v-if="item.cusType === 'FOREIGN'">
				<ul class="itemRequestUl">
					<li class="itemRequestLi">
						<span>고객명</span>
						<div class="itemRequestInput">
							<input
								class="textInput"
								type="text"
								v-model.trim="item.cusName"
							/>
						</div>
					</li>
					<li class="itemRequestLi">
						<span style="text-align: left; line-height: 16px"
							>외국인<br />등록번호</span
						>
						<div class="itemRequestInput">
							<input
								class="regiNumInput"
								type="text"
								v-model.trim="item.licenseNumConcat"
								maxlength="13"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								@input="
									regiNumSplitFnc($event.target.value, 'licenseNum', 'item')
								"
							/>
						</div>
					</li>
					<li class="itemRequestLi" v-if="item.joinType === 'DVC_CHANGE'">
						<span>휴대폰번호 </span>
						<div class="itemRequestInput">
							<input
								type="text"
								class="w180 borderRadi3Px lh30"
								v-model.trim="item.cusPhone"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
								maxlength="11"
								@input="
									phoneNumSplitFnc($event.target.value, 'cusPhone', 'item')
								"
							/>
						</div>
					</li>
					<li
						class="itemRequestLi"
						v-if="
							(item.joinType === 'DVC_CHANGE' && item.telecomName !== 'SKT') ||
							item.joinType !== 'DVC_CHANGE'
						"
					>
						<span>국적</span>
						<div class="itemRequestInput">
							<select
								class="w100P font-size-12"
								v-model.trim="item.ntnlCode"
								@change="initCodeMsg('ntnlCode')"
							>
								<option
									v-for="(item, index) in codeList.nationalItems"
									:key="index"
									:value="item.value"
								>
									{{ item.name }}
								</option>
							</select>
						</div>
					</li>
					<li class="itemRequestLi" v-if="item.telecomName === 'SKT'">
						<span>체류코드</span>
						<div class="itemRequestInput">
							<select
								class="w100P font-size-12"
								v-model.trim="item.stayCode"
								@change="initCodeMsg('stayCode')"
							>
								<option
									v-for="(item, index) in codeList.stayCodeItems"
									:key="index"
									:value="item.value"
								>
									{{ item.name }}
								</option>
							</select>
						</div>
					</li>
					<li
						class="itemRequestLi"
						v-if="
							item.telecomName !== 'SKT' ||
							(item.telecomName === 'SKT' && item.joinType !== 'DVC_CHANGE')
						"
					>
						<span>발급일자</span>
						<div class="itemRequestInput">
							<div class="datePickerTable9 h30">
								<v-menu
									v-model.trim="menu1[index]"
									:close-on-content-click="false"
									:nudge-right="90"
									:nudge-top="200"
									transition="scale-transition"
									offset-y
									:attach="true"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											style="font-size: 12px; height: 100%"
											outlined
											readonly
											v-bind="attrs"
											v-on="on"
											append-icon="mdi-calendar"
											v-model.trim="item.licenseIssueDate"
										></v-text-field>
									</template>
									<v-date-picker
										@input="menu1[index] = false"
										locale="ko-KR"
										v-model.trim="item.licenseIssueDate"
									></v-date-picker>
								</v-menu>
							</div>
						</div>
					</li>
					<li class="itemRequestLi" v-if="item.telecomName === 'SKT'">
						<span>만료일자</span>
						<div class="itemRequestInput">
							<div class="datePickerTable9 h30">
								<v-menu
									v-model.trim="menu2[index]"
									:close-on-content-click="false"
									:nudge-right="90"
									:nudge-top="200"
									transition="scale-transition"
									offset-y
									:attach="true"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											style="font-size: 12px; height: 100%"
											class=""
											outlined
											readonly
											v-bind="attrs"
											v-on="on"
											append-icon="mdi-calendar"
											v-model.trim="item.licenseExpiredDate"
										></v-text-field>
									</template>
									<v-date-picker
										@input="menu2[index] = false"
										locale="ko-KR"
										v-model.trim="item.licenseExpiredDate"
									></v-date-picker>
								</v-menu>
							</div>
						</div>
					</li>
				</ul>
			</template>
		</template>
	</span>
</template>

<script>
import numberSplit from '@/common/numberSplit';

export default {
	name: 'CreditCardRequestList',
	data: () => ({
		menu1: {},
		menu2: {},
	}),
	props: {
		item: {
			type: Object,
		},
		index: {
			type: Number,
		},
	},
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
	},
	methods: {
		initCodeMsg(data, item) {
			if (data === 'ntnlCode') {
				item.ntnlCodeMsg = '';
			}
			if (data === 'stayCode') {
				item.stayCodeMsg = '';
			}
		},
	},
};
</script>

<style scoped>
.itemRequestUl {
	font-size: 12px !important;
}
.itemRequestUl .dash {
	width: 6px;
	margin: 0;
	padding: 0;
	line-height: 32px;
}
.itemRequestLi {
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin: 2px 0;
}
.itemRequestLi span {
	display: flex;
	width: 38%;
	line-height: 32px;
	margin-left: 6px;
}
.itemRequestLi select {
	padding: 0;
}
.itemRequestLi input {
	outline: none;
}
.itemRequestLi .itemRequestInput {
	padding: 0 0 0 6px;
	display: flex;
	overflow: hidden;
	background: #fff;
	border: 1px solid #e0e0e0;
	border-radius: 3px;
	margin: 0 4px;
	width: 61%;
}

.itemRequestLi .regiNumInput {
	height: 32px;

	display: inline;
}
.itemRequestLi .phoneNumInput {
	width: 44% !important;
	height: 32px;
	padding: 0 10px;
	display: inline;
}
.sentenceArea {
	outline: none;
	width: 95%;
	min-height: 80px;
	border: 1px solid #e0e0e0;
	margin: 2px 6px;
	text-align: center;
	overflow-y: auto;
	resize: none;
}
::-webkit-scrollbar {
	width: 8px;
	background: #e8e8e8;
}

::-webkit-scrollbar-thumb {
	width: 8px;
	background: #d2d2d2;
}
.flexParentCont1 > div {
	margin-left: 10px;
}
.flexParentCont1 > div:nth-child(3n + 1) {
	margin-left: 0;
}
.cr_memo4 {
	resize: none;
}
</style>
