<template>
	<div class="mt-10">
		<h2>기타</h2>
		<div class="formCont2 disFX">
			<div class="disFX">
				<p>사은품 동봉여부</p>
				<div class="radioCont2">
					<input type="radio" id="radio16" name="radioS6" /><label
						class="ml-1"
						for="radio16"
						>예</label
					>
					<input type="radio" id="radio17" name="radioS6" class="ml30" /><label
						class="ml-1"
						for="radio17"
						>아니오</label
					>
				</div>
			</div>
			<div class="disFX goodsStyle1">
				<p>사은품</p>
				<div class="btnPlus1">
					<input
						class="goodsStyle2"
						type="text"
						placeholder="각 사은품의 뒤에 쉼표를 입력하세요"
					/>
					<button>목록보기</button>
				</div>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>중고폰 회수여부</p>
				<div class="radioCont2">
					<input type="radio" id="radio18" name="radioS7" /><label
						class="ml-1"
						for="radio18"
						>예</label
					>
					<input type="radio" id="radio19" name="radioS7" class="ml30" /><label
						class="ml-1"
						for="radio19"
						>아니오</label
					>
				</div>
			</div>
			<div class="disFX">
				<p>중고폰 모델명</p>
				<div class="normalSelectCont1">
					<select>
						<option></option>
					</select>
				</div>
			</div>
			<div class="disFX">
				<p>중고보상</p>
				<input type="text" />
			</div>
		</div>
		<div class="formCont2 disFX">
			<p>첨부파일</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'EtcInformation',
};
</script>

<style scoped></style>
