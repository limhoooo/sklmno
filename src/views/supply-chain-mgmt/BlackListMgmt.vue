<template>
	<div class="wrapper">
		<book-mark path="/black-list"></book-mark>
		<div>
			<h2 class="disIn titleFontS mb30">블랙리스트 관리</h2>
			<span class="ml10 font-red" style="display: inline-block">
				그룹별 개수를 출력하므로, 유형별 개수와 전체 개수가 상이할 수 있습니다.
			</span>
		</div>
		<BlackListMgmtFilter></BlackListMgmtFilter>
		<BlackListMgmtList></BlackListMgmtList>
	</div>
</template>

<script>
import BlackListMgmtFilter from './black-list/BlackListMgmtFilter';
import BlackListMgmtList from './black-list/BlackListMgmtList';
import BookMark from '../../components/BookMark';

export default {
	name: 'BlackList',
	components: {
		BookMark,
		BlackListMgmtFilter,
		BlackListMgmtList,
	},
};
</script>

<style scoped></style>
