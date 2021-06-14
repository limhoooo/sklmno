<template>
	<div>
		<mobilephone-list-filter></mobilephone-list-filter>
		<mobilephone-list-list></mobilephone-list-list>
	</div>
</template>

<script>
import MobilephoneListFilter from './MobilephoneList/MobilephoneListFilter.vue';
import MobilephoneListList from './MobilephoneList/MobilephoneListList.vue';

export default {
	components: {
		MobilephoneListFilter,
		MobilephoneListList,
	},
};
</script>

<style></style>
