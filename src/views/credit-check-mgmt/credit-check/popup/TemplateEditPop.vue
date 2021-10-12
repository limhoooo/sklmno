<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog v-model.trim="dialog" width="500">
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">신용조회 템플릿편집</h2>
						<span class="closeBtn1 cur_p" @click="dialog = false"></span>
					</v-card-title>
					<v-card-text class="pad0">
						<div class="disFx justify-lg-space-between pad20">
							<div class="lh30 font-size-12">
								<select
									class="w100 borderContColor2 borderRadi3Px"
									v-model.trim="templateData.storeId"
									@change="getCreditTemplateList"
								>
									<option
										v-for="(item, index) in codeList.openStoreItems"
										:key="index"
										:value="item.openStoreId"
									>
										{{ item.openStoreName }}
									</option>
								</select>
								<select
									class="w100 borderContColor2 borderRadi3Px ml5"
									v-model.trim="templateData.joinType"
									@change="getCreditTemplateList"
								>
									<option
										v-for="(item, index) in codeList.joinTypeItems"
										:key="index"
										:value="item.value"
									>
										{{ item.name }}
									</option>
								</select>
								<select
									@click="renderingCategoryFnc"
									class="w120 borderContColor2 borderRadi3Px ml5"
									@change="
										templateUpdateFnc(
											$event.target.value,
											$event.target.selectedIndex,
										)
									"
									v-model.trim="templateData.templateLoad"
								>
									<option hidden value="">템플릿불러오기</option>
									<option value="new">새로만들기</option>
									<option
										v-for="(item, index) in codeList.templateItems"
										:key="index"
									>
										{{ item.ctTitle }}
									</option>
								</select>
							</div>
							<button
								class="padW10 lh30 font-size-12 backColorGray2 borderRadi3Px boldWt mainWhite"
								@click="templateReset"
							>
								템플릿 초기화
							</button>
						</div>

						<div>
							<ul class="mainBlack font-size-12 templateEditUl1">
								<li class="titlePad1">
									<input
										type="text"
										class="outlineInput1 w100P"
										style="padding-right: 20px"
										placeholder="템플릿 제목을 입력해주세요."
										v-model.trim="templateSaveData.title"
									/>
								</li>
								<template>
									<li
										v-for="(item, key, index) in inputListItems"
										:key="item.value"
									>
										<input
											type="checkbox"
											@change="testFnc(index, $event, key)"
											:checked="true"
											class="toggleList1"
										/>
										{{ key }}
										<!--									<span
											class="hamburger1 mr20"
											@click="hamburgerFnc(index)"
										></span>-->
									</li>
									<li v-for="(item, key) in plusInputList" :key="item.value">
										<button class="mr10" @click="minusCustomFnc(key)"></button>
										<input
											@change="plusListItemsFnc($event.target.value)"
											placeholder="응답값을 입력해주세요."
										/>
									</li>
								</template>
							</ul>
						</div>
						<button
							v-if="this.ownType"
							class="w100P backColorGray3 borderBottomColor1 lh40 addBtn1"
							@click="addInputListFnc"
						>
							버튼
						</button>

						<div class="disFx pad20 justify-lg-space-between">
							<div class="disFx">
								<button
									v-if="ownType === 'SALES_STORE'"
									class="borderRadi3Px borderContColor3 padW10 mainBlack font-size-12 boldWt lh36"
									@click="deleteCreditTemplate"
								>
									템플릿삭제
								</button>
								<div class="disFx ml5">
									<template>
										<h2 class="lh36 mainBlack">대표템플릿 설정</h2>
										<div class="radioStyleCredit ml30 lh36">
											<input
												type="radio"
												id="radio36"
												name="radioS6"
												value="Y"
												v-model="templateSaveData.mainTemplateYn"
												@change="mainTempFnc($event)"
											/><label class="ml-1" for="radio36">Y</label>
										</div>
										<div class="radioStyleCredit ml30 lh36">
											<input
												type="radio"
												id="radio37"
												name="radioS6"
												value="N"
												v-model="templateSaveData.mainTemplateYn"
												@change="mainTempFnc($event)"
											/><label class="ml-1" for="radio37">N</label>
										</div>
									</template>
								</div>
							</div>
							<div>
								<v-btn
									text
									class="backColorMint1 mainWhite boldWt borderReset w80 ml10"
									@click="insertCreditTemplate"
								>
									저장
								</v-btn>
								<v-btn
									text
									class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
									@click="dialog = false"
								>
									닫기
								</v-btn>
							</div>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
