<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="800" persistent>
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<div class="mainWhite mainFontS boldWt">
							<h2 v-if="registerPop">블랙리스트 등록</h2>
							<h2 v-if="!registerPop && !modifyBtn">블랙리스트 정보</h2>
							<h2 v-if="modifyBtn">블랙리스트 수정</h2>
						</div>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>

					<v-card-text class="pad30">
						<h2 class="boldWt mainBlack2 mb10">고객정보</h2>
						<div class="new_popTable1" v-if="registerPop || modifyBtn">
							<table class="w100P">
								<tr>
									<td class="w180">
										블랙리스트 유형<span class="redfont">*</span>
									</td>
									<td>
										<InputRadio
											class="ml10"
											title="블랙유형"
											:titleWidth="10"
											:data="{
												name: 'blackType',
												value: this.formData.blackType,
											}"
											:disableYN="modifyUse"
											:optionList="statusList.BlackType"
											@input="setNewData"
										>
										</InputRadio>
									</td>
								</tr>
								<tr>
									<td class="w180">
										블랙리스트 성명<span class="redfont">*</span>
									</td>
									<td class="lh40">
										<InputText
											title="블랙리스트 성명"
											:data="{
												name: 'blackName',
												value: this.formData.blackName,
											}"
											:titleWidth="10"
											@input="setNewData"
											:disableYN="modifyBtn"
										></InputText>
									</td>
								</tr>
								<tr>
									<td>블랙리스트 생년월일</td>
									<td>
										<v-menu
											v-model.trim="menu1"
											:close-on-content-click="false"
											:nudge-right="40"
											transition="scale-transition"
											offset-y
											min-width="auto"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													outlined
													append-icon="mdi-calendar"
													v-model.trim="formData.blackDateBirth"
													readonly
													v-bind="attrs"
													v-on="on"
													:disabled="modifyUse"
													class="datePickerInput input_custom1"
												></v-text-field>
											</template>
											<v-date-picker
												@input="menu1 = false"
												v-model.trim="formData.blackDateBirth"
												:max="
													new Date(
														Date.now() - new Date().getTimezoneOffset() * 60000,
													)
														.toISOString()
														.substr(0, 10)
												"
												locale="ko-KR"
												:active-picker.sync="activePicker"
											></v-date-picker>
										</v-menu>
									</td>
								</tr>
								<tr>
									<td>블랙리스트 전화번호<span class="redfont">*</span></td>
									<td>
										<InputNText
											title="블랙전화번호"
											:titleWidth="300"
											:data="[
												{
													name: 'blackPhone1',
													value: this.formData.blackPhone1,
												},
												{
													name: 'blackPhone2',
													value: this.formData.blackPhone2,
												},
												{
													name: 'blackPhone3',
													value: this.formData.blackPhone3,
												},
											]"
											@input="setNewData"
											:multiple="3"
											:disableYN="modifyBtn"
										>
										</InputNText>
									</td>
								</tr>
								<tr>
									<td>주소</td>
									<td>
										<input
											type="text"
											placeholder="우편번호"
											@click="postDialog = !postDialog"
											v-model.trim="formData.blackZipCode"
											readonly
											:postDialog="postDialog"
											class="cur_p lh36"
											:disabled="modifyUse"
											id="postcode"
										/>
										<post-api
											@postapi="addressData"
											:postDialog="postDialog"
											@closeDialog="dialogClose"
											v-if="registerPop || modifyBtn"
											style="
												display: inline-block !important;
												margin-right: 10px;
											"
											class="post-api-comp"
										></post-api>
										<input
											type="text"
											placeholder="기본주소"
											@click="postDialog = !postDialog"
											v-model.trim="formData.blackAddr"
											readonly
											:postDialog="postDialog"
											class="cur_p lh36"
											:disabled="modifyUse"
											id="roadAddress"
										/>
										<input
											style="line-height: 36px !important"
											class="padW10"
											type="text"
											placeholder="상세주소 입력"
											v-model.trim="formData.blackAddrDetail"
											id="detailAddress"
											:disableYN="modifyUse"
										/>
									</td>
								</tr>
								<tr>
									<td>사유</td>
									<td>
										<InputText
											class="w100P"
											title="사유"
											:data="{
												name: 'blackReason',
												value: this.formData.blackReason,
											}"
											:titleWidth="140"
											@input="setNewData"
											:disableYN="modifyUse"
										></InputText>
									</td>
								</tr>
							</table>
						</div>
						<div class="new_popTable1" v-else>
							<table class="w100P">
								<tr>
									<td class="w180">블랙리스트 성명</td>
									<td>{{ blackListInfo.blackName }}</td>
								</tr>
								<tr>
									<td>블랙리스트 전화번호</td>
									<td>
										<span>
											{{ blackListInfo.blackPhone1 }} -
											{{ blackListInfo.blackPhone2 }} -
											{{ blackListInfo.blackPhone3 }}
										</span>
									</td>
								</tr>
							</table>
						</div>

						<h2
							v-if="!registerPop && !modifyBtn"
							class="boldWt mainBlack2 mt20 mb10"
						>
							차단이력
						</h2>
						<div v-if="!registerPop && !modifyBtn" class="rowItem">
							<div
								class="commonInput borderRadi3Px borderContColor2 padW10 mb5"
								v-for="(item, index) in detailList"
								:key="item.id"
							>
								<div class="disFx mt10">
									<div>
										<span>
											{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
										</span>
										<span class="ml30">
											{{ item.storeName }} | {{ item.regiUserName }}
											<b class="historyNoti backColorBlue1 mainBlue1">
												{{ Number(detailList.length - index) }}회
											</b>
										</span>
									</div>
									<div>
										<span v-if="item.updateYn === 'Y'">
											<button
												style="padding: 0 10px; margin-left: 20px"
												class="excelBtn backColorWhite mainBlack2 borderContColor2"
												@click="modifyBtnFnc(item)"
											>
												수정
											</button>
											<button
												style="padding: 0 10px"
												class="excelBtn ml10 backColorWhite mainBlack2 borderContColor2"
												@click="rowDeleteBlack(item.blackId)"
											>
												삭제
											</button>
										</span>
									</div>
								</div>
								<div class="mb10">
									<span class="font-hotpink">
										{{ item.blackTypeMsg }}
									</span>
									<span class="ml30" style="color: #333">
										{{ item.blackReason }}
									</span>
								</div>
							</div>
						</div>
					</v-card-text>
					<!--					<v-card-text>
						<div
							class="infoCont pdLR30 popUpCustomSt1"
							style="background-color: #fff; padding-top: 20px"
						>
							<div class="titleCont">
								<p v-if="registerPop">블랙리스트 등록</p>
								<p v-if="!registerPop && !modifyBtn">블랙리스트 정보</p>
								<p v-if="modifyBtn">블랙리스트 수정</p>
							</div>
							<div class="rowHeader mt20">
								<p>고객정보</p>
							</div>
							&lt;!&ndash;      정보 페이지        &ndash;&gt;
							<div v-if="!registerPop && !modifyBtn">
								<div>
									<div
										class="commonInput mt10"
										style="display: inline-block; width: 140px"
									>
										<span> 블랙리스트 성명 </span>
									</div>
									<div class="customThTd">
										{{ blackListInfo.blackName }}
									</div>
								</div>
								<div>
									<div
										class="commonInput mt10"
										style="display: inline-block; width: 140px"
									>
										<span> 블랙리스트 전화번호 </span>
									</div>
									<div class="customThTd">
										<span>
											{{ blackListInfo.blackPhone1 }} -
											{{ blackListInfo.blackPhone2 }} -
											{{ blackListInfo.blackPhone3 }}
										</span>
									</div>
								</div>
							</div>
							&lt;!&ndash;      등록 페이지        &ndash;&gt;
							<div v-if="modifyBtn || registerPop" class="rowCont">
								<div class="rowItem" style="width: 100%; padding: 10px">
									<InputRadio
										title="블랙리스트 유형"
										:titleWidth="140"
										necessary
										:data="{
											name: 'blackType',
											value: this.formData.blackType,
										}"
										:disableYN="modifyUse"
										:optionList="statusList.BlackType"
										@input="setNewData"
									>
									</InputRadio>
									<InputText
										title="블랙리스트 성명"
										necessary
										:data="{
											name: 'blackName',
											value: this.formData.blackName,
										}"
										:titleWidth="140"
										@input="setNewData"
										:disableYN="modifyBtn"
									></InputText>
									<div>
										<div
											class="commonInput mt10"
											style="display: inline-block; width: 140px"
										>
											<span> 블랙리스트 생년월일 </span>
										</div>
										&lt;!&ndash;										<div style="display: inline-block" class="dateBox">
											<v-menu
												v-model.trim="menu1"
												:close-on-content-click="false"
												:nudge-right="40"
												transition="scale-transition"
												offset-y
												min-width="auto"
											>
												<template v-slot:activator="{ on, attrs }">
													<v-text-field
														outlined
														append-icon="mdi-calendar"
														v-model.trim="formData.blackDateBirth"
														readonly
														v-bind="attrs"
														v-on="on"
														:disabled="modifyUse"
														class="datePickerInput input_custom1"
													></v-text-field>
												</template>
												<v-date-picker
													@input="menu1 = false"
													v-model.trim="formData.blackDateBirth"
													:max="
														new Date(
															Date.now() -
																new Date().getTimezoneOffset() * 60000,
														)
															.toISOString()
															.substr(0, 10)
													"
													locale="ko-KR"
													:active-picker.sync="activePicker"
												></v-date-picker>
											</v-menu>
										</div>&ndash;&gt;
									</div>
									<div class="mt10">
										<div
											class="commonInput"
											style="
												display: inline-block;
												width: 140px;
												vertical-align: top;
											"
										>
											<span> 주소 </span>
										</div>
										<div
											id="addressCont"
											style="display: inline-block; width: 370px"
										>
											<input
												type="text"
												placeholder="우편번호"
												@click="postDialog = !postDialog"
												v-model.trim="formData.blackZipCode"
												readonly
												:postDialog="postDialog"
												class="cur_p"
												style="width: 80px"
												:disabled="modifyUse"
												id="postcode"
											/>
											<post-api
												@postapi="addressData"
												:postDialog="postDialog"
												@closeDialog="dialogClose"
												v-if="registerPop || modifyBtn"
												style="display: inline-block; margin-right: 10px"
											></post-api>
											<input
												type="text"
												placeholder="기본주소"
												@click="postDialog = !postDialog"
												v-model.trim="formData.blackAddr"
												readonly
												:postDialog="postDialog"
												class="cur_p"
												:disabled="modifyUse"
												style="width: 155px"
												id="roadAddress"
											/>

											<input
												type="text"
												placeholder="상세주소 입력"
												v-model.trim="formData.blackAddrDetail"
												id="detailAddress"
												:disableYN="modifyUse"
											/>
										</div>
									</div>
									<InputNText
										class="mt10"
										style="margin-left: 140px"
										title="블랙리스트 전화번호"
										necessary
										:titleWidth="120"
										:data="[
											{ name: 'blackPhone1', value: this.formData.blackPhone1 },
											{ name: 'blackPhone2', value: this.formData.blackPhone2 },
											{ name: 'blackPhone3', value: this.formData.blackPhone3 },
										]"
										@input="setNewData"
										:multiple="3"
										:disableYN="modifyBtn"
									>
									</InputNText>
									<InputText
										class="mt10"
										title="사유"
										:data="{
											name: 'blackReason',
											value: this.formData.blackReason,
										}"
										:titleWidth="140"
										@input="setNewData"
										:disableYN="modifyUse"
									></InputText>
								</div>
							</div>
							<template v-if="!registerPop && !modifyBtn">
								<div class="rowHeader mt20">
									<p>차단이력</p>
								</div>
								<div class="rowItem detailBox">
									<div
										class="commonInput"
										v-for="(item, index) in detailList"
										:key="item.id"
									>
										<div>
											<span>
												{{ item.regiDateTime | moment('YYYY-MM-DD HH:mm:ss') }}
											</span>
											<span class="ml30">
												{{ item.storeName }} | {{ item.regiUserName }}
												<b class="historyNoti">
													{{ Number(detailList.length - index) }}회
												</b>
											</span>
											<span v-if="item.updateYn === 'Y'">
												<button
													style="padding: 0 10px; margin-left: 20px"
													class="excelBtn"
													@click="modifyBtnFnc(item)"
												>
													수정
												</button>
												<button
													style="padding: 0 10px"
													class="excelBtn"
													@click="rowDeleteBlack(item.blackId)"
												>
													삭제
												</button>
											</span>
										</div>
										<div>
											<span class="font-hotpink">
												{{ item.blackTypeMsg }}
											</span>
											<span class="ml30" style="color: #333">
												{{ item.blackReason }}
											</span>
										</div>
									</div>
								</div>
							</template>
						</div>
					</v-card-text>-->
					<v-card-actions style="padding: 15px 20px">
						<div class="memberCont"></div>
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							<v-btn
								v-if="registerPop"
								@click="submit"
								style="background-color: #17a5ae"
							>
								등록
							</v-btn>
							<v-btn
								v-if="!registerPop && !modifyBtn && roleVal"
								style="background-color: #17a5ae"
								@click="deleteBlackListFnc"
							>
								삭제
							</v-btn>
							<v-btn
								v-if="modifyBtn"
								style="background-color: #17a5ae"
								@click="saveBlackList"
							>
								저장
							</v-btn>
							<v-btn
								v-if="modifyBtn"
								@click="cancleDialogFnc"
								style="background-color: #bdbdbd"
							>
								취소
							</v-btn>
							<v-btn
								v-if="!modifyBtn"
								style="background-color: #bdbdbd"
								@click="closeDialogFnc"
							>
								닫기
							</v-btn>
						</div>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import InputText from '../../../../components/input/InputText';
