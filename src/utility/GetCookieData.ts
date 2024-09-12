export const GetCookieData = () => {
	const cookieString = document.cookie;
	if (cookieString == "") return null;
	const cookiesArray = cookieString.split("; ");
	const cookieJson: any = {};

	cookiesArray.forEach((cookie) => {
		const [name, value] = cookie.split("=");
		cookieJson[name] = decodeURIComponent(value);
	});

	return JSON.parse(cookieJson.sessionToken);
};