export default {
	name: 'templateEditPop',
	data: () => ({
		mainDialog: false,
		ownType: '',
		plusInputList: [],
		offInputList: {},
	}),
	computed: {
		templateIdx: {
			get() {
				return this.$store.state.CreditCheckModule.templateIdx;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.templateIdx = newValue;
			},
		},
		dialog: {
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
		inputListItems: {
			get() {
				return this.$store.state.CreditCheckModule.inputListItems;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.inputListItems = newValue;
			},
		},
		templateData: {
			get() {
				return this.$store.state.CreditCheckModule.templateData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.templateData = newValue;
			},
		},
		templateSaveData: {
			get() {
				return this.$store.state.CreditCheckModule.templateSaveData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.templateSaveData = newValue;
			},
		},
		templateNewData: {
			get() {
				return this.$store.state.CreditCheckModule.templateNewData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.templateNewData = newValue;
			},
		},
	},
	methods: {
		testFnc(idx, e, key) {
			// e.target.checked = event 타겟의 체크 벨류값
			if (!e.target.checked) {
				console.log(e.target.checked);
				this.offInputList[key] = '';
			} else {
				this.$delete(this.offInputList, key);
				e.preventDefault();
			}
		},
		// 템플릿 카테고리 삭제 - 객체안 키값 삭제시 동적으로 표현하기 위함
		minusCustomFnc(key) {
			this.$delete(this.plusInputList, key);
		},
		addInputListFnc() {
			// 템플릿 응답값 추가
			this.plusInputList.push('');
		},
		plusListItemsFnc(e) {
			this.inputListItems[e] = '';
			this.plusInputList = [];
		},
		// 템플릿 초기화
		templateReset() {
			this.inputListItems = [];
			if (
				this.templateData.joinType === 'NEW' ||
				this.templateData.joinType === 'NUM_CHANGE'
			) {
				let data = {
					가입가능회선: '',
					할부가능여부: '',
					미납금: '',
				};
				this.inputListItems = data;
			} else if (this.templateData.joinType === 'DVC_CHANGE') {
				let data = {
					'위약금(유예가능날짜)': '',
					잔여할부금: '',
					경과기간: '',
					'사용중기기/유심기종': '',
					사용중요금제: '',
					가족결합: '',
					미납금: '',
					할부가능여부: '',
					복지여부: '',
				};
				this.inputListItems = data;
			}
		},
		// 템플릿 조회
		getCreditTemplateList() {
			this.renderingCategoryFnc();
			this.templateNewData = [];
			this.mainDialog = false;
			this.templateSaveData.title = '';
			this.templateData.templateLoad = '';
			this.inputListItems = [];
			let data = {
				storeId: this.templateData.storeId,
				joinType: this.templateData.joinType,
			};
			this.$store.dispatch('CreditCheckModule/getCreditTemplateList', data);
		},
		// 템플릿 업데이트
		async insertCreditTemplate() {
			let idx = this.codeList.templateItems.findIndex(
				i => i.ownType === 'OPEN_STORE',
			);
			if (idx !== -1) {
				this.templateNewData = this.codeList.templateItems.splice(idx, 1);
			}
			/*			let data = this.codeList.templateItems[this.templateIdx];
			data.ctResTitle = this.inputListItems;
			data.ctResTitle = JSON.stringify(data.ctResTitle);*/
			/*			let result = confirm('저장하시겠습니까?');
			if (result) {
				await this.$store.dispatch(
					'CreditCheckModule/insertCreditTemplate',
					data,
				);
			}*/
			if (this.templateData.templateLoad === 'new') {
				if (!this.templateSaveData.title) {
					return alert('템플릿 제목을 입력해주세요');
				}
				let data = this.templateNewData[0];
				data.ctTitle = this.templateSaveData.title;
				data.mainTemplateYn = this.templateSaveData.mainTemplateYn;
				data.ctResTitle = this.inputListItems;
				for (let keyI in this.inputListItems) {
					for (let keyJ in this.offInputList) {
						if (keyI === keyJ) {
							this.$delete(this.inputListItems, keyI);
						}
					}
				}
				data.ctResTitle = JSON.stringify(data.ctResTitle);
				let result = confirm('저장하시겠습니까?');
				if (result) {
					await this.$store.dispatch(
						'CreditCheckModule/insertCreditTemplate',
						data,
					);
					this.inputListItemsTest = {};
				} else {
					return;
				}
				await this.getCreditTemplateList();
			} else {
				if (!this.templateSaveData.title) {
					return alert('템플릿 제목을 입력해주세요');
				}
				let data = this.codeList.templateItems[this.templateIdx];
				data.ctResTitle = this.inputListItems;
				for (let keyI in this.inputListItems) {
					for (let keyJ in this.offInputList) {
						if (keyI === keyJ) {
							this.$delete(this.inputListItems, keyI);
						}
					}
				}
				data.ctResTitle = JSON.stringify(data.ctResTitle);
				data.ctTitle = this.templateSaveData.title;
				let result = confirm('저장하시겠습니까?');
				if (result) {
					await this.$store.dispatch(
						'CreditCheckModule/insertCreditTemplate',
						data,
					);
					this.offInputList = {};
				} else {
					return;
				}
				await this.getCreditTemplateList();
			}
		},
		// 템플릿 삭제
		async deleteCreditTemplate() {
			console.log(this.codeList.templateItems[this.templateIdx]);
			if (this.templateIdx === 0 || this.templateIdx > 0) {
				let data = this.codeList.templateItems[this.templateIdx];
				await this.$store.dispatch(
					'CreditCheckModule/deleteCreditTemplate',
					data,
				);
				await this.getCreditTemplateList();
			}
		},
		// 랜더링시 v-model 0번지 데이터 입력 자동 select
		setSelectListFnc() {
			this.templateData.storeId = this.codeList.openStoreItems[0].openStoreId;
			this.templateData.joinType = this.codeList.joinTypeItems[0].value;
		},
		// 템플릿 저장시 신규, 완성템플릿 타이틀 분기
		templateUpdateFnc(value, idx) {
			this.plusInputList = [];
			this.offInputList = {};
			this.renderingCategoryFnc();
			this.mainDialog = false;
			this.templateSaveData.mainTemplateYn = 'N';
			if (value === 'new') {
				this.ownType = 'OPEN_STORE';
				this.templateSaveData.title = '';
				this.templateIdx = null;
				this.inputListItems = this.templateNewData[0].ctResTitle;
				this.inputListItems = this.inputListItems.replace(/&quot;/g, '"');
				this.inputListItems = JSON.parse(this.inputListItems);
			} else {
				this.ownType = this.codeList.templateItems[idx - 2].ownType;
				this.templateSaveData.title = this.codeList.templateItems[
					idx - 2
				].ctTitle;
				this.inputListItems = this.codeList.templateItems[idx - 2].ctResTitle;
				if (this.inputListItems) {
					this.inputListItems = this.inputListItems.replace(/&quot;/g, '"');
					this.inputListItems = JSON.parse(this.inputListItems);
				}
				this.templateIdx = idx - 2;
				if (
					this.codeList.templateItems[this.templateIdx].mainTemplateYn === 'Y'
				) {
					this.mainDialog = true;
					this.templateSaveData.mainTemplateYn = 'Y';
				} else {
					this.mainDialog = false;
					this.templateSaveData.mainTemplateYn = 'N';
				}
			}
		},
		// 템플릿 편집 카테고리 FNC
		renderingCategoryFnc() {
			let idx = this.codeList.templateItems.findIndex(
				i => i.ownType == 'OPEN_STORE',
			);
			if (idx !== -1) {
				this.templateNewData = this.codeList.templateItems.splice(idx, 1);
			}
		},
		categoryFnc() {
			let idx = this.codeList.templateItems.findIndex(
				i => i.ownType == 'OPEN_STORE',
			);
			if (idx !== -1) {
				this.templateNewData = this.codeList.templateItems.splice(idx, 1);
				this.inputListItems = this.templateNewData[0].ctResTitle;
				this.inputListItems = this.inputListItems.replace(/&quot;/g, '"');
				this.inputListItems = JSON.parse(this.inputListItems);
			}
		},
		async mainTempFnc(e) {
			let conText = '저장하시겠습니까';
			if (this.templateData.templateLoad !== 'new') {
				if (confirm(conText) === true) {
					let data = {
						ctId: this.codeList.templateItems[this.templateIdx].ctId,
						mainTemplateYn: this.templateSaveData.mainTemplateYn,
						joinType: this.codeList.templateItems[this.templateIdx].joinType,
					};
					await this.$store.dispatch(
						'CreditCheckModule/setMainCreditTemplate',
						data,
					);
					await this.getCreditTemplateList();
				} else {
					e.preventDefault();
				}
			}
		},
		renderingData() {
			this.offInputList = {};
			this.inputListItems = {};
			this.templateIdx = null;
			this.mainDialog = false;
			this.templateSaveData.mainTemplateYn = 'N';
			this.templateNewData = [];
		},
	},
	async created() {
		await this.renderingData();
		await this.setSelectListFnc();
		await this.getCreditTemplateList();
		await setTimeout(() => {
			this.renderingCategoryFnc();
		}, 500);
	},
};
</script>

<style scoped>
.templateEditUl1 {
	border-top: 1px solid #000000;
}
.templateEditUl1 li {
	position: relative;
	line-height: 40px;
	border-bottom: 1px solid #eeeeee;
	padding-left: 55px;
}
.templateEditUl1 li button {
	position: absolute;
	background-image: url('../../../../assets/img/minus1.png');
	width: 18px;
	height: 18px;
	left: 25px;
	top: 11px;
}
.hamburger1 {
	position: absolute;
	right: 0;
	top: 15px;
	display: inline-block;
	background-image: url('../../../../assets/img/hamburger1.png');
	width: 17px;
	height: 10px;
	cursor: pointer;
}
.addBtn1 {
	background-image: url('../../../../assets/img/plusImg2.png');
	background-position: center center;
	text-indent: -9000px;
}
.titlePad1 {
	padding: 0 0 0 20px !important;
}
.outlineInput1:focus {
	outline: none;
}
.toggleList1 {
	position: absolute;
	left: 27px;
	top: 13px;
}
</style>
