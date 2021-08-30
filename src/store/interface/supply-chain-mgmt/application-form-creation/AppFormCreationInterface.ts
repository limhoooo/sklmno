export interface commonFormData_1 {
	applId?: null | number;
}

export interface appCommonFormData {
	basic: basicFormData; // 기본정보
	customer: customerFormData; // 고객정보
	payment: paymentFormData; // 납부정보
	join: joinFormData; // 가입정보
	delivery: deliveryFormData; // 배송정보
	etc: etcFormData; // 기타
	// memo: memoFormData; // 메모
	consultList: any; // 상담원리스트
}

export interface codeListData {
	applTypeItems: Object; // 기기유심 items
	chargeReductTypeItems: Object; // 요금감면사유 items
	customerTypeItems: Object; // 고객유형 items
	licenseAuthTypeItems: Object; // 신분증진위 items
	driverAreaCodeItems: Object; // 운전면허지역코드 items
	stayCodeItems: Object; // 체류코드 items
	billTypeItems: Object; // 청구서종류 items
	bankCodeItems: Object; // 은행코드 items
	cardCompanyCodeItems: Object; // 카드정보 items
	joinTypeItems: Object; // 가입유형 items
	numChangeAuthTypeItems: Object; // 인증방식 items
	usimPaymentTypeItems: Object; // 유심 items
	agreementPeriodTypeItems: Object; // 약정기간 items
	installmentsPeriodTypeItems: Object; // 할부기간 items
	courierCodeItems: Object; // 택배사코드 items
	goodsItems: Object; // 기기명 items
	capacityItems: Object; // 용량 items
	colorItems: Object; // 색상 items
	saleStoreItems: Object; // 영업점 items
	openingStoreItems: Object; // 개통점 items
	telecomAddServiceItems: Object; //부가서비스 items
	telecomChargeItems: Object; // 요금제 items
	existTelecomItems: any; // 기존통신사 items
	thriftyPhoneItems: Object; // 알뜰폰 items
	storeMemberItems: Object; // 등록자 items
	pubNotiInfoItems: Object; // 요금제조회 items
	nationalCodeItems: Object; //국가코드 items
	ConsultTaskStatusList: Object; // 업무진행상태 items
	OpeningTaskStatusList: Object; // 업무진행상태 items
	LogisticsTaskStatusList: Object; // 업무진행상태 items
	detailList: Object; // 블랙리스트
	counselorItems: any; // 상담원 Items
	DeliveryType: any; // 배송구분
}

export interface dialogData {
	paymentAddrDialog: boolean; // 납부정보 기본주소 버튼
	deliveryAddrDialog: boolean; // 배송정보 기본주소 버튼
}

export interface basicFormData extends commonFormData_1 {
	applType: string; // 기기유심타입
	openingDate: null | string; // 개통일자
	cancelDate: null | string; // 철회일자0
	beforeOpeningType: null | string; // 개통유형
	saleStoreId: null | number; // 영업점
	openingStoreId: any; // 개통점
	applRegiUserId: null | number; // 신청서등록자
	consultTaskStatus: null | string; // 상담업무상태
	openingTaskStatus: null | string; // 개통업무상태
	delYn: null | string; // 삭제여부
	docTargetYn: null | string; // 서류대상여부
	logisticsTaskStatus: null | string; // 물류업무상태
	parentApplId: null | number; // 부모신청서아이디
	priorityTargetYn: any; // 우선대상여부
	regiDatetime: null | string; // 등록일시
	/*regiUserId: null | number; // 등록유저아이디*/
	updDateTime: null | string; //수정일시
	/*updUserId: null | number; // 수정유저아이디*/
	parentHierarchy: null | string; // 상위계층
	parentSaleStoreId: null | number; // 상위 영업 관리점 아이디
}

export interface customerFormData extends commonFormData_1 {
	bizName?: null | string; // 사업자명
	bizNum?: null | number; // 사업자번호
	bizNum1?: any; // 사업자번호
	bizNum2?: any; // 사업자번호
	bizNum3?: any; // 사업자번호
	bizPhone?: null | string; //사업자연락처
	bizPhone1?: null | string; //사업자연락처
	bizPhone2?: null | string; //사업자연락처
	bizPhone3?: null | string; //사업자연락처
	bizRegiNumConcat?: null | string; // 법인등록번호
	bizRegiNum1?: null | string; // 법인등록번호
	bizRegiNum2?: null | string; // 법인등록번호
	courtProctorName?: null | string; // 법정대리인명
	courtProctorRegiNumConcat?: null | number; // 법정대리인주민등록번호
	courtProctorRegiNum1?: null | number; // 법정대리인주민등록번호
	courtProctorRegiNum2?: null | number; // 법정대리인주민등록번호
	courtProctorPhone?: null | string; // 법정대리인연락처
	courtProctorPhone1?: null | string; // 법정대리인연락처
	courtProctorPhone2?: null | string; // 법정대리인연락처
	courtProctorPhone3?: null | string; // 법정대리인연락처
	courtProctorRelation?: null | string; // 법정대리인관계
	cusAddr: null | string; // 기본주소
	cusAddrDetail: null | string; // 상세주소
	cusZipCode: null | string; // 우편번호
	chargeReductType: null | string; // 요금감면
	cusName: null | string; // 고객명
	cusPhone: null | string; // 고객전화번호
	cusPhone1: null | string; // 고객전화번호
	cusPhone2: null | string; // 고객전화번호
	cusPhone3: null | string; // 고객전화번호
	cusRegiNumConcat: null | string; // 고객주민등록번호
	cusRegiNum1: null | string; // 고객주민등록번호
	cusRegiNum2: null | string; // 고객주민등록번호
	cusType: null | string; // 고객유형
	emgPhone: null | string; // 비상연락망
	emgPhone1: null | string; // 비상연락망
	emgPhone2: null | string; // 비상연락망
	emgPhone3: null | string; // 비상연락망
	licenseAuthType?: null | string; // 신분증진위
	licenseExpiredDate?: null | string; // 만료일자
	licenseIssueArea?: null | string; // 신분증발급지역
	licenseIssueDate: null | string; // 신분증발급일자
	licenseNum1?: null | number; // 면허번호
	licenseNum2?: null | number; // 면허번호
	licenseNum3?: null | number; // 면허번호
	licenseNumConcat?: null | number; // 면허번호
	ntnlCode?: null | string; // 국가
	stayCode?: null | string; // 체류코드
	cusEmail: null | string; // 이메일
}

