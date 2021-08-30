<template>
	<div>
		<mobilephone-request-list-filter></mobilephone-request-list-filter>
		<mobilephone-request-list-list></mobilephone-request-list-list>
	</div>
</template>

<script>
import MobilephoneRequestListFilter from './MobilephoneRequest/MobilephoneRequestListFilter';
import MobilephoneRequestListList from './MobilephoneRequest/MobilephoneRequestListList';

export default {
	components: {
		MobilephoneRequestListFilter,
		MobilephoneRequestListList,
	},
};
</script>

<style></style>
