export interface quickOpeningFormData {
	basic: commonBasicFormData; // 기본정보
	customer: commonCustomerFormData; // 고객정보
	payment: paymentFormData; // 납부정보
	join: commonJoinFormData; // 가입정보
	delivery: commonDeliveryFormData; // 배송정보
}

// export interface appCommonFormData extends quickOpeningFormData {
//   etc: etcFormData; // 기타
//   consultList: Object; // 상담원리스트
// }

export interface commonBasicFormData {
	applId: null | number;
	docTargetYn: null | string; // 서류대상여부
	openingPriorityTargetYn: null | string; // 우선대상여부
	consultTaskStatus: string; //상담
	openingTaskStatus: string; // 개통업무상태
	logisticsTaskStatus: string; // 물류업무상태
	saleStoreId: null | number; // 영업점
	openingStoreId: null | number; // 개통점
	openingDate: string; //개통일자
	cancelDate: string; //철회일자
}

// export interface basicFormData extends commonBasicFormData {
//   applRegiUserId: null | number; // 신청서등록자
//   delYn: string; // 삭제여부
//   parentApplId: null | number; // 부모신청서아이디
//   priorityTargetYn: string; // 우선대상여부
//   priorityTargetYn: string; // 우선대상여부
//   regiDatetime: string; // 등록일시
//   regiUserId: null | number; // 등록유저아이디
//   updDateTime: string; //수정일시
//   updUserId: null | number; // 수정유저아이디
// }

export interface commonCustomerFormData {
	applId: null | number;
	cusName: string; // 고객명
	cusPhone1: string; // 고객전화번호
	cusPhone2: string; // 고객전화번호
	cusPhone3: string; // 고객전화번호
	cusRegiNum1: null | string; // 고객주민등록번호
	cusRegiNum2: null | string; // 고객주민등록번호
	// cusRegiNum1: null | number; // 고객주민등록번호
	// cusRegiNum2: null | number; // 고객주민등록번호
	bizName?: string;
	bizNum?: string;
	bizNum1?: string;
	bizNum2?: string;
	bizNum3?: string;
	cusAddr: string; // 기본주소
	cusAddrDetail: string; // 상세주소
	cusZipCode: string; // 우편번호
	cusType: string; // 고객유형
	chargeReductType: string; // 요금감면
	licenseNum1: null | string; // 외국인등록번호1
	licenseNum2: null | string; // 외국인등록번호2
	licenseNumConcat: null | string; // 외국인등록번호
}

// export interface customerFormData extends commonCustomerFormData {
//   bizName?: string; // 사업자명
//   bizNum1?: null | number; // 사업자번호
//   bizNum2?: null | number; // 사업자번호
//   bizNum3?: null | number; // 사업자번호
//   bizPhone1?: string; //사업자연락처
//   bizPhone2?: string; //사업자연락처
//   bizPhone3?: string; //사업자연락처
//   courtProctorName?: string; // 법정대리인명
//   courtProctorRegiNum1?: null | number; // 법정대리인주민등록번호
//   courtProctorRegiNum2?: null | number; // 법정대리인주민등록번호
//   courtProctorPhone1?: string; // 법정대리인연락처
//   courtProctorPhone2?: string; // 법정대리인연락처
//   courtProctorPhone3?: string; // 법정대리인연락처
//   courtProctorRelation?: string; // 법정대리인관계
//   emgPhone1: string; // 비상연락망
//   emgPhone2: string; // 비상연락망
//   emgPhone3: string; // 비상연락망
//   licenseAuthType?: string; // 신분증진위
//   licenseExpiredDate?: string; // 만료일자
//   licenseIssueArea?: string; // 신분증발급지역
//   licenseIssueDate: string; // 신분증발급일자
//   driverAreaCode?: string; // 운전면허지역코드
//   licenseNum1?: null | number; // 면허번호
//   licenseNum2?: null | number; // 면허번호
//   licenseNum3?: null | number; // 면허번호
//   ntnlCode?: null | string; // 국가
//   stayCode?: null | string; // 체류코드
//   이메일: string; // 이메일
// }

//todo: 타입체크
export interface paymentFormData {
	applId: null | number;

	paymentType: string; // 납부방법
	billType: string; // 청구서종류
	bankCode?: string; // 은행정보
	bankCodeMsg?: string; // 은행정보
	accountNum?: string;
	// accountNum: null | number; // 계좌번호
	accountHolderName?: string; // 예금주
	accountHolderBirth?: string; // 생년월일
	accountHolderRelation?: string; // 관계
	cardCompanyCode?: string; // 카드정보
	cardCompanyCodeMsg?: string; // 카드정보
	// cardNum1: null | number; // 카드번호
	// cardNum2: null | number; // 카드번호
	// cardNum3: null | number; // 카드번호
	// cardNum4: null | number; // 카드번호
	cardNum1?: null | string; // 카드번호
	cardNum2?: null | string; // 카드번호
	cardNum3?: null | string; // 카드번호
	cardNum4?: null | string; // 카드번호
	cardHolderName?: null | string; // 카드주
	cardHolderRegiNum1?: null | string; // 주민등록번호
	cardHolderRegiNum2?: null | string; // 주민등록번호
	cardValidityMm?: null | string; // 유효기간MM
	cardValidityYy?: null | string; // 유효기간YY
	// cardHolderRegiNum1: null | number; // 주민등록번호
	// cardHolderRegiNum2: null | number; // 주민등록번호
	// cardValidityMm: null | number; // 유효기간MM
	// cardValidityYy: null | number; // 유효기간YY
	giroZipCode?: null | string; // 우편번호
	giroAddr?: null | string; // 기본주소
	giroAddrDetail?: null | string; // 상세주소
}

