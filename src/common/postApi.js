const axios = require('axios');
const cheerio = require('cheerio');

function parseStatus(s) {
	if (s.includes('집하완료')) return { id: 'DLVR_READY', text: '배송준비' };
	if (s.includes('배달준비'))
		return { id: 'out_for_delivery', text: '배송출발' };
	if (s.includes('배달완료')) return { id: 'DLVR_COMPL', text: '배송완료' };
	return { id: 'DLVR_PROG', text: '배송중' };
}

// TODO 배송상태값 정리 되고 나서 개발진행
// 현재 우체국 최종상태값
// 집하완료, 배달준비, 배달완료
// 그에 맞는 상태값 분기 처리 필요
// null 분기 처리 필요

function getTrack(trackId) {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`/trace.RetrieveDomRigiTraceList.comm?sid1=${trackId}&displayHeader=N`,
			)
			.then(res => {
				const $ = cheerio.load(res.data);
				let data = $('.contents_wrap')
					.find('.table_col tbody tr')
					.children()
					.eq(5)
					.html();
				resolve(parseStatus(data));
			})
			.catch(err => reject(err));
	});
}

module.exports = {
	info: {
		name: '우체국 택배',
		tel: '+8215881300',
	},
	getTrack,
};
