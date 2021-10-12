<template>
	<div>
		<h2>기타</h2>

		<div class="new_popTable1 mt20">
			<table class="w100P">
				<tr>
					<td>사은품 동봉여부</td>
					<td>
						<div class="disFx">
							<div class="radioStylePop ml20 lh36">
								<input
									type="radio"
									id="radio16"
									name="radioS6"
									value="Y"
									v-model.trim="etcData.giftEnclosedYn"
									@change="giftFnc"
								/><label class="ml-1 cur_p" for="radio16">예</label>
							</div>
							<div class="radioStylePop ml30 lh36">
								<input
									type="radio"
									id="radio17"
									name="radioS6"
									class="ml30"
									value="N"
									v-model.trim="etcData.giftEnclosedYn"
									@change="giftFnc"
								/><label class="ml-1 cur_p" for="radio17">아니오</label>
							</div>
						</div>
					</td>
					<td>사은품</td>
					<td colspan="3">
						<input
							class="borderRadi3Px borderContColor2 w100P h36 padW10 disGray"
							type="text"
							v-model.trim="etcData.giftList[0].giftName"
							maxlength="120"
							:disabled="etcData.giftEnclosedYn === 'N'"
						/>
					</td>
				</tr>
				<tr>
					<td class="w140">중고폰 회수여부</td>
					<td class="w240">
						<div class="disFx">
							<div class="radioStylePop ml20 lh36">
								<input
									type="radio"
									id="radio18"
									name="radioS7"
									value="Y"
									v-model.trim="etcData.usedDvcReclaimYn"
									@change="usedFnc"
								/><label class="ml-1 cur_p" for="radio18">예</label>
							</div>
							<div class="radioStylePop ml30 lh36">
								<input
									type="radio"
									id="radio19"
									name="radioS7"
									class="ml30"
									value="N"
									v-model.trim="etcData.usedDvcReclaimYn"
									@change="usedFnc"
								/><label class="ml-1 cur_p" for="radio19">아니오</label>
							</div>
						</div>
					</td>
					<td class="w140">중고폰 모델명</td>
					<td class="w240">
						<input
							class="borderRadi3Px borderContColor2 w100P h36 padW10 disGray"
							type="text"
							v-model.trim="etcData.usedDvcModelName"
							maxlength="20"
							:disabled="etcData.usedDvcReclaimYn === 'N'"
						/>
					</td>
					<td class="w140">중고보상</td>
					<td class="w240">
						<input
							class="borderRadi3Px borderContColor2 w100P h36 padW10 disGray"
							type="text"
							:disabled="etcData.usedDvcReclaimYn === 'N'"
							v-model.trim="etcData.usedDvcCompe"
							maxlength="20"
						/>
					</td>
				</tr>
				<tr>
					<td>상담원(1)</td>
					<td>
						<div class="datePickerStyle1">
							<v-autocomplete
								style="font-size: 12px"
								:items="counselorItems"
								item-text="name"
								item-value="seq"
								v-model.trim="consultUserData[0].consultUserId"
								outlined
								placeholder="검색해주세요."
							></v-autocomplete>
						</div>
					</td>
					<td>상담원(2)</td>
					<td>
						<div class="datePickerStyle1">
							<v-autocomplete
								style="font-size: 12px"
								:items="counselorItems"
								item-text="name"
								item-value="seq"
								v-model.trim="consultUserData[1].consultUserId"
								outlined
								placeholder="검색해주세요."
							></v-autocomplete>
						</div>
					</td>
					<td>상담원(3)</td>
					<td>
						<div class="datePickerStyle1">
							<v-autocomplete
								style="font-size: 12px"
								:items="counselorItems"
								item-text="name"
								item-value="seq"
								v-model.trim="consultUserData[2].consultUserId"
								outlined
								placeholder="검색해주세요."
							></v-autocomplete>
						</div>
					</td>
				</tr>
				<tr>
					<td>첨부파일</td>
					<td colspan="5">
						<FileUpload
							:propsFileList="etcData.attachList"
							:applId="Number(applId)"
							:modifyState="true"
							@fileValueFnc="fileValueFnc"
						></FileUpload>
					</td>
				</tr>
				<tr v-if="!this.applId">
					<td>메모</td>
					<td colspan="5">
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10"
							v-model="memoData.category"
						>
							<option value="" disabled>공개범위</option>
							<option value="ALL">전체</option>
							<option value="GROUP">그룹</option>
							<option value="INDV">개인</option>
						</select>
						<input
							placeholder="메모를 입력해주세요."
							class="borderRadi3Px borderContColor2 w100P h36 padW10 mt10"
							type="text"
							v-model.trim="memoData.memoContents"
						/>
					</td>
				</tr>
			</table>
		</div>

		<!--		<div class="formCont2 disFX">
			<div class="disFX w320">
				<p>사은품 동봉여부</p>
				<div class="radioCont2">
					<input
						type="radio"
						id="radio16"
						name="radioS6"
						value="Y"
						v-model.trim="etcData.giftEnclosedYn"
						@change="giftFnc"
					/><label class="ml-1 cur_p" for="radio16">예</label>
					<input
						type="radio"
						id="radio17"
						name="radioS6"
						class="ml30"
						value="N"
						v-model.trim="etcData.giftEnclosedYn"
						@change="giftFnc"
					/><label class="ml-1 cur_p" for="radio17">아니오</label>
				</div>
			</div>
			<div class="disFX goodsStyle1">
				<p>사은품</p>
				<div class="btnPlus1">
					<input
						class="goodsStyle2"
						type="text"
						v-model.trim="etcData.giftList[0].giftName"
						maxlength="120"
						:disabled="etcData.giftEnclosedYn === 'N'"
					/>
				</div>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX w320">
				<p>중고폰 회수여부</p>
				<div class="radioCont2">
					<input
						type="radio"
						id="radio18"
						name="radioS7"
						value="Y"
						v-model.trim="etcData.usedDvcReclaimYn"
						@change="usedFnc"
					/><label class="ml-1 cur_p" for="radio18">예</label>
					<input
						type="radio"
						id="radio19"
						name="radioS7"
						class="ml30"
						value="N"
						v-model.trim="etcData.usedDvcReclaimYn"
						@change="usedFnc"
					/><label class="ml-1 cur_p" for="radio19">아니오</label>
				</div>
			</div>
			<div class="disFX">
				<p>중고폰 모델명</p>
				<input
					type="text"
					v-model.trim="etcData.usedDvcModelName"
					maxlength="20"
					:disabled="etcData.usedDvcReclaimYn === 'N'"
				/>
			</div>
			<div class="disFX">
				<p>중고보상</p>
				<input
					type="text"
					:disabled="etcData.usedDvcReclaimYn === 'N'"
					v-model.trim="etcData.usedDvcCompe"
					maxlength="20"
				/>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>상담원(1)</p>
				<div class="AutoSoloCustom1">
					<v-autocomplete
						:items="counselorItems"
						item-text="name"
						item-value="seq"
						v-model.trim="consultUserData[0].consultUserId"
						outlined
						placeholder="검색해주세요."
					></v-autocomplete>
				</div>
			</div>
			<div class="disFX">
				<p>상담원(2)</p>
				<div class="AutoSoloCustom1">
					<v-autocomplete
						:items="counselorItems"
						item-text="name"
						item-value="seq"
						v-model.trim="consultUserData[1].consultUserId"
						outlined
						placeholder="검색해주세요."
					></v-autocomplete>
				</div>
			</div>
			<div class="disFX">
				<p>상담원(3)</p>
				<div class="AutoSoloCustom1">
					<v-autocomplete
						:items="counselorItems"
						item-text="name"
						item-value="seq"
						v-model.trim="consultUserData[2].consultUserId"
						outlined
						placeholder="검색해주세요."
					></v-autocomplete>
				</div>
			</div>
		</div>
		<div class="disFx fomCont2 mt10 uploadCustom">
			<p class="disIN">첨부파일</p>
			<div class="disIN w680">
				<FileUpload
					:propsFileList="etcData.attachList"
					:applId="Number(applId)"
					:modifyState="true"
					@fileValueFnc="fileValueFnc"
				></FileUpload>
			</div>
			<div
				v-if="this.applId === undefined"
				class="disFx fomCont2 mt10 uploadCustom"
			>
				<p class="disIN">메모</p>
				<div class="disIN w80P mt10 normalSelectCont">
					<select
						style="width: 12%; border-right: 1px solid #989898"
						class="w30P cur_p lh28 pl-3"
						v-model="memoData.category"
					>
						<option value="" disabled>공개범위</option>
						<option value="ALL">전체</option>
						<option value="GROUP">그룹</option>
						<option value="INDV">개인</option>
					</select>
				</div>
				<textarea
					type="text"
					class="memoText"
					v-model.trim="memoData.memoContents"
				></textarea>
			</div>
		</div>-->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
	etcFormData,
	memoFormData,
} from '../../../../store/interface/supply-chain-mgmt/application-form-creation/AppFormCreationInterface';
import FileUpload from '../../../../components/FileUpload.vue';

