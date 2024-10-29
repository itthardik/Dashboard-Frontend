const BASE_URL = process.env.REACT_APP_BASE_URL || "https://localhost:7012";

async function genericFetch<T>(
	endpoint: string,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setError: React.Dispatch<React.SetStateAction<any>>,
	handleData: (result: T) => void,
	options: RequestInit = { method: "GET", credentials: "include" }
): Promise<void> {
	try {
		setLoading(false);
		const response = await fetch(`${BASE_URL}${endpoint}`, options);

		if ([401, 403].includes(response.status)) {
			document.cookie = `sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
			setError(response.status.toString());
			return;
		}

		const result: T = await response.json();

		if (!response.ok) {
			throw new Error(result as unknown as string);
		}

		handleData(result);
	} catch (error: any) {
		setError(error.message);
	} finally {
		setLoading(true);
	}
}

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
	const endpoint = `/api/sales/salesStatsByCategory?days=${filterKey.trim()}`;
	await genericFetch(endpoint, setLoading, setError, (res: any) =>
		setSalesDataByCategory(res.data)
	);
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
	setOverallSalesData: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
	const date = new Date(filterDate).toLocaleDateString().split("/");
	const endpoint = `/api/sales/overallSalesStats?year=${date[2]}&month=${date[0]}&day=${date[1]}`;
	await genericFetch(endpoint, setLoading, setError, (res: any) =>
		setOverallSalesData(res.data)
	);
};

export const fetchLast10minSales = async ({
	setLoading,
	setError,
	setLast10minData,
}: {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setLast10minData: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
	const endpoint = `/api/sales/getLast10minSales`;

	await genericFetch<{ data: any[] }>(
		endpoint,
		setLoading,
		setError,
		(result) => {
			setLast10minData(result.data);
		}
	);
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
	const endpoint = `/api/sales/topProducts?pageNumber=${currPage}&pageSize=10`;

	await genericFetch<{ data: any[]; maxPages: number }>(
		endpoint,
		setLoading,
		setError,
		(result) => {
			setMaxPages(result.maxPages);
			setSalesDataByProduct(result.data);
		}
	);
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
	const endpoint = `/api/sales/topCategories?pageNumber=${currPage}&pageSize=10`;

	await genericFetch<{ data: any[]; maxPages: number }>(
		endpoint,
		setLoading,
		setError,
		(result) => {
			setMaxPages(result.maxPages);
			setSalesDataByCategories(result.data);
		}
	);
};
