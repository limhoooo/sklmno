<!--<template>-->
<!--	<div id="app">-->
<!--		유저이름:-->
<!--		<input v-model="userName" type="text" style="border: 1px solid" />-->
<!--		내용:-->
<!--		<input-->
<!--			style="border: 1px solid"-->
<!--			v-model="message"-->
<!--			type="text"-->
<!--			@keyup="sendMessage"-->
<!--		/>-->
<!--		<div v-for="(item, idx) in recvList" :key="idx">-->
<!--			<h3>유저이름: {{ item.userName }}</h3>-->
<!--			<h3>내용: {{ item.content }}</h3>-->
<!--		</div>-->
<!--	</div>-->
<!--</template>-->

<template>
	<span></span>
</template>
<script>
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';

export default {
	name: 'WebSocket',
	data() {
		return {
			userName: '',
			message: '',
			recvList: [],
			messages: [],
			url: '',
		};
	},
	computed: {
		name() {
			return this.$store.state.name;
		},
		role() {
			return this.$store.state.role;
		},
		mq() {
			return this.$store.state.mq;
		},
	},
	methods: {
		sendMessage(e) {
			if (e.keyCode === 13 && this.userName !== '' && this.message !== '') {
				this.send();
				this.message = '';
			}
		},
		recvMessage(recv) {
			console.log(recv);
		},
		alarmDataPush(data) {
			this.$store.commit('alarmPush', data);
			this.$store.commit('alarmFnc');
		},
		send() {
			console.log('Send message:' + this.message);
			if (this.stompClient && this.stompClient.connected) {
				const msg = {
					userName: this.userName,
					content: this.message,
				};
				this.stompClient.send('/receive', JSON.stringify(msg), {});
			}
		},
		connect() {
			const serverURL = `${this.url}new-skl-mno/notification`;
			let socket = new SockJS(serverURL);
			this.stompClient = Stomp.over(socket);
			// debug (콘솔로그) off
			this.stompClient.debug = () => {};
			//console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
			this.stompClient.connect(
				{},
				frame => {
					// 소켓 연결 성공
					this.connected = true;
					//console.log('소켓 연결 성공', frame);
					// 서버의 메시지 전송 endpoint를 구독합니다.
					// 이런형태를 pub sub 구조라고 합니다.
					this.stompClient.subscribe(
						`/subscribe/notification/${this.mq}`,
						res => {
							let resBody = JSON.parse(res.body);
							// 마스킹처리 새로고침
							if (resBody.message === 'refresh') {
								alert(
									'관리자가 데이터 마스킹처리하였습니다.\n페이지가 새로고침 됩니다.',
								);
								location.reload();
							}
							//this.recvMessage(res.body);
							//this.alarmDataPush(res.body);
							// 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
							//this.recvList.push(JSON.parse(res.body));
						},
					);

					//	this.stompClient.send('/publish/notification', {}, {});
				},
				error => {
					// 소켓 연결 실패
					console.log(this.url);
					console.log('소켓 연결 실패', error);
					this.connected = false;
				},
			);
		},
	},

	created() {
		// App.vue가 생성되면 소켓 연결을 시도합니다.
		this.url = process.env.VUE_APP_SERVER_AUTH;
		this.connect();
	},
};
</script>
