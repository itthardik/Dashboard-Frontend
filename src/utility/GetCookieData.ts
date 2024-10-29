import { CookieData } from "../model/Types";

export const GetCookieData = (): CookieData => {
	const cookieString = document.cookie;
	if (cookieString === "") {
		return null;
	}
	const cookiesArray = cookieString.split("; ");
	const cookieJson: CookieData = { sessionToken: "" };

	cookiesArray.forEach((cookie) => {
		const [name, value] = cookie.split("=");
		cookieJson[name] = decodeURIComponent(value);
	});

	return JSON.parse(cookieJson.sessionToken);
};
