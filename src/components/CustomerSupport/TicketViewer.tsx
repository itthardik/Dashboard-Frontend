import React, { useEffect, useState } from "react";
import { fetchAllTicketsByPagination } from "../../api/customerSupportController";
import TicketTable from "./TicketTable";
import Loading from "../Loading";
import { useSearchParams } from "react-router-dom";
import SearchTickets from "./SearchTickets";
import SelectOption from "../Revenue/SelectOption";
import { FaChevronUp } from "react-icons/fa";

const TicketViewer = ({ setError }: { setError: React.Dispatch<any> }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currPage, setCurrPage] = useState(
		parseInt(searchParams.get("page") ?? "1")
	);
	const [isClear, setIsClear] = useState(false);
	const [ticketsData, setTicketsData] = useState<any[]>([]);
	const [isNextPage, setIsNextPage] = useState<boolean>(false);
	const [loading, setLoading] = useState(true);
	const [updateFilterKey, setUpdateFilterKey] = useState(
		searchParams.get("sortBy") ?? "created_at,desc"
	);

	const [isModelOpen, setIsModelOpen] = useState(() => {
		const savedModelState = localStorage.getItem("isModelOpen_TicketViewer");
		return savedModelState ? JSON.parse(savedModelState) : false;
	});

	useEffect(() => {
		localStorage.setItem(
			"isModelOpen_TicketViewer",
			JSON.stringify(isModelOpen)
		);
	}, [isModelOpen]);

	useEffect(() => {
		fetchAllTicketsByPagination({
			setLoading,
			setError,
			setTicketsData,
			setIsNextPage,
			currPage,
			updateFilterKey,
		});
		setSearchParams({ page: currPage.toString(), sortBy: updateFilterKey });
	}, [currPage, updateFilterKey, isClear]);

	if (!loading) {
		return (
			<div className=" mx-5 my-2 p-5 flex flex-col justify-center items-center text-center min-h-[450px]">
				<Loading />
			</div>
		);
	}
	return (
		<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col">
			<div className="flex justify-left items-center gap-10">
				<h1 className="text-2xl py-2 font-bold text-left">Tickets</h1>
				<div className="w-2/5">
					<SearchTickets
						updateFilterKey={updateFilterKey}
						setError={setError}
						setLoading={setLoading}
						setTicketsData={setTicketsData}
					/>
				</div>
				<div className="min-w-48">
					<SelectOption
						key="SortBy"
						bgColor="bg-white"
						filterKey={updateFilterKey}
						setFilterKey={setUpdateFilterKey}
						optionList={[
							{ key: "Sort By: Created At (Asc)", value: "created_at,asc" },
							{ key: "Sort By: Created At (Desc)", value: "created_at,desc" },
							{ key: "Sort By: Status (Asc)", value: "status,asc" },
							{ key: "Sort By: Status (Desc)", value: "status,desc" },
						]}
					/>
				</div>
				<button
					className="py-1 px-2 border-2 font-semibold border-primary text-primary rounded-lg hover:text-white hover:bg-primary transition-colors"
					onClick={() => {
						setSearchParams({ page: "1", sortBy: "created_at,desc" });
						setCurrPage(1);
						setUpdateFilterKey("created_at,desc");
						setIsClear((prev) => !prev);
					}}
				>
					Clear All Filters
				</button>
				<FaChevronUp
					className={`select-none cursor-pointer transition-transform duration-300 text-2xl ${
						isModelOpen ? "rotate-180" : ""
					}`}
					onClick={() => {
						setIsModelOpen(!isModelOpen);
					}}
				/>
			</div>
			<div
				className={`transition-all duration-500 ease-in-out ${
					isModelOpen ? "max-h-0 overflow-hidden" : "max-h-[200vh]"
				}`}
			>
				<TicketTable
					ticketsData={ticketsData}
					currPage={currPage}
					isNextPage={isNextPage}
					setCurrPage={setCurrPage}
				/>
			</div>
		</div>
	);
};

export default TicketViewer;
