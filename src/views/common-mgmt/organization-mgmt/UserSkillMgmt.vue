<template>
	<div>
		<div class="wrapper">
			<div class="pageTitle"><h2>사용자 기능 관리</h2></div>
			<div id="matchingTitle">
				<div class="selectCont">
					<p>관리점</p>
					<select class="selectDefault">
						<option>전체</option>
					</select>
				</div>
				<div id="BtnCont">
					<v-btn>취소</v-btn>
					<v-btn>확인</v-btn>
				</div>
			</div>
			<div id="ListTableCont">
				<table>
					<thead>
						<tr>
							<th width="100"></th>
							<th>상담</th>
							<th>물류</th>
							<th>개통</th>
							<th>민원</th>
							<th>...</th>
							<th>...</th>
							<th>...</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>팀1</th>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
						</tr>
						<tr>
							<th>사용자1</th>
							<td><input type="checkbox" @click="tdInputCheck" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
						</tr>
						<tr>
							<th>사용자2</th>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
							<td><input type="checkbox" /></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		tdInputCheck() {},
	},
};
</script>

<style></style>
