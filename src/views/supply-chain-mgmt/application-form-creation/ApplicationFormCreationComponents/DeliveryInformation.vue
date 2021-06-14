<template>
	<div class="mt-10">
		<h2>배송정보</h2>
		<div class="formCont2 disFX">
			<div class="disFX">
				<p>배송구분</p>
				<div class="radioCont1">
					<input type="radio" id="radio13" name="radioS5" /><label
						class="ml-1"
						for="radio13"
						>택배</label
					>
					<input type="radio" id="radio14" name="radioS5" class="ml10" /><label
						class="ml-1"
						for="radio14"
						>퀵</label
					>
					<input type="radio" id="radio15" name="radioS5" class="ml10" /><label
						class="ml-1"
						for="radio15"
						>직접전달</label
					>
				</div>
			</div>
		</div>
		<div class="formCont1 disFX">
			<div class="bgGray w90P pd10">
				<div class="disFX ml-13">
					<div class="disFX">
						<p>택배사</p>
						<div class="normalSelectCont1">
							<select></select>
						</div>
					</div>
					<div class="disFX ml-13">
						<p>송장번호</p>
						<input type="text" />
					</div>
				</div>
				<div class="disFX mt-3">
					<div class="disFX ml-13">
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
				<div class="disFX mt-3 postContAdd3">
					<input class="postStyle3" type="text" placeholder="상세주소2" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PostApi from '../../../../components/PostApi.vue';

export default {
	name: 'DeliveryInformation',
	components: { PostApi },
};
</script>
