<template>
	<div>
		<div id="new-tablePageNation">
			<button
				class="btnDefault prev10 boldWt"
				v-if="pageButtonNone"
				@click="firstPage"
			>
				&lt;&lt;
			</button>
			<button class="btnDefault prev boldWt" v-if="pageButtonNone" @click="prevPage">
				&lt;
			</button>
			<ul>
				<li
					v-for="page in pagingData.pageNumList"
					:key="page.index"
					@click="pageMove(page)"
					:class="pageActive(page)"
				>
					{{ page }}
				</li>
			</ul>
			<button class="btnDefault next boldWt" v-if="pageButtonNone" @click="nextPage">
				&gt;
			</button>
			<button class="btnDefault next10 boldWt" v-if="pageButtonNone" @click="lastPage">
				&gt;&gt;
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ['pagingData'],
	data: () => ({}),
	components: {},
	computed: {
		pageButtonNone() {
			return this.pagingData.pageLastNo > 10;
		},
	},
	methods: {
		pageMove(num) {
			if (this.pagingData.pageNo !== num) {
				let data = {
					pageNo: num,
					perPageCnt: this.pagingData.perPageCnt,
				};
				this.$emit('pagingAction', data);
				//this.getListFnc(data);
			}
		},
		pageActive(num) {
			if (this.pagingData.pageNo === num) {
				return 'pageActive';
			}
		},
		firstPage() {
			let data = {
				pageNo: 1,
				perPageCnt: this.pagingData.perPageCnt,
			};
			this.$emit('pagingAction', data);
		},
		lastPage() {
			let data = {
				pageNo: this.pagingData.pageLastNo,
				perPageCnt: this.pagingData.perPageCnt,
			};
			this.$emit('pagingAction', data);
		},
		async nextPage() {
			if (this.pagingData.pageEndNo === this.pagingData.pageLastNo) {
				return;
			}
			let nextPage = this.pagingData.pageEndNo + 1;
			let data = {
				pageNo: nextPage,
				perPageCnt: this.pagingData.perPageCnt,
			};
			this.$emit('pagingAction', data);
		},
		prevPage() {
			if (this.pagingData.pageEndNo <= 10) {
				return;
			}
			let data = {
				pageNo: this.pagingData.pageNumList[0] - 10,
				perPageCnt: this.pagingData.perPageCnt,
			};
			this.$emit('pagingAction', data);
		},
	},
};
</script>

<style>
.pageActive {
	color: #ff7a00;
	font-weight: bold;
	background-color: #fff;
	border: 1px solid #d8d8d8;
	box-sizing: border-box;
	border-radius: 5px;
}
</style>
