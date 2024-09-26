import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import SelectOption from "../Revenue/SelectOption";
import { fetchSalesDataByCategoryByFilterKey } from "../../api/salesController";
import SalesByCategoryBarChart from "./SalesByCategoryBarChart";
import { SetURLSearchParams } from "react-router-dom";
import { useConfig } from "../../api/ContextApi";

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

	useEffect(() => {
		if (salesDataByCategory == null) return;
		if (mqttSalesByCategory == null) return;

		var tempSales: any[] = [];

		salesDataByCategory.map((sales) => {
			if (sales.categoryId === mqttSalesByCategory.CategoryId) {
				sales.totalSales += mqttSalesByCategory.Quantity;
			}
			tempSales.push(sales);
		});

		setSalesDataByCategory(tempSales);
	}, [mqttSalesByCategory, setMqttSalesByCategory]);

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
			<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col min-h-[550px]">
				<div className="flex justify-start items-center gap-10 w-full">
					<h1 className="text-2xl font-bold">Sales Data By Category</h1>
					<div className="flex justify-center items-center gap-3 w-1/3">
						<SelectOption
							filterKey={filterKey}
							setFilterKey={setFilterKey}
							optionList={[
								{ key: "Today", value: "today" },
								{ key: "Last 3 Days", value: "last3days" },
								{ key: "Last Week", value: "lastweek" },
								{ key: "Last Month", value: "lastmonth" },
								{ key: "Last 3 Months", value: "last3months" },
								{ key: "Last 6 Months", value: "last6months" },
								{ key: "Last Year", value: "lastyear" },
							]}
						/>
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
				<div className="flex justify-evenly px-10 pt-5">
					<SalesByCategoryBarChart data={salesDataByCategory} />
				</div>
			</div>
		);
};

export default SalesByCategory;
