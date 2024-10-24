import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import SelectOption from "../Revenue/SelectOption";
import { fetchSalesDataByCategoryByFilterKey } from "../../api/salesController";
import SalesByCategoryBarChart from "./SalesByCategoryBarChart";
import { SetURLSearchParams } from "react-router-dom";
import { useConfig } from "../../api/ContextApi";
import { FaChevronUp } from "react-icons/fa";

const SalesByCategory = ({
	updateFilterKey,
	setError,
	setSearchParams,
	setUpdateFilterKey,
}: {
	updateFilterKey: string;
	setError: React.Dispatch<any>;
	setSearchParams: SetURLSearchParams;
	setUpdateFilterKey: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const { mqttSalesByCategory, setMqttSalesByCategory } = useConfig();

	const [loading, setLoading] = useState(true);
	const [filterKey, setFilterKey] = useState("today");
	const [salesDataByCategory, setSalesDataByCategory] = useState<any[]>([]);
	const [isModelOpen, setIsModelOpen] = useState(() => {
		const savedModelState = localStorage.getItem("isModelOpen_SalesByCategory");
		return savedModelState ? JSON.parse(savedModelState) : false;
	});

	useEffect(() => {
		localStorage.setItem(
			"isModelOpen_SalesByCategory",
			JSON.stringify(isModelOpen)
		);
	}, [isModelOpen]);

	useEffect(() => {
		if (salesDataByCategory == null) return;
		if (mqttSalesByCategory == null) return;

		var tempSales: any[] = [];

		salesDataByCategory.forEach((sales) => {
			if (sales.categoryId === mqttSalesByCategory.CategoryId) {
				sales.totalSales += mqttSalesByCategory.Quantity;
			}
			tempSales.push(sales);
		});

		setSalesDataByCategory(tempSales);
	}, [mqttSalesByCategory, setMqttSalesByCategory]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		fetchSalesDataByCategoryByFilterKey({
			setLoading,
			setError,
			setSalesDataByCategory,
			filterKey,
		});
		setSearchParams({
			updateFilterKey,
		});
	}, [filterKey, updateFilterKey]); // eslint-disable-line react-hooks/exhaustive-deps

	if (!loading) {
		return (
			<div className=" mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col justify-center items-center text-center min-h-[550px]">
				<Loading />
			</div>
		);
	} else
		return (
			<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col">
				<div className="flex justify-between items-center w-full">
					<div className="flex items-center gap-10">
						<h1 className="text-2xl font-bold">Sales Data By Category</h1>
						<div className="flex justify-center items-center gap-3">
							<SelectOption
								filterKey={filterKey}
								setFilterKey={setFilterKey}
								optionList={[
									{ key: "Today", value: "today" },
									{ key: "Yesterday", value: "yesterday" },
									{ key: "Last 3 Days", value: "last3days" },
									{ key: "Last Week", value: "lastweek" },
									{ key: "Last Month", value: "lastmonth" },
									{ key: "Last 3 Months", value: "last3months" },
									{ key: "Last 6 Months", value: "last6months" },
									{ key: "Last Year", value: "lastyear" },
								]}
							/>
							<div className="min-w-48">
								<SelectOption
									key="Updates"
									filterKey={updateFilterKey}
									setFilterKey={setUpdateFilterKey}
									optionList={[
										{ key: "Updates: Static", value: "static" },
										{ key: "Updates: Realtime", value: "realtime" },
									]}
								/>
							</div>
						</div>
					</div>
					<FaChevronUp
						className={`select-none text-2xl cursor-pointer transition-transform duration-300 ${
							isModelOpen ? "rotate-180" : ""
						}`}
						onClick={() => {
							setIsModelOpen(!isModelOpen);
						}}
					/>
				</div>
				<div
					className={`transition-all duration-500 ease-in-out ${
						isModelOpen ? "max-h-0 overflow-hidden" : "max-h-[200vh]"
					}`}
				>
					<SalesByCategoryBarChart data={salesDataByCategory} />
				</div>
			</div>
		);
};

export default SalesByCategory;
