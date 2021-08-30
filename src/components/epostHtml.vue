<!-- 라벨지 신형 C형 168 * 107 mm -->

<template>
	<div class="postBox">
		<div style="width: 540px; height: 360px; float: left">
			<div style="width: 100%; height: 358px">
				<div style="width: 236px; height: 100%; float: left">
					<div style="width: 100%; height: 60px; padding-top: 30px">
						<span
							style="font-weight: bold; font-size: 11px; margin-right: 10px"
						>
							접수국:
							<template></template>
							<!-- 접수국 -->
						</span>
						<span style="font-weight: bold; font-size: 11px">
							신청일:
							<template></template>
							<!-- 신청일 -->
						</span>
					</div>
					<div style="width: 100%; height: 76px">
						<p style="font-size: 10px">
							주문인 :
							<template></template>
						</p>
						<p style="font-size: 10px">
							고객 주문처 :
							<template></template>
						</p>
						<p style="font-size: 10px">
							문의처 :
							<template></template>
						</p>
						<p style="font-size: 10px">예약번호 : <template></template></p>
						<p>
							<span style="font-size: 10px; margin-right: 10px"
								>중량 : 1000g</span
							>
							<span style="font-size: 10px; margin-right: 10px"
								>용적 : 121cm</span
							>
							<span style="font-size: 10px">요금 : 계약요금</span>
						</p>
					</div>
					<div style="width: 100%; height: 102px">
						<img />

						<p style="font-size: 15px; margin-left: 50px">
							<template></template>
						</p>
					</div>
					<div style="width: 100%; height: 129px; font-size: 13px">
						<p>
							영업점 :
							<template></template>
						</p>
						<p>
							제품명 :
							<template></template>
						</p>
						<p>
							기기 고유번호 :
							<template></template>
						</p>
						<template>
							<p>
								<template>유심 고유번호 : </template>
								<template></template>
							</p>
						</template>

						<p
							style="
								font-size: 15px;
								font-weight: bold;
								margin-top: 15px;
								padding-right: 10px;
							"
						>
							고가 물품입니다. 필히 고객에게 직접 배송해주세요.
						</p>

						<!-- <template th:each="ap, itr : ${epostInsertVO.goodsNmList}">
                                 <p>
                                     <template th:text="${ap}"></template>
                                 </p>
                             </template>-->
					</div>
				</div>
				<div style="width: 302px; height: 100%; float: left">
					<div style="width: 100%; height: 60px">
						<span style="font-size: 34px; font-weight: bold"></span>
						<span style="font-weight: bold"></span>
						<span style="font-size: 34px; font-weight: bold"></span>
						<span style="font-weight: bold"></span>
						<span style="font-size: 34px; font-weight: bold"></span>
					</div>
					<div style="width: 100%; height: 79px; display: table">
						<div
							style="
								width: 185px;
								margin-right: 15px;
								float: left;
								padding-left: 10px;
							"
						>
							<p style="">
								<template></template>
								<template></template>
							</p>
							<p style="">
								<template></template>
								님
							</p>
						</div>
						<div style="width: 100px; float: left">
							<p style="">
								<template></template>
							</p>
							<!-- <p style="">T : 051-2390-5361</p>-->
							<p style="">
								M :
								<template></template>
							</p>
						</div>
					</div>
					<div style="width: 100%; height: 140px; padding-left: 10px">
						<p style="font-size: 16px; font-weight: bold">
							[<template></template>]
							<template></template>
							<template></template>
						</p>
						<p style="font-size: 16px; font-weight: bold">
							<template></template>
							님
						</p>
						<span style="font-size: 15px; font-weight: bold">
							T :
							<template></template>
						</span>
						<span style="font-size: 15px; font-weight: bold">
							M :
							<template></template>
						</span>
						<p style="font-size: 15px; margin-top: 10px">
							등기번호 :
							<template></template>
						</p>
					</div>
					<div style="width: 100%; height: 88px">
						<img />
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
				<img />
			</div>
		</div>
	</div>
</template>
<script></script>
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
