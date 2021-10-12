<template>
	<v-app-bar
		clipped-left
		app
		height="50"
		class="backColorBlue3"
		style="border: 0; z-index: 20"
	>
		<button
			@click="drawer()"
			class="leftBtn"
			:class="{ drawerBtnMove: !drawerVal }"
		>
			<i
				class="fa fa-chevron-left slide arrowBtn"
				aria-hidden="true"
				:class="{ transbtn: drawerBtn }"
			>
			</i>
		</button>
		<div class="header" :class="process === 'production'? '' : 'localBgColor'">
			<div class="left">
				<router-link
					v-if="process === 'production'"
					class="logoWhite mainWhite"
					to="/dashboard"
				></router-link>
				<router-link v-else class="logoFake" to="/dashboard"
					>테스트</router-link
				>
			</div>
			<div class="right">
				<ul>
					<!--					<li>-->
					<!--						<div>-->
					<!--							<font-awesome-icon-->
					<!--								icon="plus"-->
					<!--								size="lg"-->
					<!--								:style="{ color: 'gray', width: '35px', cursor: 'pointer' }"-->
					<!--							/>-->
					<!--						</div>-->
					<!--					</li>-->
					<!--					<li>-->
					<!--						<div>-->
					<!--							<font-awesome-icon-->
					<!--								icon="calendar-alt"-->
					<!--								size="lg"-->
					<!--								:style="{ color: 'gray', width: '35px', cursor: 'pointer' }"-->
					<!--							/>-->
					<!--							<font-awesome-icon-->
					<!--								icon="bell"-->
					<!--								size="lg"-->
					<!--								:style="{ color: 'gray', width: '35px', cursor: 'pointer' }"-->
					<!--							/>-->
					<!--						</div>-->
					<!--					</li>-->
					<!--					<li>-->
					<!--						<div>-->
					<!--							<font-awesome-icon-->
					<!--								icon="question-circle"-->
					<!--								size="lg"-->
					<!--								:style="{ color: 'gray', width: '35px', cursor: 'pointer' }"-->
					<!--							/>-->
					<!--							<font-awesome-icon-->
					<!--								icon="cog"-->
					<!--								size="lg"-->
					<!--								:style="{ color: 'gray', width: '35px', cursor: 'pointer' }"-->
					<!--							/>-->
					<!--						</div>-->
					<!--					</li>-->
					<button
						class="backColorBlue2 padW10 lh26 mainWhite boldWt borderRadi3Px mr30"
						@click="linkFnc"
					>
						구전산 바로가기
					</button>
					<li class="mr10 fakeLine4">
						<div>
							<a class="myInfo" href="/change-user-info">
								<span class="userName mainWhite">
									{{ name }}
								</span>
							</a>
							<span v-if="role === 'A'" class="adminName">관리자</span>
							<span v-if="role === 'M'" class="adminName">매니저</span>
						</div>
					</li>
					<li>
						<button
							class="padW10 lh26 mainWhite borderContColor1 borderRadi3Px"
							@click="logoutFnc"
							style="background-color: #004ec3"
						>
							로그아웃
						</button>
					</li>
				</ul>
			</div>
		</div>
	</v-app-bar>
</template>

<script>
export default {
	data() {
		return {
			drawerBtn: false,
			process: '',
		};
	},
	computed: {
		name() {
			return this.$store.state.name;
		},
		role() {
			return this.$store.state.role;
		},
		sct() {
			return this.$store.state.sct;
		},
    drawerVal(){
      return this.$store.state.drawer;
    },
	},
	methods: {
		linkFnc() {
			alert('SKLMNO 홈페이지 링크입니다.\n이력 확인용으로 사용해주세요.');
			window.open('https://sklmno.kr/', '_blank');
		},
		async logoutFnc() {
			await this.$store.dispatch('LOGOUT', 'Y');
		},
		drawer() {
			this.drawerBtn = !this.drawerBtn;
			this.$store.state.drawer = !this.$store.state.drawer;
		},
	},
	created() {
		this.process = process.env.VUE_APP_NAME;
	},
};
</script>
<style scoped>
.localBgColor {
	background-color: gold;
}
.myInfo {
	color: #5e5e5e;
	margin: 0;
	font-weight: bold;
}
.myInfo:hover {
	text-decoration: underline;
}
</style>
