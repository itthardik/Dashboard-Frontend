import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { fetchRevenueDataByFilterKey } from "../../api/revenueController";
import RevenueBarChart from "./RevenueBarChart";

const RevenueAndProfit = ({ setError }: { setError: React.Dispatch<any> }) => {
	const [loading, setLoading] = useState(true);
	const [filterKey, setFilterKey] = useState("today");
	const [revenueData, setRevenueData] = useState<any[]>([]);

	useEffect(() => {
		fetchRevenueDataByFilterKey({
			setLoading,
			setError,
			setRevenueData,
			filterKey,
		});
	}, [filterKey]); // eslint-disable-line react-hooks/exhaustive-deps

	if (!loading) {
		return (
			<div className=" mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col justify-center items-center text-center min-h-[550px]">
				<Loading />;
			</div>
		);
	} else
		return (
			<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col min-h-[550px]">
				<div className="flex w-3/5 justify-start items-center gap-10">
					<h1 className="text-2xl font-bold">Total Revenue of Categories</h1>
					<div className="relative inline-block ">
						<select
							id="dateRange"
							className="block appearance-none w-full bg-whit px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:shadow-outline font-medium"
							defaultValue="today"
							onClick={(e) => {
								e.preventDefault();
								setFilterKey(e.currentTarget.value);
							}}
						>
							<option value="today">Today</option>
							<option value="last3days">Last 3 Days</option>
							<option value="lastweek">Last Week</option>
							<option value="lastmonth">Last Month</option>
							<option value="last3months">Last 3 Months</option>
							<option value="last6months">Last 6 Months</option>
							<option value="lastyear">Last Year</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<svg
								className="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
							</svg>
						</div>
					</div>
				</div>
				<div className="flex justify-evenly px-10">
					<RevenueBarChart data={revenueData} />
				</div>
			</div>
		);
};

export default RevenueAndProfit;
