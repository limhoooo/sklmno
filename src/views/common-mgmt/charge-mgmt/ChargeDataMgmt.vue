<template>
	<div>
		<div class="wrapper">
			<div id="SearchBoxCont">
				<div>
					<div class="devideCont">
						<p>통신사</p>
						<v-select
							attach
							class="select_custom1"
							:items="selectData"
							outlined
							name="division"
						>
						</v-select>
					</div>
					<div class="checkCont">
						<p>통신망</p>
						<v-select
							attach
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
						<p>요금제명</p>
						<v-col>
							<v-text-field class="input_custom1" outlined></v-text-field>
						</v-col>
					</div>
					<div>
						<p>카테고리</p>
						<v-select
							attach
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
						<button class="btnDefault">삭제</button>
						<button class="btnDefault">일괄마감</button>
					</div>
				</div>
				<div class="ListTable">
					<table>
						<thead>
							<tr>
								<th>선택</th>
								<th>번호</th>
								<th>통신사</th>
								<th>통신망</th>
								<th>요금제명</th>
								<th>카테고리</th>
								<th>요금</th>
								<th>요청일시</th>
								<th>마감</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><input type="checkbox" /></td>
								<td>20</td>
								<td>SKT</td>
								<td>5G</td>
								<td>5G언택트 62</td>
								<td>일반</td>
								<td>62,000</td>
								<td>2021.00.00 <span>00:00:00</span></td>
								<td><a href="">마감</a></td>
							</tr>
							<tr>
								<td><input type="checkbox" /></td>
								<td>19</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
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
					<button class="btnDefault next10">&gt;</button>
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
