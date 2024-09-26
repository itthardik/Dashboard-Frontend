import { toast } from "react-toastify";

export const fetchSalesDataByCategoryByFilterKey = async ({
	filterKey,
	setLoading,
	setError,
	setSalesDataByCategory,
}: {
	filterKey: string;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setSalesDataByCategory: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`https://localhost:7012/api/sales/salesStatsByCategory?days=
			${filterKey.trim()}`,
			{
				method: "GET",
				credentials: "include",
			}
		);
		if ([401, 403].includes(response.status)) {
			setError(response.status.toString());
			setLoading(true);
			return;
		}

		const result = await response.json();
		if (!response.ok) {
			throw new Error(result);
		}

		setSalesDataByCategory(result.data);
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};

export const fetchOverallSalesDataByDate = async ({
	filterDate,
	setLoading,
	setError,
	setOverallSalesData,
}: {
	filterDate: string;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setOverallSalesData: React.Dispatch<
		React.SetStateAction<
			{
				id: number;
				createdAt: string;
				quantity: number;
			}[]
		>
	>;
}) => {
	try {
		setLoading(false);
		const date = new Date(filterDate).toLocaleDateString().split("/");

		const response = await fetch(
			`https://localhost:7012/api/sales/overallSalesStats?year=${date[2]}&month=${date[0]}&day=${date[1]}`,
			{
				method: "GET",
				credentials: "include",
			}
		);
		if ([401, 403].includes(response.status)) {
			setError(response.status.toString());
			setLoading(true);
			return;
		}

		const result = await response.json();
		if (!response.ok) {
			throw new Error(result);
		}

		setOverallSalesData(result.data);
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};

export const fetchTopProductBySalesByPagination = async ({
	setLoading,
	setError,
	setSalesDataByProduct,
	currPage,
	setMaxPages,
}: {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setSalesDataByProduct: React.Dispatch<React.SetStateAction<any[]>>;
	currPage: number;
	setMaxPages: React.Dispatch<React.SetStateAction<number>>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`https://localhost:7012/api/sales/topProducts?pageNumber=${currPage}&pageSize=10`,
			{
				method: "GET",
				credentials: "include",
			}
		);
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
			setMaxPages(result.maxPages);
			setSalesDataByProduct(result.data);
		}
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};

export const fetchTopCategorieBySalesByPagination = async ({
	setLoading,
	setError,
	setSalesDataByCategories,
	currPage,
	setMaxPages,
}: {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setSalesDataByCategories: React.Dispatch<React.SetStateAction<any[]>>;
	currPage: number;
	setMaxPages: React.Dispatch<React.SetStateAction<number>>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`https://localhost:7012/api/sales/topCategories?pageNumber=${currPage}&pageSize=10`,
			{
				method: "GET",
				credentials: "include",
			}
		);
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
			setMaxPages(result.maxPages);
			setSalesDataByCategories(result.data);
		}
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};
