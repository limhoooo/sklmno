<template>
	<div>
		<h2>배송정보</h2>

		<div class="new_popTable1 mt20">
			<table class="w100P">
				<tr>
					<td class="w140">배송구분</td>
					<td colspan="5">
						<div class="disFx">
							<span v-for="(item, index) in deliveryTypeItems" :key="item.key">
								<div class="radioStylePop ml30 lh36">
									<input
										class="ml5"
										type="radio"
										:id="`deliveryRadio${index}`"
										name="radioS5"
										:value="item.value"
										v-model.number="deliveryData.deliveryType"
										@change="resetDeliveryTypeFnc"
									/><label class="ml-1 cur_p" :for="`deliveryRadio${index}`">
										{{ item.name }}
									</label>
								</div>
							</span>
						</div>
					</td>
				</tr>
				<tr
					v-if="
						deliveryData.deliveryType === 'PS' ||
						deliveryData.deliveryType === 'PS_SALES'
					"
				>
					<td>택배사</td>
					<td class="w240">
						<select
							class="borderRadi3Px borderContColor2 w220 h36 padW10 disGray"
							:disabled="deliveryData.couriorMatchingYn === 'Y'"
							v-model.number="deliveryData.courierCodeId"
						>
							<option disabled>택배사를 선택해주세요.</option>
							<option
								v-for="(item, index) in courierCodeItems"
								:key="index"
								:value="item.codeSeq"
							>
								{{ item.codeNm }}
							</option>
						</select>
					</td>
					<td class="w140">송장번호</td>
					<td colspan="3">
						<input
							class="borderRadi3Px borderContColor2 w220 h36 padW10 disGray"
							type="text"
							:disabled="deliveryData.couriorMatchingYn === 'Y'"
							v-model.number="deliveryData.invoiceNum"
						/>
					</td>
				</tr>
				<tr v-if="deliveryData.deliveryType === 'PS'">
					<td>배송주소<span class="redfont">*</span></td>
					<td colspan="5">
						<div class="btnPlus1 w290 floatL">
							<input
								class="borderRadi3Px borderContColor2 w220 h36 padW10 disGray"
								type="text"
								placeholder="우편번호"
								@click="postDialog = true"
								readonly
								v-model.trim="deliveryData.deliveryZipCode"
								:disabled="deliveryData.couriorMatchingYn === 'Y'"
							/>
							<post-api
								@postapi="addressData"
								:postDialog="postDialog"
								@closeDialog="dialogClose"
								v-if="deliveryData.couriorMatchingYn !== 'Y'"
							></post-api>
						</div>
						<input
							class="borderRadi3Px borderContColor2 w420 h36 padW10 ml20 floatL disGray"
							:disabled="deliveryData.couriorMatchingYn === 'Y'"
							type="text"
							placeholder="기본주소"
							@click="postDialog = true"
							readonly
							v-model.trim="deliveryData.deliveryAddr"
						/>
						<input
							class="borderRadi3Px borderContColor2 w420 h36 padW10 floatL mt10 disGray"
							type="text"
							placeholder="상세주소"
							:disabled="deliveryData.couriorMatchingYn === 'Y'"
							v-model.trim="deliveryData.deliveryAddrDetail"
						/>
						<div class="checkStyleCont4 lh36 floatL ml30 mt10 disGray">
							<input
								class="checkStyle"
								:disabled="deliveryData.couriorMatchingYn === 'Y'"
								type="checkbox"
								id="check200"
								v-model.trim="addrDialog"
								@change="addressFnc"
							/>
							<label for="check200">고객 주소와 동일</label>
						</div>
					</td>
				</tr>
			</table>
		</div>

		<!--		<div class="formCont2 disFX">
			<div class="disFX">
				<p>배송구분<span class="redfont">*</span></p>
				<div class="radioCont1" style="width: 500px">
					<span v-for="(item, index) in deliveryTypeItems" :key="item.key">
						<input
							class="ml5"
							type="radio"
							:id="`deliveryRadio${index}`"
							name="radioS5"
							:value="item.value"
							v-model.number="deliveryData.deliveryType"
							@change="resetDeliveryTypeFnc"
						/><label class="ml-1" :for="`deliveryRadio${index}`">
							{{ item.name }}
						</label>
					</span>
					&lt;!&ndash;					<input&ndash;&gt;
					&lt;!&ndash;						type="radio"&ndash;&gt;
					&lt;!&ndash;						id="radio13"&ndash;&gt;
					&lt;!&ndash;						name="radioS5"&ndash;&gt;
					&lt;!&ndash;						value="PS"&ndash;&gt;
					&lt;!&ndash;						v-model.number="deliveryData.deliveryType"&ndash;&gt;
					&lt;!&ndash;						@change="resetDeliveryTypeFnc"&ndash;&gt;
					&lt;!&ndash;					/><label class="ml-1" for="radio13">택배</label>&ndash;&gt;
					&lt;!&ndash;					<input&ndash;&gt;
					&lt;!&ndash;						type="radio"&ndash;&gt;
					&lt;!&ndash;						id="radio14"&ndash;&gt;
					&lt;!&ndash;						name="radioS5"&ndash;&gt;
					&lt;!&ndash;						class="ml10"&ndash;&gt;
					&lt;!&ndash;						value="QUICK"&ndash;&gt;
					&lt;!&ndash;						v-model.number="deliveryData.deliveryType"&ndash;&gt;
					&lt;!&ndash;						@change="resetDeliveryTypeFnc"&ndash;&gt;
					&lt;!&ndash;					/><label class="ml-1" for="radio14">퀵</label>&ndash;&gt;
					&lt;!&ndash;					<input&ndash;&gt;
					&lt;!&ndash;						type="radio"&ndash;&gt;
					&lt;!&ndash;						id="radio15"&ndash;&gt;
					&lt;!&ndash;						name="radioS5"&ndash;&gt;
					&lt;!&ndash;						class="ml10"&ndash;&gt;
					&lt;!&ndash;						value="DIRECT"&ndash;&gt;
					&lt;!&ndash;						v-model.number="deliveryData.deliveryType"&ndash;&gt;
					&lt;!&ndash;						@change="resetDeliveryTypeFnc"&ndash;&gt;
					&lt;!&ndash;					/><label class="ml-1" for="radio15">직접전달</label>&ndash;&gt;
				</div>
			</div>
		</div>-->
		<!--		<div
			class="formCont1 disFX"
			v-if="
				deliveryData.deliveryType === 'PS' ||
				deliveryData.deliveryType === 'PS_SALES'
			"
		>
			<div class="bgGray w90P pd10">
				<div class="disFX ml-13">
					<div class="disFX">
						<p>택배사</p>
						<div class="normalSelectCont1">
							<select
								:disabled="deliveryData.couriorMatchingYn === 'Y'"
								v-model.number="deliveryData.courierCodeId"
							>
								<option disabled>택배사를 선택해주세요.</option>
								<option
									v-for="(item, index) in courierCodeItems"
									:key="index"
									:value="item.codeSeq"
								>
									{{ item.codeNm }}
								</option>
							</select>
						</div>
					</div>
					<div class="disFX ml-13">
						<p>송장번호</p>
						<input
							type="text"
							:disabled="deliveryData.couriorMatchingYn === 'Y'"
							v-model.number="deliveryData.invoiceNum"
						/>
					</div>
				</div>
				<div v-if="deliveryData.deliveryType === 'PS'" class="disFX mt-3">
					<div class="disFX ml-13">
						<p>주소</p>
						<div class="btnPlus1">
							<input
								type="text"
								placeholder="우편번호"
								@click="postDialog = true"
								readonly
								v-model.trim="deliveryData.deliveryZipCode"
								:disabled="deliveryData.couriorMatchingYn === 'Y'"
							/>
							<post-api
								@postapi="addressData"
								:postDialog="postDialog"
								@closeDialog="dialogClose"
								v-if="deliveryData.couriorMatchingYn !== 'Y'"
							></post-api>
						</div>
					</div>
					<div class="disFX ml10">
						<input
							class="postStyle3"
							:disabled="deliveryData.couriorMatchingYn === 'Y'"
							type="text"
							placeholder="기본주소"
							@click="postDialog = true"
							readonly
							v-model.trim="deliveryData.deliveryAddr"
						/>
					</div>
					<div class="postCheck1 ml10">
						<input
							:disabled="deliveryData.couriorMatchingYn === 'Y'"
							type="checkbox"
							id="check200"
							v-model.trim="addrDialog"
							@change="addressFnc"
						/>
						<label class="ml-1" for="check200">고객 주소와 동일</label>
					</div>
				</div>
				<div
					v-if="deliveryData.deliveryType === 'PS'"
					class="disFX mt-3 postContAdd3"
				>
					<input
						class="postStyle3"
						type="text"
						placeholder="상세주소"
						:disabled="deliveryData.couriorMatchingYn === 'Y'"
						v-model.trim="deliveryData.deliveryAddrDetail"
					/>
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
	deliveryFormData,
} from '@/store/interface/supply-chain-mgmt/application-form-creation/AppFormCreationInterface';

