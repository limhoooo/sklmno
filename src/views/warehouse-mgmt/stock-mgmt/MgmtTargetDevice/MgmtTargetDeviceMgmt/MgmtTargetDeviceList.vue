<template>
	<div>
		<div>
			<div
				class="disFx mt30 justify-lg-space-between"
				style="align-items: center"
			>
				<div class="pagingSelectCont">
					<select
						class="pagingSelect"
						v-model.trim="perPageCnt"
						@change="selectPerPageCnt($event.target.value)"
					>
						<option value="20">20개씩</option>
						<option value="50">50개씩</option>
						<option value="100">100개씩</option>
					</select>
					<span class="ml10 subBlue1">
						Total
						{{ totalCnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
					</span>
				</div>
				<div>
					<span
						v-if="listData.length !== 0"
						class="new-excel-btn"
						@click="excelDownloadBtn()"
					>
						엑셀 다운로드
					</span>
				</div>
			</div>
			<div class="newTableStyle mt10">
				<table class="w100P">
					<thead>
						<tr>
							<th>통신사</th>
							<th>입고일<br />(+경과일)</th>
							<th>이동일<br />(+경과일)</th>
							<th>재고구분</th>
							<th>제조사</th>
							<th>기기명<br />(모델명)</th>
							<th>용량</th>
							<th>색상</th>
							<th>일련번호</th>
							<th>입고단가</th>
							<th>입고상태</th>
							<th>제품상태</th>
							<th>외장상태</th>
							<th>개통이력<br />재판매대상점</th>
							<th>단종일자</th>
							<th>조정출고</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="listData.length === 0">
							<td colspan="20">데이터가 없습니다.</td>
						</tr>
						<tr
							v-for="(item, index) in listData"
							:key="index"
							@click="detailPopFnc(item)"
						>
							<td>{{ item.telecomName }}</td>
							<td>
								{{ item.inStockRegiDate | moment('YYYY-MM-DD HH:mm:ss') }}
								<br />
								( + <span>{{ item.diffInStockRegiDate }} 일 </span> )
							</td>
							<td>
								{{ item.moveRegiDate | moment('YYYY-MM-DD HH:mm:ss') }}
								<br />
								( + <span>{{ item.diffMoveRegiDate }} 일 </span> )
							</td>
							<td>{{ item.statusStrMsg }}</td>
							<td>{{ item.makerName }}</td>
							<td>{{ item.goodsName }}<br />( {{ item.modelName }} )</td>
							<td>{{ item.capacity }}</td>
							<td>{{ item.colorName }}</td>
							<td>{{ item.rawBarcode }}</td>
							<td>{{ priceRegularFnc(item.inStockAmt) }} 원</td>
							<td>{{ item.inStockStatusMsg }}</td>
							<td>{{ item.extrrStatusMsg }}</td>
							<td>
								<span v-if="item.productFaultyYn === 'N'">-</span>
								<span v-else>불량</span>
							</td>
							<td>
								{{ item.openingHistYnMsg }}<br />{{
									item.reSellTargetStoreName
								}}
							</td>
							<td>
								<span v-if="item.eosDate !== null">
									{{ item.eosDate }}
									<br />
									( D {{ item.diffEosDate }} 일)
								</span>
								<span v-else> - </span>
							</td>
							<td onclick="event.cancelBubble=true" class="cursorDefault">
								<span
									class="hoverActive1 cur_p grayFont"
									v-if="item.mediationOutStockStateMsg === '조정출고가능'"
									@click="mediationDialogFnc(item.dvcId)"
								>
									{{ item.mediationOutStockStateMsg }}
								</span>
								<span v-if="item.mediationOutStockStateMsg === '조정출고완료'">
									{{ item.mediationOutStockStateMsg }}
									<br />(
									{{ item.mediationOutStockRegDate | moment('YYYY-MM-DD') }} )
								</span>
							</td>
						</tr>
					</tbody>
				</table>
				<paging :pagingData="pagingData" @pagingAction="pagingAction"></paging>
			</div>
		</div>

		<mediation-release-pop v-if="mediationDialog"></mediation-release-pop>
		<mgmt-target-detail-pop v-if="detailDialog"></mgmt-target-detail-pop>
	</div>
</template>

<script>
import paging from '../../../../../components/paging.vue';
import MgmtTargetDetailPop from '../MgmtTargetDeviceMgmt/popup/MgmtTargetDetailPop.vue';
import MediationReleasePop from '../MgmtTargetDeviceMgmt/popup/MediationReleasePop.vue';

export default {
	name: 'MgmtTargetDeviceList',
	components: { paging, MgmtTargetDetailPop, MediationReleasePop },
	computed: {
		listData() {
			return this.$store.state.MgmtTargetDeviceModule.listData;
		},
		detailData: {
			get() {
				return this.$store.state.MgmtTargetDeviceModule.detailData;
			},
			set(newValue) {
				this.$store.state.MgmtTargetDeviceModule.detailData = newValue;
			},
		},
		mediationFormData: {
			get() {
				return this.$store.state.MgmtTargetDeviceModule.mediationFormData;
			},
			set(newValue) {
				this.$store.state.MgmtTargetDeviceModule.mediationFormData = newValue;
			},
		},
		totalCnt() {
			return this.$store.state.MgmtTargetDeviceModule.totalCnt;
		},
		pagingData() {
			return this.$store.state.MgmtTargetDeviceModule.pagingData;
		},
		perPageCnt: {
			get() {
				return this.$store.state.MgmtTargetDeviceModule.filterData.perPageCnt;
			},
			set(newValue) {
				this.$store.state.MgmtTargetDeviceModule.filterData.perPageCnt = newValue;
			},
		},
		detailDialog: {
			get() {
				return this.$store.state.MgmtTargetDeviceModule.detailDialog;
			},
			set(newValue) {
				this.$store.state.MgmtTargetDeviceModule.detailDialog = newValue;
			},
		},
		mediationDialog: {
			get() {
				return this.$store.state.MgmtTargetDeviceModule.mediationDialog;
			},
			set(newValue) {
				this.$store.state.MgmtTargetDeviceModule.mediationDialog = newValue;
			},
		},
	},
	methods: {
		getList(data) {
			this.$store.dispatch(
				'MgmtTargetDeviceModule/getMgmtTargetDevicePage',
				data,
			);
		},
		priceRegularFnc(data) {
			return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		async selectPerPageCnt(val) {
			const data = this.$store.state.MgmtTargetDeviceModule.filterData;
			data.perPageCnt = Number(val);
			data.pageNo = 1;
			for (val in data) {
				if (data[val] === null) {
					data[val] = '';
				}
			}
			await this.getList(data);
		},
		async pagingAction(pagingData) {
			const data = this.$store.state.MgmtTargetDeviceModule.filterData;
			data.perPageCnt = pagingData.perPageCnt;
			data.pageNo = pagingData.pageNo;
			for (let val in data) {
				if (data[val] === null) {
					data[val] = '';
				}
			}
			await this.getList(data);
		},
		async excelDownloadBtn() {
			if (this.listData <= 0) {
				alert('다운로드 할 데이터가 없습니다.');
				return;
			}
			const filterData = this.$store.state.MgmtTargetDeviceModule.filterData;
			let data = {};
			for (let item in filterData) {
				data[item] = filterData[item];
			}
			if (data.goodsName === '전체') {
				data.goodsName = '';
			}
			if (data.capacity === '전체') {
				data.capacity = '';
			}
			if (data.colorName === '전체') {
				data.colorName = '';
			}
			data.pageNo = this.pagingData.pageNo;
			data.perPageCnt = this.pagingData.pageLastNo * this.pagingData.perPageCnt;
			let param = {
				data: data,
				apiName: 'getMgmtTargetDevicePage',
				fileName: '관리대상기기리스트',
			};
			await this.$store.dispatch('commonModule/excelDownload', param);
		},
		async detailPopFnc(item) {
			this.detailData = [];
			this.detailData = item;
			this.detailDialog = !this.detailDialog;
			await this.getDeviceHistory(item.dvcId);
		},
		getDeviceHistory(data) {
			let dvcId = {
				dvcId: data,
			};
			this.$store.dispatch(
				'MgmtTargetDeviceModule/getRetrieveDeviceHistory',
				dvcId,
			);
		},
		mediationDialogFnc(item) {
			this.mediationDialog = true;
			this.mediationFormData.dvcId = item;
		},
	},
};
</script>

<style scoped></style>
