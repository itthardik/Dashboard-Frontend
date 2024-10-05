import { useEffect, useState } from "react";
import SalesByCategory from "../components/Sales/SalesByCategory";
import ErrorPage from "./ErrorPage";
import { useConfig } from "../api/ContextApi";
import { subscribeToTopic, unsubscribeToTopic } from "../api/mqttController";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import OverallSalesByDate from "../components/Sales/OverallSalesByDate";
import RealtimeSales from "../components/Sales/RealtimeSales";
import TopProductsBasedOnSales from "../components/Sales/TopProductsBasedOnSales";
import TopCategoryBasedOnSales from "../components/Sales/TopCategoryBasedOnSales";

const Sales = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { mqttClient } = useConfig();

	//setStates
	const [error, setError] = useState<any>();
	const [updateFilterKey, setUpdateFilterKey] = useState<string>(
		searchParams.get("updateFilterKey") ?? "static"
	);

	useEffect(() => {
		if (mqttClient) {
			subscribeToTopic("sales/overallSales", mqttClient);
			if (updateFilterKey === "realtime") {
				subscribeToTopic("sales/salesByCategory", mqttClient);
				toast.success("Updates are Realtime");
			} else unsubscribeToTopic("sales/salesByCategory", mqttClient);
		}
	}, [updateFilterKey, mqttClient]);

	if (error) {
		return <ErrorPage error={error} setError={setError} />;
	}
	return (
		<div className="w-full h-full flex flex-col gap-2">
			<div className="my-3 flex justify-center items-center gap-2">
				<img src="./../images/logo.png" alt="Login Gif" className="w-[60px]" />
				<h1 className="text-3xl font-bold">Sales Performance Monitoring</h1>
			</div>
			<SalesByCategory
				updateFilterKey={updateFilterKey}
				setError={setError}
				setSearchParams={setSearchParams}
				setUpdateFilterKey={setUpdateFilterKey}
			/>
			<OverallSalesByDate setError={setError} />
			<RealtimeSales setError={setError} />
			<TopProductsBasedOnSales setError={setError} />
			<TopCategoryBasedOnSales setError={setError} />
		</div>
	);
};

export default Sales;
