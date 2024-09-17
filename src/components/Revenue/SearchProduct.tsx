import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSearch } from "react-icons/go";
import { FaFilter } from "react-icons/fa";
import { handelProductSearch } from "../../api/revenueController";
import { ProductData } from "../../model/ProductType";

const SearchProduct = ({
	searchParams,
	searchValue,
	setSearchParams,
	setSearchValue,
	setProductData,
	setLoading,
	setError,
}: {
	searchParams: { id: boolean; name: boolean };
	searchValue: string;
	setSearchParams: React.Dispatch<
		React.SetStateAction<{ id: boolean; name: boolean }>
	>;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	setProductData: React.Dispatch<React.SetStateAction<ProductData>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<any>;
}) => {
	const [hideParams, setHideParams] = useState(true);

	return (
		<div className="mb-3 flex flex-col items-center w-2/3 relative">
			{/* Search Form */}
			<div className="w-[85%] p-3 flex justify-evenly items-center bg-white rounded-2xl shadow-md">
				<GiHamburgerMenu
					className="text-xl cursor-pointer"
					onClick={() => {
						setHideParams(!hideParams);
					}}
				/>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handelProductSearch({
							searchParams,
							searchValue,
							setSearchParams,
							setSearchValue,
							setProductData,
							setLoading,
							setError,
						});
					}}
					className="w-[80%]"
				>
					<input
						type="text"
						placeholder="Search here"
						className=" text-md ps-2 w-full outline-none bg-white"
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
						value={searchValue}
						required
					/>
				</form>
				<GoSearch
					className="text-xl cursor-pointer"
					onClick={() => {
						handelProductSearch({
							searchParams,
							searchValue,
							setSearchParams,
							setSearchValue,
							setProductData,
							setLoading,
							setError,
						});
					}}
				/>
			</div>
			{/* Search Params */}
			<div
				className={`p-3 absolute flex flex-wrap gap-2 justify-evenly items-center
				 ${hideParams ? "-z-10 opacity-0 top-[0px]" : "z-10 opacity-100 top-[50px]"}`}
				style={{ transition: "ease", transitionDuration: "300ms" }}
			>
				<div className="flex gap-1 justify-center items-center font-bold">
					<FaFilter /> Filters:
				</div>
				<div
					className={`border-2 shadow-md py-[2px] px-2 relative z-0 rounded-lg cursor-pointer ${
						searchParams.id ? "border-ternary" : "border-white"
					} ${searchParams.id ? "bg-ternary" : "bg-white"} ${
						searchParams.id ? "text-white" : "text-black"
					}`}
					onClick={() => {
						searchParams.id
							? setSearchParams({ id: false, name: true })
							: setSearchParams({ id: true, name: false });
					}}
				>
					Id
				</div>
				{/* hover:bg-ternary hover:text-white hover:border-ternary  */}
				<div
					className={`border-2 shadow-md py-[2px] px-2 relative z-0 rounded-lg cursor-pointer ${
						searchParams.name ? "border-ternary" : "border-white"
					} ${searchParams.name ? "bg-ternary" : "bg-white"} ${
						searchParams.name ? "text-white" : "text-black"
					}`}
					onClick={() => {
						searchParams.name
							? setSearchParams({ id: true, name: false })
							: setSearchParams({ id: false, name: true });
					}}
				>
					Name
				</div>
			</div>
		</div>
	);
};

export default SearchProduct;
