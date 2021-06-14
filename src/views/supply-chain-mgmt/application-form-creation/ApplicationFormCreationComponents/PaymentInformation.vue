<template>
	<div class="mt-10 sideBtnCont1">
		<h2>납부정보</h2>
		<div class="sideBtn1">
			<input class="w20" type="checkbox" id="check1" /><label for="check1"
				>기존과 동일</label
			>
		</div>
		<div class="formCont2 disFX">
			<div class="disFX">
				<p>납부방법<span class="redfont">*</span></p>
				<div class="radioCont1">
					<input type="radio" id="radio1" name="radioS1" /><label
						class="ml-1"
						for="radio1"
						>계좌이체</label
					>
					<input type="radio" id="radio2" name="radioS1" class="ml10" /><label
						class="ml-1"
						for="radio2"
						>카드</label
					>
					<input type="radio" id="radio3" name="radioS1" class="ml10" /><label
						class="ml-1"
						for="radio3"
						>지로</label
					>
				</div>
			</div>
			<div class="disFX">
				<p>청구서종류<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option>송다혜</option>
					</select>
				</div>
			</div>
		</div>
		<div class="formCont1 disFX">
			<div class="bgGray w90P pd10">
				<div>
					<div class="disFX">
						<div class="disFX">
							<p>은행정보</p>
							<div class="normalSelectCont1">
								<select>
									<option>기업은행</option>
								</select>
							</div>
						</div>
						<div class="disFX ml-5">
							<p>계좌번호</p>
							<input type="text" />
						</div>
						<div class="disFX ml-5">
							<p>예금주</p>
							<input type="text" />
						</div>
					</div>
					<div class="disFX mt-3">
						<div class="disFX">
							<p>생년월일</p>
							<input type="text" />
						</div>
						<div class="disFX ml-5">
							<p>관계</p>
							<input type="text" />
						</div>
					</div>
				</div>
				<div>
					<div class="disFX">
						<div class="disFX">
							<p>카드정보</p>
							<div class="normalSelectCont1">
								<select>
									<option>기업은행</option>
								</select>
							</div>
						</div>
						<div class="disFX ml-5">
							<p>카드번호</p>
							<input type="text" />
						</div>
					</div>
					<div class="disFX mt-3">
						<div class="disFX">
							<p>카드주</p>
							<input type="text" />
						</div>
						<div class="disFX ml-5">
							<p>주민번호</p>
							<input type="text" />
						</div>
						<div class="disFX ml-5">
							<p>유효기간</p>
							<div class="disFX validDateCont1">
								<input type="text" />
								<input class="ml-5" type="text" />
							</div>
						</div>
					</div>
				</div>
				<div>
					<div class="disFX">
						<div class="disFX">
							<p>주소</p>
							<div class="btnPlus1">
								<input type="text" placeholder="우편번호" />
								<post-api></post-api>
							</div>
						</div>
						<div class="disFX ml10">
							<input class="postStyle3" type="text" placeholder="상세주소" />
						</div>
						<div class="postCheck1 ml10">
							<input type="checkbox" id="check2" /><label
								class="ml-1"
								for="check2"
								>고객 주소와 동일</label
							>
						</div>
					</div>
					<div class="disFX mt-3 postContAdd2">
						<input class="postStyle3" type="text" placeholder="상세주소2" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PostApi from '../../../../components/PostApi.vue';

export default {
	name: 'PaymentInformation',
	components: { PostApi },
};
</script>

<style scoped>
.validDateCont1 input {
	width: 96px;
}
</style>
