import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { GetCookieData } from "../utility/GetCookieData";

export const handleLoginSubmit = async ({
	formData,
	setFormData,
	setUserData,
	navigator,
}: {
	formData: {
		username: string;
		password: string;
	};
	setFormData: React.Dispatch<
		React.SetStateAction<{
			username: string;
			password: string;
		}>
	>;
	setUserData: React.Dispatch<any>;
	navigator: NavigateFunction;
}) => {
	try {
		const response = await fetch("https://localhost:7012/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				username: formData.username,
				password: formData.password,
			},
			credentials: "include",
		});
		if (response.status === 400) {
			var jsonError = await response.json();

			for (var err in jsonError.errors) {
				toast.error(jsonError.errors[err][0]);
			}
		}
		if (!response.ok) {
			throw new Error((await response.json()).title);
		}

		const result = await response.json();
		if (result.error) {
			toast.error(result.error);
		} else {
			setFormData({
				username: "",
				password: "",
			});

			setUserData(GetCookieData());
			toast.success("Login Successfully");
			navigator("/");
		}
	} catch (error: any) {
		toast.error(error.message);
	}
};
export const handleLogout = async ({
	setUserData,
	navigate,
}: {
	setUserData: React.Dispatch<any>;
	navigate: NavigateFunction;
}) => {
	const response = await fetch("https://localhost:7012/auth/logout", {
		method: "POST",
		credentials: "include",
	});
	setUserData(null);
	if (response.ok) {
		toast.success("Logout Successfully");
	}
	navigate("/");
};
