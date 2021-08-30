<template>
	<div class="wrapper">
		<book-mark path="/application-matching"></book-mark>
		<div>
			<router-link class="mainBlack2 boldWt titleFontS" to="">신청서매칭</router-link>
		</div>
		<ApplicationMatchingFilter></ApplicationMatchingFilter>
		<ApplicationMatchingList></ApplicationMatchingList>
	</div>
</template>

<script>
import ApplicationMatchingFilter from './application-matching/ApplicationMatchingFilter.vue';
import ApplicationMatchingList from './application-matching/ApplicationMatchingList.vue';
import BookMark from '../../components/BookMark';

export default {
	name: 'ApplicationMatching',
	components: { BookMark, ApplicationMatchingFilter, ApplicationMatchingList },
};
</script>

<style scoped></style>