import InputRadio from '../../../../components/input/InputRadio';
import InputNText from '../../../../components/input/InputNText';
import PostApi from '../../../../components/PostApi';
import {copyObj, nullValidation2} from '../../../../common/common';

export default {
	props: {
		// 상위에서 내려받을 데이터 ( 수정  )
		blackListInfo: {
			type: Object,
		},
		// 상위에서 내려받을 데이터 ( 빠른개통, 신청서 )
		addBlackListInfo: {
			type: Object,
		},
		applId: {
			type: Number,
		},
	},
	components: {
		InputText,
		InputRadio,
		InputNText,
		PostApi,
	},
	data: () => ({
		dialog: true,
		registerPop: false,
		modifyUse: true,
		modifyBtn: false,
		postDialog: false,
		formData: {
			blackType: '',
			blackName: '',
			blackDateBirth: '',
			blackPhone1: '',
			blackPhone2: '',
			blackPhone3: '',
			blackReason: '',
			blackZipCode: '',
			blackAddr: '',
			blackAddrDetail: '',
		},
		detailList: [],
		compareFormData: {},
		modifyCheck: false,
		menu1: false,
		activePicker: null,
	}),
	computed: {
		statusList() {
			return this.$store.state.BlackListModule.statusList;
		},
		roleVal() {
			return this.$store.state.role === 'A';
		},
		blackTypeCount: {
			get() {
				return this.$store.state.BlackListModule.blackTypeCount;
			},
			set(newValue) {
				this.$store.state.BlackListModule.blackTypeCount = newValue;
			},
		},
		totalCnt() {
			return this.$store.state.BlackListModule.totalCnt;
		},
	},
	methods: {
		dialogClose(data) {
			this.postDialog = data;
		},
		addressData(data) {
			this.formData.blackAddr = data.address;
			this.formData.blackZipCode = data.zonecode;
		},
		cancleDialogFnc() {
			this.modifyBtn = !this.modifyBtn;
			this.modifyUse = !this.modifyUse;
		},
		closeDialogFnc() {
			this.dialog = !this.dialog;
		},
		modifyBtnFnc(item) {
			this.modifyBtn = !this.modifyBtn;
			this.modifyUse = !this.modifyUse;
			// 복사
			this.formData = copyObj(item);
		},
		// 그룹삭제
		async deleteBlackListFnc() {
			if (confirm('전체 삭제하시겠습니까?')) {
				await this.deleteBlackList();
			}
		},
		// 그룹삭제
		async deleteBlackList() {
			let data = [
				{
					blackName: this.blackListInfo.blackName,
					blackPhone: this.blackListInfo.blackPhone,
				},
			];
			const result = await this.$store.dispatch(
				'BlackListModule/deleteBlackListGroup',
				data,
			);
			if (result) {
				alert('삭제되었습니다.');
				this.dialog = !this.dialog;
				await this.getList();
			}
		},
		// 히스토리 삭제
		async rowDeleteBlack(id) {
			if (confirm('삭제하시겠습니까?')) {
				if (this.detailList.length > 1) {
					const result = await this.$store.dispatch(
						'BlackListModule/deleteBlackList',
						id,
					);
					if (result) {
						await this.getDetailList(this.blackListInfo);
						await this.getList();
					}
				} else {
					await this.deleteBlackList(); // 그룹삭제
				}
			}
		},
		// fileValueFnc(value) {
		// 	this.formData.fileData = value;
		// },
		setNewData(key, value) {
			this.formData[key] = value;
			if (!this.modifyCheck) {
				this.modifyCheck = true;
			}
		},
		// 수정 버튼
		async saveBlackList() {
			if (
				!nullValidation2(this.formData, [
					'blackType',
					'blackName',
					'blackPhone1',
					'blackPhone2',
					'blackPhone3',
				])
			) {
				return;
			}
			// 변경값만 보내기
			//let submitData = objectCompare(this.formData, this.compareFormData);
			//console.log(submitData);
			const result = await this.$store.dispatch(
				'BlackListModule/updateBlackList',
				this.formData,
			);
			if (result) {
				alert('저장됐습니다.');
				this.modifyBtn = !this.modifyBtn;
				this.modifyUse = !this.modifyUse;
				await this.getDetailList(this.blackListInfo);
			}
		},
		// 최초 등록 버튼 Fnc
		async submit() {
			if (
				!nullValidation2(this.formData, [
					'blackType',
					'blackName',
					'blackPhone1',
					'blackPhone2',
					'blackPhone3',
				])
			) {
				return;
			}
			const result = await this.$store.dispatch(
				'BlackListModule/insertBlack',
				this.formData,
			);
			if (result) {
				this.dialog = false;
				if (!this.applId) {
					await this.$store.dispatch('BlackListModule/getList');
					await this.$store.commit('BlackListModule/filterInit');
					this.blackTypeCount = this.totalCnt;
				} else {
					// 빠른개통, 신청서 리프레쉬
				}
			}
		},
		async getCommonCodeList() {
			let data = {
				initEnumData: ['BlackType'],
			};
			await this.$store.dispatch('BlackListModule/getStatusList', data);
		},
		createFnc() {
			// 수정팝업
			if (this.blackListInfo && Object.keys(this.blackListInfo).length !== 0) {
				this.registerPop = false;
				this.modifyUse = true;
				this.getDetailList(this.blackListInfo);
			} else {
				// 등록팝업
				this.registerPop = true;
				this.modifyUse = false;
				// 등록 팝업에 정보 넣을시 ( 빠른개통, 신청서 )
				if (this.addBlackListInfo) {
					this.formData = this.addBlackListInfo;
					this.formData['blackType'] = '';
				}
			}
		},
		async getDetailList(item) {
			let data = {
				blackAddr: item.blackAddr,
				blackPhone: item.blackPhone1 + item.blackPhone2 + item.blackPhone3,
			};
			const result = await this.$store.dispatch(
				'BlackListModule/getBlackDetailList',
				data,
			);
			this.detailList = result || [];
		},
		async getList() {
			const data = this.$store.state.BlackListModule.filterData;
			data.pageNo = 1;
			await this.$store.dispatch('BlackListModule/getList', data);
		},
	},
	watch: {
		dialog: {
			deep: true,
			handler: function (newVal) {
				if (!newVal) {
					this.$emit('closeDialog', this.dialog, 'blackListPop');
				}
			},
		},
		menu1(val) {
			val && setTimeout(() => (this.activePicker = 'YEAR'));
		},
	},
	created() {
		this.getCommonCodeList();
		this.createFnc();
	},
};
</script>

<style>
.ml5 {
	margin-left: 5px;
}
.tableCont table tbody tr {
	cursor: auto;
}
.commonInput span {
	padding-top: 5px;
	font-size: 13px;
	color: #6a909e;
}
.popUpCustomSt1 .dateBox .v-input__icon {
	margin-top: 0;
}
.popUpCustomSt1 .rowItem .dateBox input[type='text'] {
	font-size: 14px;
}
.customThTd {
	display: inline-block;
	width: 60%;
	border-bottom: 1px solid #ccc;
	padding-left: 5px;
}
.detailBox {
	width: 100% !important;
	padding: 10px;
	max-height: 300px;
	overflow-y: scroll;
}
.post-api-comp .post-Api-Btn {
	color: white;
	background-color: #0037a1 !important;
}
.post-api-comp .post-api-Box {
	display: inline-block !important;
}
</style>
