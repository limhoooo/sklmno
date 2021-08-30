<template>
	<div id="alarm" :class="alarmClass">
		<div>
			<ul>
				<li v-for="item in alarmData">
					{{ item }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Alarm',
	data() {
		return {
			alarmClass: '',
		};
	},
	computed: {
		alarmData() {
			return this.$store.state.alarmData;
		},
	},
	methods: {},
	created() {
		setTimeout(() => {
			this.alarmClass = 'bottom0Px';
			setTimeout(() => {
				this.alarmClass = 'bottom400Px';
			}, 10000);
		}, 0);
	},
};
</script>
<style>
#alarm {
	width: 200px;
	height: 250px;
	border: 4px solid #eabe15;
	position: fixed;
	bottom: -400px;
	z-index: 9;
	right: 60px;
	background-color: #f4d55f;
	transition: all 0.4s;
}
.bottom0Px {
	bottom: 0px !important;
}
.bottom400Px {
	bottom: -400px !important;
}
</style>