interface dataType {
	postDialog: boolean;
}

export default Vue.extend({
	name: 'DeliveryInformation',
	components: { PostApi },
	data: (): dataType => ({
		postDialog: false,
	}),
	computed: {
		sct(): string {
			return this.$store.state.sct;
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
		deliveryTypeItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.DeliveryType;
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
		addrDialog: {
			get(): boolean {
				return this.$store.state.ApplicationFormCreationModule.dialogData
					.deliveryAddrDialog;
			},
			set(newValue: boolean) {
				this.$store.state.ApplicationFormCreationModule.dialogData.deliveryAddrDialog = newValue;
			},
		},
		courierCodeItems(): any {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.courierCodeItems;
		},
	},
	methods: {
		addressFnc() {
			if (this.addrDialog) {
				this.deliveryData.deliveryZipCode = this.customerData.cusZipCode;
				this.deliveryData.deliveryAddr = this.customerData.cusAddr;
				this.deliveryData.deliveryAddrDetail = this.customerData.cusAddrDetail;
			} else {
				this.deliveryData.deliveryZipCode = '';
				this.deliveryData.deliveryAddr = '';
				this.deliveryData.deliveryAddrDetail = '';
			}
		},
		addressData(data: any) {
			this.deliveryData.deliveryAddr = data.address;
			this.deliveryData.deliveryZipCode = data.zonecode;
		},
		dialogClose(data: boolean) {
			this.postDialog = data;
		},
		resetDeliveryTypeFnc() {
			this.deliveryData.courierCodeId = null; // 택배사
			this.deliveryData.invoiceNum = null; // 송장번호
			this.deliveryData.deliveryZipCode = null; // 우편번호
			this.deliveryData.deliveryAddr = null; // 기본주소
			this.deliveryData.deliveryAddrDetail = null; // 상세주소
			this.addrDialog = false; // 고객 주소와 동일
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
