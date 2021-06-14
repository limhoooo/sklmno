// 개통이력기기현황 필터
export interface filterData {
	개통점?: number; // 개통점
	영업점?: number; // 영업점
	개통상태?: number;
	업무진행상태?: number;
	배송상태?: number;
	telecom?: string;
	maker?: string; // 제조사
	가입유형?: number;
	goodsId?: string; // 기기명
	capacity?: string; // 용량
	colorName?: string; // 색상
	perPageCnt?: number; // 페이지 넘버
	pageNo?: number; // 페이지 넘버
}

// 개통기기현황 리스트
export interface commonList_1 {}
// 개통기기현황 리스트
export interface listData extends commonList_1 {
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
