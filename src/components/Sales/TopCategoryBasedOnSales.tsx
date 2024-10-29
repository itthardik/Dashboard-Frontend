import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import RankerForSales from "./RankerForSales";
import { fetchTopCategorieBySalesByPagination } from "../../api/salesController";
import { FaChevronUp } from "react-icons/fa";

const TopCategoryBasedOnSales = ({
	setError,
}: {
	setError: React.Dispatch<any>;
}) => {
	const [loading, setLoading] = useState(true);
	const [currPage, setCurrPage] = useState(1);
	const [maxPages, setMaxPages] = useState(1);
	const [salesDataByCategories, setSalesDataByCategories] = useState<any[]>([]);

	const [isModelOpen, setIsModelOpen] = useState(() => {
		const savedModelState = localStorage.getItem(
			"isModelOpen_TopCategoryBasedOnSales"
		);
		return savedModelState ? JSON.parse(savedModelState) : false;
	});

	useEffect(() => {
		localStorage.setItem(
			"isModelOpen_TopCategoryBasedOnSales",
			JSON.stringify(isModelOpen)
		);
	}, [isModelOpen]);

	useEffect(() => {
		fetchTopCategorieBySalesByPagination({
			setLoading,
			setError,
			setSalesDataByCategories,
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
						Top Ranking Categories By Sales
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
					className={`w-full transition-all duration-500 ease-in-out ${
						isModelOpen ? "max-h-0 overflow-hidden" : "max-h-[200vh]"
					}`}
				>
					<RankerForSales
						currPage={currPage}
						setCurrPage={setCurrPage}
						maxPages={maxPages}
						data={salesDataByCategories}
					/>
				</div>
			</div>
		);
};

export default TopCategoryBasedOnSales;
