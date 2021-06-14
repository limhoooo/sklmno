<template>
	<div>
		<div class="wrapper">
			<div id="SearchBoxCont">
				<div>
					<div class="devideCont">
						<p>상품명</p>
						<v-col>
							<v-text-field class="input_custom1" outlined></v-text-field>
						</v-col>
					</div>
					<div class="checkCont devideCont">
						<p>모델명</p>
						<v-col>
							<v-text-field class="input_custom1" outlined></v-text-field>
						</v-col>
					</div>
				</div>
				<div>
					<div class="devideCont">
						<p>제조사</p>
						<v-select
							class="select_custom1"
							:items="selectData"
							outlined
							name="division"
						>
						</v-select>
					</div>
					<div>
						<p>통신망</p>
						<v-select
							class="select_custom1"
							:items="selectData"
							outlined
							name="division"
						>
						</v-select>
					</div>
				</div>
				<div>
					<div class="devideCont">
						<p>통신사</p>
						<v-select
							class="select_custom1"
							:items="selectData"
							outlined
							name="division"
						>
						</v-select>
					</div>
				</div>
				<div>
					<p>등록일</p>
					<date-picker @datePickerData="deteData"></date-picker>
				</div>
			</div>
			<div id="BtnCont">
				<button class="btnDefault search">검색</button>
				<button class="btnDefault clear">초기화</button>
			</div>
			<div id="ListTableCont">
				<div class="menuBar">
					<div class="pageCont">
						<p>총 <span class="orangefont">00</span></p>
						<select class="selectDefault">
							<option>20</option>
						</select>
					</div>
					<div id="BtnCont">
						<button class="btnDefault regist">등록</button>
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
								<th>등록일</th>
								<th>마감</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><input type="checkbox" /></td>
								<td>20</td>
								<td>아이폰 7+ (128G)</td>
								<td>AIP12M-64</td>
								<td>애플</td>
								<td>5G</td>
								<td>KT</td>
								<td>2021.00.00 <span>00:00:00</span></td>
								<td><a href="">마감</a></td>
							</tr>
							<tr>
								<td><input type="checkbox" /></td>
								<td>20</td>
								<td>홍미노트</td>
								<td>HONGMI1286</td>
								<td>샤오미</td>
								<td>5G</td>
								<td>SKT</td>
								<td>2021.00.00 <span>00:00:00</span></td>
								<td><a href="">마감</a></td>
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
import DatePicker from '../../../components/DatePicker';

export default {
	components: {
		DatePicker,
	},
};
</script>

<style></style>
