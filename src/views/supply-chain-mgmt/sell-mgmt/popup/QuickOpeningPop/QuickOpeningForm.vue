<template>
	<div class="quick-bg">
		<!-- 특별관리 -->
		<div style="z-index: 2" class="checkStyleCont8">
			<input
				type="checkbox"
				class="checkStyle"
				v-model="formData.basic.beforeReserveYn"
				id="preOrder1"
				:disabled="!modifyState"
				:true-value="'Y'"
				:false-value="'N'"
				@change="toggleReserveNum"
			/>
			<label class="font-btn-color ml-2 cur_p" for="preOrder1">사전예약</label>
			<input
				type="text"
				ref="preOrderNumInput"
				style="z-index: 2"
				class="preOrderInput"
				placeholder="예약번호 ex)1234"
				autocomplete="off"
				:disabled="!modifyState || formData.basic.beforeReserveYn === 'N'"
				v-model.trim="formData.basic.reserveNum"
				@input="regExpReserveNum($event.target.value)"
			/>
		</div>
		<special-care></special-care>
		<!-- 빠른개통 작성 -->
		<div class="new_popTable1 mt15">
			<p
				v-if="beforeAdmin"
				class="mainRed"
				style="font-weight: bold; line-height: 10px"
			>
				※ 구전산 신청서입니다.
			</p>
			<table class="w100P">
				<tr>
					<td class="w140">영업점</td>
					<td class="w240">
						<div>
							<span class="ml5">{{ formData.basic.saleStoreIdString }}</span>
							<!--							<input-select-->
							<!--								title="영업점명"-->
							<!--								:data="{-->
							<!--									name: 'saleStoreId',-->
							<!--									value: formData.basic.saleStoreId,-->
							<!--								}"-->
							<!--								@input="setNewData"-->
							<!--								:optionList="-->
							<!--									[{name:formData.basic.saleStoreIdString,value:formData.basic.saleStoreId}]-->
							<!--								"-->
							<!--								:disableYN="true"-->

							<!--								formatType="Number"-->
							<!--							></input-select>-->
						</div>
					</td>
					<td class="w140">개통점<span class="redfont">*</span></td>
					<td class="w240" colspan="3">
						<div class="w240">
							<select
								class="newInput1 lh32 w240"
								v-model.trim="openStoreObject"
								:disabled="!modifyState"
								@change="setOpeningStoreRelatedInputs"
							>
								<option
									disabled
									selected
									style="background-color: #eaeaea; color: #000"
								>
									개통점명을 선택하세요
								</option>
								<option
									v-for="(option, index) in optionList.openingStoreList"
									:key="index"
									:value="{
										openingStoreId: option.openStoreId,
										openingTelecomCodeId: option.telecom,
									}"
								>
									{{ option.openStoreName }}
								</option>
							</select>
						</div>
					</td>
				</tr>
				<tr>
					<td>고객유형</td>
					<td>
						<input-select
							title="고객유형"
							:data="{ name: 'cusType', value: formData.customer.cusType }"
							@input="setNewData"
							:optionList="optionList.customerTypeItems"
							disableYN
							width="240"
						>
						</input-select>
					</td>
				</tr>
				<template v-if="formData.customer.cusType === 'MINORS'">
					<tr>
						<td class="w140">
							법정대리인<br />성명<span class="redfont">*</span>
						</td>
						<td class="w240">
							<input
								type="text"
								:disabled="!modifyState"
								class="240 borderContColor2 borderRadi4Px lh32"
								v-model.trim="customer.courtProctorName"
							/>
						</td>
						<td class="w140">
							법정대리인<br />주민등록번호<span class="redfont">*</span>
						</td>
						<td class="w240">
							<input
								type="text"
								:disabled="!modifyState"
								class="w240 borderContColor2 borderRadi4Px lh32"
								@input="
									regiNumSplitFnc(
										$event.target.value,
										'courtProctorRegiNum',
										'customer',
									)
								"
								v-model.trim="customer.courtProctorRegiNumConcat"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</td>
						<td class="w140">
							법정대리인<br />연락처<span class="redfont">*</span>
						</td>
						<td class="w240">
							<input
								type="text"
								:disabled="!modifyState"
								class="borderContColor2 borderRadi4Px lh32 w240"
								@input="
									phoneNumSplitFnc(
										$event.target.value,
										'courtProctorPhone',
										'customer',
									)
								"
								v-model.trim="customer.courtProctorPhone"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</td>
					</tr>
					<tr>
						<td class="w140">관계<span class="redfont">*</span></td>
						<td class="w240">
							<input
								type="text"
								:disabled="!modifyState"
								class="borderContColor2 borderRadi4Px lh32 w240"
								v-model.trim="customer.courtProctorRelation"
							/>
						</td>
					</tr>
				</template>
				<template v-if="formData.customer.cusType === 'CORP'">
					<tr>
						<td class="w140">법인명<span class="redfont">*</span></td>
						<td class="w240">
							<div>
								<input-text
									title="법인명"
									:data="{ name: 'bizName', value: formData.customer.bizName }"
									@input="setNewData"
									:disableYN="!modifyState"
									width="240"
								>
								</input-text>
							</div>
						</td>
						<td class="w140">사업자번호<span class="redfont">*</span></td>
						<td class="w240">
							<input
								type="text"
								:disabled="!modifyState"
								class="borderContColor1 borderRadi4Px lh32 w240"
								@input="
									bizNumSplitFnc($event.target.value, 'bizNum', 'customer')
								"
								v-model="customer.bizNum"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</td>
						<td class="w140">연락처<span class="redfont">*</span></td>
						<td class="w240">
							<input
								type="text"
								:disabled="!modifyState"
								class="borderContColor2 borderRadi4Px lh32 w240"
								@input="
									phoneNumSplitFnc($event.target.value, 'cusPhone', 'customer')
								"
								v-model.trim="customer.cusPhone"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</td>
					</tr>
				</template>
				<tr>
					<template v-if="formData.customer.cusType === 'CORP'">
						<td class="w140">법인등록번호<span class="redfont">*</span></td>
						<td class="w240">
							<input
								type="text"
								:disabled="!modifyState"
								class="borderContColor1 borderRadi4Px lh32 w240"
								@input="
									regiNumSplitFnc($event.target.value, 'bizRegiNum', 'customer')
								"
								v-model="customer.bizRegiNumConcat"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</td>
					</template>
					<td class="w140">고객명<span class="redfont">*</span></td>
					<td class="w240">
						<div>
							<input-text
								title="고객명"
								:data="{ name: 'cusName', value: formData.customer.cusName }"
								@input="setNewData"
								:disableYN="!modifyState"
								placeholder=" "
								width="240"
							>
							</input-text>
						</div>
					</td>
					<template
						v-if="
							formData.customer.cusType === 'INDV' ||
							formData.customer.cusType === 'MINORS' ||
							formData.customer.cusType === 'INDV_BSNM' ||
							formData.customer.cusType === 'CORP'
						"
					>
						<td class="w140">주민등록번호<span class="redfont">*</span></td>
						<td class="w240">
							<input
								type="text"
								:disabled="!modifyState"
								class="w240 borderContColor2 borderRadi4Px lh32"
								@input="
									regiNumSplitFnc($event.target.value, 'cusRegiNum', 'customer')
								"
								v-model.trim="customer.cusRegiNumConcat"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</td>
					</template>
					<template v-if="formData.customer.cusType === 'FOREIGN'">
						<td class="w140">외국인등록번호<span class="redfont">*</span></td>
						<td class="w240">
							<input
								type="text"
								:disabled="!modifyState"
								class="w240 borderContColor2 borderRadi4Px lh32"
								@input="
									regiNumSplitFnc($event.target.value, 'licenseNum', 'customer')
								"
								v-model.trim="customer.licenseNumConcat"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</td>
					</template>
					<template v-if="formData.customer.cusType !== 'CORP'">
						<td class="w140">휴대폰번호<span class="redfont">*</span></td>
						<td class="w240">
							<input
								type="text"
								:disabled="!modifyState"
								class="borderContColor2 borderRadi4Px lh32 w240"
								@input="
									phoneNumSplitFnc($event.target.value, 'cusPhone', 'customer')
								"
								v-model.trim="customer.cusPhone"
								oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
							/>
						</td>
					</template>
				</tr>
				<tr>
					<td>주소</td>
					<td colspan="5">
						<div class="disFx" style="width: 668px">
							<input
								class="w680 borderContColor1 lh32 borderRadi4Px"
								type="text"
								disabled
								:value="`${formData.customer.cusZipCode} / ${formData.customer.cusAddr} / ${formData.customer.cusAddrDetail}`"
							/>
						</div>
					</td>
				</tr>
				<tr>
					<td>요금감면<span class="redfont">*</span></td>
					<td>
						<input-select
							title="요금감면"
							:data="{
								name: 'chargeReductType',
								value: formData.customer.chargeReductType,
							}"
							@input="setNewData"
							:optionList="optionList.chargeReductTypeItems"
							:disableYN="!modifyState"
							width="240"
						>
						</input-select>
					</td>
					<td>블랙리스트</td>
					<td>
						<input-text
							title="블랙리스트"
							:data="{
								name: 'blackType',
								value: blackList.blackTypeMsg
									? `${blackList.blackTypeMsg}`
									: '',
							}"
							:customerData="this.formData.customer"
							disableYN
							placeholder="조회된 결과가 없습니다"
							@input="setNewData"
							width="174"
						>
							<template v-slot:slot="{ getBlackListFnc }">
								<button @click="getBlackListFnc" :disabled="!modifyState">
									조회
								</button>
							</template>
						</input-text>
					</td>
				</tr>
				<tr>
					<td>납부방법</td>
					<td colspan="3">
						<div class="disFx" style="width: 100%">
							<span
								class="disIN"
								v-if="this.formData.payment.paymentType !== 'EXIST_SAME'"
								v-text="paymentType"
								style="
									border-radius: 50px;
									width: auto;
									padding: 2px 12px;
									background: #007ef2;
									color: white;
								"
							></span>
							<input
								style="width: 100%; max-width: 580px"
								type="text"
								disabled
								:value="modelPayment"
							/>
						</div>
					</td>
					<td>청구서종류</td>
					<td>
						<input-text
							title="청구서종류"
							:data="{
								name: 'billType',
								value: this.formData.payment.billTypeMsg,
							}"
							disableYN
							placeholder="정보 없음"
							width="240"
						>
						</input-text>
					</td>
				</tr>
				<tr>
					<td>개통일자</td>
					<td>
						<div class="datePickerStyle1 w240 posR disFX">
							<span style="display: flex; margin-right: 4px; width: 136px">
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
											placeholder="YY:mm:dd"
											:disabled="
												!modifyState ||
												!formData.basic.openingDate ||
												storeVal === 'StoreGrade_S'
											"
											outlined
											v-model.trim="formData.basic.openingDate"
											v-bind="attrs"
											v-on="on"
											append-icon="mdi-calendar"
											readonly
											class="w140"
										></v-text-field>
									</template>
									<v-date-picker
										:disabled="!modifyState"
										v-model.trim="formData.basic.openingDate"
										@input="menu1 = false"
										locale="ko-KR"
									></v-date-picker>
								</v-menu>
								<!--							<button-->
								<!--								v-if="formData.basic.openingDate"-->
								<!--								class="resetBtn"-->
								<!--                :disabled="!modifyState || !formData.basic.openingDate"-->
								<!--                @click="resetDate('openingDate')"-->
								<!--							>-->
								<!--								x-->
								<!--							</button>-->
							</span>
							<span>
								<vue-timepicker
									:disabled="
										!modifyState ||
										!formData.basic.openingTime ||
										storeVal === 'StoreGrade_S'
									"
									v-model.trim="formData.basic.openingTime"
								></vue-timepicker>
							</span>
						</div>
					</td>
					<td>철회일자</td>
					<td>
						<div class="datePickerStyle1 w240 posR disFX">
							<span style="display: flex; margin-right: 4px; width: 136px">
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
											class="text w140"
											outlined
											placeholder="YY:mm:dd"
											v-model.trim="formData.basic.cancelDate"
											v-bind="attrs"
											v-on="on"
											append-icon="mdi-calendar"
											readonly
											:disabled="
												!modifyState ||
												!formData.basic.cancelDate ||
												storeVal === 'StoreGrade_S'
											"
										></v-text-field>
									</template>
									<v-date-picker
										v-model.trim="formData.basic.cancelDate"
										@input="menu2 = false"
										locale="ko-KR"
										:disabled="!modifyState"
									></v-date-picker>
								</v-menu>
							</span>
							<span>
								<vue-timepicker
									:disabled="
										!modifyState ||
										!formData.basic.cancelTime ||
										storeVal === 'StoreGrade_S'
									"
									v-model.trim="formData.basic.cancelTime"
								></vue-timepicker>
							</span>
							<!--							<button-->
							<!--								v-if="formData.basic.cancelDate"-->
							<!--								class="resetBtn"-->
							<!--                :disabled="!modifyState || !formData.basic.openingDate"-->
							<!--                @click="resetDate('cancelDate')"-->
							<!--							>-->
							<!--								x-->
							<!--							</button>-->
						</div>
					</td>
					<template v-if="ApplExchangeFlag">
						<td class="w140">교품일시</td>
						<td
							class="datePickerStyle1 posR"
							style="display: flex; border: 0; width: 272px"
						>
							<span style="display: flex; margin-right: 4px; width: 136px">
								<v-menu
									v-model.trim="menu3"
									:close-on-content-click="false"
									:nudge-right="40"
									transition="scale-transition"
									offset-y
									:attach="true"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											placeholder="YY:mm:dd"
											class="w120"
											style="font-size: 12px"
											outlined
											readonly
											v-bind="attrs"
											v-on="on"
											append-icon="mdi-calendar"
											:disabled="!modifyState"
											v-model.trim="formData.basic.exchangeDate"
										></v-text-field>
									</template>
									<v-date-picker
										@input="menu3 = false"
										locale="ko-KR"
										v-model.trim="formData.basic.exchangeDate"
									></v-date-picker>
								</v-menu>
							</span>
							<span>
								<!--         type 지정이 안돼있는 model 연결시 obj형태로 리턴       -->
								<vue-timepicker
									:disabled="!modifyState"
									:value="formData.basic.exchangeTime"
									@input="timepickerFnc($event, 'exchangeTime')"
								></vue-timepicker>
							</span>
							<!--            <button-->
							<!--                v-if="basicData.openingDate"-->
							<!--                class="resetBtn"-->
							<!--                :disabled="!basicData.openingDate"-->
							<!--                @click="resetDate('openingDate')"-->
							<!--            >-->
							<!--              x-->
							<!--            </button>-->
						</td>
					</template>
				</tr>
				<tr>
					<td>가입유형<span class="redfont">*</span></td>
					<td>
						<input-select
							title="가입유형"
							:data="{
								name: 'joinType',
								value: formData.join.joinType,
							}"
							@input="setNewData"
							:option-list="optionList.joinTypeItems"
							:disableYN="!modifyState"
							width="240"
						></input-select>
					</td>
					<td>기존통신사</td>
					<td>
						<input-select
							title="기존 통신사"
							:data="{
								name: 'existTelecomCodeId',
								value: formData.join.existTelecomCodeId,
							}"
							@input="setNewData"
							:optionList="
								formatOptionList(
									'ExistingTelecomTypeItems',
									'codeNm',
									'codeSeq',
								)
							"
							formatType="Number"
							disableYN
							width="240"
						>
						</input-select>
					</td>
				</tr>
				<tr>
					<td>개통유형</td>
					<td>
						<input-text
							title="개통유형"
							:data="{
								name: 'beforeOpeningType',
								value:
									(formData.basic.beforeOpeningType === 'BEFORE_OPENING' &&
										'선개통') ||
									(formData.basic.beforeOpeningType === 'AFTER_OPENING' &&
										'후개통'),
							}"
							disableYN
							width="240"
						>
						</input-text>
					</td>
					<td>개통종류</td>
					<td>
						<input-text
							title="개통종류"
							:data="{
								name: 'applType',
								value:
									(formData.basic.applType === 'DVC_USIM' && '기기+유심') ||
									(formData.basic.applType === 'DVC' && '기기') ||
									(formData.basic.applType === 'USIM' && '유심') ||
									(formData.basic.applType === undefined && '정보없음'),
							}"
							disableYN
							width="240"
						>
						</input-text>
					</td>
				</tr>
				<tr>
					<td>
						개통휴대폰번호<span
							v-if="this.formData.join.joinType !== 'NEW'"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<input
							type="text"
							:disabled="!modifyState"
							class="borderRadi4Px borderContColor1 w240 lh32"
							@input="
								phoneNumSplitFnc($event.target.value, 'openingPhone', 'join')
							"
							v-model.trim="join.openingPhone"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						/>
					</td>
					<td v-if="this.formData.join.joinType === 'NEW'">
						개통희망번호<span class="redfont">*</span>
					</td>
					<td colspan="3" v-if="this.formData.join.joinType === 'NEW'">
						<div class="disFx w250 hopeNumInput">
							<input
								type="text"
								maxlength="3"
								disabled
								class="disabledNum lh32 borderContColor1"
							/>
							<span class="lh32" style="margin: 0 2px">-</span>
							<input
								type="text"
								maxlength="4"
								disabled
								class="disabledNum borderContColor1"
							/>
							<span class="lh32" style="margin: 0 2px">-</span>
							<input
								type="text"
								class="roundBorder"
								v-model.trim="formData.join.openingHopeNum"
								maxlength="4"
								oninput="this.value = this.value.replace(/[^0-9]/g, '');"
								:disabled="!modifyState"
							/>
						</div>
					</td>
				</tr>
				<tr v-if="this.formData.join.joinType === 'NUM_CHANGE'">
					<td>인증방식<span class="redfont">*</span></td>
					<td>
						<input-select
							title="인증방식"
							:data="{
								name: 'numChangeAuthType',
								value: formData.join.numChangeAuthType,
							}"
							@input="setNewData"
							:optionList="optionList.numChangeAuthTypeItems"
							:disableYN="!modifyState"
							width="240"
						></input-select>
					</td>
					<td>
						인증번호<span
							v-if="this.formData.join.numChangeAuthType !== 'GIRO'"
							class="redfont"
							>*</span
						>
					</td>
					<td colspan="3">
						<div class="w250">
							<input-text
								title="인증번호"
								type="number"
								:data="{
									name: 'numChangeAuthTypeNum',
									value: formData.join.numChangeAuthTypeNum,
								}"
								@input="setNewData"
								:disableYN="!modifyState"
								placeholder=" "
								width="240"
							></input-text>
						</div>
					</td>
				</tr>
				<tr>
					<td>기기명[모델명]<span class="redfont">*</span></td>
					<td>
						<div class="datePickerStyle1">
							<v-autocomplete
								class="w240 dvcFontBox"
								attach
								@input="initRelatedInput('goodsId')"
								:items="optionList.goodsItems"
								item-text="goodsName"
								item-value="goodsId"
								v-model.trim="formData.join.goodsId"
								:disabled="!modifyState"
								outlined
							></v-autocomplete>
						</div>
					</td>
					<td>용량<span v-if="!beforeAdmin" class="redfont">*</span></td>
					<td>
						<input-select
							title="용량"
							:data="{
								name: 'capacity',
								value: formData.join.capacity,
							}"
							@input="setNewData"
							:option-list="capacityItems"
							:disableYN="!modifyState"
							width="240"
						></input-select>
					</td>
					<td>색상<span v-if="!beforeAdmin" class="redfont">*</span></td>
					<td>
						<input-select
							title="색상"
							:data="{ name: 'color', value: formData.join.color }"
							@input="setNewData"
							:optionList="colorItems"
							:disableYN="!modifyState"
							width="240"
						></input-select>
					</td>
				</tr>
				<tr>
					<td>기기일련번호</td>
					<td>
						<matchingInput
							:formData="formData"
							:propsDeviceType="'DVC'"
							:AppFormCreFlag="true"
							:disableYN="!modifyState"
							:componentType="'QUICK'"
							@deviceChange="deviceChangeFnc"
						></matchingInput>
					</td>
					<td>유심</td>
					<td>
						<input-select
							title="유심"
							:data="{
								name: 'usimPaymentType',
								value: formData.join.usimPaymentType,
							}"
							@input="setNewData"
							:optionList="UsimPaymentTypeList"
							:disableYN="!modifyState"
							width="240"
						></input-select>
					</td>
					<td>유심종류</td>
					<td>
						<input-select
							title="유심종류"
							:data="{
								name: 'usimType',
								value: formData.join.usimType,
							}"
							@input="setNewData"
							:optionList="[
								{ name: '나노', value: 'NANO_USIM' },
								{ name: '마이크로', value: 'MICRO_USIM' },
							]"
							:disableYN="!modifyState"
							width="240"
						></input-select>
					</td>
				</tr>
				<tr>
					<td>유심일련번호</td>
					<td colspan="5">
						<div class="w250">
							<matchingInput
								:formData="formData"
								:propsDeviceType="'USIM'"
								:AppFormCreFlag="true"
								:disableYN="!modifyState"
								:componentType="'QUICK'"
								@usimChange="usimChangeFnc"
							></matchingInput>
						</div>
					</td>
				</tr>
				<tr>
					<td>약정유형<span class="redfont">*</span></td>
					<td>
						<input-radio
							class="ml20"
							title="약정유형"
							:data="{
								name: 'agreementType',
								value: formData.join.agreementType,
							}"
							@input="setNewData"
							:optionList="optionList.AgreementTypeItems"
							:disableYN="!modifyState"
						></input-radio>
					</td>
					<td class="boldWt">
						할부기간<span
							v-if="this.formData.basic.beforeOpeningType === 'BEFORE_OPENING'"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<input-select
							title="할부기간"
							:data="{
								name: 'instlPeriodType',
								value: formData.join.instlPeriodType,
							}"
							@input="setNewData"
							:optionList="optionList.installmentsPeriodTypeItems"
							:disableYN="!modifyState"
							width="240"
						>
						</input-select>
					</td>
					<td class="boldWt">
						약정기간<span
							v-if="this.formData.basic.beforeOpeningType === 'BEFORE_OPENING'"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<input-select
							title="약정기간"
							:data="{
								name: 'agreementPeriodType',
								value: formData.join.agreementPeriodType,
							}"
							@input="setNewData"
							:optionList="optionList.agreementPeriodTypeItems"
							:disableYN="!modifyState"
							width="240"
						>
						</input-select>
					</td>
				</tr>
				<tr>
					<td class="boldWt">
						요금제<span
							v-if="this.formData.basic.beforeOpeningType === 'BEFORE_OPENING'"
							class="redfont"
							>*</span
						>
					</td>
					<td colspan="5">
						<div
							class="datePickerStyle1 w240"
							style="font-size: 12px !important"
						>
							<v-autocomplete
								class="dvcFontBox"
								attach
								@click="alertFnc"
								@input="initRelatedInput('chargeId')"
								:items="optionList.chargeList"
								itemText="chargeName"
								itemValue="chargeId"
								v-model.trim="formData.join.chargeId"
								:disabled="!modifyState"
								outlined
							></v-autocomplete>
						</div>
					</td>
				</tr>
				<tr>
					<td>부가서비스</td>
					<td colspan="5">
						<div class="disFx" style="width: 670px">
							<add-service
								:data="{
									name: 'addServiceList',
									value: formData.join.addServiceList,
								}"
								:telecomId="this.formData.join.openingTelecomCodeId"
								:optionList="optionList.addServiceList"
								:width="670"
								:disableYN="!modifyState"
								:addServiceData="this.formData.join.addServiceList"
								@setNewAddSvcList="setNewAddSvcList"
								@minusAddSvcList="minusAddSvcList"
							></add-service>
						</div>
					</td>
				</tr>
				<tr>
					<td>출고가<span v-if="!beforeAdmin" class="redfont">*</span></td>
					<td>
						<input-money
							title="출고가"
							:data="{ name: 'releaseAmt', value: formData.join.releaseAmt }"
							@input="setNewData"
							:disableYN="!modifyState"
						></input-money>
					</td>
					<td>
						공시지원금<span
							v-if="
								!beforeAdmin &&
								this.formData.join.agreementType === 'PUBNOTI_SUPAMT'
							"
							class="redfont"
							>*</span
						>
					</td>
					<td>
						<input-money
							title="공시지원금"
							:data="{
								name: 'pubNotiSupportAmt',
								value: formData.join.pubNotiSupportAmt,
							}"
							@input="setNewData"
							:disableYN="!modifyState"
						></input-money>
					</td>
					<td>추가지원금</td>
					<td>
						<input-money
							title="추가지원금"
							:data="{
								name: 'extraSupportAmt',
								value: formData.join.extraSupportAmt,
							}"
							@input="setNewData"
							:disableYN="!modifyState"
						></input-money>
					</td>
				</tr>
				<tr>
					<td>프리할부/선수납</td>
					<td>
						<input-money
							title="프리할부/선수납"
							:data="{
								name: 'freeInstlAmt',
								value: formData.join.freeInstlAmt,
							}"
							@input="setNewData"
							type="number"
							:disableYN="
								formData.join.instlPeriodType === 'CASH' || !modifyState
							"
						></input-money>
					</td>
					<td>기타할인금</td>
					<td>
						<input-money
							title="기타할인금"
							:data="{
								name: 'etcDiscountAmt',
								value: formData.join.etcDiscountAmt,
							}"
							@input="setNewData"
							:disableYN="!modifyState"
						></input-money>
					</td>
					<td>실판매가<span v-if="!beforeAdmin" class="redfont">*</span></td>
					<td>
						<input-money
							title="실판매가"
							:data="{
								name: 'actualSellAmt',
								value: formData.join.actualSellAmt,
							}"
							@input="setNewData"
							disableYN
						></input-money>
					</td>
				</tr>
				<tr>
					<td>입금받을 금액</td>
					<td>
						<input-money
							title="입금받을 금액"
							:data="{
								name: 'depositAmt',
								value: formData.join.depositAmt,
							}"
							@input="setNewData"
							type="number"
							:disableYN="!modifyState"
						></input-money>
					</td>
					<td>입금여부</td>
					<td>
						<input-radio
							class="ml20"
							title="약정유형"
							:data="{
								name: 'depositYn',
								value: formData.join.depositYn,
							}"
							@input="setNewData"
							:optionList="[
								{ name: '예', value: 'Y' },
								{ name: '아니오', value: 'N' },
							]"
							:disableYN="!modifyState"
						></input-radio>
					</td>
				</tr>
				<tr>
					<td>배송구분<span class="redfont">*</span></td>
					<td style="padding-left: 34px">
						<input-radio
							title="배송구분"
							:data="{
								name: 'deliveryType',
								value: formData.delivery.deliveryType,
							}"
							@input="setNewData"
							:optionList="optionList.deliveryList"
							disableYN
						></input-radio>
					</td>
					<td
						v-if="
							this.formData.delivery.deliveryType === 'PS' ||
							this.formData.delivery.deliveryType === 'PS_SALES'
						"
					>
						택배사<span
							v-if="this.formData.delivery.deliveryType === 'PS'"
							class="redfont"
							>*</span
						>
					</td>
					<td
						v-if="
							this.formData.delivery.deliveryType === 'PS' ||
							this.formData.delivery.deliveryType === 'PS_SALES'
						"
					>
						<input-select
							title="택배사"
							:data="{
								name: 'courierCodeId',
								value: formData.delivery.courierCodeId,
							}"
							@input="setNewData"
							:optionList="
								formatOptionList('courierItemsList', 'codeDesc', 'codeSeq')
							"
							:disableYN="
								this.formData.delivery.couriorMatchingYn === 'Y' || !modifyState
							"
							width="240"
						></input-select>
					</td>
					<td
						v-if="
							this.formData.delivery.deliveryType === 'PS' ||
							this.formData.delivery.deliveryType === 'PS_SALES'
						"
					>
						송장번호<span
							v-if="this.formData.delivery.deliveryType === 'PS'"
							class="redfont"
							>*</span
						>
					</td>
					<td
						v-if="
							this.formData.delivery.deliveryType === 'PS' ||
							this.formData.delivery.deliveryType === 'PS_SALES'
						"
					>
						<input-text
							v-if="
								this.formData.delivery.deliveryType === 'PS' ||
								this.formData.delivery.deliveryType === 'PS_SALES'
							"
							title="송장번호"
							:data="{
								name: 'invoiceNum',
								value: formData.delivery.invoiceNum,
							}"
							@input="setNewData"
							placeholder=" "
							:disableYN="
								this.formData.delivery.couriorMatchingYn === 'Y' || !modifyState
							"
						></input-text>
					</td>
				</tr>
				<tr>
					<td>첨부파일</td>
					<td colspan="5">
						<FileUpload
							:propsFileList="propsFileList"
							:applId="quickOpeningApplId"
							@fileValueFnc="fileValueFnc"
							:disableYN="!modifyState"
							:modifyState="modifyState"
						></FileUpload>
					</td>
				</tr>
			</table>
		</div>
		<BlackListTablePop
			v-if="blackListTablePop"
			:blackListData="blackList"
			@closeDialog="blackCloseDialog"
		></BlackListTablePop>
	</div>
