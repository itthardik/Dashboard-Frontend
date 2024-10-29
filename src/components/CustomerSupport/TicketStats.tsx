import React, { useEffect, useState } from "react";
import { fetchOverallTicketsData } from "../../api/customerSupportController";
import Loading from "../Loading";
import {
	MdOutlineSentimentDissatisfied,
	MdOutlineSentimentNeutral,
	MdOutlineSentimentSatisfied,
} from "react-icons/md";
import { FaChevronUp } from "react-icons/fa";

const TicketStats = ({ setError }: { setError: React.Dispatch<any> }) => {
	const [overallTicketsData, setOverallTicketsData] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [isModelOpen, setIsModelOpen] = useState(() => {
		const savedModelState = localStorage.getItem("isModelOpen_TicketStats");
		return savedModelState ? JSON.parse(savedModelState) : false;
	});

	useEffect(() => {
		localStorage.setItem(
			"isModelOpen_TicketStats",
			JSON.stringify(isModelOpen)
		);
	}, [isModelOpen]);

	useEffect(() => {
		fetchOverallTicketsData({
			setError,
			setLoading,
			setOverallTicketsData,
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (!loading) {
		return (
			<div className=" mx-5 my-2 p-5 flex flex-col justify-center items-center text-center min-h-[450px]">
				<Loading />
			</div>
		);
	}

	return (
		<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col">
			<div className="text-2xl py-2 font-bold flex justify-between items-center">
				<h1 className="">Customer Support Knowledge Base Dashboard</h1>
				<FaChevronUp
					className={`select-none cursor-pointer transition-transform duration-300 ${
						isModelOpen ? "rotate-180" : ""
					}`}
					onClick={() => {
						setIsModelOpen(!isModelOpen);
					}}
				/>
			</div>
			<div
				className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out ${
					isModelOpen ? "max-h-0 overflow-hidden" : "max-h-[200vh]"
				}`}
			>
				<div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center min-h-[190px]  mt-5 ">
					<h2 className="text-xl font-semibold mb-2">Open Tickets</h2>
					<p className="text-3xl font-bold">
						{overallTicketsData?.openTickets}
					</p>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center min-h-[190px]  mt-5">
					<h2 className="text-xl font-semibold mb-2">Closed Tickets</h2>
					<p className="text-3xl font-bold">
						{overallTicketsData?.closedTickets}
					</p>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center min-h-[190px]  mt-5">
					<h2 className="text-xl font-semibold mb-2">Unassigned Tickets</h2>
					<p className="text-3xl font-bold">
						{overallTicketsData?.unassignedTickets}
					</p>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center min-h-[190px] col-span-2 lg:col-span-1 ">
					<h2 className="text-xl font-semibold mb-2">Priority Counts (Open)</h2>
					<ul>
						<li>
							Low Priority:{" "}
							<span className="font-bold">
								{overallTicketsData?.priorityCounts?.lowPriorityOpenCount}
							</span>
						</li>
						<li>
							Medium Priority:{" "}
							<span className="font-bold">
								{overallTicketsData?.priorityCounts?.mediumPriorityOpenCount}
							</span>
						</li>
						<li>
							High Priority:{" "}
							<span className="font-bold">
								{overallTicketsData?.priorityCounts?.highPriorityOpenCount}
							</span>
						</li>
						<li>
							Urgent Priority:{" "}
							<span className="font-bold">
								{overallTicketsData?.priorityCounts?.urgentPriorityOpenCount}
							</span>
						</li>
					</ul>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center min-h-[190px] col-span-2 lg:col-span-1">
					<h2 className="text-xl font-semibold mb-2">Feedback Categories</h2>
					<ul>
						<li className="flex justify-center items-center gap-1">
							<MdOutlineSentimentSatisfied className="text-3xl text-green-500 " />
							:{" "}
							<span className="font-bold">
								{overallTicketsData?.feedbackCategories?.positiveFeedbackPercentage
									.toString()
									.padStart(2, "0")}
								%
							</span>
						</li>
						<li className="flex justify-center items-center gap-1">
							<MdOutlineSentimentNeutral className="text-3xl text-blue-500 " />:{" "}
							<span className="font-bold">
								{overallTicketsData?.feedbackCategories?.neutralFeedbackPercentage
									.toString()
									.padStart(2, "0")}
								%
							</span>
						</li>
						<li className="flex justify-center items-center gap-1">
							<MdOutlineSentimentDissatisfied className="text-3xl text-red-500 " />
							:{" "}
							<span className="font-bold">
								{overallTicketsData?.feedbackCategories?.negativeFeedbackPercentage
									.toString()
									.padStart(2, "0")}
								%
							</span>
						</li>
					</ul>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center min-h-[190px]">
					<h2 className="text-xl font-semibold mb-2">Average Response Time</h2>
					<p className="text-2xl font-bold">{`${overallTicketsData?.averageResponseTime?.hours}h ${overallTicketsData?.averageResponseTime?.minutes}m ${overallTicketsData?.averageResponseTime?.seconds}s`}</p>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center min-h-[190px]">
					<h2 className="text-xl font-semibold mb-2">
						Average Resolution Time
					</h2>
					<p className="text-2xl font-bold">{`${overallTicketsData?.averageResolutionTime?.days}d ${overallTicketsData?.averageResolutionTime?.hours}h ${overallTicketsData?.averageResolutionTime?.minutes}m ${overallTicketsData.averageResolutionTime?.seconds}s`}</p>
				</div>
			</div>
		</div>
	);
};

export default TicketStats;
