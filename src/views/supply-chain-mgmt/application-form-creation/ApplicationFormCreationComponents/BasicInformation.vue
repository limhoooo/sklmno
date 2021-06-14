<template>
	<div>
		<h2>기본정보</h2>
		<div class="formCont disFX">
			<div class="disFX">
				<p>영업점<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option>DM-B</option>
					</select>
				</div>
			</div>
			<div class="disFX">
				<p>등록자<span class="redfont">*</span></p>
				<div class="normalSelectCont1">
					<select>
						<option>송다혜</option>
					</select>
				</div>
			</div>
			<div class="disFX">
				<p>상담원</p>
				<div class="normalSelectCont1">
					<select></select>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'BasicInformation',
});
</script>
