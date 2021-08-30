<template>
	<div style="padding-right: 4%">
		<div
			class="disFx mb20 datePickerStyle1"
			style="justify-content: space-between; flex-wrap: wrap"
		>
			<h2 style="font-size: 16px; line-height: 40px">통계관리</h2>
			<div class="ml20" style="padding-right: 1.5%">
				<date-picker3></date-picker3>
			</div>
		</div>
		<ul class="stats_list1 disFx mt5">
			<li class="disIn ml5">
				<dl>
					<dt class="boldWt">접수완료</dt>
					<dd><span class="font-size-12 boldWt">0</span> / 건</dd>
				</dl>
			</li>
			<li class="disIn ml5">
				<dl>
					<dt class="boldWt">개통요청</dt>
					<dd><span class="font-size-12 boldWt">0</span> / 건</dd>
				</dl>
			</li>
			<li class="disIn ml5">
				<dl>
					<dt class="boldWt">개통중</dt>
					<dd><span class="font-size-12 boldWt">0</span> / 건</dd>
				</dl>
			</li>
			<li class="disIn ml5">
				<dl>
					<dt class="boldWt">개통완료</dt>
					<dd><span class="font-size-12 boldWt">0</span> / 건</dd>
				</dl>
			</li>
			<li class="disIn ml5">
				<dl>
					<dt class="boldWt">개통취소</dt>
					<dd><span class="font-size-12 boldWt">0</span> / 건</dd>
				</dl>
			</li>
			<li class="disIn ml5">
				<dl>
					<dt class="boldWt">신조요청</dt>
					<dd><span class="font-size-12 boldWt">0</span> / 건</dd>
				</dl>
			</li>
			<li class="disIn ml5">
				<dl>
					<dt class="boldWt">신조완료</dt>
					<dd><span class="font-size-12 boldWt">0</span> / 건</dd>
				</dl>
			</li>
		</ul>
	</div>
</template>

<script>
import DatePicker3 from '../../../components/DatePicker3.vue';

export default {
	name: 'StatsFilter',
	components: {
		DatePicker3,
	},
};
</script>

<style scoped>
.stats_list1 {
	width: 100%;
	justify-content: space-between;
}
.stats_list1 li {
	display: inline-block;
	width: 15%;
	line-height: 30px;
	background-color: #fff;
	text-align: center;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
}
.stats_list1 li dt {
	background-color: #007ef2;
	color: #fff;
	font-size: 10px !important;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}
.stats_list1 li dd {
	font-size: 10px;
}
</style>
