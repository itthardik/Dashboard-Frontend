import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { fetchRevenueDataByFilterKey } from "../../api/revenueController";
import RevenueBarChart from "./RevenueBarChart";
import SelectOption from "./SelectOption";

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
				<Loading />
			</div>
		);
	} else
		return (
			<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col min-h-[550px]">
				<div className="flex w-3/5 justify-start items-center gap-10">
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
				<div className="flex justify-evenly px-10 pt-5">
					<RevenueBarChart data={revenueData} />
				</div>
			</div>
		);
};

export default RevenueAndProfit;
