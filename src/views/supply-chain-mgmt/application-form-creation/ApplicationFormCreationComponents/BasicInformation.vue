<template>
	<div>
		<h2 class="boldWt mb20">기본정보</h2>

		<div class="new_popTable1">
			<table class="w100P">
				<td class="w140">영업점<span class="redfont">*</span></td>
				<td class="w240">
					<select
						class="borderRadi3Px borderContColor2 h36 padW10 disGray"
						v-model.number="basic.saleStoreId"
						@change="openingStoreFnc"
						:disabled="AppFormCreFlag"
						v-if="!AppFormCreFlag"
					>
						<option disabled>영업점을 선택해주세요.</option>
						<option
							v-for="(item, index) in saleStoreItems"
							:key="index"
							:value="item.storeId"
						>
							{{ item.storeName }}
						</option>
					</select>
					<!--수정페이지일시 내려준값으로 -->
					<span v-if="AppFormCreFlag">
						{{ formData.basic.saleStoreIdString }}
					</span>
				</td>
				<td class="w140" style="font-size: 14px; font-weight: bold">
					개통점<span class="redfont">*</span>
				</td>
				<td class="w240">
					<select
						class="borderRadi3Px borderContColor2 h36 padW10 w200"
						v-model.trim="basic.openingStoreId"
						@change="customerDialogFnc()"
						@click="alertFnc"
					>
						<option disabled>개통점을 선택해주세요.</option>
						<option
							v-for="(item, index) in openingStoreItems"
							:key="index"
							:value="{
								openStoreCode: item.openStoreId,
								openStoreTelecom: item.telecomName,
								openStoreTelecomId: item.telecom,
								parentHierarchy: item.parentHierarchy,
								parentSaleStoreId: item.parentSaleStoreId,
							}"
						>
							<span v-if="item.parentSaleStoreName === ''">{{
								item.openStoreName
							}}</span>
							<span v-else>
								{{ item.openStoreName }} ( {{ item.parentSaleStoreName }} )
							</span>
						</option>
					</select>
				</td>
				<td class="w140">등록자<span class="redfont">*</span></td>
				<td class="w240">
					<select
						class="borderRadi3Px borderContColor2 w220 h36 padW10"
						v-model.number="basic.applRegiUserId"
					>
						<option disabled>등록자를 선택해주세요.</option>
						<option
							v-for="(item, index) in storeMemberItems"
							:key="index"
							:value="item.seq"
						>
							{{ item.name }}
						</option>
					</select>
				</td>
			</table>
		</div>

		<!--		<div class="formCont disFX">
			<div class="disFX">
				<p>영업점<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select :disabled="AppFormCreFlag" v-model.number="basic.saleStoreId" @change="openingStoreFnc">
						<option disabled>영업점을 선택해주세요.</option>
						<option
							v-for="(item, index) in saleStoreItems"
							:key="index"
							:value="item.storeId"
						>
							{{ item.storeName }}
						</option>
					</select>
				</div>
			</div>
			<div class="disFX">
				<p>개통점<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select
						v-model.trim="basic.openingStoreId"
						@change="customerDialogFnc()"
						@click="alertFnc"
					>
						<option disabled>개통점을 선택해주세요.</option>
						<option
							v-for="(item, index) in openingStoreItems"
							:key="index"
							:value="{
								openStoreCode: item.openStoreId,
								openStoreTelecom: item.telecomName,
								openStoreTelecomId: item.telecom,
								parentHierarchy: item.parentHierarchy,
								parentSaleStoreId: item.parentSaleStoreId,
							}"
						>
							<span v-if="item.parentSaleStoreName === ''">{{
								item.openStoreName
							}}</span>
							<span v-else>
								{{ item.openStoreName }} ( {{ item.parentSaleStoreName }} )
							</span>
						</option>
					</select>
				</div>
			</div>
			<div class="disFX">
				<p>등록자<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select v-model.number="basic.applRegiUserId">
						<option disabled>등록자를 선택해주세요.</option>
						<option
							v-for="(item, index) in storeMemberItems"
							:key="index"
							:value="item.seq"
						>
							{{ item.name }}
						</option>
					</select>
				</div>
			</div>
		</div>-->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  basicFormData,
  joinFormData,
} from '../../../../store/interface/supply-chain-mgmt/application-form-creation/AppFormCreationInterface';
import deviceEnumMixin from '@/common/deviceEnumMixin';

