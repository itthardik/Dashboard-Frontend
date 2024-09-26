import { useEffect, useState } from "react";
import Loading from "../Loading";
import { fetchTopProductBySalesByPagination } from "../../api/salesController";
import RankerForSales from "./RankerForSales";

const TopProductsBasedOnSales = ({
	setError,
}: {
	setError: React.Dispatch<any>;
}) => {
	const [loading, setLoading] = useState(true);
	const [currPage, setCurrPage] = useState(1);
	const [maxPages, setMaxPages] = useState(1);
	const [salesDataByProduct, setSalesDataByProduct] = useState<any[]>([]);

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
			<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col min-h-[550px]">
				<h1 className="text-2xl py-2 font-bold text-left">
					Top Ranking Products By Sales
				</h1>
				<RankerForSales
					currPage={currPage}
					setCurrPage={setCurrPage}
					maxPages={maxPages}
					data={salesDataByProduct}
				/>
			</div>
		);
};

export default TopProductsBasedOnSales;
