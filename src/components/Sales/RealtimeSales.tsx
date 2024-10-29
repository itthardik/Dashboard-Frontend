import React, { useEffect, useState } from "react";
import LiveLineChart from "./LiveLineChart";
import { useConfig } from "../../api/ContextApi";
import { fetchLast10minSales } from "../../api/salesController";
import Loading from "../Loading";
import { FaChevronUp } from "react-icons/fa";

const RealtimeSales = ({ setError }: { setError: React.Dispatch<any> }) => {
	const { mqttOverallSales } = useConfig();
	const [loading, setLoading] = useState(true);

	const [last10minDataPoint, setLast10minDataPoint] = useState<number[]>([]);
	const [last10minLabel, setLast10minLabel] = useState<string[]>([]);
	const [last10minData, setLast10minData] = useState<any[]>([]);

	const [newDataPoint, setNewDataPoint] = useState<number | null>(null);
	const [newLabel, setNewLabel] = useState<string | null>(null);

	const [isModelOpen, setIsModelOpen] = useState(() => {
		const savedModelState = localStorage.getItem("isModelOpen_RealtimeSales");
		return savedModelState ? JSON.parse(savedModelState) : false;
	});

	useEffect(() => {
		localStorage.setItem(
			"isModelOpen_RealtimeSales",
			JSON.stringify(isModelOpen)
		);
	}, [isModelOpen]);

	useEffect(() => {
		fetchLast10minSales({
			setLoading,
			setError,
			setLast10minData,
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	useEffect(() => {
		setLast10minDataPoint(
			last10minData.map((d) => {
				return d.totalQuantity;
			})
		);
		setLast10minLabel(
			last10minData.map((d) => {
				return new Date(d.currentDateTime).toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				});
			})
		);
	}, [last10minData, setLast10minData]);

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

	if (!loading) {
		return (
			<div className=" mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col justify-center items-center text-center min-h-[550px]">
				<Loading />
			</div>
		);
	}

	return (
		<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col">
			<div className="flex justify-between items-center gap-10 w-full">
				<h1 className="text-2xl font-bold flex justify-center items-center gap-2">
					Live Sales Data
					<div className="text-lg font-normal">(Changes Every Minute)</div>
				</h1>
				<FaChevronUp
					className={`text-2xl select-none cursor-pointer transition-transform duration-300 ${
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
				<LiveLineChart
					newDataPoint={newDataPoint}
					newLabel={newLabel}
					last10minDataPoint={last10minDataPoint}
					last10minLabel={last10minLabel}
				/>
			</div>
		</div>
	);
};

export default RealtimeSales;
