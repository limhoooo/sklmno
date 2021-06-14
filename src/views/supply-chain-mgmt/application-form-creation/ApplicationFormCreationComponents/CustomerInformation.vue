<template>
	<div class="mt-10">
		<h2>고객정보</h2>
		<div class="formCont disFX">
			<div class="disFX">
				<p>고객명<span class="redfont">*</span></p>
				<input type="text" />
			</div>
			<div class="disFX">
				<p>주민등록번호<span class="redfont">*</span></p>
				<!--				<div class="residentStyle1">
					<input type="text" /><span>-</span>
					<input type="text" />
				</div>-->
				<input type="text" />
			</div>
			<div class="disFX">
				<p>요금감면<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option>해당없음</option>
					</select>
				</div>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>휴대폰번호<span class="redfont">*</span></p>
				<div class="hpStyle1">
					<input type="text" /><span>-</span> <input type="text" /><span
						>-</span
					>
					<input type="text" />
				</div>
			</div>
			<div class="disFX">
				<p>비상연락망<span class="redfont">*</span></p>
				<div class="hpStyle1">
					<input type="text" /><span>-</span> <input type="text" /><span
						>-</span
					>
					<input type="text" />
				</div>
			</div>
			<div class="disFX">
				<p>이메일<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option>해당없음</option>
					</select>
				</div>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>우편번호<span class="redfont">*</span></p>
				<div class="btnPlus1">
					<input type="text" />
					<post-api></post-api>
				</div>
			</div>
			<div class="disFX postStyle1 mlA">
				<p>상세주소<span class="redfont">*</span></p>
				<input class="postStyle1" type="text" />
			</div>
		</div>
		<div class="formCont1 disFX">
			<input class="postStyle2" type="text" />
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>고객유형<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option>개인</option>
						<option>미성년자</option>
					</select>
				</div>
			</div>
		</div>
		<div class="formCont1 disFX">
			<div class="bgGray w90P pd10">
				<div class="disFX">
					<div class="disFX">
						<p>법정대리인 성명</p>
						<input type="text" />
					</div>
					<div class="disFX ml-5">
						<p>주민등록번호</p>
						<!--						<div class="residentStyle1">
							<input type="text" /><span>-</span><input type="text" />
						</div>-->
						<input type="text" />
					</div>
				</div>
				<div class="disFX mt-3">
					<div class="disFX">
						<p>연락처</p>
						<div class="hpStyle1">
							<input type="text" /><span>-</span> <input type="text" /><span
								>-</span
							>
							<input type="text" />
						</div>
					</div>
					<div class="disFX ml-5">
						<p>관계</p>
						<input type="text" />
					</div>
				</div>
			</div>
		</div>
		<div class="formCont disFX">
			<div class="disFX">
				<p>신분증 진위<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option>주민등록증</option>
						<option>운전면허증</option>
						<option>외국인등록증</option>
					</select>
				</div>
			</div>
		</div>
		<div class="formCont1 disFX">
			<div class="bgGray w90P pd10">
				<div>
					<div class="disFX">
						<div class="disFX">
							<p>발급일자</p>
							<input type="text" />
						</div>
						<div class="disFX ml-5">
							<p>만료일자</p>
							<input type="text" />
						</div>
						<!--						<div class="disFX ml-5">
							<p>지역</p>
							<div class="normalSelectCont1">
								<select>
									<option>서울</option>
								</select>
							</div>
						</div>
						<div class="disFX ml-5">
							<p>면허번호</p>
							<input type="text" />
						</div>-->
					</div>
					<div class="disFX mt-3">
						<div class="disFX">
							<p>외국인 등록번호</p>
							<input type="text" />
						</div>
						<div class="disFX ml-5">
							<p>국가</p>
							<div class="normalSelectCont1">
								<select>
									<option>선택해주세요.</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PostApi from '../../../../components/PostApi.vue';

export default {
	name: 'CustomerInformation',
	components: { PostApi },
};
</script>

<style>
.residentStyle1 input {
	width: 98px !important;
}
</style>
