<template>
	<div class="popUpCustom">
		<div class="text-center">
			<v-dialog
				v-model.trim="dialog"
				width="1700"
				style="border-radius: 0 !important"
			>
				<v-card style="background-color: #f2f2f2; border-radius: 0 !important">
					<v-card-text>
						<div class="disFx">
							<div class="leftCont1 w80P">
								<div
									class="infoCont pdLR30 popUpCustomSt1"
									style="background-color: #fff; padding-top: 20px"
								>
									<div class="titleCont">
										<p>빠른개통</p>
									</div>
									<div class="checkBoxCont posBtn1 w250">
										<input type="checkbox" id="check1" /><label
											class="font-btn-color ml-2"
											for="check1"
											>서류심사대상</label
										>
										<input class="ml10" type="checkbox" id="check2" /><label
											class="font-red ml-2"
											for="check2"
											>우선순위대상</label
										>
									</div>
									<div class="groupBtnCont1 disFX">
										<div class="disFX">
											<p>상담</p>
											<div class="normalSelectCont1">
												<select>
													<option></option>
												</select>
											</div>
										</div>
										<div class="disFX ml-3">
											<p>개통</p>
											<div class="normalSelectCont1">
												<select>
													<option></option>
												</select>
											</div>
										</div>
										<div class="disFX ml-3">
											<p>물류</p>
											<div class="normalSelectCont1">
												<select>
													<option></option>
												</select>
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">개통점</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">영업점</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">고객명</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">고객유형</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">주민등록번호</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">개통 휴대폰번호</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">요금감면</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">블랙리스트</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">납부방법</span>
											<div class="disFx underLineInput w680">
												<input class="w680" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">청구서종류</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">기존 통신사</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">가입유형</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">인증방식</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">인증번호</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">단말기</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">색상</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">단말기 일련번호</span>
											<div class="disFx underLineInput w250 btnPlus">
												<input class="w250" type="text" />
												<button>매칭</button>
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">유심</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">유심 일련번호</span>
											<div class="disFx underLineInput w250 btnPlus">
												<input class="w250" type="text" />
												<button>매칭</button>
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">약정유형</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">약정기간</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">할부기간</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">요금제</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">부가서비스</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">보험</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">출고가</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">공시지원금</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">추가지원금</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">프리할부/선수납</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">기타할인금</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">실판매가</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">배송구분</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">택배사</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
										<div class="disFX inputTitle ml-15">
											<span class="disIN w120">송장번호</span>
											<div class="disFx underLineInput w250">
												<input class="w250" type="text" />
											</div>
										</div>
									</div>
									<div class="mt19 disFX">
										<div class="disFX inputTitle">
											<span class="disIN w120">첨부파일</span>
											<div class="disFx"></div>
										</div>
									</div>
								</div>
								<v-card-actions style="padding: 15px 20px">
									<div class="memberCont"></div>
									<v-spacer></v-spacer>
									<div class="infoDialogCont">
										<v-btn text style="background-color: #17a5ae"> 저장 </v-btn>
										<v-btn
											text
											@click="dialog = false"
											style="background-color: #bdbdbd"
										>
											취소
										</v-btn>
									</div>
								</v-card-actions>
							</div>
							<memo-board></memo-board>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import memoBoard from '../../../../components/memoBoard.vue';

export default {
	name: 'QuickOpeningPop',
	components: { memoBoard },
	computed: {
		dialog: {
			get() {
				return this.$store.state.SellStatusModule.quickOpeningDialog;
			},
			set(newValue) {
				return (this.$store.state.SellStatusModule.quickOpeningDialog = newValue);
			},
		},
	},
};
</script>

<style scoped></style>