</template>

<script>
import InputSelect from '../../../../../components/input/InputSelect';
import InputText from '../../../../../components/input/InputText';
import InputMoney from '../../../../../components/input/InputMoney';
import InputRadio from '../../../../../components/input/InputRadio';
import AddService from '../../../../../components/addService';
import FileUpload from '../../../../../components/FileUpload';
import numberSplit from '../../../../../common/numberSplit';
import { getFormatDate, setNewDataFnc } from '../../../../../common/common';
import matchingInput from '../../../../../components/matchingInput';
import SpecialCare from '@/views/supply-chain-mgmt/sell-mgmt/popup/QuickOpeningPop/SpecialCare';
//https://phoenixwong.github.io/vue2-timepicker/
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue';
import BlackListTablePop from '@/views/supply-chain-mgmt/black-list/popup/BlackListTablePop';

export default {
	namespaced: true,
	props: {
		quickOpeningApplId: {
			type: Number,
		},
	},
	mixins: [numberSplit],
	components: {
		BlackListTablePop,
		SpecialCare,
		InputSelect,
		InputText,
		InputMoney,
		InputRadio,
		AddService,
		FileUpload,
		matchingInput,
		VueTimepicker,
	},
	data: () => ({
		menu1: false,
		menu2: false,
		menu3: false,
		barcodeYn: { deviceYn: 'N', usimYn: 'N' },
		openingStoreTelecomCopy: '',
	}),
	computed: {
		beforeAdmin() {
			return this.quickOpeningApplId <= 28177;
		},
		storeVal() {
			return this.$store.state.sg;
		},
		sct() {
			return this.$store.state.sct;
		},
		UsimPaymentTypeList() {
			let list = this.optionList.usimPaymentTypeItems;
			if (
				this.formData.basic.applType === 'DVC_USIM' ||
				this.formData.basic.applType === 'USIM'
			) {
				if (list.length !== 6 && list[0].name === '기존유심') {
					let newList = [...list];
					newList.shift();
					return newList;
				}
			}
			return list;
		},
		formatBlackRegiData() {
			if (this.blackList.blackTypeMsg === '') {
				return '';
			}
			return `/ ${getFormatDate(new Date(this.blackList.regiDateTime))}`;
		},
		paymentType() {
			if (this.formData.payment.paymentType === 'ACC_TRNS') {
				return '계좌이체';
			}
			if (this.formData.payment.paymentType === 'CARD_PAY') {
				return '카드납부';
			}
			if (this.formData.payment.paymentType === 'GIRO') {
				return '지로';
			}
			return '정보없음';
		},
		capacityItems() {
			let options = this.optionList.capacityItems;
			let optionList = [];
			for (let key in options) {
				optionList.push({
					name: options[key].capacity,
					value: options[key].capacity,
				});
			}
			return optionList;
		},
		colorItems() {
			let options = this.optionList.colorItems;
			let optionList = [];
			for (let key in options) {
				optionList.push({
					name: options[key].colorName,
					value: options[key].colorName,
				});
			}
			return optionList;
		},
		paymentIdentify() {
			if (this.formData.payment.paymentIdentifiedYn === 'Y') {
				return '명의자 동일 : O';
			} else {
				return '명의자 동일 : X';
			}
		},
		modelPayment() {
			if (this.formData.payment.paymentType !== 'EXIST_SAME') {
				if (this.formData.payment.paymentType === 'ACC_TRNS') {
					return `${this.formData.payment.bankCodeMsg}  ${
						this.formData.payment.accountNum
					}  ${this.formData.payment.accountHolderName} · ${
						this.formData.payment.accountHolderRelation
					} · ${this.formData.payment.accountHolderBirth || ''}  (${
						this.paymentIdentify
					})`;
				} else if (this.formData.payment.paymentType === 'CARD_PAY') {
					return `${this.formData.payment.cardCompanyCodeMsg}  ${
						this.formData.payment.cardNum1 || ''
					}-${this.formData.payment.cardNum2 || ''}-${
						this.formData.payment.cardNum3 || ''
					}-${this.formData.payment.cardNum4 || ''}  ${
						this.formData.payment.cardHolderName
					} · ${this.formData.payment.cardHolderRegiNum1 || ''}-${
						this.formData.payment.cardHolderRegiNum2 || ''
					} ·	${this.formData.payment.cardValidityMm || ''}/${
						this.formData.payment.cardValidityYy || ''
					}  (${this.paymentIdentify})`;
				} else if (this.formData.payment.paymentType === 'GIRO') {
					return `${this.formData.payment.giroZipCode || ''} / ${
						this.formData.payment.giroAddr || ''
					} / ${this.formData.payment.giroAddrDetail || ''}  (${
						this.paymentIdentify
					})`;
				} else {
					return '납부정보가 없습니다.';
				}
			}
			return '기존과 동일';
		},
		modifyState() {
			return this.$store.state.QuickOpeningPopModule.modifyState;
		},
		optionList() {
			return this.$store.state.QuickOpeningPopModule.optionList;
		},
		propsFileList() {
			return this.$store.state.QuickOpeningPopModule.propsFileList;
		},
		openStoreObject: {
			get() {
				return this.$store.state.QuickOpeningPopModule.openStoreObject;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.openStoreObject = newValue;
			},
		},
		addServiceFormData: {
			get() {
				return this.$store.state.QuickOpeningPopModule.addServiceFormData;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.addServiceFormData = newValue;
			},
		},
		formData: {
			get() {
				return this.$store.state.QuickOpeningPopModule.formData;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.formData = newValue;
			},
		},
		customer: {
			get() {
				return this.$store.state.QuickOpeningPopModule.formData.customer;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.formData.customer = newValue;
			},
		},
		join: {
			get() {
				return this.$store.state.QuickOpeningPopModule.formData.join;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.formData.join = newValue;
			},
		},
		fileData: {
			get() {
				return this.$store.state.QuickOpeningPopModule.fileData;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.fileData = newValue;
			},
		},
		blackList: {
			get() {
				return this.$store.state.QuickOpeningPopModule.blackList;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.blackList = newValue;
			},
		},
		dialog: {
			get() {
				return this.$store.state.SellStatusModule.quickOpeningDialog;
			},
			set(newValue) {
				return (this.$store.state.SellStatusModule.quickOpeningDialog = newValue);
			},
		},
		deviceChange: {
			get() {
				return this.$store.state.QuickOpeningPopModule.deviceChange;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.deviceChange = newValue;
			},
		},
		usimChange: {
			get() {
				return this.$store.state.QuickOpeningPopModule.usimChange;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.usimChange = newValue;
			},
		},
		blackListTablePop: {
			get() {
				return this.$store.state.QuickOpeningPopModule.blackListTablePop;
			},
			set(newValue) {
				this.$store.state.QuickOpeningPopModule.blackListTablePop = newValue;
			},
		},

		ApplExchangeFlag() {
			return this.$store.state.QuickOpeningPopModule.ApplExchangeFlag;
		},
	},
	methods: {
		regExpReserveNum(value) {
			this.formData.join.openingTelecomCodeId === 7
				? (this.formData.basic.reserveNum = value.replace(/[^a-zA-Z0-9]/gi, ''))
				: (this.formData.basic.reserveNum = value.replace(/[^0-9]/g, ''));
		},
		toggleReserveNum() {
			if (this.formData.basic.beforeReserveYn === 'N') {
				this.formData.basic.reserveNum = '';
			} else {
				this.$nextTick(() => this.$refs.preOrderNumInput.focus());
			}
		},
		setNewAddSvcList(itemList) {
			for (let i = 0; i < this.formData.join.addServiceList.length; i++) {
				if (
					this.formData.join.addServiceList[i].addSvcId === itemList.addSvcId
				) {
					alert('이미 포함 되어 있는 항목입니다.');
					return;
				}
			}
			this.formData.join.addServiceList.push(itemList);
		},
		minusAddSvcList(item) {
			this.addServiceFormData.push(
				this.formData.join.addServiceList.splice(item.index, 1),
			);
		},
		alertFnc() {
			if (this.formData.join.goodsId === '') {
				return alert('기기를 선택해 주세요.');
			}
		},
		resetDate(data) {
			if (data === 'openingDate') {
				this.formData.basic.openingDate = '';
			}
			if (data === 'cancelDate') {
				this.formData.basic.cancelDate = '';
			}
		},
		initOptions(name) {
			this.optionList[name] = [];
		},
		fileValueFnc(value) {
			this.fileData = value;
		},
		formatOptionList(listName, name, value) {
			let options = this.optionList[listName];
			let optionList = [];
			for (let key in options) {
				optionList.push({
					name: options[key][name],
					value: options[key][value],
				});
			}
			return optionList;
		},
		initOpeningStoreRelatedInputs() {
			const join = this.formData.join;
			join.goodsId = 0;
			join.capacity = '';
			join.color = '';
			join.chargeId = 0;
			join.addServiceList = [];
			this.initOptions('goodsItems'); // 개통점 고르기전까지 초기화 상태 유지
			this.initOptions('capacityItems'); // 개통점 고르기전까지 초기화 상태 유지
			this.initOptions('colorItems'); // 개통점 고르기전까지 초기화 상태 유지
			this.initOptions('addServiceList'); // 개통점 고르기전까지 초기화 상태 유지
			this.initOptions('chargeList'); // 개통점 고르기전까지 초기화 상태 유지
		},
		async setOpeningStoreRelatedInputs() {
			this.formData.basic.openingStoreId = this.openStoreObject.openingStoreId;
			this.formData.join.openingTelecomCodeId = this.openStoreObject.openingTelecomCodeId;
			// 개통점 변경시 같은 통신사일때 no reset
			if (
				this.openingStoreTelecomCopy ===
				this.openStoreObject.openingTelecomCodeId
			)
				return;
			this.openingStoreTelecomCopy = this.openStoreObject.openingTelecomCodeId;
			this.formData.basic.reserveNum = ''; //사전예약번호 초기화
			this.initOpeningStoreRelatedInputs();
			await this.$store.dispatch('QuickOpeningPopModule/getGoodsSelectList'); //휴대폰 목록 조회
			await this.exTelFnc(); // 가입유형 선택
			await this.getTelecomAddServiceSelectListFnc(); //부가서비스 조회
		},
		exTelFnc() {
			let exTel = this.formData.join.existTelecomCodeId;

			if (
				(this.formData.join.openingTelecomCodeId === 5 && exTel === 42) ||
				(this.formData.join.openingTelecomCodeId === 6 && exTel === 43) ||
				(this.formData.join.openingTelecomCodeId === 7 && exTel === 44)
			) {
				this.formData.join.joinType = 'DVC_CHANGE';
			} else if (exTel === 45) {
				this.formData.join.joinType = 'NEW';
			} else {
				this.formData.join.joinType = 'NUM_CHANGE';
			}
		},
		// 실판매가 공식 = 출고가 - 공시지원금 - 추가지원금 - 프리할부/선수납 - 기타할부금
		actualSellAmtFnc() {
			this.formData.join.actualSellAmt =
				this.formData.join.releaseAmt -
				this.formData.join.pubNotiSupportAmt -
				this.formData.join.extraSupportAmt -
				this.formData.join.freeInstlAmt -
				this.formData.join.etcDiscountAmt;
		},
		async setNewData(key, value) {
			this.formData = setNewDataFnc(this.formData, key, value);
			this.actualSellAmtFnc();
			if (key === 'saleStoreId') {
				this.formData.basic.openingStoreId = 0;
				this.openStoreObject.openingStoreId = 0;
				this.openStoreObject.openingTelecomCodeId = 0;
				this.initOpeningStoreRelatedInputs();
				await this.$store.dispatch(
					'QuickOpeningPopModule/getOpeningStoreSelectList',
				);
			}
			if (
				key === 'cusName' ||
				key === 'cusPhone1' ||
				key === 'cusPhone2' ||
				key === 'cusPhone3'
			) {
				this.blackList = {};
			}
			if (key === 'joinType') {
				if (this.formData.join.joinType !== 'NEW') {
					this.formData.join.openingHopeNum = '';
				}
				if (this.formData.join.joinType !== 'NUM_CHANGE') {
					this.formData.join.numChangeAuthType = null;
					this.formData.join.numChangeAuthTypeNum = '';
				}
			}
			if (key === 'capacity') {
				await this.initRelatedInput('color');
			}
			if (key === 'agreementType') {
				value === 'CHOICE_AGRMN'
					? (this.formData.join.pubNotiSupportAmt = 0)
					: await this.getPubNotiInfo();
			}
			if (key === 'deliveryType') {
				if (
					this.formData.delivery.deliveryType !== 'PS' &&
					this.formData.delivery.deliveryType !== 'PS_SALES'
				)
					this.formData.delivery.courierCodeId = 0;
				this.formData.delivery.invoiceNum = '';
			}
			if (key === 'courierCodeId') {
				this.formData.delivery.invoiceNum = '';
			}
			if (key === 'instlPeriodType') {
				this.formData.join.freeInstlAmt = 0;
			}
		},
		async initRelatedInput(data) {
			if (data === 'goodsId') {
				this.formData.join.capacity = '';
				this.formData.join.color = '';
				this.formData.join.chargeId = 0;
				this.initOptions('colorItems');
				this.initOptions('capacityItems');
				await this.$store.dispatch(
					'QuickOpeningPopModule/getCapacitySelectList',
				);
				await this.$store.dispatch(
					'QuickOpeningPopModule/getTelecomChargeSelectList',
				);
				if (this.optionList.capacityItems.length !== 0) {
					this.formData.join.capacity = this.optionList.capacityItems[0].capacity;
					await this.$store.dispatch(
						'QuickOpeningPopModule/getColorSelectList',
					);
				}
			}
			if (data === 'color') {
				this.formData.join.color = '';
				this.initOptions('colorItems');
				await this.$store.dispatch('QuickOpeningPopModule/getColorSelectList');
			}
			if (data === 'chargeId') {
				await this.getPubNotiInfo();
			}
		},
		async getBlackListFnc() {
			await this.$store.dispatch('QuickOpeningPopModule/getBlackDetailList');
		},
		async getTelecomAddServiceSelectListFnc() {
			await this.$store.dispatch(
				'QuickOpeningPopModule/getTelecomAddServiceSelectList',
			);
		},

		async getPubNotiInfo() {
			if (this.formData.join.chargeId && this.formData.join.goodsId) {
				let data = {
					chargeId: this.formData.join.chargeId,
					goodsId: this.formData.join.goodsId,
				};
				await this.$store.dispatch(
					'QuickOpeningPopModule/getPubNotiInfo',
					data,
				);
				this.actualSellAmtFnc();
			} else {
				if (this.formData.join.goodsId === '') {
					alert('공시지원금 자동 조회를 위해, 기기를 선택해주세요.');
				}
				if (this.formData.join.chargeId === 0) {
					alert('공시지원금 자동 조회를 위해, 요금제를 선택해주세요.');
				}
			}
		},
		deviceChangeFnc(value) {
			this.deviceChange = value;
		},
		usimChangeFnc(value) {
			this.usimChange = value;
		},

		timepickerFnc(value, type) {
			if (typeof value === 'string') {
				this.formData.basic[type] = value;
			} else {
				this.formData.basic[type] = `${value.HH}:${value.mm}`;
			}
		},
		blackCloseDialog(value) {
			this.blackListTablePop = value;
		},
	},
	async created() {
		await this.$store.commit(
			'QuickOpeningPopModule/setApplId',
			this.quickOpeningApplId,
		);
	},
	updated() {
		// 개통점 변경시 이전 개통점과 바뀐 개통점 비교하기위한 copy data
		this.openingStoreTelecomCopy = this.formData.join.openingTelecomCodeId;
	},
};
</script>
<style scoped>
input {
	padding: 0 10px;
}
input[type='text']:disabled {
	color: #000 !important;
}
select:disabled {
	color: #000 !important;
}
[disabled] {
	color: #000 !important;
}
.quick-bg select {
	cursor: pointer;
}
.quick-bg select:disabled {
	cursor: default;
}
.new_popTable1 .v-input {
	font-size: 12px;
}

.AppFormContDate button:disabled {
	color: rgba(0, 0, 0, 0.6);
}
.resetBtn {
	position: absolute;
	font-size: 18px;
	top: 0;
	right: 140px;
	padding: 6px;
	color: #17a5ae;
}
.hopeNumInput input {
	width: 74px;
}
.preOrderInput {
	position: absolute;
	left: 65px;
	border: 1px solid #e0e0e0;
	border-radius: 3px;
	width: 140px;
	margin-left: 8px;
	padding: 2px 10px;
}
</style>
