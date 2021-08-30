const epostHtml = data => {
	let html = `<div>
		<div class="postBox">
		<div style="width: 540px; height: 360px; float: left">
		<div style="width: 100%; height: 358px">
		<div style="width: 236px; height: 100%; float: left">
		<div style="width: 100%; height: 60px; padding-top: 30px">
		<span style="font-weight: bold; font-size: 11px; margin-right: 10px">
		접수국:
		${data.regiPoNm}
		<!-- 접수국 -->
		</span>
		<span style="font-weight: bold; font-size: 11px">
		신청일: 
		${data.reqYmd} 
		<!-- 신청일 -->
		</span>
		</div>
		<div style="width: 100%; height: 76px">
		<p style="font-size: 10px">
		주문인 :
		${data.ordCompNm}
		</p>
		<p style="font-size: 10px">
		고객 주문처 : ${data.ordCompNm} 
		</p>
		<p style="font-size: 10px">
		문의처 :
		${data.ordCompNm} 
		</p>
		<p style="font-size: 10px">예약번호 : 
		${data.resNo} 
		</p>
		<p>
		<span style="font-size: 10px; margin-right: 10px">중량 : 1000g</span>
		'<span style="font-size: 10px; margin-right: 10px">용적 : 121cm</span>
		<span style="font-size: 10px">요금 : 계약요금</span>
		</p>
		</div>
		<div style="width: 100%; height: 102px">
		<svg id="leftBarcode"/>
<!--		 <p style="font-size: 15px; margin-left: 50px">-->
<!--		 data.recZip -->
<!--		 </p>-->
		
		</div>
		<div style="width: 100%; height: 129px; font-size: 13px">
		<p>
		${data.salesName}
		</p>
		<p>
		제품명 :
		${data.goodsName}  
		(${data.color})
		</p>
		<p>
		${data.barcode} 
		</p>
		<p>
		${data.usimBarcode}
	</p>
		<p
		style="
		font-size: 15px;
		font-weight: bold;
		margin-top: 15px;
		padding-right: 10px;">
		고가 물품입니다. 필히 고객에게 직접 배송해주세요.
		</p>
		</div>
		</div>
		<div style="width: 302px; height: 100%; float: left">
		<div style="width: 100%; height: 60px">
		<span style="font-size: 34px; font-weight: bold">
		${data.delivAreaCd1}
		</span>
		<span style="font-weight: bold;margin-left: -9px;">
		${data.arrCnpoNm}
		</span>
		<span style="font-size: 34px; font-weight: bold">
		${data.delivAreaCd2}
		</span>
		<span style="font-weight: bold;margin-left: -9px;">
		${data.delivPoNm}
		</span>
		<span style="font-size: 34px; font-weight: bold">
		${data.delivAreaCd3} 
		</span>
		</div>
		<div style="width: 100%; height: 79px; display: table">
		<div style="
		width: 185px;
		margin-right: 15px;
		float: left;
		padding-left: 10px;">
		<p style="">
		${data.oredAddr}
		</p>
		<p style="">
		${data.ordCompNm}
		님
		</p>
		</div>
		<div style="width: 100px; float: left">
		<p>
		${data.ordZipcode}
		</p>
		<!-- <p style="">T : 051-2390-5361</p>-->
		<p style="">
		M :
		${data.ordNumber}
		</p>
		</div>
		</div>
		<div style="width: 100%; height: 140px; padding-left: 10px">
		<p style="font-size: 16px; font-weight: bold">
		[${data.recZip}]
		${data.addr}
		</p>
		<p style="font-size: 16px; font-weight: bold">
		${data.cusName} 
		님
		</p>
		<span style="font-size: 15px; font-weight: bold; margin-right: 5px">
		T :
		${data.recTel}
		</span>
		<span style="font-size: 15px; font-weight: bold">
		M : ${data.recMob}
		</span>
		<p style="font-size: 15px; margin-top: 10px">
		등기번호 :
		${data.regiNo}
		</p>
		</div>
		<div style="width: 100%; height: 88px">
		<svg id="bottomBarcode" />
		</div>
		</div>
		</div>
		<div style="width: 100%; height: 14px; padding: 8px 5px">
		<!-- <p style="">수거메세지 : 수취인 부재시 경비실로 문의바람 수취인 부재시 경비실로 문의바람</p>-->
		</div>
		</div>
		<div style="width: 78px; height: 360px; float: left; padding-left: 26px">
		<div style="transform: rotate(90deg); margin: 5px">
		<p style="margin-left: 10px"></p>
		<svg id="rightBarcode" />
		</div>
		</div>
		</div>
		</div>
		<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.4/dist/barcodes/JsBarcode.code128.min.js">
		</script>
		<script type="text/javascript">
		// https://lindell.me/JsBarcode/
		JsBarcode("#leftBarcode","${data.recZip}", 
		{
		width: 1,
		height: 40,
		});
		JsBarcode("#bottomBarcode","${data.regiNo}", 
		{
		  width: 2,
		 height: 40,
		});
		JsBarcode("#rightBarcode","${data.regiNo}", 
		{
		width: 2,
		height: 40,
		});
		</script>
		<style>
		div {
		box-sizing: border-box;
		}
		p {
		margin: 0;
		font-size: 11px;
		}
		span {
		font-size: 12px;
		}
		.postBox {
		width: 620px;
		height: auto;
		display: table;
		margin-top: 120px;
		padding-top: 10px;
		}
		.postBox:nth-child(1) {
		margin-top: 0;
		padding-top: 0;
		}
		</style>
		`;

	return html;
};

export default epostHtml;