interface dataType {
	openStoreObject: any;
}

export default Vue.extend({
	name: 'BasicInformation',
	computed: {
		applTypeItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.applTypeItems;
		},
		formData: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.formData;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.formData = newValue;
			},
		},
		updateFormData: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.updateFormData;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.updateFormData = newValue;
			},
		},
		AppFormCreFlag(): any {
			return this.$store.state.ApplicationFormCreationModule.AppFormCreFlag;
		},
		consultList: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.formData
					.consultList;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.formData.consultList = newValue;
			},
		},
		basic: {
			get(): basicFormData {
				return this.$store.state.ApplicationFormCreationModule.formData.basic;
			},
			set(newValue: basicFormData) {
				this.$store.state.ApplicationFormCreationModule.formData.basic = newValue;
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
		customerDialog: {
			get(): boolean {
				return this.$store.state.ApplicationFormCreationModule.customerDialog;
			},
			set(newValue: boolean) {
				this.$store.state.ApplicationFormCreationModule.customerDialog = newValue;
			},
		},
		customerData(): string {
			return this.$store.state.ApplicationFormCreationModule.formData.customer
				.cusType;
		},
		saleStoreItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.saleStoreItems;
		},
		openingStoreItems: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.codeList
					.openingStoreItems;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.codeList.openingStoreItems = newValue;
			},
		},
		openingStoreTelecom: {
			get(): number {
				return this.$store.state.ApplicationFormCreationModule
					.openingStoreTelecom;
			},
			set(newValue: number) {
				this.$store.state.ApplicationFormCreationModule.openingStoreTelecom = newValue;
			},
		},
		goodsItems(): Object {
			return this.$store.state.ApplicationFormCreationModule.codeList
				.goodsItems;
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
		codeListItems: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.codeList;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.codeList = newValue;
			},
		},
		storeMemberItems: {
			get(): Object {
				return this.$store.state.ApplicationFormCreationModule.codeList
					.storeMemberItems;
			},
			set(newValue: Object) {
				this.$store.state.ApplicationFormCreationModule.codeList.storeMemberItems = newValue;
			},
		},
	},
	mixins: [deviceEnumMixin],
	data: (): dataType => ({
		openStoreObject: {},
	}),
	methods: {
		// 상담원 조회
		async retrieveMemberListByRole() {
			let data = {
				storeId: this.formData.basic.saleStoreId,
				roleType: 'CONSULT',
			};
			await this.$store.dispatch(
				'ApplicationFormCreationModule/retrieveMemberListByRole',
				data,
			);
		},
		alertFnc() {
			if (this.basic.saleStoreId === 0) {
				return alert('영업점을 선택해 주세요.');
			}
		},
		resetOpeningStoreChainFnc() {
			this.codeListItems.goodsItems = [];
			this.codeListItems.capacityItems = [];
			this.codeListItems.colorItems = [];
			this.codeListItems.telecomAddServiceItems = [];
			this.codeListItems.telecomChargeItems = [];
			this.joinData.openingTelecomCodeId = null;
			this.joinData.openingTelecomName = null;
			this.joinData.goodsId = null;
			this.joinData.capacity = null;
			this.joinData.color = null;
			this.joinData.chargeId = null;
			this.joinData.addServiceList = [];
		},
		customerDialogFnc() {
			this.resetOpeningStoreChainFnc();
			this.joinData.openingTelecomName = this.basic.openingStoreId.openStoreTelecom;
			this.joinData.openingTelecomCodeId = this.basic.openingStoreId.openStoreTelecomId;
			this.openingStoreTelecom = this.basic.openingStoreId.openStoreTelecomId;
			this.basic.parentHierarchy = this.basic.openingStoreId.parentHierarchy;
			this.basic.parentSaleStoreId = this.basic.openingStoreId.parentSaleStoreId;
			let openingStore = false;
			if (
				this.joinData.openingTelecomCodeId === 5 ||
				this.joinData.openingTelecomCodeId === 7
			) {
				openingStore = true;
			}
			if (openingStore && this.customerData === 'INDV_BSNM') {
				this.customerDialog = true;
			} else {
				this.customerDialog = false;
			}
			this.getGoodsSelectListFnc();
			this.getTelecomChargeList();
			this.getTelecomAddServiceList();
			let exTel = this.joinData.existTelecomCodeId;
			if (
				(this.joinData.openingTelecomName === 'SKT' && exTel === 42) ||
				(this.joinData.openingTelecomName === 'KT' && exTel === 43) ||
				(this.joinData.openingTelecomName === 'LGU' && exTel === 44)
			) {
				this.joinData.joinType = 'DVC_CHANGE';
			} else if (exTel === 45) {
				this.joinData.joinType = 'NEW';
			} else {
				this.joinData.joinType = 'NUM_CHANGE';
			}
		},
		async openingStoreFnc() {
			this.basic.openingStoreId = 0;
			this.basic.applRegiUserId = 0;
			this.openStoreObject = {};
			this.openingStoreItems = [];
			this.storeMemberItems = [];
			await this.getOpeningStoreList();
			await this.resetOpeningStoreChainFnc();
			await this.getSaleStoreMemberList();
			await this.retrieveMemberListByRole();
      // 신청서 작성시에만
      // 개통점 등록자 0번지 삽입 관련
      // 기존 개통점 온체인지
			if (!this.AppFormCreFlag) {
				await this.customerDialogFnc();
			}
		},
		async getOpeningStoreList() {
			if (this.basic.saleStoreId === null) {
				alert('영업점을 선택해 주세요.');
			}
			let data = { storeId: this.basic.saleStoreId };
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getOpeningStoreList',
				data,
			);
		},
		async getCapacityListFnc() {
			this.colorItems = [];
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getCapacitySelectList',
				this.joinData.goodsId,
			);
		},
		async getColorListFnc() {
			let data = {
				goodsId: this.joinData.goodsId,
				capacity: this.joinData.capacity,
			};
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getColorSelectList',
				data,
			);
		},
		// 기기
		async getGoodsSelectListFnc() {
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getGoodsSelectList',
				this.joinData.openingTelecomCodeId,
			);
		},
		// 요금제
		async getTelecomChargeList() {
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getTelecomChargeList',
				this.joinData.openingTelecomCodeId,
			);
		},
		// 부가서비스
		async getTelecomAddServiceList() {
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getTelecomAddServiceList',
				this.joinData.openingTelecomCodeId,
			);
		},
		// 영업점 소속 사용자 조회
		async getSaleStoreMemberList() {
			const data = { storeId: this.basic.saleStoreId };
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getSaleStoreMemberList',
				data,
			);
		},
		createdEnumFnc() {
			if (this.AppFormCreFlag !== undefined) {
				this.getOpeningStoreList(); // 개통점
				this.getSaleStoreMemberList(); // 등록자
				this.retrieveMemberListByRole(); // 상담원
				this.getTelecomAddServiceList(); // 부가서비스
				this.getTelecomChargeList(); // 요금제
				this.getGoodsSelectListFnc(); // 기기
				this.getCapacityListFnc(); // 용량
				this.getColorListFnc(); // 색상
			}
		},
		formDataRecallFnc() {
			if (this.formData.join.openingTelecomCodeId === 5) {
				this.formData.join.openingTelecomName = 'SKT';
			}
			if (this.formData.join.openingTelecomCodeId === 6) {
				this.formData.join.openingTelecomName = 'KT';
			}
			if (this.formData.join.openingTelecomCodeId === 7) {
				this.formData.join.openingTelecomName = 'LG';
			}
		},
		async getApplicationDetail() {
			if (this.AppFormCreFlag !== undefined) {
				let data = { applId: this.AppFormCreFlag };
				await this.$store.dispatch(
					'ApplicationFormCreationModule/getApplicationDetail',
					data,
				);
			}
		},
		setOpeningStoreFnc() {
			if (this.AppFormCreFlag !== undefined) {
				this.basic.openingStoreId = {
					openStoreCode: this.updateFormData.basic.openingStoreId,
					openStoreTelecom: this.updateFormData.join.openingTelecomName,
					openStoreTelecomId: this.updateFormData.join.openingTelecomCodeId,
					parentHierarchy: this.updateFormData.basic.parentHierarchy,
					parentSaleStoreId: this.updateFormData.basic.parentSaleStoreId,
				};
			}
		},
	},
	async created() {
		await this.getApplicationDetail();
		await this.createdEnumFnc();
		await this.formDataRecallFnc();
		await this.setOpeningStoreFnc();
	},
});
</script>
<style scoped>
option:first-child {
	background-color: #f1f1f1;
	color: #000;
}
</style>
