import { useState } from "react";
import CostAnalysis from "../components/Revenue/CostAnalysis";
import ErrorPage from "./ErrorPage";
import SearchValueRanker from "../components/Revenue/SearchValueRanker";
import RevenueAndProfit from "../components/Revenue/RevenueAndProfit";

const Revenue = () => {
	const [error, setError] = useState<any>();
	if (error) {
		return <ErrorPage error={error} />;
	}
	return (
		<div className="w-full h-full flex flex-col gap-2">
			<div className="my-3 flex justify-center items-center gap-2">
				<img src="./../images/logo.png" alt="Login Gif" className="w-[60px]" />
				<h1 className="text-3xl font-bold">Revenue & Profit Analysis</h1>
			</div>
			<RevenueAndProfit setError={setError} />
			<CostAnalysis setError={setError} />
			<SearchValueRanker setError={setError} />
		</div>
	);
};

export default Revenue;
