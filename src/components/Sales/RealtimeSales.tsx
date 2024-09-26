import React, { useEffect, useState } from "react";
import LiveLineChart from "./LiveLineChart";
import { useConfig } from "../../api/ContextApi";

const RealtimeSales = () => {
	const { mqttOverallSales } = useConfig();
	const [newDataPoint, setNewDataPoint] = useState(0);
	const [newLabel, setNewLabel] = useState(
		new Date().toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		})
	);

	useEffect(() => {
		if (mqttOverallSales === null) return;
		setNewLabel(
			new Date(mqttOverallSales!.CurrentDateTime).toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			})
		);
		setNewDataPoint(mqttOverallSales!.TotalQuantity);
	}, [mqttOverallSales]);

	return (
		<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col min-h-[550px]">
			<div className="flex justify-start items-center gap-10 w-full">
				<h1 className="text-2xl font-bold">Realtime Sales Data</h1>
			</div>
			<div className="flex justify-evenly px-10 pt-5">
				<LiveLineChart newDataPoint={newDataPoint} newLabel={newLabel} />
			</div>
		</div>
	);
};

export default RealtimeSales;
