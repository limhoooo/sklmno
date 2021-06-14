<template>
	<div class="mt-10">
		<h2>가입정보</h2>
		<div class="formCont disFX">
			<div class="disFX">
				<p>개통 휴대폰번호<span class="redfont">*</span></p>
				<div class="hpStyle1">
					<input type="text" /><span>-</span> <input type="text" /><span
						>-</span
					>
					<input type="text" />
				</div>
				<div class="postCheck1 ml10">
					<input type="checkbox" id="check3" /><label class="ml-1" for="check3"
						>기존과 동일</label
					>
				</div>
			</div>
			<div class="disFX">
				<p>개통 희망번호</p>
				<div class="hpStyle1">
					<input type="text" /><span>-</span> <input type="text" /><span
						>-</span
					>
					<input type="text" />
				</div>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>개통 휴대폰번호<span class="redfont">*</span></p>
				<div class="radioCont2">
					<input type="radio" id="radio4" name="radioS2" /><label
						class="ml-1"
						for="radio4"
						>SKT</label
					>
					<input type="radio" id="radio5" name="radioS2" class="ml30" /><label
						class="ml-1"
						for="radio5"
						>KT</label
					>
					<input type="radio" id="radio6" name="radioS2" class="ml30" /><label
						class="ml-1"
						for="radio6"
						>LGU+</label
					>
					<input type="radio" id="radio7" name="radioS2" class="ml30" /><label
						class="ml-1"
						for="radio7"
						>신규</label
					>
					<input type="radio" id="radio8" name="radioS2" class="ml30" /><label
						class="ml-1"
						for="radio8"
						>알뜰폰</label
					>
				</div>
				<div class="normalSelectCont1" style="margin-left: 71px">
					<select>
						<option></option>
					</select>
				</div>
			</div>
			<div class="disFX">
				<p>개통 통신사<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option></option>
					</select>
				</div>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>개통점<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option></option>
					</select>
				</div>
			</div>
			<div class="disFX">
				<p>가입유형<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option></option>
					</select>
				</div>
			</div>
			<div class="disFX w320"></div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>단말기<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option></option>
					</select>
				</div>
			</div>
			<div class="disFX">
				<p>색상</p>
				<div class="normalSelectCont1">
					<select>
						<option></option>
					</select>
				</div>
			</div>
			<div class="disFX w320">
				<p>단말기 일련번호</p>
				<input type="text" />
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>유심<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option></option>
					</select>
				</div>
			</div>
			<div class="disFX">
				<p>유심 일련번호</p>
				<input type="text" />
			</div>
			<div class="disFX w320"></div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>약정유형<span class="redfont">*</span></p>
				<div class="radioCont1">
					<input type="radio" id="radio9" name="radioS3" /><label
						class="ml-1"
						for="radio9"
						>선택약정</label
					>
					<input type="radio" id="radio10" name="radioS3" class="ml10" /><label
						class="ml-1"
						for="radio10"
						>공시지원금</label
					>
				</div>
			</div>
			<div class="disFX">
				<p>약정기간<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option></option>
					</select>
				</div>
			</div>
			<div class="disFX w320">
				<p>할부기간<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option></option>
					</select>
				</div>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>요금제<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option></option>
					</select>
				</div>
			</div>
			<div class="disFX">
				<p>부가서비스</p>
				<div class="normalSelectCont1">
					<select>
						<option></option>
					</select>
				</div>
			</div>
			<div class="disFX">
				<p>보험</p>
				<div class="normalSelectCont1">
					<select></select>
				</div>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>출고가</p>
				<div class="costStyle1">
					<input type="text" />
					<span>원</span>
				</div>
			</div>
			<div class="disFX">
				<p>공시지원금</p>
				<div class="costStyle1">
					<input type="text" />
					<span>원</span>
				</div>
			</div>
			<div class="disFX">
				<p>추가지원금</p>
				<div class="costStyle1">
					<input type="text" />
					<span>원</span>
				</div>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>프리할부/선수납</p>
				<div class="costStyle1">
					<input type="text" />
					<span>원</span>
				</div>
			</div>
			<div class="disFX">
				<p>기타할인금</p>
				<div class="costStyle1">
					<input type="text" />
					<span>원</span>
				</div>
			</div>
			<div class="disFX">
				<p>실판매가</p>
				<div class="costStyle1">
					<input type="text" />
					<span>원</span>
				</div>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>월 단말기금액</p>
				<div class="costStyle1">
					<input type="text" />
					<span>원</span>
				</div>
			</div>
			<div class="disFX">
				<p>월 기본료</p>
				<div class="costStyle1">
					<input type="text" />
					<span>원</span>
				</div>
			</div>
			<div class="disFX">
				<p>월 납부금액</p>
				<div class="costStyle1">
					<input type="text" />
					<span>원</span>
				</div>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>입금받을 금액</p>
				<div class="costStyle1">
					<input type="text" />
					<span>원</span>
				</div>
			</div>
			<div class="disFX">
				<p>입금여부</p>
				<div class="radioCont1">
					<input type="radio" id="radio11" name="radioS4" /><label
						class="ml-1"
						for="radio11"
						>예</label
					>
					<input type="radio" id="radio12" name="radioS4" class="ml10" /><label
						class="ml-1"
						for="radio12"
						>아니오</label
					>
				</div>
			</div>
			<div class="disFX w320"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'JoinInformation',
};
</script>
