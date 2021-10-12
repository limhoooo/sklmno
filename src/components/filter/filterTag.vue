<template>
	<div class="disFX">
		<ul :class="{ filterTag: optionList.length !== 0 }">
			<li
				v-for="(item, index) in optionList"
				:key="index"
				class="tagBtnStyle2 cursorDefaul cur_p"
				@click="removeItem(index)"
			>
				{{ item[tagText] }}<button>X</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'filterTag',
	props: {
		optionList: { type: Array, required: true },
		tagText: { type: String, default: 'name' },
	},
	methods: {
		removeItem(data, index) {
			this.optionList.splice(index, 1);
		},
	},
};
</script>

<style scoped>
.filterTag {
	background: #f3f3f3;
	margin-left: 4px;
	padding: 6px 2px 0 6px;
	border-radius: 20px;
}
</style>
