import bus from '../../common/bus.js';
import store from '../../store/index';

export function setInterceptors(instance) {
	// Add a request interceptor
	instance.interceptors.request.use(
		function (config) {
			// 서버 배포시에만 스피너 start
			// if (process.env.NODE_ENV === 'production') {
			// 	bus.$emit('start:spinner');
			// }
			//bus.$emit('start:spinner');
			return config;
		},
		function (error) {
			console.log(error);
			// Do something with request error
			return Promise.reject(error);
		},
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		function (response) {
			if (response.data.status === 200) {
				// 데이터 통신 성공시 스피너 off
				bus.$emit('end:spinner');
			}
			// 쿠키 만료시 재인증 처리
			// if (response.data.status === 401) {
			// 	if (response.data.resultCode === '9002') {
			// 		alert(`${response.data.resultMsg}`);
			// 		return false;
			// 	} else {
			// 		console.log('토큰 만료');
			// 		store.dispatch('LOGOUT', 'Y');
			// 		// 토큰만료시 알수없는 이유로 (세션?) 전에 동작하던 api 가 호출?됨
			// 		// 방지하기위해 로그인페이지로 리다이렉트후 새로고침
			// 		//location.reload();
			// 		return false;
			// 	}
			// }
			return response;
		},
		function (error) {
			if (error.response.data.message) {
				alert(error.response.data.message);
			}
			//bus.$emit('end:spinner');
			console.log(error);
			// Do something with request error
		},
	);
	return instance;
}
