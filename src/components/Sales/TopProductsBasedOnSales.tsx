import { useEffect, useState } from "react";
import Loading from "../Loading";
import { fetchTopProductBySalesByPagination } from "../../api/salesController";
import RankerForSales from "./RankerForSales";
import { FaChevronUp } from "react-icons/fa";

const TopProductsBasedOnSales = ({
	setError,
}: {
	setError: React.Dispatch<any>;
}) => {
	const [loading, setLoading] = useState(true);
	const [currPage, setCurrPage] = useState(1);
	const [maxPages, setMaxPages] = useState(1);
	const [salesDataByProduct, setSalesDataByProduct] = useState<any[]>([]);

	const [isModelOpen, setIsModelOpen] = useState(() => {
		const savedModelState = localStorage.getItem(
			"isModelOpen_TopProductsBasedOnSales"
		);
		return savedModelState ? JSON.parse(savedModelState) : false;
	});

	useEffect(() => {
		localStorage.setItem(
			"isModelOpen_TopProductsBasedOnSales",
			JSON.stringify(isModelOpen)
		);
	}, [isModelOpen]);

	useEffect(() => {
		fetchTopProductBySalesByPagination({
			setLoading,
			setError,
			setSalesDataByProduct,
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
						Top Ranking Products By Sales
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
						data={salesDataByProduct}
					/>
				</div>
			</div>
		);
};

export default TopProductsBasedOnSales;
