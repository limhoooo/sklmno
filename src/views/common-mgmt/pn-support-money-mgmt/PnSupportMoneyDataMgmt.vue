<template>
	<div>
		<div class="wrapper">
			<div class="pageTitle"><h2>공시지원금데이터관리</h2></div>
			<div id="ListTableCont">
				<div class="menuBar">
					<div class="pageCont">
						<!-- <span class="mr10" style="padding-top: 3px">
              총 <span class="orangefont"></span>
            </span>
            <select class="selectDefault">
              <option>20</option>
            </select> -->
					</div>
					<div id="BtnCont">
						<v-btn @click="submitFnc" v-if="this.$store.state.role">마감</v-btn>
					</div>
				</div>
				<div class="ListTable">
					<table class="tableStyle01">
						<thead>
							<tr>
								<th>요금제</th>
								<th>통신사</th>
								<th>휴대폰</th>
								<th>모델명</th>
								<th>제조사</th>
								<th>출고가</th>
								<th>공시지원금</th>
								<th>공시일자</th>
							</tr>
						</thead>
						<tbody>
							<tr v-if="rowDataList.length === 0">
								<td colspan="20">데이터가 없습니다.</td>
							</tr>
							<tr v-else v-for="item in rowDataList" :key="item.index">
								<td>
									{{ item.chargeName }}
								</td>
								<td>
									{{ item.telecomName }}
								</td>
								<td>
									{{ item.goodsName }}
								</td>
								<td>
									{{ item.modelName }}
								</td>
								<td>
									{{ item.makerName }}
								</td>
								<td>
									{{
										item.releaseAmt
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}}
									원
								</td>
								<td>
									{{
										item.supportAmt
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}}
									원 (
									<span
										:class="diffColor(item.diffSupportAmt)"
										v-text="compareSupportAmt(item.diffSupportAmt)"
									></span>
									)
									<!-- 원 (
										<span v-if="!item.diffSupportAmt">신규</span>
										<span v-if="item.diffSupportAmt === 0">-</span>
										<span v-if="item.diffSupportAmt >= 0">{{ item.diffSupportAmt }}</span>
										<span v-if="item.diffSupportAmt <= 0">{{ item.diffSupportAmt }}</span>
									 ) -->
								</td>
								<td>
									{{ item.releaseDate }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getrowDataList,
	migrationSmartChoiceData,
} from '../../../api/common-mgmt/pn-support-money-mgmt/PnSupportMoneyMgmtApi';

export default {
	data() {
		return {
			rowDataList: [],
			diffcolor: '',
		};
	},
	methods: {
		async getrowDataListFnc() {
			try {
				const result = await getrowDataList();
				if (result) {
					this.rowDataList = result.data.data || [];
				}
			} catch (e) {
				console.log(e);
			}
		},
		async submitFnc() {
			const text = '마감하시겠습니까?';
			if (confirm(text)) {
				const result = await migrationSmartChoiceData();
				if (result) {
					alert('마감되었습니다.');
					window.location.reload();
				}
			}
		},
		compareSupportAmt(val) {
			let result = `${val} 원`;
			if (val === null) {
				return '신규';
			} else if (val === 0) {
				return '-';
			} else if (val > 0) {
				return result;
			} else if (val < 0) {
				return result;
			}
		},
		diffColor(val) {
			if (val === null) {
				return 'font-black';
			} else if (val === 0) {
				return 'font-black';
			} else if (val > 0) {
				return 'font-red';
			} else if (val < 0) {
				return 'font-blue';
			}
		},
	},
	created() {
		this.getrowDataListFnc();
	},
};
</script>

<style></style>
