import Loading from "../Loading";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import SearchProduct from "../Revenue/SearchProduct";
import { useEffect, useState } from "react";
import { ProductData } from "../../model/ProductType";
import { fetchInventoryData } from "../../api/inventoryController";
import { SetURLSearchParams } from "react-router-dom";
import SelectOption from "../Revenue/SelectOption";
import { FcHighPriority, FcLowPriority } from "react-icons/fc";

const InventoryGrid = ({
	currPage,
	sortFilterKey,
	updateFilterKey,
	setSortFilterKey,
	setUpdateFilterKey,
	inventoryData,
	setInventoryData,
	setCurrPage,
	setError,
	setSearchParams,
}: {
	currPage: number;
	sortFilterKey: string;
	updateFilterKey: string;
	setSortFilterKey: React.Dispatch<React.SetStateAction<string>>;
	setUpdateFilterKey: React.Dispatch<React.SetStateAction<string>>;
	inventoryData: ProductData[] | null;
	setInventoryData: React.Dispatch<React.SetStateAction<ProductData[] | null>>;
	setCurrPage: React.Dispatch<number>;
	setError: React.Dispatch<any>;
	setSearchParams: SetURLSearchParams;
}) => {
	const [searchValue, setSearchValue] = useState("");
	const [searchKeys, setSearchKeys] = useState({
		id: true,
		name: false,
	});
	const [loading, setLoading] = useState(true);
	const [maxPages, setMaxPages] = useState(10);
	const [dateNow, setDateNow] = useState(0);
	const [clearSearch, setClearSearch] = useState(false);

	useEffect(() => {
		if (updateFilterKey === "realtime") {
			const intervalId = setInterval(
				() => setDateNow(new Date().getTime()),
				1 * 1000
			);

			return () => clearInterval(intervalId);
		}
	}, [updateFilterKey]);

	useEffect(() => {
		fetchInventoryData({
			sortFilterKey:
				updateFilterKey === "realtime" ? "productId" : sortFilterKey,
			pageSize: updateFilterKey === "realtime" ? 99999 : 12,
			currPage: updateFilterKey === "realtime" ? 1 : currPage,
			setLoading,
			setError,
			setInventoryData,
			setMaxPages,
		});
		setSearchParams({
			page: updateFilterKey === "realtime" ? "1" : currPage.toString(),
			sortFilterKey:
				updateFilterKey === "realtime" ? "productId" : sortFilterKey,
			updateFilterKey,
		});
	}, [currPage, sortFilterKey, updateFilterKey, clearSearch]); // eslint-disable-line react-hooks/exhaustive-deps

	if (!loading) {
		return (
			<div className=" mx-5 my-2 p-5 flex flex-col justify-center items-center text-center min-h-[550px]">
				<Loading />;
			</div>
		);
	} else
		return (
			<div className="mx-5 mt-2 my-10 px-2 flex flex-col min-h-[550px]">
				<div className="flex justify-start items-center w-full pb-10 gap-5">
					<h1 className="text-2xl py-2 font-medium text-left select-none">
						Monitor Stock Levels
					</h1>
					<div className="flex justify-start items-center gap-5 w-3/4">
						<div className="w-2/5">
							<SearchProduct
								bgColor="bg-secondary"
								searchParams={searchKeys}
								searchValue={searchValue}
								setError={setError}
								setProductData={setInventoryData}
								setSearchValue={setSearchValue}
								setSearchParams={setSearchKeys}
								setLoading={setLoading}
								clearSearch={clearSearch}
								setClearSearch={setClearSearch}
							/>
						</div>
						<div className="min-w-64">
							<SelectOption
								key="Sort by"
								bgColor="bg-secondary"
								filterKey={
									updateFilterKey === "realtime" ? "productId" : sortFilterKey
								}
								setFilterKey={setSortFilterKey}
								optionList={
									updateFilterKey === "realtime"
										? [
												{
													key: "Sort By: Product ID",
													value: "productId",
												},
										  ]
										: [
												{
													key: "Sort By: Low To High Stock",
													value: "lowToHighStock",
												},
												{
													key: "Sort By: High To Low Stock",
													value: "highToLowStock",
												},
												{
													key: "Sort By: Product ID",
													value: "productId",
												},
										  ]
								}
							/>
						</div>
						<div className="min-w-48">
							<SelectOption
								key="Updates"
								bgColor="bg-secondary"
								filterKey={updateFilterKey}
								setFilterKey={setUpdateFilterKey}
								optionList={[
									{ key: "Updates: Static", value: "static" },
									{ key: "Updates: Realtime", value: "realtime" },
								]}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center mt-3">
					<div className="grid grid-cols-3 w-full">
						{inventoryData?.map((i, index: number) => {
							return (
								<div
									className="flex flex-col mx-5 my-3 p-5 bg-secondary rounded-md shadow-md hover:scale-105 transition-all relative"
									key={index}
								>
									<div className="absolute -right-2 -top-2 flex gap-1">
										{i.updatedAt != null &&
											dateNow !== 0 &&
											dateNow - new Date(i.updatedAt).getTime() < 60000 && (
												<FcLowPriority className="text-2xl" />
											)}
										{i.currentStock <= i.reorderPoint && (
											<FcHighPriority className="text-2xl" />
										)}
									</div>
									<div className="flex justify-between items-center mb-3">
										<h1 className="font-semibold text-xl">{i.id}</h1>
										<h1 className="font-semibold text-xl">{i.name}</h1>
									</div>
									<div className="flex flex-col justify-center items-center">
										<div
											className={`flex justify-between items-center w-full ${
												i.currentStock > i.reorderPoint
													? "font-normal text-black"
													: "font-medium text-primary"
											}`}
										>
											<h1>Current Stock:</h1>
											<h1>{i.currentStock}</h1>
										</div>
										<div className="flex justify-between items-center w-full">
											<h1>Reorder Point:</h1>
											<h1>{i.reorderPoint}</h1>
										</div>
										<div className="flex justify-between items-center w-full">
											<h1 title="Average Daily Usage (90 Days)">
												Average Daily Usage:
											</h1>
											<h1>
												<code>~{i.averageDailyUsage.toPrecision(1)} </code>per
												day
											</h1>
										</div>
										<div className="flex justify-between items-center w-full">
											<h1>&nbsp;</h1>
											<h1>
												({Math.floor(i.averageDailyUsage! * 7)}-
												{Math.ceil(i.averageDailyUsage! * 7)} orders per week)
											</h1>
										</div>
										<div className="flex justify-between items-center w-full">
											<h1>Total Value of stock:</h1>
											<h1>₹{i.currentStock * i.costPrice}</h1>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					{updateFilterKey !== "realtime" && searchValue === "" && (
						<div className="flex justify-between items-center px-5 pt-4 text-md w-full">
							<div
								className={
									"flex select-none items-center gap-2 border-2 rounded-full py-2 px-4 cursor-pointer font-bold" +
									(currPage <= 1
										? " border-ternary text-ternary"
										: " border-primary text-primary hover:bg-primary hover:text-white")
								}
								onClick={() => {
									if (currPage > 1) setCurrPage(currPage - 1);
								}}
							>
								<GrLinkPrevious />
								Previous
							</div>

							<div>
								{currPage} / {maxPages}
							</div>

							<div
								className={
									"flex select-none items-center gap-2 border-2 rounded-full py-2 px-4 cursor-pointer font-bold" +
									(currPage >= maxPages
										? " border-ternary text-ternary"
										: " border-primary text-primary hover:bg-primary hover:text-white")
								}
								onClick={() => {
									if (currPage < maxPages) setCurrPage(currPage + 1);
								}}
							>
								Next
								<GrLinkNext />
							</div>
						</div>
					)}
				</div>
			</div>
		);
};

export default InventoryGrid;
