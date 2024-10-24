import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSearch } from "react-icons/go";
import {
	fetchTicketById,
	fetchTicketsBySearchValue,
} from "../../api/customerSupportController";

const SearchTickets = ({
	updateFilterKey,
	setError,
	setLoading,
	setTicketsData,
}: {
	updateFilterKey: string;
	setError: React.Dispatch<any>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setTicketsData: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
	const [hideParams, setHideParams] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [searchParams, setSearchParams] = useState({
		id: true,
		tag: false,
		type: false,
		status: false,
		priority: false,
	});
	const toggleParam = (key: keyof typeof searchParams) => {
		setSearchParams((prevParams) => {
			const updatedParams = {
				id: false,
				tag: false,
				type: false,
				status: false,
				priority: false,
			};
			updatedParams[key] = !prevParams[key];
			return updatedParams;
		});
	};
	const handleSearchSubmit = () => {
		if (searchParams.id) {
			fetchTicketById({
				id: +searchValue,
				setError,
				setLoading,
				setTicketsData,
			});
		} else {
			const selectedParam = Object.keys(searchParams).find(
				(key) => searchParams[key as keyof typeof searchParams]
			);
			var result = "";
			if (selectedParam && searchValue) {
				result = `${selectedParam}:${searchValue}`;
			}
			fetchTicketsBySearchValue({
				updateFilterKey,
				query: result,
				setError,
				setLoading,
				setTicketsData,
			});
		}
	};

	return (
		<div className="flex flex-col items-center relative w-full">
			{/* Search Form */}
			{searchValue}
			<div className="w-full p-3 flex justify-evenly items-center rounded-2xl shadow-md bg-white">
				<GiHamburgerMenu
					className="text-xl cursor-pointer"
					onClick={() => {
						setHideParams(!hideParams);
					}}
				/>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSearchSubmit();
					}}
					className="w-[80%] flex items-center"
				>
					<input
						type="text"
						placeholder="Search here"
						className={"text-md ps-2 w-full outline-none "}
						value={searchValue}
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
						required
					/>
				</form>
				<GoSearch
					className="text-xl cursor-pointer"
					onClick={(e) => {
						e.preventDefault();
						if (searchValue !== "") handleSearchSubmit();
					}}
				/>
			</div>
			{/* Search Params */}
			<div
				className={`p-3 absolute flex flex-wrap gap-2 justify-evenly items-center
        ${
					hideParams
						? "-z-10 opacity-0 top-[0px]"
						: "z-10 opacity-100 top-[50px]"
				}`}
				style={{ transition: "ease", transitionDuration: "300ms" }}
			>
				<div className="flex gap-1 justify-center items-center font-bold">
					<FaFilter /> Filters:
				</div>
				<div
					className={`border-2 shadow-md py-[2px] px-2 relative z-0 rounded-lg select-none cursor-pointer ${
						searchParams.id ? "border-ternary" : "border-white"
					} ${searchParams.id ? "bg-ternary" : "bg-white"} ${
						searchParams.id ? "text-white" : "text-black"
					}`}
					onClick={() => toggleParam("id")}
				>
					Id
				</div>

				<div
					className={`border-2 shadow-md py-[2px] px-2 relative z-0 rounded-lg select-none cursor-pointer ${
						searchParams.tag ? "border-ternary" : "border-white"
					} ${searchParams.tag ? "bg-ternary" : "bg-white"} ${
						searchParams.tag ? "text-white" : "text-black"
					}`}
					onClick={() => toggleParam("tag")}
				>
					Tags
				</div>
				<div
					className={`border-2 shadow-md py-[2px] px-2 relative z-0 rounded-lg select-none cursor-pointer ${
						searchParams.type ? "border-ternary" : "border-white"
					} ${searchParams.type ? "bg-ternary" : "bg-white"} ${
						searchParams.type ? "text-white" : "text-black"
					}`}
					onClick={() => toggleParam("type")}
				>
					Type
				</div>
				<div
					className={`border-2 shadow-md py-[2px] px-2 relative z-0 rounded-lg select-none cursor-pointer ${
						searchParams.status ? "border-ternary" : "border-white"
					} ${searchParams.status ? "bg-ternary" : "bg-white"} ${
						searchParams.status ? "text-white" : "text-black"
					}`}
					onClick={() => toggleParam("status")}
				>
					Status
				</div>
				<div
					className={`border-2 shadow-md py-[2px] px-2 relative z-0 rounded-lg select-none cursor-pointer ${
						searchParams.priority ? "border-ternary" : "border-white"
					} ${searchParams.priority ? "bg-ternary" : "bg-white"} ${
						searchParams.priority ? "text-white" : "text-black"
					}`}
					onClick={() => toggleParam("priority")}
				>
					Severity
				</div>
			</div>
		</div>
	);
};

export default SearchTickets;
