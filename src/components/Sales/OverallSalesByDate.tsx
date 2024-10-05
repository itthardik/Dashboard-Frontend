import React, { useEffect, useState } from "react";
import SalesLineChart from "./SalesLineChart";
import { fetchOverallSalesDataByDate } from "../../api/salesController";
import Loading from "../Loading";
import { FaChevronUp } from "react-icons/fa";

const OverallSalesByDate = ({
	setError,
}: {
	setError: React.Dispatch<React.SetStateAction<any>>;
}) => {
	const [loading, setLoading] = useState(true);
	const [filterDate, setFilterDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [overallSalesData, setOverallSalesData] = useState(
		[] as {
			id: number;
			createdAt: string;
			quantity: number;
		}[]
	);
	const [isModelOpen, setIsModelOpen] = useState(() => {
		const savedModelState = localStorage.getItem(
			"isModelOpen_OverallSalesByDate"
		);
		return savedModelState ? JSON.parse(savedModelState) : false;
	});

	useEffect(() => {
		localStorage.setItem(
			"isModelOpen_OverallSalesByDate",
			JSON.stringify(isModelOpen)
		);
	}, [isModelOpen]);

	useEffect(() => {
		fetchOverallSalesDataByDate({
			filterDate: filterDate,
			setLoading: setLoading,
			setError: setError,
			setOverallSalesData: setOverallSalesData,
		});
	}, [filterDate]); // eslint-disable-line react-hooks/exhaustive-deps

	if (!loading) {
		return (
			<div className=" mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col justify-center items-center text-center min-h-[550px]">
				<Loading />
			</div>
		);
	}
	return (
		<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col">
			<div className="flex justify-between items-center w-full">
				<div className="flex justify-between items-center gap-10">
					<h1 className="text-2xl font-bold">Sales Data by Date</h1>
					<div className="flex justify-center items-center gap-2">
						<label htmlFor="date-picker" className="text-lg">
							Select a date:
						</label>
						<input
							type="date"
							id="date-picker"
							className="p-1 cursor-pointer rounded-lg"
							value={filterDate}
							onChange={(e) => {
								setFilterDate(e.target.value);
							}}
						/>
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
				<SalesLineChart data={overallSalesData} />
			</div>
		</div>
	);
};

export default OverallSalesByDate;
