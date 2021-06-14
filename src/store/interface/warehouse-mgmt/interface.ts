// 개통이력기기현황 필터
export interface filterData {
	telecom?: string; // 통신사
	stockId?: string; // 보유처
	maker?: string; // 제조사
	goodsId?: string; // 기기명
	capacity?: string; // 용량
	colorName?: string; // 색상
	barcode?: string; // 일련번호
	inStockRegiDate?: string; // 입고일
	openingDate?: string; // 개통일
	cusName?: string; // 고객명
	cusPhone?: string; // 고객 연락처
	stockType?: string; // 재고구분
	openingStatus?: string; // 철회상태
	perPageCnt?: number; // 페이지 넘버
	pageNo?: number;
}

// 개통기기현황 리스트
export interface commonList_1 {}
// 개통기기현황 리스트
export interface openStoreDeviceList extends commonList_1 {
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
	resultList: openStoreDeviceList[];
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
