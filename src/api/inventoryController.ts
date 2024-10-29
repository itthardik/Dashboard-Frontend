import { toast } from "react-toastify";
import { ProductData } from "../model/ProductType";
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://localhost:7012";

export const fetchInventoryData = async ({
	sortFilterKey,
	pageSize,
	currPage,
	setLoading,
	setError,
	setMaxPages,
	setInventoryData,
}: {
	currPage: number;
	sortFilterKey: string;
	pageSize: number;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setMaxPages: React.Dispatch<React.SetStateAction<number>>;
	setInventoryData: React.Dispatch<React.SetStateAction<ProductData[] | null>>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`${BASE_URL}/api/inventory/getInventory?pageNumber=${currPage}&pageSize=${pageSize}&filterKey=${sortFilterKey}`,
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
			setInventoryData(result.data);
		}
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};

export const addInventory = async ({
	productId,
	stockRequire,
	inventoryData,
	setProductId,
	setRequiredStock,
	setLoading,
	setError,
	setInventoryData,
	setAddInventoryModel,
}: {
	productId: number;
	stockRequire: number;
	inventoryData: ProductData[];
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setProductId: React.Dispatch<React.SetStateAction<number>>;
	setRequiredStock: React.Dispatch<React.SetStateAction<number>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setAddInventoryModel: React.Dispatch<React.SetStateAction<boolean>>;
	setInventoryData: React.Dispatch<React.SetStateAction<ProductData[] | null>>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`${BASE_URL}/api/inventory/addInventory?productId=${productId}&stockRequire=${stockRequire}`,
			{
				method: "PATCH",
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
			toast.error(result);
			setLoading(true);
			return;
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
		if (!response.ok) {
			throw new Error(result);
		} else {
			var temp: any[] = [];
			inventoryData.forEach((i) => {
				if (i.id === result.data.Id) i.currentStock = result.data.CurrentStock;
				temp.push(i);
			});
			setInventoryData(temp);
			setAddInventoryModel(false);
			setProductId(0);
			setRequiredStock(0);
			toast.success("Notification Send & Invetory Updated");
		}
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};

export const fetchInventoryNotificationData = async ({
	currPage,
	setLoading,
	setError,
	setMaxPages,
	setInventoryNotifications,
}: {
	currPage: number;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setMaxPages: React.Dispatch<React.SetStateAction<number>>;
	setInventoryNotifications: React.Dispatch<React.SetStateAction<any[] | null>>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`${BASE_URL}/api/alert/getAlerts?pageNumber=${currPage}&pageSize=5`,
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
			setInventoryNotifications([]);
			setLoading(true);
			return;
		}
		const result = await response.json();
		if (!response.ok) {
			throw new Error(result);
		}
		setMaxPages(result.MaxPages);
		setInventoryNotifications(result.Data);
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};
