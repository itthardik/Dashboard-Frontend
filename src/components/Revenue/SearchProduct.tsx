import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSearch } from "react-icons/go";
import { FaFilter } from "react-icons/fa";
import { handelProductSearch } from "../../api/revenueController";
import { ProductData } from "../../model/ProductType";
import { MdOutlineCancel } from "react-icons/md";

const SearchProduct = ({
	bgColor,
	searchParams,
	searchValue,
	clearSearch,
	setSearchParams,
	setSearchValue,
	setProductData,
	setLoading,
	setError,
	setClearSearch,
}: {
	bgColor?: string;
	searchParams: { id: boolean; name: boolean };
	searchValue: string;
	clearSearch?: boolean;
	setSearchParams: React.Dispatch<
		React.SetStateAction<{ id: boolean; name: boolean }>
	>;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	setProductData: React.Dispatch<React.SetStateAction<ProductData[] | null>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<any>;
	setClearSearch: React.Dispatch<React.SetStateAction<boolean>> | null;
}) => {
	const [hideParams, setHideParams] = useState(true);

	return (
		<div className="flex flex-col items-center relative">
			{/* Search Form */}
			<div
				className={
					"w-full p-3 flex justify-evenly items-center rounded-2xl shadow-md " +
					bgColor
				}
			>
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
							setSearchValue,
							setProductData,
							setLoading,
							setError,
						});
					}}
					className="w-[80%] flex items-center"
				>
					<input
						type="text"
						placeholder="Search here"
						className={"text-md ps-2 w-full outline-none " + bgColor}
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
						value={searchValue}
						required
					/>
					{searchValue && (
						<MdOutlineCancel
							className="text-2xl cursor-pointer"
							onClick={() => {
								setSearchValue("");
								setClearSearch!(!clearSearch!);
							}}
						/>
					)}
				</form>
				<GoSearch
					className="text-xl cursor-pointer"
					onClick={() => {
						handelProductSearch({
							searchParams,
							searchValue,
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
