<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="800"
				style="border-radius: 0 !important"
			>
				<v-card class="borderRadiReset">
					<v-card-title
						class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
					>
						<h2 class="mainWhite mainFontS boldWt">기기별 매칭</h2>
						<span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
					</v-card-title>
					<v-card-text class="pad30">
						<DeviceMatchingInfo
							:applMatchingDetailObj="applMatchingDetailObj"
						></DeviceMatchingInfo>

						<h2 class="mt20 mb10 mainBlack2">기기매칭</h2>
						<div class="new_popTable1 mt10">
							<table class="w100P">
								<tr>
									<td class="w140">매칭타입</td>
									<td class="padW10 h40" style="text-align: left">
										<span
											v-if="
												applMatchingDetailObj.applType !== 'USIM' &&
												(deviceMatchingYn || couriorMatchingYn === 'N')
											"
										>
											<input
                          class="ml5 mr5"
												type="radio"
												id="deviceStockMatching"
												name="deviceMatchingType"
												value="MATCHING_TYPE_STOCK"
												:disabled="deviceMatchingYn || !macthingStatus"
												v-model="deviceMatchingType"
											/>
											<label for="deviceStockMatching" style="color: #333"
												>재고매칭</label
											>
										</span>
										<input
                        class="ml5 mr5"
											type="radio"
											id="deviceNoneStockMatching"
											name="deviceMatchingType"
											value="MATCHING_TYPE_NOT_STOCK"
											:disabled="deviceMatchingYn || !macthingStatus"
											v-model="deviceMatchingType"
										/>
										<label for="deviceNoneStockMatching" style="color: #333"
											>비재고매칭(수동)</label
										>
										<input
                        class="ml5 mr5"
											type="radio"
											id="deviceNone"
											name="deviceMatchingType"
											value="MATCHING_TYPE_NONE"
											:disabled="deviceMatchingYn || !macthingStatus"
											v-model="deviceMatchingType"
										/>
										<label for="deviceNone" style="color: #333">선택안함</label>
									</td>
								</tr>

								<tr>
									<td>기기일련번호</td>
									<td style="text-align: left !important">
										<input
											ref="barcodeInput"
											type="text"
											class="matchingInput lh36 borderContColor3 borderRadi3Px"
											v-model.trim="barcode"
											:disabled="deviceMatchingYn || !macthingStatus"
											@keyup.enter="deviceCheck('DVC')"
										/>
										<button
											class="borderRadi3Px padW10 lh36 borderContColor1 backColorBlue2 mainWhite"
											v-if="!deviceMatchingYn && macthingStatus"
											@click="deviceCheck('DVC')"
										>
											등록
										</button>
										<button
											class="borderRadi3Px padW10 lh36 borderContColor1 backColorMint1 mainWhite"
											v-if="deviceMatchingYn && macthingStatus"
											@click="deviceMatchingCancle('DVC')"
										>
											매칭취소
										</button>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mt20 mb10 mainBlack2">유심매칭</h2>
						<div class="new_popTable1 mt10">
							<table class="w100P">
								<tr>
									<td class="w140">매칭타입</td>
									<td class="padW10" style="text-align: left !important">
										<span
											v-if="
												applMatchingDetailObj.applType !== 'DVC' &&
												(usimMatchingYn || couriorMatchingYn === 'N')
											"
										>
											<input
                          class="ml5 mr5"
												type="radio"
												id="usimStockMatching"
												name="usimMatchingType"
												value="MATCHING_TYPE_STOCK"
												:disabled="usimMatchingYn || !macthingStatus"
												v-model="usimMatchingType"
											/>
											<label for="usimStockMatching" style="color: #333"
												>재고매칭</label
											>
										</span>
										<input
                        class="ml5 mr5"
											type="radio"
											id="usimNoneStockMatching"
											name="usimMatchingType"
											value="MATCHING_TYPE_NOT_STOCK"
											:disabled="usimMatchingYn || !macthingStatus"
											v-model="usimMatchingType"
										/>
										<label for="usimNoneStockMatching" style="color: #333"
											>비재고매칭(수동)</label
										>
										<input
                        class="ml5 mr5"
											type="radio"
											id="usimNone"
											name="usimMatchingType"
											value="MATCHING_TYPE_NONE"
											:disabled="usimMatchingYn || !macthingStatus"
											v-model="usimMatchingType"
										/>
										<label for="usimNone" style="color: #333">선택안함</label>
									</td>
								</tr>
								<tr>
									<td>유심타입</td>
									<td class="padW10 h50" style="text-align: left !important">
										<select
											class="matchingSelect w150 lh36 borderRadi3Px"
											style="border: 1px solid #ddd"
											disabled
										>
											<option>
												{{ applMatchingDetailObj.usimPaymentTypeMsg }}
											</option>
										</select>
									</td>
								</tr>
								<tr v-if="usimMatchingType === 'MATCHING_TYPE_NOT_STOCK'">
									<td>유심구분</td>
									<td class="padW10 h50" style="text-align: left !important">
										<select
											class="matchingSelect w150 lh36 borderRadi3Px"
											style="border: 1px solid #ddd"
											v-model="usimType"
											:disabled="usimMatchingYn"
										>
											<option
												v-for="item in usimDivision"
												:key="item.id"
												:value="item.value"
											>
												{{ item.name }}
											</option>
										</select>
									</td>
								</tr>
								<tr v-if="usimMatchingType !== 'MATCHING_TYPE_NONE'">
									<td>유심 일련번호</td>
									<td class="padW10 h50" style="text-align: left !important">
										<input
											ref="usimBarcodeInput"
											type="text"
											class="matchingInput lh36 borderRadi3Px"
											v-model.trim="usimBarcode"
											:disabled="usimMatchingYn || !macthingStatus"
											@keyup.enter="deviceCheck('USIM')"
										/>
										<button
											class="borderRadi3Px padW10 lh36 borderContColor1 backColorBlue2 mainWhite"
											v-if="!usimMatchingYn && macthingStatus"
											@click="deviceCheck('USIM')"
										>
											등록
										</button>
										<button
											@click="deviceMatchingCancle('USIM')"
											class="borderRadi3Px padW10 lh36 borderContColor1 backColorMint1 mainWhite"
											v-if="usimMatchingYn && macthingStatus"
										>
											매칭취소
										</button>
									</td>
								</tr>
							</table>
						</div>

						<h2 class="mt20 mb10 mainBlack2">배송정보</h2>
						<div class="new_popTable1 mt10">
							<table class="w100P">
								<tr>
									<td class="w140">배송구분</td>
									<td class="padW10 h50" style="text-align: left !important">
										<span
											v-for="(item, index) in deliveryTypeList"
											:key="item.id"
										>
											<input
                          class="ml5 mr5"
												type="radio"
												:id="`delType${index}`"
												name="delType"
												:checked="
													applMatchingDetailObj.deliveryType === item.value
												"
												disabled
											/>
											<label :for="`delType${index}`">{{ item.name }}</label>
										</span>
										<button
											class="borderRadi3Px padW10 lh36 borderContColor1 backColorBlue2 mainWhite"
											@click="couriorSucBtn"
											v-if="
												applMatchingDetailObj.deliveryType !== 'PS' &&
												applMatchingDetailObj.deliveryType !== 'PS_SALES' &&
												applMatchingDetailObj.deliveryMatchingCancelYn !== 'Y'
											"
										>
											배송완료처리
										</button>
										<button
											class="borderRadi3Px padW10 lh36 borderContColor1 backColorMint1 mainWhite"
											@click="couriorCancelBtn"
											v-if="
												applMatchingDetailObj.deliveryType !== 'PS' &&
												applMatchingDetailObj.deliveryType !== 'PS_SALES' &&
												applMatchingDetailObj.deliveryMatchingCancelYn === 'Y'
											"
										>
											배송완료취소처리
										</button>
									</td>
								</tr>
								<tr
									v-if="
										applMatchingDetailObj.deliveryType === 'PS' ||
										applMatchingDetailObj.deliveryType === 'PS_SALES'
									"
								>
									<td>택배사</td>
									<td class="padW10 h50" style="text-align: left !important">
										<select
											class="matchingSelect w150 lh36"
											style="border: 1px solid #ddd"
                      v-model="courierData"
                      :disabled="applMatchingDetailObj.courierId"
										>
											<option :value="item.codeSeq" v-for="item in courierList">
                        {{item.codeNm}}
											</option>
										</select>
                    <button
                        v-if="!applMatchingDetailObj.courierId"
                        class="borderRadi3Px padW10 lh36 borderContColor1 backColorBlue2 mainWhite"
                        @click="courierUpdateFnc()"
                    >
                      저장
                    </button>
										<button
											class="borderRadi3Px padW10 lh36 borderContColor1 backColorBlue2 mainWhite"
											v-if="macthingBtn && macthingStatus"
											@click="deliveryMatchingFnc('PS')"
										>
											송장번호매칭
										</button>
									</td>
								</tr>
								<tr
									v-if="
										applMatchingDetailObj.deliveryType === 'PS' ||
										applMatchingDetailObj.deliveryType === 'PS_SALES'
									"
								>
									<td>송장번호</td>
									<td class="padW10 h50" style="text-align: left !important">
										<input
											type="text"
											class="matchingInput lh36 w150 borderRadi3Px"
											v-model.trim="invoiceNum"
											:disabled="couriorMatchingYn === 'Y' || !macthingStatus"
											@click="couriorCheck(applMatchingDetailObj.courierName)"
										/>
										<button
											class="borderRadi3Px padW10 lh36 borderContColor1 backColorBlue2 mainWhite"
											v-if="
												couriorMatchingYn !== 'Y' &&
												applMatchingDetailObj.courierName &&
												macthingStatus
											"
											@click="deliveryMatchingFnc('PS_SALES')"
										>
											저장
										</button>
										<button
											class="borderRadi3Px padW10 lh36 borderContColor1 backColorMint1 mainWhite"
											v-if="couriorMatchingYn === 'Y' && macthingStatus"
											@click="cancelDeliveryMatchingFnc"
										>
											송장매칭취소
										</button>
									</td>
								</tr>
								<tr v-if="applMatchingDetailObj.deliveryType === 'QUICK'">
									<td>퀵전화번호</td>
									<td class="padW10 h50" style="text-align: left !important">
										<input
											type="text"
											class="w60 matchingInput lh36 borderRadi3Px"
											v-model.trim="quickPhone1"
											maxlength="3"
										/>
										-
										<input
											type="text"
											class="w60 matchingInput lh36 borderRadi3Px"
											v-model.trim="quickPhone2"
											maxlength="4"
										/>
										-
										<input
											type="text"
											class="w60 matchingInput lh36 borderRadi3Px"
											v-model.trim="quickPhone3"
											maxlength="4"
										/>
									</td>
								</tr>
								<tr v-if="applMatchingDetailObj.deliveryType === 'QUICK'">
									<td>퀵 요금</td>
									<td class="padW10 h50" style="text-align: left !important">
										<input
											type="text"
											class="matchingInput lh36 borderRadi3Px"
											v-model.trim="quickCharge"
										/>
										<button
											class="borderRadi3Px padW10 lh36 borderContColor1 backColorBlue2 mainWhite"
											@click="deliveryMatchingFnc('QUICK')"
										>
											저장
										</button>
									</td>
								</tr>
							</table>
						</div>

						<div class="disFx justify-end mt10">
							<v-btn
								class="backColorMint1 mainWhite borderReset w80"
								v-if="couriorMatchingYn === 'Y'"
								text
								@click="postHtml()"
							>
								송장재출력
							</v-btn>
							<v-btn
								text
								@click="dialog = false"
								class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
							>
								닫기
							</v-btn>
						</div>
					</v-card-text>
					<!--					<v-card-text>
						<div
							class="infoCont pdLR30 popUpCustomSt1"
							style="background-color: #fff; padding-top: 20px"
						>
							<div class="titleCont">
								<p>기기별매칭</p>
							</div>

							<div class="rowHeader mt20">
								<p>기기매칭</p>
							</div>
							<div class="rowCont">
								<div class="rowItem w100P rowItemText pd5" style="border: none">
									<span class="w100 display_in"
										>매칭타입 <span class="font-red">*</span></span
									>
									<span
										v-if="
											applMatchingDetailObj.applType !== 'USIM' &&
											(deviceMatchingYn || couriorMatchingYn === 'N')
										"
									>
										<input
											type="radio"
											id="deviceStockMatching"
											name="deviceMatchingType"
											value="MATCHING_TYPE_STOCK"
											:disabled="deviceMatchingYn || !macthingStatus"
											v-model="deviceMatchingType"
										/>
										<label for="deviceStockMatching" style="color: #333"
											>재고매칭</label
										>
									</span>
									<input
										type="radio"
										id="deviceNoneStockMatching"
										name="deviceMatchingType"
										value="MATCHING_TYPE_NOT_STOCK"
										:disabled="deviceMatchingYn || !macthingStatus"
										v-model="deviceMatchingType"
									/>
									<label for="deviceNoneStockMatching" style="color: #333"
										>비재고매칭(수동)</label
									>
									<input
										type="radio"
										id="deviceNone"
										name="deviceMatchingType"
										value="MATCHING_TYPE_NONE"
										:disabled="deviceMatchingYn || !macthingStatus"
										v-model="deviceMatchingType"
									/>
									<label for="deviceNone" style="color: #333">선택안함</label>
								</div>
							</div>
							<div
								class="rowCont"
								v-if="deviceMatchingType !== 'MATCHING_TYPE_NONE'"
							>
								<div class="rowItem w100P rowItemText pd5" style="border: none">
									<span class="w100 display_in"
										>기기일련번호 <span class="font-red">*</span></span
									>
									<input
										ref="barcodeInput"
										type="text"
										class="matchingInput"
										v-model.trim="barcode"
										:disabled="deviceMatchingYn || !macthingStatus"
										@keyup.enter="deviceCheck('DVC')"
									/>
									<button
										v-if="!deviceMatchingYn && macthingStatus"
										@click="deviceCheck('DVC')"
									>
										등록
									</button>
									<button
										v-if="deviceMatchingYn && macthingStatus"
										@click="deviceMatchingCancle('DVC')"
									>
										매칭취소
									</button>
								</div>
							</div>
							<div class="rowHeader mt20">
								<p>유심매칭</p>
							</div>
							<div class="rowCont">
								<div class="rowItem w100P rowItemText pd5" style="border: none">
									<span class="w100 display_in"
										>매칭타입 <span class="font-red">*</span></span
									>
									<span
										v-if="
											applMatchingDetailObj.applType !== 'DVC' &&
											(usimMatchingYn || couriorMatchingYn === 'N')
										"
									>
										<input
											type="radio"
											id="usimStockMatching"
											name="usimMatchingType"
											value="MATCHING_TYPE_STOCK"
											:disabled="usimMatchingYn || !macthingStatus"
											v-model="usimMatchingType"
										/>
										<label for="usimStockMatching" style="color: #333"
											>재고매칭</label
										>
									</span>
									<input
										type="radio"
										id="usimNoneStockMatching"
										name="usimMatchingType"
										value="MATCHING_TYPE_NOT_STOCK"
										:disabled="usimMatchingYn || !macthingStatus"
										v-model="usimMatchingType"
									/>
									<label for="usimNoneStockMatching" style="color: #333"
										>비재고매칭(수동)</label
									>
									<input
										type="radio"
										id="usimNone"
										name="usimMatchingType"
										value="MATCHING_TYPE_NONE"
										:disabled="usimMatchingYn || !macthingStatus"
										v-model="usimMatchingType"
									/>
									<label for="usimNone" style="color: #333">선택안함</label>
								</div>
							</div>
							<div class="rowCont"></div>
							<div
								class="rowCont"
								style="display: block"
								v-if="usimMatchingType !== 'MATCHING_TYPE_NONE'"
							>
								<div class="rowItem rowItemText pd5" style="border: none">
									<span class="w100 display_in"
										>유심타입 <span class="font-red">*</span></span
									>
									<div class="normalSelectCont1 display_in">
										<select
											class="matchingSelect w150"
											style="border: 1px solid #ddd"
											disabled
										>
											<option>
												{{ applMatchingDetailObj.usimPaymentTypeMsg }}
											</option>
										</select>
									</div>
								</div>
								<div
									v-if="usimMatchingType === 'MATCHING_TYPE_NOT_STOCK'"
									class="rowItem rowItemText pd5"
									style="border: none; width: 55%"
								>
									<span class="w100 display_in"
										>유심구분 <span class="font-red">*</span></span
									>
									<div class="normalSelectCont1 display_in">
										<select
											class="matchingSelect w150"
											style="border: 1px solid #ddd"
											v-model="usimType"
											:disabled="usimMatchingYn"
										>
											<option :value="null">해당없음</option>
											<option
												v-for="item in usimDivision"
												:key="item.id"
												:value="item.value"
											>
												{{ item.name }}
											</option>
										</select>
									</div>
								</div>
							</div>
							<div
								class="rowCont"
								v-if="usimMatchingType !== 'MATCHING_TYPE_NONE'"
							>
								<div
									class="rowItem rowItemText pd5"
									style="border: none; width: 100%"
								>
									<span class="w100 display_in"
										>유심일련번호 <span class="font-red">*</span></span
									>
									<input
										ref="usimBarcodeInput"
										type="text"
										class="matchingInput"
										v-model.trim="usimBarcode"
										:disabled="usimMatchingYn || !macthingStatus"
										@keyup.enter="deviceCheck('USIM')"
									/>
									<button
										v-if="!usimMatchingYn && macthingStatus"
										@click="deviceCheck('USIM')"
									>
										등록
									</button>
									<button
										@click="deviceMatchingCancle('USIM')"
										class="bg_color_hotpink"
										v-if="usimMatchingYn && macthingStatus"
									>
										매칭취소
									</button>
								</div>
							</div>
							<div class="rowHeader mt20">
								<p>배송정보</p>
							</div>
							<div class="rowCont">
								<div class="rowItem w100P rowItemText pd5" style="border: none">
									<span class="w100 display_in"
										>배송구분 <span class="font-red">*</span></span
									>
									<span
										v-for="(item, index) in deliveryTypeList"
										:key="item.id"
									>
										<input
											type="radio"
											:id="`delType${index}`"
											name="delType"
											:checked="
												applMatchingDetailObj.deliveryType === item.value
											"
											disabled
										/>
										<label :for="`delType${index}`">{{ item.name }}</label>
									</span>

									&lt;!&ndash;									<input&ndash;&gt;
									&lt;!&ndash;										type="radio"&ndash;&gt;
									&lt;!&ndash;										id="delType1"&ndash;&gt;
									&lt;!&ndash;										name="delType"&ndash;&gt;
									&lt;!&ndash;										:checked="applMatchingDetailObj.deliveryType === 'PS'"&ndash;&gt;
									&lt;!&ndash;										disabled&ndash;&gt;
									&lt;!&ndash;									/>&ndash;&gt;
									&lt;!&ndash;									<label for="delType1">택배</label>&ndash;&gt;
									&lt;!&ndash;									<input&ndash;&gt;
									&lt;!&ndash;										:checked="applMatchingDetailObj.deliveryType === 'QUICK'"&ndash;&gt;
									&lt;!&ndash;										type="radio"&ndash;&gt;
									&lt;!&ndash;										id="delType2"&ndash;&gt;
									&lt;!&ndash;										name="delType"&ndash;&gt;
									&lt;!&ndash;										disabled&ndash;&gt;
									&lt;!&ndash;									/>&ndash;&gt;
									&lt;!&ndash;									<label for="delType2">퀵</label>&ndash;&gt;
									&lt;!&ndash;									<input&ndash;&gt;
									&lt;!&ndash;										:checked="applMatchingDetailObj.deliveryType === 'DIRECT'"&ndash;&gt;
									&lt;!&ndash;										type="radio"&ndash;&gt;
									&lt;!&ndash;										id="delType3"&ndash;&gt;
									&lt;!&ndash;										name="delType"&ndash;&gt;
									&lt;!&ndash;										disabled&ndash;&gt;
									&lt;!&ndash;									/>&ndash;&gt;
									&lt;!&ndash;									<label for="delType3">직접배송</label>&ndash;&gt;
									<button
										@click="couriorSucBtn"
										v-if="
											applMatchingDetailObj.deliveryType !== 'PS' &&
											applMatchingDetailObj.deliveryType !== 'PS_SALES' &&
											applMatchingDetailObj.deliveryMatchingCancelYn !== 'Y' &&
											macthingStatus
										"
									>
										배송완료처리
									</button>
									<button
										class="bg_color_hotpink"
										@click="couriorCancelBtn"
										v-if="
											applMatchingDetailObj.deliveryType !== 'PS' &&
											applMatchingDetailObj.deliveryType !== 'PS_SALES' &&
											applMatchingDetailObj.deliveryMatchingCancelYn === 'Y' &&
											macthingStatus
										"
									>
										배송완료취소처리
									</button>
								</div>
							</div>
							<div
								v-if="
									applMatchingDetailObj.deliveryType === 'PS' ||
									applMatchingDetailObj.deliveryType === 'PS_SALES'
								"
								class="rowCont"
							>
								<div
									class="rowItem rowItemText pd5"
									style="border: none; width: 50%"
								>
									<span class="w100 display_in">택배사</span>
									<div class="normalSelectCont1 display_in">
										<select
											class="matchingSelect w100"
											style="border: 1px solid #ddd"
											disabled
										>
											<option>
												{{ applMatchingDetailObj.courierName }}
											</option>
										</select>
									</div>

									<button
										v-if="macthingBtn && macthingStatus"
										@click="deliveryMatchingFnc('PS')"
									>
										송장번호매칭
									</button>
								</div>
								<div
									class="rowItem rowItemText pd5"
									style="border: none; width: 50%"
								>
									<span class="display_in">송장번호</span>
									<input
										type="text"
										class="matchingInput"
										v-model.trim="invoiceNum"
										:disabled="couriorMatchingYn === 'Y' || !macthingStatus"
										@click="couriorCheck(applMatchingDetailObj.courierName)"
									/>
									<button
										v-if="
											couriorMatchingYn !== 'Y' &&
											applMatchingDetailObj.courierName &&
											macthingStatus
										"
										@click="deliveryMatchingFnc('PS_SALES')"
									>
										저장
									</button>
									<button
										class="bg_color_hotpink"
										v-if="couriorMatchingYn === 'Y' && macthingStatus"
										@click="cancelDeliveryMatchingFnc"
									>
										송장매칭취소
									</button>
								</div>
							</div>
							<div
								v-if="applMatchingDetailObj.deliveryType === 'QUICK'"
								class="rowCont"
							>
								<div
									class="rowItem rowItemText pd5"
									style="border: none; width: 50%"
								>
									<span class="w100 display_in">퀵전화번호</span>
									<input
										type="text"
										class="w60 matchingInput"
										:disabled="!macthingStatus"
										v-model.trim="quickPhone1"
										maxlength="3"
									/>
									-
									<input
										type="text"
										class="w60 matchingInput"
										:disabled="!macthingStatus"
										v-model.trim="quickPhone2"
										maxlength="4"
									/>
									-
									<input
										type="text"
										class="w60 matchingInput"
										:disabled="!macthingStatus"
										v-model.trim="quickPhone3"
										maxlength="4"
									/>
								</div>
								<div
									class="rowItem rowItemText pd5"
									style="border: none; width: 50%"
								>
									<span class="w100 display_in">퀵 요금</span>
									<input
										type="text"
										class="matchingInput"
										:disabled="!macthingStatus"
										v-model.trim="quickCharge"
									/>
									<button
										v-if="macthingStatus"
										@click="deliveryMatchingFnc('QUICK')"
									>
										저장
									</button>
								</div>
							</div>
						</div>
					</v-card-text>
					<v-card-actions style="padding: 15px 20px">
						<div class="memberCont"></div>
						<v-spacer></v-spacer>
						<div class="infoDialogCont">
							<v-btn
								v-if="couriorMatchingYn === 'Y'"
								text
								@click="postHtml()"
								style="background-color: #bdbdbd"
							>
								송장재출력
							</v-btn>
							<v-btn
								text
								@click="dialog = false"
								style="background-color: #bdbdbd"
							>
								닫기
							</v-btn>
						</div>
					</v-card-actions>-->
				</v-card>
			</v-dialog>
		</div>
		<overlapDevicePopup
			v-if="overlapDevicePop"
			:overlapDialog="overlapDevicePop"
			:overlapDeviceData="overlapDeviceData"
			@overlapSuccessFnc="overlapSuccessFnc"
			@closeDialog="dialogClose"
		></overlapDevicePopup>
	</div>