export interface commonJoinFormData {
	applId: null | number;
	openingTelecomCodeId: null | number; // 개통통신사
	openingHopeNum?: null | string; // 개통희망번호
	joinType: string; // 가입유형
	// existTelecomCodeId: string; // 기존통신사
	existTelecomCodeId: null | number; // 기존통신사
	numChangeAuthType?: string; // 인증방식
	numChangeAuthTypeNum?: string; // 인증번호
	goodsId: null | number; // 기기명
	capacity: string; // 용량
	color: string; // 색상
	deviceRawBarcode: null | string; // 기기일련번호
	usimPaymentType: string; // 유심
	usimType: string; // 유심종류
	usimRawBarcode: null | string; // 유심일련번호
	agreementType: string; // 약정유형
	agreementPeriodType: string; // 약정기간
	instlPeriodType: string; // 할부기간
	chargeId: null | number; // 요금제
	addServiceList: null | Array<object>; // 부가서비스리스트
	releaseAmt: null | number; // 출고가
	pubNotiSupportAmt: null | number; // 공시지원금
	extraSupportAmt: null | number; // 추가지원금
	freeInstlAmt: null | number; // 프리할부/선수납
	etcDiscountAmt: null | number; // 기타할인금
	actualSellAmt: null | number; // 실판매가
}

// export interface joinFormData extends commonJoinFormData {
//   openingPhone1: string; // 개통휴대폰번호
//   openingPhone2: string; // 개통휴대폰번호
//   openingPhone3: string; // 개통휴대폰번호
//   releaseAmtDate: string; // 출고가일자
//   monthDvcAmt: null | number; // 월기기금액
//   monthBasicAmt: null | number; // 월기본료
//   monthPaymentAmt: null | number; // 월납부금액
//   depositAmt: null | number; // 입금받을금액
//   depositYn: string; // 입금여부
//   goodsOptionId: null | number; // 상품옵션아이디
// }

export interface commonDeliveryFormData {
	applId: null | number;
	deliveryType: string; // 배송구분
	courierCodeId?: null | number; // 택배사
	// invoiceNum: null | number; // 송장번호
	invoiceNum?: null | string; // 송장번호
}

// export interface deliveryFormData extends commonDeliveryFormData {
//   deliveryZipCode: string; // 우편번호
//   deliveryAddr: string; // 기본주소
//   deliveryAddrDetail: string; // 상세주소
// }

// export interface etcFormData extends commonEtcFormData {
//   giftEnclosedYn: string; // 사은품동봉여부
//   giftList: string; // 사은품
//   usedDvcReclaimYn: string; // 중고폰회수여부
//   usedDvcModelName: string; // 중고폰모델명
//   usedDvcCompeYn: string; // 중고보상
// }

export interface blackListData {
	blackAddr: null | string;
	blackAddrDetail: null | string;
	blackCount: null | number;
	blackDateBirth: null | string;
	blackId: null | number;
	blackName: string;
	blackPhone: string;
	blackPhone1: string;
	blackPhone2: string;
	blackPhone3: string;
	blackReason: null | string;
	blackType: string;
	blackTypeMsg: string;
	blackZipCode: null | string;
	regiDateTime: string;
	regiUserName: string;
	storeName: string;
	updDatetime: null | number;
	updUserName: null | number;
	updateYn: string;
}

export interface quickOpeningCodeListData {
	goodsItems: Array<Object>; // 기기명 items
	capacityItems: Array<Object>; // 용량 items
	colorItems: Array<Object>; // 색상 items
	saleStoreList: Array<Object>; //개통점리스트
	openingStoreList: Array<Object>; //영업점리스트
	customerTypeItems: Array<Object>; // 고객유형 items
	chargeReductTypeItems: Array<Object>; // 요금감면사유 items
	joinTypeItems: Array<Object>; // 가입유형 items
	numChangeAuthTypeItems: Array<Object>; // 인증방식 items
	//   billTypeItems: Array<Object>; // 청구서종류 items
	usimPaymentTypeItems: Array<Object>; //유심리스트
	AgreementTypeItems: Array<Object>; //약정유형
	agreementPeriodTypeItems: Array<Object>; //약정기간리스트
	installmentsPeriodTypeItems: Array<Object>; //할부기간리스트
	agreementList: Array<Object>;
	deliveryList: Array<Object>;
	callingPlanItems: Array<Object>; // 요금제리스트
	chargeList: Array<Object>; // 요금제리스트
	courierItemsList: Array<Object>; // 택배사코드 items
	addServiceList: Array<Object>; // 부가서비스 items
	ConsultTaskStatusList: Array<Object>;
	OpeningTaskStatusList: Array<Object>;
	LogisticsTaskStatusList: Array<Object>;
	ExistingTelecomTypeItems: Array<Object>; //기존통신사리스트
}
