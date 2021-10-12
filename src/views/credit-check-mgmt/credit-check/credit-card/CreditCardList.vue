<template>
	<div class="lastBorderBT">
		<!--  개인      -->
		<template v-if="item.creditReqType === 'ITEMS'">
			<template v-if="item.cusType === 'INDV'">
				<li>
					<input class="cardInput font-size-12" type="text" v-model.trim="item.cusName" />
				</li>
				<li>
					<input
						class="regiNumInput font-size-12 w100P"
						type="text"
						v-model.trim="item.cusRegiNumConcat"
						maxlength="13"
						oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						@input="regiNumSplitFnc($event.target.value, 'cusRegiNum', 'item')"
					/>
				</li>
				<template v-if="item.joinType === 'DVC_CHANGE'">
					<li>
						<input
							type="text"
							class="w180 borderRadi3Px lh30 padW10 font-size-12"
							v-model.trim="item.cusPhone"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							maxlength="11"
							@input="phoneNumSplitFnc($event.target.value, 'cusPhone', 'item')"
						/>
					</li>
				</template>
			</template>
			<!--  미성년자      -->
			<template v-if="item.cusType === 'MINORS'">
				<li>
					<input class="cardInput" type="text" v-model.trim="item.cusName" />
				</li>
				<li>
					<input
						class="regiNumInput font-size-12 w200"
						type="text"
						v-model.trim="item.cusRegiNumConcat"
						maxlength="13"
						oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						@input="regiNumSplitFnc($event.target.value, 'cusRegiNum', 'item')"
					/>
				</li>
				<li v-if="item.joinType === 'DVC_CHANGE'">
					<input
						type="text"
						class="w180 borderRadi3Px lh30 padW10 font-size-12 w100P"
						v-model.trim="item.cusPhone"
						oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						maxlength="11"
						@input="phoneNumSplitFnc($event.target.value, 'cusPhone', 'item')"
					/>
				</li>
				<li>
					<input
						class="cardInput font-size-12 w100P"
						type="text"
						v-model.trim="item.courtProctorName"
					/>
				</li>
				<li style="height: 57px">
					<input
						class="regiNumInput font-size-12 w200"
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
				</li>
				<li style="height: 57px">
					<input
						type="text"
						class="w100P borderRadi3Px lh30 padW10 font-size-12"
						v-model.trim="item.courtProctorPhone"
						oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						maxlength="11"
						@input="
							phoneNumSplitFnc($event.target.value, 'courtProctorPhone', 'item')
						"
					/>
				</li>
			</template>
			<!--  개인사업자      -->
			<template v-if="item.cusType === 'INDV_BSNM'">
				<template v-if="item.telecomName !== 'KT'">
					<li>
						<input class="cardInput font-size-12" type="text" v-model.trim="item.bizName" />
					</li>
					<li>
						<input
							class="cardInput"
							type="text"
							v-model.trim="item.bizNum"
							maxlength="10"
						/>
					</li>
					<li>
						<input
							type="text"
							class="w180 borderRadi3Px lh30 padW10 font-size-12"
							v-model.trim="item.bizPhone"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							maxlength="11"
							@input="phoneNumSplitFnc($event.target.value, 'bizPhone', 'item')"
						/>
					</li>
				</template>
			</template>
			<!--  법인      -->
			<template v-if="item.cusType === 'CORP'">
				<li>
					<input class="cardInput font-size-12" type="text" v-model.trim="item.bizName" />
				</li>
				<li>
					<input
						class="cardInput"
						type="text"
						v-model.trim="item.bizNum"
						maxlength="10"
					/>
				</li>
				<li v-if="item.joinType !== 'DVC_CHANGE'">
					<input
						class="regiNumInput font-size-12 w100P"
						type="text"
						v-model.trim="item.bizRegiNumConcat"
						maxlength="13"
						oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						@input="regiNumSplitFnc($event.target.value, 'bizRegiNum', 'item')"
					/>
				</li>
				<li v-if="item.joinType === 'DVC_CHANGE'">
					<input
						type="text"
						class="w180 borderRadi3Px lh30 padW10 font-size-12"
						v-model.trim="item.bizPhone"
						oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						maxlength="11"
						@input="phoneNumSplitFnc($event.target.value, 'bizPhone', 'item')"
					/>
				</li>
			</template>
			<!--  외국인      -->
			<template v-if="item.cusType === 'FOREIGN'">
				<li>
					<input class="cardInput font-size-12" type="text" v-model.trim="item.cusName" />
				</li>
				<li>
					<input
						class="regiNumInput font-size-12 w100P"
						type="text"
						v-model.trim="item.licenseNumConcat"
						maxlength="13"
						oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						@input="regiNumSplitFnc($event.target.value, 'licenseNum', 'item')"
					/>
				</li>
				<li v-if="item.joinType === 'DVC_CHANGE'">
					<input
						type="text"
						class="w180 borderRadi3Px lh30 padW10 font-size-12"
						v-model.trim="item.cusPhone"
						oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						maxlength="11"
						@input="phoneNumSplitFnc($event.target.value, 'cusPhone', 'item')"
					/>
				</li>
				<li
					v-if="
						(item.joinType === 'DVC_CHANGE' && item.telecomName !== 'SKT') ||
						item.joinType !== 'DVC_CHANGE'
					"
				>
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
				</li>
				<li v-if="item.telecomName === 'SKT'">
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
				</li>
				<li
					v-if="
						item.telecomName !== 'SKT' ||
						(item.telecomName === 'SKT' && item.joinType !== 'DVC_CHANGE')
					"
				>
					<div class="datePickerTable10 h30">
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
									style="font-size: 12px; height: 100%"
									class="w100p"
									outlined
									readonly
									v-bind="attrs"
									v-on="on"
									append-icon="mdi-calendar"
									v-model.trim="item.licenseIssueDate"
								></v-text-field>
							</template>
							<v-date-picker
								@input="menu1 = false"
								locale="ko-KR"
								v-model.trim="item.licenseIssueDate"
							></v-date-picker>
						</v-menu>
					</div>
				</li>
				<li v-if="item.telecomName === 'SKT'">
					<div class="datePickerTable10 h30">
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
									style="font-size: 12px; height: 100%"
									class="w100p"
									outlined
									readonly
									v-bind="attrs"
									v-on="on"
									append-icon="mdi-calendar"
									v-model.trim="item.licenseExpiredDate"
								></v-text-field>
							</template>
							<v-date-picker
								@input="menu2 = false"
								locale="ko-KR"
								v-model.trim="item.licenseExpiredDate"
							></v-date-picker>
						</v-menu>
					</div>
				</li>
			</template>
		</template>
		<template v-if="item.creditReqType === 'SENTENCE'">
			<li>
				<textarea
					class="cardTextArea1 outLineNone w100P"
					v-model.trim="item.sentenceReq"
				></textarea>
			</li>
		</template>
	</div>
</template>

<script>
import numberSplit from '../../../../common/numberSplit';

export default {
	namespaced: true,
	props: {
		item: {
			type: Object,
		},
	},
	mixins: [numberSplit],
	data: () => ({
		menu1: false,
		menu2: false,
	}),
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
.lastBorderBT input {
	font-size: 12px;
}
.cardInput {
	width: 100%;
	height: 32px;
	padding: 0 10px;
	font-size: 12px;
	display: inline;
}
.regiNumInput {
	width: 100% !important;
	height: 32px;
	padding: 0 10px;
	font-size: 12px;
	display: inline;
}
.phoneNumInput {
	width: 20% !important;
	height: 32px;
	padding: 0 10px;
	font-size: 12px;
	display: inline;
}
.cardTextArea1 {
	font-size: 11px;
	padding: 10px;
	resize: none;
	height: 188px;
}
.lastBorderBT > li:last-child {
	border-bottom: 1px solid #aaa;
}
</style>
