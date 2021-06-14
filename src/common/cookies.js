function saveUserToCookie(value) {
	document.cookie = `name=${value}`;
}

function saveRoleToCookie(value) {
	document.cookie = `role=${value}`;
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

function deleteCookie(value) {
	document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
	saveUserToCookie,
	saveRoleToCookie,
	getNameFromCookie,
	getRoleFromCookie,
	deleteCookie,
};