</template>
<script>
import {commonCodeEnumListFnc, commonCodeListFnc, epostPrint,} from '../../../../common/common.js';
import overlapDevicePopup from '../../../../components/device/overlapDevicePopup.vue';
import DeviceMatchingInfo from './DeviceMatchingInfo';

export default {
	props: {
		applId: {
			type: Number,
		},
	},
	components: {
		overlapDevicePopup,
		DeviceMatchingInfo,
	},
	data: () => ({
		excelFile: [],
		dialog: true,
		overlapDevicePop: false,
		overlapDeviceData: [],
		deviceMatchingType: '',
		usimMatchingType: '',
		barcode: '',
		usimBarcode: '',
		deviceType: '',
		dvcId: '',
		deviceMatchingYn: false,
		usimMatchingYn: false,
		couriorMatchingYn: 'N',
		quickCharge: '',
		quickPhone1: '',
		quickPhone2: '',
		quickPhone3: '',
		invoiceNum: '',
		usimType: 'NANO_USIM',
		usimDivision: [],
		deliveryTypeList: [],
    courierList: [],
		couriorBtn: false,
    courierData: '',
	}),
	computed: {
		applMatchingDetailObj() {
			return (
				this.$store.state.ApplicationMatchingModule.applMatchingDetailObj || []
			);
		},
		macthingStatus() {
			// 매칭 가능 상태값
			// 배송요청 DLVR_DMND
			// 배송준비 DLVR_READY
			// 집하전(송장등록완료) DLVR_PREV_PROG
			const status = this.applMatchingDetailObj.logisticsTaskStatus;
			if (
				status === 'DLVR_DMND' ||
				status === 'DLVR_READY' ||
				status === 'DLVR_PREV_PROG'
			) {
				return true;
			}
			return false;
		},
		macthingBtn() {
			// <!--택배사가 우체국일시-->
			// <!--우편매칭이 아닐시-->
			// <!--배송구분이 택배(영업점전달)이 아닐시-->
			if (
				this.applMatchingDetailObj.courierName === '우체국' &&
				this.couriorMatchingYn !== 'Y' &&
				this.applMatchingDetailObj.deliveryType !== 'PS_SALES'
			) {
				// 기기매칭(재고일시)
				if (
					this.applMatchingDetailObj.applType === 'DVC' &&
					this.applMatchingDetailObj.deviceMatchingType ===
						'MATCHING_TYPE_STOCK'
				) {
					return true;
					// 유심매칭(재고일시)
				} else if (
					this.applMatchingDetailObj.applType === 'USIM' &&
					this.applMatchingDetailObj.usimMatchingType === 'MATCHING_TYPE_STOCK'
				) {
					return true;
					// 기기+유심 매칭(재고일시)
				} else if (
					this.applMatchingDetailObj.applType === 'DVC_USIM' &&
					this.applMatchingDetailObj.deviceMatchingType ===
						'MATCHING_TYPE_STOCK' &&
					this.applMatchingDetailObj.usimMatchingType === 'MATCHING_TYPE_STOCK'
				) {
					return true;
				}
			}
			return false;
		},
	},
	methods: {
		// 기기 매칭타입 체크(기기타입)
		// DVC : 기기
		// USIM : 유심
		// 재고매칭 : MATCHING_TYPE_STOCK
		// 비재고매칭 : MATCHING_TYPE_NOT_STOCK
		async deviceCheck(type) {
			this.deviceType = type;
			if ('DVC' === type) {
				// 기기
				if (!this.barcode) {
					alert('기기일련번호를 입력해주세요.');
					return;
				}
				if (this.deviceMatchingType === 'MATCHING_TYPE_STOCK') {
					let data = {
						barcode: this.barcode,
            goodsId: this.applMatchingDetailObj.goodsId,
            color: this.applMatchingDetailObj.color,
						goodsType: 'DVC',
					};
					await this.deviceOverlapCheck(data, type);
				} else {
					await this.noneStockMatching(type);
				}
			} else if ('USIM' === type) {
				// 유심
				if (!this.usimBarcode) {
					alert('유심일련번호를 입력해주세요.');
					return;
				}
				if (this.usimMatchingType === 'MATCHING_TYPE_STOCK') {
					// 재고매칭일시
					let data = {
						barcode: this.usimBarcode,
            telecomId: this.applMatchingDetailObj.openingTelecomCodeId,
            capacity: this.applMatchingDetailObj.usimType,
						goodsType: 'USIM',
					};
					await this.deviceOverlapCheck(data, type);
				} else {
					// 비재고매칭일시
					await this.noneStockMatching(type);
				}
			}
		},
		// 중복기기체크
		async deviceOverlapCheck(data, type) {
      let result;
      if (type === 'DVC') {
        result = await this.$store.dispatch(
            'commonModule/cwsDeviceListFromBarcode',
            data,
        );
      } else {
        result = await this.$store.dispatch(
            'commonModule/cwsUsimListFromBarcode',
            data,
        );
      }
			if (0 === result.resultList.length) {
				alert('조회된 기기가 없습니다.');
			} else if (1 === result.resultList.length) {
				// 한대일시
				await this.overlapSuccessFnc(
					result.resultList[0].dvcId,
					result.resultList[0].rawBarcode,
				);
			} else {
				// 기기 여러대 일때 선택 팝업 open
				this.overlapDevicePop = !this.overlapDevicePop;
				this.overlapDeviceData = result.resultList;
			}
			// 팝업 완료시 overlapSuccessFnc 호출
		},
		// 비재고매칭(기기타입)
		// DVC : 기기
		// USIM : 유심
		async noneStockMatching(type) {
			// 비재고 매칭
			let noneDvcIdData = {
				applId: this.applId,
				deviceType: this.deviceType,
			};
			if ('DVC' === type) {
				// 기기
				noneDvcIdData['matchingType'] = this.deviceMatchingType;
				noneDvcIdData['barcode'] = this.barcode;
			} else {
				// 유심
				if (!this.usimType) {
					alert('유심구분을 선택해주세요.');
					return;
				}
				noneDvcIdData['matchingType'] = this.usimMatchingType;
				noneDvcIdData['usimType'] = this.usimType;
				noneDvcIdData['barcode'] = this.usimBarcode;
			}
			await this.deviceMatching(noneDvcIdData);
		},
		// 중복기기성공팝업(기기 ID, 기기 BARCODE)
		async overlapSuccessFnc(dvcId, rawBarcode) {
			let data = {
				applId: this.applId,
				barcode: rawBarcode,
				dvcId: dvcId,
				deviceType: this.deviceType,
			};

			if ('DVC' === this.deviceType) {
				// 기기
				this.barcode = rawBarcode;
				data['matchingType'] = this.deviceMatchingType;
			} else {
				// 유심
				this.usimBarcode = rawBarcode;
				data['matchingType'] = this.usimMatchingType;
				data['usimType'] = null;
			}

			await this.deviceMatching(data);
		},
		// 기기매칭(기기타입)
		// DVC : 기기
		// USIM : 유심
		async deviceMatching(data) {
			const result = await this.$store.dispatch(
				'ApplicationMatchingModule/deviceMatching',
				data,
			);
			if (result) {
				alert('매칭되었습니다.');
				if (this.deviceType === 'DVC') {
					this.deviceMatchingYn = true;
					await this.getList();
					await this.getDetailList();
					this.$refs.usimBarcodeInput.focus();
					await this.needMacthingCheck();
				} else if (this.deviceType === 'USIM') {
					this.usimMatchingYn = true;
					await this.getList();
					await this.getDetailList();
					this.$refs.barcodeInput.focus();
					await this.needMacthingCheck();
				}
			}
		},
		// 기기매칭취소(기기타입)
		// DVC : 기기
		// USIM : 유심
		async deviceMatchingCancle(type) {
      if (
          'DVC' === type &&
          this.applMatchingDetailObj.deviceMatchingCancelAuthYn === 'N'
      ) {
        return alert(
            '자신의 영업점에서 매칭한 기기가 아닐시\n매칭취소 할 수 없습니다.',
        );
      } else if (
          'USIM' === type &&
          this.applMatchingDetailObj.usimMatchingCancelAuthYn === 'N'
      ) {
        return alert(
            '자신의 영업점에서 매칭한 유심이 아닐시\n매칭취소 할 수 없습니다.',
        );
      }
			if (this.matchingTypeCheck(type)) {
				return;
			}
			if (!confirm('매칭취소하시겠습니까?')) {
				return;
			}
			let data = {
				applId: this.applId,
				deviceType: type,
			};
			const result = await this.$store.dispatch(
				'ApplicationMatchingModule/cancelDeviceTypeMatching',
				data,
			);
			if (result) {
				alert('매칭취소되었습니다.');
				await this.getDetailList();
				if ('DVC' === type) {
					this.deviceMatchingYn = false;
					this.couriorBtn = false;
					this.barcode = '';
					await this.getList();
					await this.getDetailList();
				} else if (type === 'USIM') {
					this.usimMatchingYn = false;
					this.couriorBtn = false;
					this.usimBarcode = '';
					await this.getList();
					await this.getDetailList();
				}
			}
		},
		// 송장매칭 (송장타입)
		// QUICK : 퀵
		// PS : 택배
		// PS_SALES : 영업점 직접전달
		// DIRECT : 직접전달
		async deliveryMatchingFnc(type) {
			if (!confirm('운송장을 등록하시겠습니까?')) {
				return;
			}
			let data;
			if ('QUICK' === type) {
				// 퀵
				data = {
					applId: this.applId,
					couriorMatchingYn: 'N',
					quickCharge: this.quickCharge,
					quickPhone1: this.quickPhone1,
					quickPhone2: this.quickPhone2,
					quickPhone3: this.quickPhone3,
				};
			} else if ('PS' === type) {
				// 택배
				data = {
					applId: this.applId,
					couriorMatchingYn: 'Y',
				};
			} else if ('PS_SALES' === type || 'DIRECT' === type) {
				// 직접전달
				data = {
					applId: this.applId,
					invoiceNum: this.invoiceNum,
					couriorMatchingYn: 'N',
				};
			}
			const result = await this.$store.dispatch(
				'ApplicationMatchingModule/deliveryMatching',
				data,
			);
			if (result) {
				alert('등록되었습니다.');
				await this.getDetailList();
				await this.getList();
				if ('PS' === type) {
					// 택배일시 운송장 출력
					await this.postHtml();
				}
			}
		},
		needMacthingCheck() {
			if (
				this.applMatchingDetailObj.deliveryType !== 'PS' ||
				this.applMatchingDetailObj.courierName !== '우체국'
			) {
				return;
			}
			if (this.applMatchingDetailObj.applType === 'DVC') {
				// 기기만
				if (
					this.applMatchingDetailObj.deviceMatchingType ===
					'MATCHING_TYPE_STOCK'
				) {
					// 재고매칭
					this.couriorBtn = true;
					this.deliveryMatchingFnc(this.applMatchingDetailObj.deliveryType);
				}
			} else if (this.applMatchingDetailObj.applType === 'USIM') {
				// 유심만
				if (
					this.applMatchingDetailObj.usimMatchingType === 'MATCHING_TYPE_STOCK'
				) {
					// 재고매칭
					this.couriorBtn = true;
					this.deliveryMatchingFnc(this.applMatchingDetailObj.deliveryType);
				}
			} else if (this.applMatchingDetailObj.applType === 'DVC_USIM') {
				// 기기 + 유심
				if (
					this.applMatchingDetailObj.deviceMatchingType ===
						'MATCHING_TYPE_STOCK' &&
					this.applMatchingDetailObj.usimMatchingType === 'MATCHING_TYPE_STOCK'
				) {
					// 기기+유심 재고매칭일시
					this.couriorBtn = true;
					this.deliveryMatchingFnc(this.applMatchingDetailObj.deliveryType);
				}
			}
		},
		async couriorSucBtn() {
			let data = {
				applId: this.applMatchingDetailObj.applId,
			};
			if (!this.deliveryCheck()) {
				alert('신청서에 맞는 기기 또는 유심 재고매칭이 완료되지 않았습니다.');
				return;
			}
			if (!confirm('배송완료처리 하시겠습니까?')) {
				return;
			}

			const result = await this.$store.dispatch(
				'ApplicationMatchingModule/deliveryCompleted',
				data,
			);
			if (result) {
				alert('배송완료처리 됐습니다.');
				await this.getList();
				await this.getDetailList();
			}
		},
		async couriorCancelBtn() {
			let data = {
				applId: this.applMatchingDetailObj.applId,
			};
			if (!confirm('배송취소처리 하시겠습니까?')) {
				return;
			}
			const result = await this.$store.dispatch(
				'ApplicationMatchingModule/deliveryCompletedCancel',
				data,
			);
			if (result) {
				alert('배송취소처리 됐습니다.');
				await this.getList();
				await this.getDetailList();
			}
		},
		deliveryCheck() {
			if (
				this.applMatchingDetailObj.applType === 'DVC' &&
				this.applMatchingDetailObj.deviceMatchingType === 'MATCHING_TYPE_STOCK'
			) {
				return true;
				// 유심매칭
			} else if (
				this.applMatchingDetailObj.applType === 'USIM' &&
				this.applMatchingDetailObj.usimMatchingType === 'MATCHING_TYPE_STOCK'
			) {
				return true;
				// 기기+유심 매칭
			} else if (
				this.applMatchingDetailObj.applType === 'DVC_USIM' &&
				this.applMatchingDetailObj.deivceMatchingType ===
					'MATCHING_TYPE_STOCK' &&
				this.applMatchingDetailObj.usimMatchingType === 'MATCHING_TYPE_STOCK'
			) {
				return true;
			}
			return false;
		},
		// 모달 close
		dialogClose(data, dialogName) {
			// 모달 닫기 emit
			this.$set(this, dialogName, data);
		},
		// 송장출력
		async postHtml() {
			let data = {
				applId: this.applId,
			};
			const result = await this.$store.dispatch(
				'ApplicationMatchingModule/getCourierInfo',
				data,
			);
			epostPrint(result);
		},
		matchingTypeCheck(type) {
			if (
				this.couriorMatchingYn === 'Y' &&
				((type === 'DVC' &&
					this.applMatchingDetailObj.deviceMatchingType ===
						'MATCHING_TYPE_STOCK') ||
					(type === 'USIM' &&
						this.applMatchingDetailObj.usimMatchingType ===
							'MATCHING_TYPE_STOCK'))
			) {
				alert('재고매칭은 송장매칭 취소후에 매칭취소가 가능합니다.');
				return true;
			} else if (
				(this.applMatchingDetailObj.deliveryType === 'QUICK' ||
					this.applMatchingDetailObj.deliveryType === 'DIRECT') &&
				this.applMatchingDetailObj.deliveryMatchingCancelYn === 'Y'
			) {
				alert('배송완료취소처리를 진행해주십시오.');
				return true;
			}
		},
		couriorCheck(courior) {
			if (!courior) {
				alert('택배사를 먼저 선택해주세요.');
			}
		},
		async getDetailList() {
			let data = {
				applId: this.applId,
			};
			await this.$store.dispatch(
				'ApplicationMatchingModule/getDetailList',
				data,
			);
			await this.dataSet();
		},
		async getList() {
			const data = this.$store.state.ApplicationMatchingModule.filterData;
			await this.$store.dispatch('ApplicationMatchingModule/getList', data);
		},

		matchingUse() {
			// 기기 매칭 여부
			if (this.applMatchingDetailObj.deviceRawBarcode) {
				this.barcode = this.applMatchingDetailObj.deviceRawBarcode;
				this.deviceMatchingYn = !this.deviceMatchingYn;
			}
			// 유심 매칭 여부
			if (this.applMatchingDetailObj.usimRawBarcode) {
				this.usimBarcode = this.applMatchingDetailObj.usimRawBarcode;
				this.usimMatchingYn = !this.usimMatchingYn;
			}
		},
		dataSet() {
		   this.courierData = this.applMatchingDetailObj.courierId
			if ('QUICK' === this.applMatchingDetailObj.deliveryType) {
				if (this.applMatchingDetailObj.quickPhoneAttribute) {
					this.quickCharge = this.applMatchingDetailObj.quickCharge;
					this.quickPhone1 = this.applMatchingDetailObj.quickPhoneAttribute.phone1;
					this.quickPhone2 = this.applMatchingDetailObj.quickPhoneAttribute.phone2;
					this.quickPhone3 = this.applMatchingDetailObj.quickPhoneAttribute.phone3;
				}
			} else if (
				'PS' === this.applMatchingDetailObj.deliveryType ||
				'PS_SALES' === this.applMatchingDetailObj.deliveryType
			) {
				this.invoiceNum = this.applMatchingDetailObj.invoiceNum;
			}
			this.usimType = this.applMatchingDetailObj.usimType;
			// 개통종류에 따른 기기 유심 매칭타입 checked
      if (this.applMatchingDetailObj.applType === 'DVC') {
        this.deviceMatchingType = this.applMatchingDetailObj.deviceMatchingType || 'MATCHING_TYPE_STOCK';
        this.usimMatchingType =		this.applMatchingDetailObj.usimMatchingType || 'MATCHING_TYPE_NOT_STOCK';
      }
      if (this.applMatchingDetailObj.applType === 'USIM') {
        this.deviceMatchingType = this.applMatchingDetailObj.deviceMatchingType || 'MATCHING_TYPE_NOT_STOCK';
        this.usimMatchingType =		this.applMatchingDetailObj.usimMatchingType || 'MATCHING_TYPE_STOCK';
      }
      if (this.applMatchingDetailObj.applType === 'DVC_USIM') {
        this.deviceMatchingType = this.applMatchingDetailObj.deviceMatchingType || 'MATCHING_TYPE_STOCK';
        this.usimMatchingType =		this.applMatchingDetailObj.usimMatchingType || 'MATCHING_TYPE_STOCK';
      }
			// if (this.applMatchingDetailObj.applType !== 'USIM') {
			// 	this.deviceMatchingType =
			// 		this.applMatchingDetailObj.deviceMatchingType ||
			// 		'MATCHING_TYPE_STOCK';
			// } else {
			// 	this.deviceMatchingType =
			// 		this.applMatchingDetailObj.deviceMatchingType ||
			// 		'MATCHING_TYPE_NOT_STOCK';
			// }
			// if (this.applMatchingDetailObj.applType !== 'DVC') {
			// 	this.usimMatchingType =
			// 		this.applMatchingDetailObj.usimMatchingType || 'MATCHING_TYPE_STOCK';
			// } else {
			// 	this.usimMatchingType =
			// 		this.applMatchingDetailObj.usimMatchingType ||
			// 		'MATCHING_TYPE_NOT_STOCK';
			// }
			// 송장 매칭여부
			this.couriorMatchingYn =
				this.applMatchingDetailObj.couriorMatchingYn || 'N';
		},
		async cancelDeliveryMatchingFnc() {
			if (!confirm('매칭취소하시겠습니까?')) {
				return;
			}
			// TODO 신청서 상태 정의되면 송장매칭취소 안되는 상태 분기처리 필요
			let data = {
				applId: this.applId,
			};
			const result = await this.$store.dispatch(
				'ApplicationMatchingModule/cancelDeliveryMatching',
				data,
			);
			if (result) {
				alert('취소되었습니다.');
				await this.getDetailList();
				await this.getList();
			}
		},
    async courierUpdateFnc(){
      if(!this.courierData){
        return alert('택배사를 선택해주세요.');
      }
      if(!confirm('택배사를 저장하시겠습니까?')){
        return ;
      }
		  let data = {
		    applId : this.applId,
        courierId : this.courierData,
      }
      const result = await this.$store.dispatch(
          'ApplicationMatchingModule/changeCourier',
          data,
      );
      if (result) {
        alert('저장되었습니다.');
        await this.getDetailList();
        await this.getList();
      }
    },
		async getCommonCodeList() {
			let data = {
				initEnumData: ['UsimType', 'deliveryType'],
			};
			const result = await commonCodeEnumListFnc(data);
			this.usimDivision = result.UsimType;
			this.deliveryTypeList = result.deliveryType || [];
			if (this.deliveryTypeList.length > 0) {
				this.deliveryTypeList.splice(0, 1);
			}
		},
    async getCommonCodeList2() {
      let data = {
        code: ['COURIER'],
      };
      const result = await commonCodeListFnc(data);
      this.courierList = result.codeList.COURIER || [];
    },

	},
	watch: {
		dialog: {
			deep: true,
			handler: function (newVal) {
				if (!newVal) {
					this.$emit('closeDialog', this.dialog);
				}
			},
		},
	},
	async created() {
		await this.getDetailList();
		await this.getCommonCodeList();
		await this.getCommonCodeList2();
		await this.matchingUse();
	},
};
</script>
<style scoped>
.display_in {
	display: inline-block;
}
.matchingInput {
	width: 150px !important;
	border: 1px solid #ddd;
	padding-left: 5px;
}
.normalSelectCont1 .matchingSelect {
	border: 1px solid #989898;
	width: 200px;
	padding: 0 10px;
	color: #003a53 !important;
	font-weight: bold;
	line-height: 30px;
}
.popUpCustomSt1 .rowItem button {
	padding: 5px 9px;
}
.bg_gray {
	background-color: #eee;
}
.w60 {
	width: 60px !important;
}
</style>
