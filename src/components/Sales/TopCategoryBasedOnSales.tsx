import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import RankerForSales from "./RankerForSales";
import { fetchTopCategorieBySalesByPagination } from "../../api/salesController";

const TopCategoryBasedOnSales = ({
	setError,
}: {
	setError: React.Dispatch<any>;
}) => {
	const [loading, setLoading] = useState(true);
	const [currPage, setCurrPage] = useState(1);
	const [maxPages, setMaxPages] = useState(1);
	const [salesDataByCategories, setSalesDataByCategories] = useState<any[]>([]);

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
			<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col min-h-[550px]">
				<h1 className="text-2xl py-2 font-bold text-left">
					Top Ranking Categories By Sales
				</h1>
				<RankerForSales
					currPage={currPage}
					setCurrPage={setCurrPage}
					maxPages={maxPages}
					data={salesDataByCategories}
				/>
			</div>
		);
};

export default TopCategoryBasedOnSales;
