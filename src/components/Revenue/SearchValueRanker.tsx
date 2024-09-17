import { useEffect, useState } from "react";
import Loading from "../Loading";
import RankingTable from "./RankingTable";
import { fetchSearchValuesByPagination } from "../../api/revenueController";

const SearchValueRanker = ({ setError }: { setError: React.Dispatch<any> }) => {
	const [loading, setLoading] = useState(true);
	const [currPage, setCurrPage] = useState(1);
	const [maxPages, setMaxPages] = useState(10);
	const [searchValueData, setSearchValueData] = useState<any[]>([]);

	useEffect(() => {
		fetchSearchValuesByPagination({
			setLoading,
			setError,
			setSearchValueData,
			currPage,
			setMaxPages,
		});
	}, [currPage]); // eslint-disable-line react-hooks/exhaustive-deps

	if (!loading) {
		return (
			<div className=" mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col justify-center items-center text-center min-h-[550px]">
				<Loading />;
			</div>
		);
	} else
		return (
			<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col min-h-[550px]">
				<h1 className="text-2xl py-2 font-bold text-left">
					Top Ranking Search Value
				</h1>
				<RankingTable
					currPage={currPage}
					setCurrPage={setCurrPage}
					maxPages={maxPages}
					data={searchValueData}
				/>
			</div>
		);
};

export default SearchValueRanker;
