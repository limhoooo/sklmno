<template>
	<v-app-bar clipped-left app color="white" height="50">
		<!-- <button @click="drawer()" class="leftBtn">
      <span :class="{ transbtn: drawerBtn }"> &lt; </span>
    </button> -->
		<div class="header">
			<div class="left">
				<router-link class="logo" to="/dashboard">SKLMNO</router-link>
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
					<li class="mr10">
						<div>
							<img class="userImg" src="../assets/logo.png" style="" />
							<span class="userName">
								{{ name }}
							</span>
							<span v-if="role" class="adminName">관리자</span>
						</div>
					</li>
					<li>
						<button class="btnDefault" @click="logoutFnc">로그아웃</button>
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
		};
	},
	computed: {
		name() {
			return this.$store.state.name;
		},
		role() {
			return this.$store.state.role;
		},
	},
	methods: {
		async logoutFnc() {
			await this.$store.dispatch('LOGOUT', 'Y');
		},
		drawer() {
			this.drawerBtn = !this.drawerBtn;
			this.$store.state.drawer = !this.$store.state.drawer;
		},
	},
};
</script>
