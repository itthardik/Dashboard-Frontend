import { useEffect, useState } from "react";
import CostPieChart from "./CostPieChart";
import SearchProduct from "./SearchProduct";
import { ProductData } from "../../model/ProductType";
import { handelProductSearch } from "../../api/revenueController";
import Loading from "../Loading";

const CostAnalysis = ({ setError }: { setError: React.Dispatch<any> }) => {
	const [productData, setProductData] = useState<ProductData>({
		id: 1,
		name: "Basic T-Shirt",
		costPrice: 500,
		sellingPrice: 1500,
		shippingCost: 200,
		discount: 100,
		netProfit: 700,
		thresholdValue: 10,
		categoryId: 1,
		currentStock: 100,
		supplierId: 1,
		createdAt: "2024-09-11T16:59:24.893",
		updatedAt: null,
		category: null,
		orderItems: [],
		supplier: null,
	});

	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [searchParams, setSearchParams] = useState({
		id: true,
		name: false,
	});
	useEffect(() => {
		handelProductSearch({
			searchParams,
			searchValue: "1",
			setSearchValue,
			setSearchParams,
			setProductData,
			setLoading,
			setError,
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (!loading) {
		return (
			<div className=" mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col justify-center items-center text-center min-h-[550px]">
				<Loading />;
			</div>
		);
	} else
		return (
			<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col min-h-[550px]">
				<div className="flex w-3/5 justify-between items-center">
					<h1 className="text-2xl font-bold">Cost Analysis</h1>
					<SearchProduct
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						searchParams={searchParams}
						setSearchParams={setSearchParams}
						setProductData={setProductData}
						setLoading={setLoading}
						setError={setError}
					/>
				</div>
				<div className="flex justify-evenly px-10">
					<div className=" w-[45%] px-4 flex flex-col justify-center items-center">
						<CostPieChart data={productData} />
						<div className="font-semibold text-xl">Cost Breakdown Chart</div>
					</div>
					<div className="w-[55%] px-10 mt-10">
						<div>
							<div className="flex justify-between text-xl">
								<p>
									<strong>Product ID:</strong> {productData?.id}
								</p>
								<h2>{productData?.name}</h2>
							</div>
							<div className="mt-6">
								<table className="min-w-full bg-white border border-gray-200">
									<thead className="bg-ternary text-white border-b border-gray-200 ">
										<tr>
											<th className="text-center py-2 px-4">Item</th>
											<th className="text-center py-2 px-4">Amount</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-b border-gray-200">
											<td className="py-2 px-4">Cost Price</td>
											<td className="py-2 px-4">₹{productData?.costPrice}</td>
										</tr>
										<tr className="border-b border-gray-200">
											<td className="py-2 px-4">Selling Price</td>
											<td className="py-2 px-4">
												₹{productData?.sellingPrice}
											</td>
										</tr>
										<tr className="border-b border-gray-200">
											<td className="py-2 px-4">Shipping Cost</td>
											<td className="py-2 px-4">
												₹{productData?.shippingCost}
											</td>
										</tr>
										<tr className="border-b border-gray-200">
											<td className="py-2 px-4">Discount</td>
											<td className="py-2 px-4">₹{productData?.discount}</td>
										</tr>
										<tr className="border-b border-gray-200">
											<td className="py-2 px-4">Net Profit</td>
											<td className="py-2 px-4">₹{productData?.netProfit}</td>
										</tr>
										<tr className="border-b border-gray-200">
											<td className="py-2 px-4">Current Stock</td>
											<td className="py-2 px-4">{productData?.currentStock}</td>
										</tr>
										<tr className="border-b border-gray-200">
											<td className="py-2 px-4">Threshold Value</td>
											<td className="py-2 px-4">
												{productData?.thresholdValue}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
};

export default CostAnalysis;
