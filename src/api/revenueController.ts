import { toast } from "react-toastify";
import { ProductData } from "../model/ProductType";
import React from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://localhost:7012";

export const handelProductSearch = async ({
	searchParams,
	searchValue,
	setSearchValue,
	setProductData,
	setLoading,
	setError,
}: {
	searchParams: {
		id: boolean;
		name: boolean;
	};
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	setProductData: React.Dispatch<React.SetStateAction<ProductData[] | null>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`${BASE_URL}/api/revenue/productCost?${
				searchParams.id ? "id=" : "name="
			}${searchValue.trim()}`,
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
			toast.error(await response.json());
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
		if (response.status === 401)
			if (!response.ok) {
				throw new Error((await response.json()).title);
			}
		const result = await response.json();
		if (result.error) {
			toast.error(result.error);
		} else {
			// setSearchValue("");
			setProductData(result.data);
		}
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};

export const fetchSearchValuesByPagination = async ({
	setLoading,
	setError,
	setSearchValueData,
	currPage,
	setMaxPages,
}: {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setSearchValueData: React.Dispatch<React.SetStateAction<any[]>>;
	currPage: number;
	setMaxPages: React.Dispatch<React.SetStateAction<number>>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`${BASE_URL}/api/revenue/searchValues?pageNumber=${currPage}&pageSize=10`,
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
			setSearchValueData(result.data);
		}
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};

export const fetchRevenueDataByFilterKey = async ({
	filterKey,
	setLoading,
	setError,
	setRevenueData,
}: {
	filterKey: string;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<any>>;
	setRevenueData: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
	try {
		setLoading(false);
		const response = await fetch(
			`${BASE_URL}/api/revenue/revenueStats?days=${filterKey.trim()}`,
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
			setRevenueData(result.data);
		}
		setLoading(true);
	} catch (error: any) {
		setError(error.message);
		setLoading(true);
	}
};
