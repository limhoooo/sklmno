<template>
	<div class="memoComp w20P font-size-12">
		<div class="sideMenuBar pd10 font-btn-color">
			<h2>업무/수정</h2>
			<div class="topSearchBar mt-3">
				<div>
					<select class="selectStyle1 w80P cur_p lh28 pl-3">
						<option>접수중</option>
					</select>
					<button class="btnStyle2 w20P">↵</button>
				</div>
				<input
					class="selectStyle1 w100P mt-1 lh28 pl-3"
					type="text"
					placeholder="사유 입력"
				/>
			</div>
			<div class="middleSearchBar w100P mt-1">
				<div class="disFX bgWhite pd5">
					<div class="w100P">
						<span class="disIN font-bold w30P font-btn-color">개통취소</span>
						<div class="disIN w70P textRight">
							<span class="font-gray">권희나</span>
							<span class="font-gray"> | </span>
							<span class="font-gray font-bold">DM-B</span>
						</div>
						<div class="textRight">
							<span class="font-btn-color">48분전</span>
							<span class="ml-3 font-gray">2021-03-04 11:25</span>
						</div>
					</div>
				</div>
				<div class="disFX bgWhite pd3 mt1">
					<div class="w100P">
						<span class="disIN font-bold w30P font-red">개통보류</span>
						<div class="disIN w70P textRight">
							<span class="font-gray">권희나</span>
							<span class="font-gray"> | </span>
							<span class="font-gray font-bold">DM-B</span>
						</div>
						<div class="bgGray">
							<span class="disBl font-dark-gray pd5 lh25"
								>번호이동 3개월 이내 고객</span
							>
						</div>
						<div class="textRight">
							<span class="font-btn-color">48분전</span>
							<span class="ml-3 font-gray">2021-03-04 11:25</span>
						</div>
					</div>
				</div>
				<div class="disFX bgWhite pd3 mt1">
					<div class="w100P">
						<span class="disIN font-bold w30P font-btn-color">접수완료</span>
						<div class="disIN w70P textRight">
							<span class="font-gray">송다혜</span>
							<span class="font-gray"> | </span>
							<span class="font-gray font-bold">블랙다이아몬드</span>
						</div>
						<div class="textRight">
							<span class="font-btn-color">1일전</span>
							<span class="ml-3 font-gray">2021-03-04 11:25</span>
						</div>
					</div>
				</div>
				<div class="disFX bgWhite pd3 mt1">
					<div class="w100P">
						<span class="disIN font-bold w30P font-gray">수정</span>
						<div class="disIN w70P textRight">
							<span class="font-gray">송다혜</span>
							<span class="font-gray"> | </span>
							<span class="font-gray font-bold">블랙다이아몬드</span>
						</div>
						<div class="bgGray">
							<span class="disBl font-dark-gray pd3 lh20"
								>부가서비스 : > <span>기본팩</span></span
							>
							<span class="disBl font-dark-gray pd3 lh20"
								>추가할인금 : > <span>0</span></span
							>
							<span class="disBl font-dark-gray pd3 lh20"
								>기타할인금 : > <span>0</span></span
							>
						</div>
						<div class="textRight">
							<span class="font-btn-color">2일전</span>
							<span class="ml-3 font-gray">2021-03-04 11:25</span>
						</div>
					</div>
				</div>
				<div class="disFX bgWhite pd3 mt1">
					<div class="w100P">
						<span class="disIN font-bold w30P bluefont">접수</span>
						<div class="disIN w70P textRight">
							<span class="font-gray">송다혜</span>
							<span class="font-gray"> | </span>
							<span class="font-gray font-bold">블랙다이아몬드</span>
						</div>
						<div class="textRight">
							<span class="font-btn-color">2일전</span>
							<span class="ml-3 font-gray">2021-03-04 11:25</span>
						</div>
					</div>
				</div>
			</div>
			<div class="bottomSearchBar mt-3 w100P font-gray">
				<h2 class="disIN w20P">메모</h2>
				<div class="disIN textRight w80P groupBtnCont">
					<input type="radio" id="radioS1" name="groupBtn" checked /><label
						class="ml-5 disIN"
						for="radioS1"
						>전체</label
					>
					<input type="radio" id="radioS2" name="groupBtn" /><label
						class="ml-5 disIN"
						for="radioS2"
						>개인</label
					>
					<input type="radio" id="radioS3" name="groupBtn" /><label
						class="ml-5 disIN"
						for="radioS3"
						>그룹</label
					>
				</div>
				<div>
					<select class="selectStyle1 w30P cur_p lh28 pl-3">
						<option>모두</option>
					</select>
					<input
						class="selectStyle1 w50P mt-1 lh28 pl-3"
						type="text"
						placeholder="메모 입력"
					/>
					<button class="btnStyle2 w20P">↵</button>
				</div>
				<div class="memoArea mt-1">
					<div class="disFX bgWhite pd3">
						<div class="w100P">
							<div class="disIN w30P">
								<span class="disIN orangeTag pdW10">상담</span>
							</div>
							<div class="disIN w70P textRight">
								<span class="font-gray">송다혜</span>
								<span class="font-gray"> | </span>
								<span class="font-gray font-bold">블랙다이아몬드</span>
							</div>
							<div>
								<span class="disBl pd3 lh25 font-black"
									>기기반납 조건으로 위약금 최대 20만원 지원안내</span
								>
							</div>
							<div class="textRight">
								<span class="font-btn-color">48분전</span>
								<span class="ml-3 font-gray">2021-03-04 11:25</span>
							</div>
						</div>
					</div>
					<div class="disFX bgWhite pd3 mt1">
						<div class="w100P">
							<div class="disIN w30P">
								<span class="disIN orangeTag pdW10">상담</span>
							</div>
							<div class="disIN w70P textRight">
								<span class="font-gray">송다혜</span>
								<span class="font-gray"> | </span>
								<span class="font-gray font-bold">블랙다이아몬드</span>
							</div>
							<div>
								<span class="disBl pd3 lh25 font-black"
									>수령은 하셨으나 배우자도 반대하고 반품 한다함/혜택 안내했으나
									본인 몸도 성치 않다며 막무가네 반품한다함</span
								>
							</div>
							<div class="textRight">
								<span class="font-btn-color">48분전</span>
								<span class="ml-3 font-gray">2021-03-04 11:25</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'memoBoard',
};
</script>

<style scoped></style>
