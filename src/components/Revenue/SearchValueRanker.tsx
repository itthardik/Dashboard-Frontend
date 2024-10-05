import { useEffect, useState } from "react";
import Loading from "../Loading";
import RankingTable from "./RankingTable";
import { fetchSearchValuesByPagination } from "../../api/revenueController";
import { FaChevronUp } from "react-icons/fa";

const SearchValueRanker = ({ setError }: { setError: React.Dispatch<any> }) => {
	const [loading, setLoading] = useState(true);
	const [currPage, setCurrPage] = useState(1);
	const [maxPages, setMaxPages] = useState(10);
	const [searchValueData, setSearchValueData] = useState<any[]>([]);
	const [isModelOpen, setIsModelOpen] = useState(() => {
		const savedModelState = localStorage.getItem(
			"isModelOpen_SearchValueRanker"
		);
		return savedModelState ? JSON.parse(savedModelState) : false;
	});

	useEffect(() => {
		localStorage.setItem(
			"isModelOpen_SearchValueRanker",
			JSON.stringify(isModelOpen)
		);
	}, [isModelOpen]);

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
			<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl py-2 font-bold text-left">
						Top Ranking Search Value
					</h1>
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
					className={`w-full transition-all duration-500 ease-in-out ${
						isModelOpen ? "max-h-0 overflow-hidden" : "max-h-[200vh]"
					}`}
				>
					<RankingTable
						currPage={currPage}
						setCurrPage={setCurrPage}
						maxPages={maxPages}
						data={searchValueData}
					/>
				</div>
			</div>
		);
};

export default SearchValueRanker;
