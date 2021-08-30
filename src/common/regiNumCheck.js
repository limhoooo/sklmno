export const regiNumCheck = (_ssn1, _ssn2) => {
    let ssn1 = _ssn1,
        ssn2 = _ssn2,
        ssn = ssn1 + '' + ssn2,
        arr_ssn = [],
        compare = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5],
        sum = 0;

    // 입력여부 체크
    // if (ssn1 == '') {
    // 	alert('주민등록번호를 기입해주세요.');
    // 	return false;
    // }
    //
    // if (ssn2 == '') {
    // 	alert('주민등록번호를 기입해주세요.');
    // 	return false;
    // }

    // 입력값 체크
    // if (ssn1.match('[^0-9]')) {
    //     alert('주민등록번호는 숫자만 입력하셔야 합니다.');
    //     return false;
    // }
    // if (ssn2.match('[^0-9]')) {
    //     alert('주민등록번호는 숫자만 입력하셔야 합니다.');
    //     return false;
    // }

    // 자리수 체크
    if (ssn.length != 13) {
        //alert('올바른 주민등록 번호를 입력하여 주세요.');
        return false;
    }

    // 공식: M = (11 - ((2×A + 3×B + 4×C + 5×D + 6×E + 7×F + 8×G + 9×H + 2×I + 3×J + 4×K + 5×L) % 11)) % 11
    for (let i = 0; i < 13; i++) {
        arr_ssn[i] = ssn.substring(i, i + 1);
    }

    for (let i = 0; i < 12; i++) {
        sum = sum + arr_ssn[i] * compare[i];
    }

    sum = (11 - (sum % 11)) % 10;

    if (sum != arr_ssn[12]) {
        //alert('올바른 주민등록 번호를 입력하여 주세요.');
        return false;
    }

    return true;
};