export default Vue.extend({
	name: 'EtcInformation',
	components: { FileUpload },
	data: () => ({
		tabValue: '',
	}),
	computed: {
		applId(): string {
			return this.$store.state.ApplicationFormCreationModule.AppFormCreFlag;
		},
		etcData: {
			get(): etcFormData {
				return this.$store.state.ApplicationFormCreationModule.formData.etc;
			},
			set(newValue: etcFormData) {
				this.$store.state.ApplicationFormCreationModule.formData.etc = newValue;
			},
		},
		memoData: {
			get(): memoFormData {
				return this.$store.state.ApplicationFormCreationModule.memoData;
			},
			set(newValue: memoFormData) {
				this.$store.state.ApplicationFormCreationModule.memoData = newValue;
			},
		},
		consultUserData: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.formData
					.consultList;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.formData.consultList = newValue;
			},
		},
		counselorItems(): number {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.counselorItems;
		},
	},
	methods: {
		giftFnc() {
			this.etcData.giftList[0].giftName = null;
		},
		usedFnc() {
			this.etcData.usedDvcModelName = null;
			this.etcData.usedDvcCompe = null;
		},
		fileValueFnc(value: any) {
			this.etcData.attachList = value;
		},
	},
});
</script>
<style scoped>
option:first-child {
	background-color: #f1f1f1;
	color: #000;
}

.memoText {
	border: 1px solid #989898;
	border-radius: 3px;
	width: 50%;
	height: 100px;
	resize: none;
	text-align: left;
	vertical-align: top !important;
	padding: 8px 12px;
	margin: 8px 0 0 120px;
}
.memoText:focus {
	outline: none;
}
</style>
