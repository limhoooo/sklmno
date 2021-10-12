<template>
	<span>
		<template v-if="selectedCusType !== 'NULL'">
			<!--	요청	-->
			<template v-if="creditReqType === 'SENTENCE'">
				<li class="h200">신용조회요청</li>
			</template>
			<!--  개인      -->
			<template v-if="creditReqType === 'ITEMS'">
				<template v-if="selectedCusType === 'INDV'">
					<li>고객명</li>
					<li>주민등록번호</li>
					<li
						v-if="
							cardListData.length > 0 &&
							cardListData[leftHeaderActive].joinType === 'DVC_CHANGE'
						"
					>
						휴대폰번호
					</li>
				</template>
				<!--  미성년자      -->
				<template v-if="selectedCusType === 'MINORS'">
					<li>고객명</li>
					<li>주민등록번호</li>
					<li
						v-if="
							cardListData.length > 0 &&
							cardListData[leftHeaderActive].joinType === 'DVC_CHANGE'
						"
					>
						휴대폰번호
					</li>
					<li>법정대리인 성명</li>
					<li style="line-height: 28px">법정대리인<br />주민등록번호</li>
					<li style="line-height: 28px">법정대리인<br />휴대폰번호</li>
				</template>
				<!--  개인사업자      -->
				<template v-if="selectedCusType === 'INDV_BSNM'">
					<template v-if="selectedTelecom !== 'KT'">
						<li>사업자명</li>
						<li>사업자번호</li>
						<li>휴대폰번호</li>
					</template>
				</template>
				<!--  법인      -->
				<template v-if="selectedCusType === 'CORP'">
					<li>법인명</li>
					<li>사업자번호</li>
					<li
						v-if="
							cardListData.length > 0 &&
							cardListData[leftHeaderActive].joinType !== 'DVC_CHANGE'
						"
					>
						법인번호
					</li>
					<li
						v-if="
							cardListData.length > 0 &&
							cardListData[leftHeaderActive].joinType === 'DVC_CHANGE'
						"
					>
						휴대폰번호
					</li>
				</template>
				<!--  외국인      -->
				<template v-if="selectedCusType === 'FOREIGN'">
					<li>고객명</li>
					<li>외국인등록번호</li>
					<li
						v-if="
							cardListData.length > 0 &&
							cardListData[leftHeaderActive].joinType === 'DVC_CHANGE'
						"
					>
						휴대폰번호
					</li>
					<li
						v-if="
							cardListData.length > 0 &&
							((cardListData[leftHeaderActive].joinType === 'DVC_CHANGE' &&
								cardListData[leftHeaderActive].telecomName !== 'SKT') ||
								cardListData[leftHeaderActive].joinType !== 'DVC_CHANGE')
						"
					>
						국적
					</li>
					<li
						v-if="
							cardListData.length > 0 &&
							cardListData[leftHeaderActive].telecomName === 'SKT'
						"
					>
						체류코드
					</li>
					<li
						v-if="
							cardListData.length > 0 &&
							(cardListData[leftHeaderActive].telecomName !== 'SKT' ||
								(cardListData[leftHeaderActive].telecomName === 'SKT' &&
									cardListData[leftHeaderActive].joinType !== 'DVC_CHANGE'))
						"
					>
						발급일자
					</li>
					<li
						v-if="
							cardListData.length > 0 &&
							cardListData[leftHeaderActive].telecomName === 'SKT'
						"
					>
						만료일자
					</li>
				</template>
			</template>
			<template
				v-if="cardListData.length > 0 && cardListData[leftHeaderActive]"
			>
				<li
					v-for="(value, key) in cardListData[leftHeaderActive]
						.creditInquireResult"
					:key="value.id"
				>
					{{ key }}
				</li>
			</template>
			<li>메모</li>
		</template>
	</span>
</template>

<script>
export default {
	namespaced: true,
	props: {
		selectedCusType: {
			type: String,
		},
		leftHeaderActive: {
			type: Number,
		},
		cardListData: {
			type: Array,
		},
		creditReqType: {
			type: String,
		},
		selectedTelecom: {
			type: String,
		},
	},
};
</script>
