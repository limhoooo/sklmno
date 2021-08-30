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
						<button class="btnDefault" @click="add">등록</button>
						<button class="btnDefault" @click="deletez">삭제</button>
						<button class="btnDefault" @click="select">조회</button>
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
				id: 0,
				number: 0,
				productName: '아이폰11',
				modelName: 'AIP12M-64',
				makrName: '애플',
				telecom: 'KT',
				useYn: 'Y',
				regiDateTime: '2021-03',
			},
		],
		count: 0,
		checkList: [],
	}),
	methods: {
		add() {
			this.count = this.count + 1;
			this.dataList.push({
				id: this.count,
				number: this.count,
				productName: '아이폰11',
				modelName: 'AIP12M-64',
				makrName: '애플',
				telecom: 'KT',
				useYn: 'Y',
				regiDateTime: '2021-03',
			});
		},
		deletez() {
			for (let i = 0; i < this.checkList.length; i++) {
				for (let j = 0; j < this.dataList.length; j++) {
					if (this.dataList[j].id === this.checkList[i]) {
						this.dataList.splice(j, 1);
					}
				}
			}

			this.checkList = [];
		},
		select() {
			console.log(this.checkList);
		},
	},
};
</script>

<style></style>
