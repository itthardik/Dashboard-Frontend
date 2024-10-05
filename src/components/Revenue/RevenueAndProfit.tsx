import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { fetchRevenueDataByFilterKey } from "../../api/revenueController";
import RevenueBarChart from "./RevenueBarChart";
import SelectOption from "./SelectOption";
import { FaChevronUp } from "react-icons/fa";

const RevenueAndProfit = ({ setError }: { setError: React.Dispatch<any> }) => {
	const [loading, setLoading] = useState(true);
	const [filterKey, setFilterKey] = useState("today");
	const [revenueData, setRevenueData] = useState<any[]>([]);
	const [isModelOpen, setIsModelOpen] = useState(() => {
		const savedModelState = localStorage.getItem(
			"isModelOpen_RevenueAndProfit"
		);
		return savedModelState ? JSON.parse(savedModelState) : false;
	});

	useEffect(() => {
		localStorage.setItem(
			"isModelOpen_RevenueAndProfit",
			JSON.stringify(isModelOpen)
		);
	}, [isModelOpen]);

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
				<Loading />
			</div>
		);
	} else
		return (
			<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col">
				<div className="flex justify-between items-center">
					<div className="flex gap-10 justify-center items-center">
						<h1 className="text-2xl font-bold">Total Revenue of Categories</h1>
						<div className="">
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
						</div>
					</div>
					<FaChevronUp
						className={`select-none cursor-pointer transition-transform duration-300 text-2xl ${
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
					<RevenueBarChart data={revenueData} />
				</div>
			</div>
		);
};

export default RevenueAndProfit;
