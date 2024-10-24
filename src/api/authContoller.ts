import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { GetCookieData } from "../utility/GetCookieData";
import { CookieData } from "../model/Types";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://localhost:7012";

export const handleLoginSubmit = async ({
	formData,
	navigator,
	setFormData,
	setUserData,
	setLoading,
	setError,
}: {
	formData: {
		username: string;
		password: string;
	};
	navigator: NavigateFunction;
	setFormData: React.Dispatch<
		React.SetStateAction<{
			username: string;
			password: string;
		}>
	>;
	setUserData: React.Dispatch<React.SetStateAction<CookieData>>;
	setLoading: React.Dispatch<boolean>;
	setError: React.Dispatch<any>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(`${BASE_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				username: formData.username,
				password: formData.password,
			},
			credentials: "include",
		});
		if ([401, 404].includes(response.status)) {
			toast.error(await response.json());
			setLoading(true);
			return;
		}
		if (!response.ok) throw new Error(await response.json());
		else {
			setFormData({
				username: "",
				password: "",
			});

			setUserData(GetCookieData());
			toast.success("Login Successfully");
			navigator("/");
		}
		setLoading(true);
	} catch (error: unknown) {
		if (error instanceof Error) {
			toast.error(error.message);
			setError(error.message);
		} else {
			toast.error("An unknown error occurred");
		}
		setLoading(true);
	}
};
export const handleLogout = async ({
	setUserData,
	navigate,
	setLoading,
	setError,
}: {
	setUserData: React.Dispatch<React.SetStateAction<CookieData>>;
	navigate: NavigateFunction;
	setLoading: React.Dispatch<boolean>;
	setError: React.Dispatch<any>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(`${BASE_URL}/auth/logout`, {
			method: "POST",
			credentials: "include",
		});
		if ([401, 403].includes(response.status)) {
			setError(response.status.toString());
			setLoading(true);
			return;
		}
		if (response.status === 404) {
			const result = await response.json();
			throw new Error(result);
		}
		if (response.status === 400) {
			var jsonError = await response.json();
			if (jsonError == null) toast.error(response.toString());
			for (var err in jsonError.errors) {
				toast.error(jsonError.errors[err][0]);
			}
			setLoading(true);
			return;
		}
		if (response.status === 401)
			if (!response.ok) {
				throw new Error((await response.json()).title);
			}
		const result = await response.json();
		if (result.error) {
			toast.error(result.error);
		} else {
			setUserData(null);
			toast.success("Logout Successfully");
			navigate("/");
		}
		setLoading(true);
	} catch (error: any) {
		toast.error(error.message);
		setLoading(true);
	}
};
export async function refreshToken({
	setUserData,
	setLoading,
	setError,
}: {
	setUserData: React.Dispatch<React.SetStateAction<CookieData>>;
	setLoading: React.Dispatch<boolean>;
	setError: React.Dispatch<any>;
}) {
	try {
		setLoading(false);
		const response = await fetch(`${BASE_URL}/auth/refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if ([401, 403].includes(response.status)) {
			setError(response.status.toString());
			setLoading(true);
			return;
		}
		if (response.status === 404) {
			const result = await response.json();
			throw new Error(result);
		}
		if (response.status === 400) {
			var jsonError = await response.json();
			if (jsonError == null) toast.error(response.toString());
			for (var err in jsonError.errors) {
				toast.error(jsonError.errors[err][0]);
			}
			setLoading(true);
			return;
		}
		if (response.status === 401)
			if (!response.ok) {
				throw new Error((await response.json()).title);
			}
		const result = await response.json();
		if (result.error) {
			toast.error(result.error);
		} else {
			setUserData(GetCookieData());
		}
		setLoading(true);
	} catch (error: any) {
		toast.error(error.message);
		setLoading(true);
	}
}
