function saveUserToCookie(value) {
	document.cookie = `name=${value}`;
}
function saveRoleToCookie(value) {
	document.cookie = `role=${value}`;
}
function saveSctToCookie(value) {
	document.cookie = `sct=${value}`;
}
function saveMqToCookie(value) {
	document.cookie = `mq=${value}`;
}
function saveMfToCookie(value) {
	document.cookie = `mf=${value}`;
}
function savePuToCookie(value) {
	document.cookie = `pu=${value}`;
}
function saveStToCookie(value) {
	document.cookie = `st=${value}`;
}
function saveSgToCookie(value) {
	document.cookie = `sg=${value}`;
}
function getNameFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)name\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}

function getRoleFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)role\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}
function getSctFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)sct\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}
function getMqFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)mq\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}
function getMfFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)mf\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}
function getPuFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)pu\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}
function getStFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)st\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}
function getSgFromCookie() {
	return document.cookie.replace(
		/(?:(?:^|.*;\s*)sg\s*=\s*([^;]*).*$)|^.*$/,
		'$1',
	);
}
function deleteCookie(value) {
	for (let i = 0; i < value.length; i++) {
		document.cookie = `${value[i]}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
	}
}

export {
	saveUserToCookie,
	saveRoleToCookie,
	saveSctToCookie,
	saveMqToCookie,
	saveMfToCookie,
	savePuToCookie,
	saveStToCookie,
	saveSgToCookie,
	getNameFromCookie,
	getRoleFromCookie,
	getSctFromCookie,
	getMqFromCookie,
	getMfFromCookie,
	getPuFromCookie,
	getStFromCookie,
	getSgFromCookie,
	deleteCookie,
};
