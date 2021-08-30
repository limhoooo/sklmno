import Vue from 'vue';
import SignUp from '@/views/member/SignUp';

describe('SignUp.vue', () => {
	describe('유효성 검사', () => {
		it('합산값이 맞는지 확인한다.', () => {
			let abc = 1;
			let def = 2;
			expect(abc + def).toBeNaN();
		});
	});
});
