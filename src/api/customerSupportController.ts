import { toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://localhost:7012";

export const fetchAllTicketsByPagination = async ({
	setLoading,
	setError,
	setTicketsData,
	setIsNextPage,
	isAsc,
	currPage,
	updateFilterKey,
}: {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setTicketsData: React.Dispatch<React.SetStateAction<any[]>>;
	setIsNextPage: React.Dispatch<React.SetStateAction<boolean>>;
	isAsc: boolean;
	currPage: number;
	updateFilterKey: string;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`${BASE_URL}/api/customerSupport/getAllTickets?pageNumber=${currPage}&pageSize=10&orderBy=${updateFilterKey}&orderType=${
				isAsc ? "asc" : "desc"
			}`,
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

		const result = await response.json();
		if (result.error) {
			toast.error(result.error);
		} else {
			setIsNextPage(result.isNextPage);
			setTicketsData(result.data);
		}
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};

export const fetchTicketsBySearchValue = async ({
	query,
	setLoading,
	setError,
	setTicketsData,
	updateFilterKey,
}: {
	query: string;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setTicketsData: React.Dispatch<React.SetStateAction<any[]>>;
	updateFilterKey: string;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`${BASE_URL}/api/customerSupport/getTicketsByQuery?query=${query}&orderBy=${
				updateFilterKey.split(",")[0]
			}&orderType=${updateFilterKey.split(",")[1]}`,
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
			toast.error(JSON.parse(await response.json()).errors[0].message);
			setLoading(true);
			return;
		}

		const result = await response.json();
		if (result.error) {
			toast.error(result.error);
		} else {
			if (result.total === 0) toast.info("No Tickets Found");
			else setTicketsData(result.results);
		}
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};

export const fetchTicketById = async ({
	id,
	setError,
	setLoading,
	setTicketsData,
}: {
	id: number;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setTicketsData: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`${BASE_URL}/api/customerSupport/getTicket?id=${id}`,
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

		const result = await response.json();
		if (result.error) {
			toast.error(result.error);
		} else {
			setTicketsData([result.data]);
		}
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};

export const fetchOverallTicketsData = async ({
	setError,
	setLoading,
	setOverallTicketsData,
}: {
	setError: React.Dispatch<React.SetStateAction<any>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setOverallTicketsData: React.Dispatch<React.SetStateAction<any>>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`${BASE_URL}/api/customerSupport/getOverallStats`,
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

		const result = await response.json();
		if (result.error) {
			toast.error(result.error);
		} else {
			setOverallTicketsData(result);
		}
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};