export interface paymentFormData extends commonFormData_1 {
	paymentType?: null | string | boolean; // 납부방법
	billType?: string; // 청구서종류
	bankCode?: null | string; // 은행정보
	accountNum?: null | string; // 계좌번호
	accountHolderName?: null | string; // 예금주
	accountHolderBirth?: null | string; // 생년월일
	accountHolderRelation?: null | string; // 관계
	cardCompanyCode?: null | string; // 카드정보
	cardNum1?: null | number; // 카드번호
	cardNum2?: null | number; // 카드번호
	cardNum3?: null | number; // 카드번호
	cardNum4?: null | number; // 카드번호
	cardHolderName?: null | string; // 카드주
	cardHolderRegiNum1?: null | number; // 주민등록번호
	cardHolderRegiNum2?: null | number; // 주민등록번호
	cardValidityMm?: null | number; // 유효기간MM
	cardValidityYy?: null | number; // 유효기간YY
	giroZipCode?: null | string; // 우편번호
	giroAddr?: null | string; // 기본주소
	giroAddrDetail?: null | string; // 상세주소
}

export interface joinFormData extends commonFormData_1 {
	openingPhone: null | string; // 개통휴대폰번호
	openingPhone1: null | string; // 개통휴대폰번호
	openingPhone2: null | string; // 개통휴대폰번호
	openingPhone3: null | string; // 개통휴대폰번호
	openingHopeNum: null | string; // 개통희망번호
	openingTelecomCodeId: any; // 개통통신사
	openingTelecomName: null | string; // 개통통신사
	existTelecomCodeId: null | string | number; // 기존통신사
	joinType: null | string; // 가입유형
	numChangeAuthType: null | string; // 인증방식
	numChangeAuthTypeNum: null | string; // 인증번호
	deviceRawBarcode: null | string; // 기기일련번호
	usimPaymentType: null | string; // 유심
	usimType: null | string; // 유심
	usimRawBarcode: null | string; // 유심일련번호
	agreementType: null | string; // 약정유형
	agreementPeriodType: null | string; // 약정기간
	instlPeriodType: any; // 할부기간
	chargeId: null | number; // 요금제
	addServiceList: any; // 부가서비스리스트
	releaseAmt: number; // 출고가
	releaseAmtDate: null | string; // 출고가일자
	pubNotiSupportAmt: number; // 공시지원금
	extraSupportAmt: number; // 추가지원금
	freeInstlAmt: number; // 프리할부/선수납
	etcDiscountAmt: number | string; // 기타할인금
	actualSellAmt: number; // 실판매가
	monthDvcAmt: number | string; // 월기기금액
	monthBasicAmt: number; // 월기본료
	monthPaymentAmt: number; // 월납부금액
	depositAmt: number; // 입금받을금액
	depositYn: null | string; // 입금여부
	goodsId: null | number; // 기기명
	dvcId: null | number; // 기기명
	usimDvcId: null | number; // 유심
	capacity: null | string; // 용량
	color: null | string; // 색상
	modelName: null | string; // 모델네임
	pubNotiId: number; // 공시 알림 아이디
	deviceMatchingType: null | string; // 기기 매칭타입
	usimMatchingType: null | string; // 유심 매칭타입
	openingDate: null | string; // 개통일자
	cancelDate: null | string; // 철회일자
}

export interface deliveryFormData extends commonFormData_1 {
	deliveryType: null | string; // 배송구분
	courierCodeId: null | number; // 택배사
	invoiceNum: null | number; // 송장번호
	deliveryZipCode: null | string; // 우편번호
	deliveryAddr: null | string; // 기본주소
	deliveryAddrDetail: null | string; // 상세주소
	couriorMatchingYn: null | string; // 운송장매칭여부
}

export interface etcFormData extends commonFormData_1 {
	giftEnclosedYn: null | string; // 사은품동봉여부
	giftList?: any; // 사은품
	usedDvcReclaimYn: null | string; // 중고폰회수여부
	usedDvcModelName: null | string; // 중고폰모델명
	usedDvcCompe: null | string; // 중고보상
	attachList: any; // 파일추가
}

export interface memoFormData extends commonFormData_1 {
	memoContents: null | string;
	category: null | string;
}
