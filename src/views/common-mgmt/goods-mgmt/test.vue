<template>
	<div>
		<div class="Cont1">
			<div id="ListTableCont">
				<div class="menuBar">
					<div class="pageCont">
						<p>총 <span class="orangefont">00</span></p>
						<select class="selectDefault">
							<option>20</option>
						</select>
					</div>
					<div id="BtnCont">
						<button class="btnDefault">등록</button>
						<button class="btnDefault">삭제</button>
						<button class="btnDefault">조회</button>
					</div>
				</div>
				<div class="ListTable">
					<table>
						<thead>
							<tr>
								<th>선택</th>
								<th>번호</th>
								<th>상품명</th>
								<th>모델명</th>
								<th>제조사</th>
								<th>통신망</th>
								<th>통신사</th>
								<th>사용여부</th>
								<th>등록일</th>
								<th>옵션관리</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="data in dataList" v-bind:key="data.index">
								<td>
									<input
										type="checkbox"
										:value="data.id"
										v-model.trim="checkList"
									/>
								</td>
								<td>{{ data.number }}</td>
								<td>{{ data.productName }}</td>
								<td>{{ data.modelName }}</td>
								<td>{{ data.makrName }}</td>
								<td>5g</td>
								<td>{{ data.telecom }}</td>
								<td>{{ data.useYn }}</td>
								<td>{{ data.regiDateTime }}</td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div id="ListTablePageNation">
					<button class="btnDefault prev10">&lt;&lt;</button>
					<button class="btnDefault prev">&lt;</button>
					<ul>
						<li>1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
						<li>6</li>
						<li>7</li>
						<li>8</li>
						<li>9</li>
						<li>10</li>
					</ul>
					<button class="btnDefault next">&gt;</button>
					<button class="btnDefault next10">&gt;&gt;</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		dataList: [
			// '하드코딩' 된 'json' 데이터
			{
				id: 1,
				number: 1,
				productName: '아이폰11',
				modelName: 'AIP12M-64',
				makrName: '애플',
				telecom: 'KT',
				useYn: 'Y',
				regiDateTime: '2021-03',
			},
		],
		count: 1,
		checkList: [],
	}),
	methods: {},
};
</script>

<style></style>

* step 1 // 1. 선언된 data 의 dataList를 table.tr 에서 for문(for in 문 사용)
돌리기 * v-bind:key= data.index 를 적어줘야 에러안남 * 이미 써져있는 for 문은
참고하면서 지우고 해보시길.. // 2. 등록 버튼을 클릭시(@click) 실행되는 함수를
이용해서 선언된 data 의 dataList에 추가(push) // 3. 삭제 버튼 클릭시(@click)
data 의 dataList에서 삭제(splice(0,1) = 0에서 1번째 삭제) * step 2 // 1. 등록
버튼 클릭시 번호와 id 값이 1씩 증감되게 dataList 추가하기 * data 변수에 count :
1 를 이용 // 2. 테이블 체크박스 에 value 를 dataList 의 id 로 변경해서 뿌리기 *
:value 이용 // 3. 조회버튼 클릭시 console.log 에 체크된 체크박스 id 뿌리기 *
v-model 이용 * v-model 과 data의 checkList 를 연결
