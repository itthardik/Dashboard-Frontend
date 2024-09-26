import React, { useEffect, useState } from "react";
import SalesLineChart from "./SalesLineChart";
import { fetchOverallSalesDataByDate } from "../../api/salesController";
import Loading from "../Loading";

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
	useEffect(() => {
		fetchOverallSalesDataByDate({
			filterDate: filterDate,
			setLoading: setLoading,
			setError: setError,
			setOverallSalesData: setOverallSalesData,
		});
	}, [filterDate]);

	if (!loading) {
		return (
			<div className=" mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col justify-center items-center text-center min-h-[550px]">
				<Loading />
			</div>
		);
	}
	return (
		<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col min-h-[550px]">
			<div className="flex justify-start items-center gap-10 w-full">
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
			<div className="flex justify-evenly px-10 pt-5">
				<SalesLineChart data={overallSalesData} />
			</div>
		</div>
	);
};

export default OverallSalesByDate;
