<template>
	<div>
		<div class="AppFormCont">
			<div class="groupBannerCont1 disFX">
				<div class="disFX">
					<p>상담</p>
					<span class="ml-1 redfont">-</span>
				</div>
				<div class="disFX ml-3">
					<p>개통</p>
					<span class="ml-1 bluefont">-</span>
				</div>
				<div class="disFX ml-3">
					<p>물류</p>
					<span class="ml-1 orangefont">-</span>
				</div>
			</div>
			<div class="titleBtn1">
				<input type="checkbox" id="ranking1" /><label
					class="ml-1 redfont"
					for="ranking1"
					>우선순위대상</label
				>
			</div>
			<basic-information></basic-information>
			<customer-information></customer-information>
			<payment-information></payment-information>
			<join-information></join-information>
			<delivery-information></delivery-information>
			<etc-information></etc-information>
		</div>
		<div class="saveBtnCont formCont1 disFX">
			<button>저장</button>
			<button>취소</button>
		</div>
	</div>
</template>

<script>
import BasicInformation from './ApplicationFormCreationComponents/BasicInformation.vue';
import CustomerInformation from './ApplicationFormCreationComponents/CustomerInformation.vue';
import PaymentInformation from './ApplicationFormCreationComponents/PaymentInformation.vue';
import JoinInformation from './ApplicationFormCreationComponents/JoinInformation.vue';
import DeliveryInformation from './ApplicationFormCreationComponents/DeliveryInformation.vue';
import EtcInformation from './ApplicationFormCreationComponents/EtcInformation.vue';

export default {
	name: 'ApplicationFormCreationTable',
	components: {
		BasicInformation,
		CustomerInformation,
		PaymentInformation,
		JoinInformation,
		DeliveryInformation,
		EtcInformation,
	},
};
</script>

<style scoped>
.titleBtn1 {
	position: absolute;
	right: 0;
	top: 20px;
}
</style>
