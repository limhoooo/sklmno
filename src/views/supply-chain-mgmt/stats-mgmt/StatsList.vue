<template>
	<div>
		<div class="disFx mt10" style="padding-right: 4%">
			<div class="disFx statsRadioCont1 fakeLine2">
				<input
					type="radio"
					id="statsRadio1"
					name="statsRadioCategory"
					checked
				/>
				<label for="statsRadio1">전체</label>
				<input type="radio" id="statsRadio2" name="statsRadioCategory" />
				<label for="statsRadio2" class="ml5">개통점</label>
				<input type="radio" id="statsRadio3" name="statsRadioCategory" />
				<label for="statsRadio3" class="ml5">영업점</label>
			</div>
			<div class="disFx statsRadioCont1 ml30">
				<input type="radio" id="statsRadio4" name="statsRadioTelecom" checked />
				<label for="statsRadio4">KT</label>
				<input type="radio" id="statsRadio5" name="statsRadioTelecom" />
				<label for="statsRadio5" class="ml5">SK</label>
				<input type="radio" id="statsRadio6" name="statsRadioTelecom" />
				<label for="statsRadio6" class="ml5">LGU</label>
			</div>
		</div>
		<div class="mt10" style="padding-right: 4%">
			<ul class="statsListCont1" style="overflow-y: scroll; height: 110px">
				<li class="mt5" v-for="index in 5" :key="index">
					<span>주식회사 대마</span>
					<span>접수완료(<span>00</span>)</span>
					<span>개통요청(<span>00</span>)</span>
					<span>개통중(<span>00</span>)</span>
					<span>개통완료(<span>00</span>)</span>
					<span>개통취소(<span>00</span>)</span>
					<span>신조요청(<span>00</span>)</span>
					<span>신조완료(<span>00</span>)</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'StatsList',
};
</script>

<style scoped>
.statsRadioCont1 input[type='radio'] {
	display: none;
}
.statsRadioCont1 label {
	text-align: center;
	width: 50px;
	font-size: 10px !important;
	background-color: #fff;
	color: #00aac1;
	line-height: 20px;
	border-radius: 50px;
	font-weight: bold;
}
.statsRadioCont1 input[type='radio']:checked + label {
	background-color: #00aac1;
	color: #fff;
}
.statsListCont1 {
	width: 100%;
	font-size: 10px !important;
	border-radius: 3px;
}
.statsListCont1 li {
	box-sizing: border-box;
	border: 1px solid #e0e0e0;
	line-height: 16px;
	border-radius: 3px;
	background-color: #fff;
}
.statsListCont1 li:first-child {
	margin-top: 0;
}
.statsListCont1 li > span {
	background-color: #fff;
	padding: 2px 5px;
	display: inline-block;
	text-align: center;
}
.statsListCont1 li > span:first-child {
	background-color: #e0e0e0;
	font-weight: bold;
}
</style>
