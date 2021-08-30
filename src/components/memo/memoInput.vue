<template>
	<div>
		<select
			v-model.trim="formData.category"
			class="w100P cur_p lh36 pl-3 backColorWhite borderRadi5Px borderContColor1"
		>
			<option value="ALL">전체</option>
			<option value="GROUP">그룹</option>
			<option value="INDV">개인</option>
		</select>
		<div class="new-btnA1">
			<textarea
				v-model.trim="formData.memoContents"
				class="w100P mt-1 lh36 pl-3 backColorWhite borderRadi5Px borderContColor1 outLineNone"
				placeholder="메모 입력"
				type="text"
				style="resize: none"
			/>
			<button @click="addList">확인</button>
		</div>
	</div>
</template>

<script>
import { nullValidation2 } from '@/common/common';

export default {
	data: () => ({
		formData: {
			applId: 0,
			category: 'ALL',
			memoContents: '',
		},
	}),
	computed: {
		tabValue() {
			return this.$store.state.memoModule.tabValue;
		},
		applId() {
			return this.$store.state.memoModule.applId;
		},
	},
	methods: {
		async addList() {
			let data = this.formData;
			if (!nullValidation2(data, ['memoContents'])) {
				return;
			}
			const result = await this.$store.dispatch('memoModule/addList', data);
			if (result) {
				alert('등록되었습니다.');
				this.formData.category = 'ALL';
				this.formData.memoContents = '';
				let data = {
					applId: this.applId,
					category: this.tabValue,
				};
				await this.$store.dispatch('memoModule/getMemoList', data);
				await this.getList();
			}
		},
		async getList() {
			const data = this.filterData;
			await this.$store.dispatch('SellStatusModule/getSellCurrentPage', data);
		},
	},
	created() {
		this.formData.applId = this.applId;
	},
};
</script>

<style scoped></style>
