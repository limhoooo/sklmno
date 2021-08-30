export interface filterData {
	openStoreName?: number; // 개통점
	storeName?: number; // 영업점
	taskStatus?: string;
	ConsultTaskStatus?: string; //상담상태;
	LogisticsTaskStatus?: string; // 물류상태;
	OpeningTaskStatus?: string; //개통상태;
	saleStoreId?: string; //영업점리스트;
	openingStoreId?: string; //개통점리스트;
	업무진행상태?: number;
	배송상태?: number;
	JoinType?: string; // 가입유형
	blackType?: string; // 블랙리스트 유형
	goodsId?: string; // 기기명
	goodsName?: string; // 기기명
	capacity?: string; // 용량
	colorName?: string; // 색상
	telecom?: string; // 통신사
	existTelecom?: string; // 개통통신사
	기기일련번호?: string; // 기기 일련번호
	blackName?: string; // 블랙리스트 고객명
	blackPhone?: string; // 블랙리스트 연락처
	srhStartDate?: string; // 시작일
	srhEndDate?: string; // 종료일
	유형?: string; //가입유형
	perPageCnt?: number; // 페이지 넘버
	pageNo?: number; // 페이지 넘버
	consultRegiStartDateTime?: string; // 기간검색
	consultRegiEndDateTime?: string; // 기간검색
	openingStartDateTime?: string; // 기간검색
	openingEndDateTime?: string; // 기간검색
	consultUpdStartDateTime?: string; // 기간검색
	consultUpdEndDateTime?: string; // 기간검색
	cancelStartDate?: string; // 기간검색
	cancelEndDate?: string; // 기간검색
	applIds?: any; // 신청서아이디
}

export interface commonList_1 {}
export interface listData extends commonList_1 {
	blackListId?: number;
	openingId?: number;
	telecomName?: string;
	dvcId?: number;
	inStockRegiDate?: string;
	diffInStockRegiDate?: number;
	openingDate?: string;
	diffOpeningDate?: number;
	stockName?: string;
	stockType?: string;
	makerName?: string;
	goodsName?: string;
	modelName?: string;
	capacity?: string;
	colorName?: string;
	rawBarcode?: string;
	inStockAmt?: number;
	cusName?: string;
	cusPhone1?: number;
	cusPhone2?: number;
	cusPhone3?: number;
	addr1?: string;
	addr2?: string;
	zipCode?: string;
	cancelStatus?: string;
	cancelStatusMsg?: string;
	getCancelStatusMsg?: string;
	cancelDate?: string;
	cancelMemo?: string;
	blackName?: string;
	blackType?: string;
	blackDateBirth?: string;
	blackPhone?: string;
	blackPhone1?: string;
	blackPhone2?: string;
	blackPhone3?: string;
	memoContents?: string;
	test?: any;
}
// 페이징 데이터
export interface pagingData {
	pageNo: number;
	pageLastNo: number;
	pageEndNo: number;
	perPageCnt: number;
	pageNumList: Array<number>;
}
export interface resultApiData {
	resultList: listData[];
	totalCnt: number;
	perPageCnt: number;
	pageNo: number;
	pageNumList: Array<number>;
	pageLastNo: number;
	pageEndNo: number;
}
export interface deviceHistory {
	diffStockRegiDate: number;
	memo: string;
	regiDateTime: string;
	regiUserName: string;
	stockTypeMsg: string;
	storeName: string;
}
export interface statusList {
	name: string;
	value: number | string;
}
