import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import { fetchTicketById } from "../api/customerSupportController";
import ErrorPage from "./ErrorPage";
import { PriorityLevel, TicketStatus } from "../model/AllEnums";
import { IoArrowBackCircle } from "react-icons/io5";

const calculateTimeDifference = (startTime: string, endTime: string) => {
	const timeDifference =
		new Date(endTime).getTime() - new Date(startTime).getTime();

	const hours = Math.floor(timeDifference / (1000 * 60 * 60))
		.toString()
		.padStart(2, "0");

	const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
		.toString()
		.padStart(2, "0");

	const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
		.toString()
		.padStart(2, "0");

	return `${hours} Hrs ${minutes} Min ${seconds} Sec`;
};

const Ticket = () => {
	const [searchParam, setSearchParam] = useSearchParams();
	const navigator = useNavigate();
	const [ticketsData, setTicketsData] = useState<any[]>([]);
	const [error, setError] = useState<any>();
	const [loading, setLoading] = useState(true);

	const [resolutionTime, setResolutionTime] = useState("");
	const [responseTime, setResponseTime] = useState("");

	useEffect(() => {
		fetchTicketById({
			id: +searchParam.get("id")!,
			setError,
			setLoading,
			setTicketsData,
		});
	}, []);

	useEffect(() => {
		if (!loading) return;

		setResolutionTime(
			calculateTimeDifference(
				ticketsData[0]?.created_at,
				ticketsData[0]?.stats?.resolved_at
			)
		);

		setResponseTime(
			calculateTimeDifference(
				ticketsData[0]?.created_at,
				ticketsData[0]?.stats?.first_responded_at
			)
		);
	}, [loading]);
	if (!loading) {
		return (
			<div className="flex justify-center items-center h-lvh w-full">
				<Loading />
			</div>
		);
	}
	if (error) {
		return <ErrorPage error={error} setError={setError} />;
	}

	return (
		<div className="w-full h-full flex flex-col gap-2">
			<div className="my-3 flex justify-center items-center gap-2 relative">
				<IoArrowBackCircle
					className="absolute top-0 left-3 text-primary text-6xl p-1 cursor-pointer"
					onClick={() => {
						navigator(-1);
					}}
				/>
				<img src="./../images/logo.png" alt="Login Gif" className="w-[60px]" />
				<h1 className="text-3xl font-bold">Ticket Details</h1>
			</div>
			<div className="mx-5 my-2 p-5 bg-secondary rounded-md shadow-md flex flex-col gap-3">
				<div className="flex justify-evenly items-center gap-10 w-full text-2xl">
					<p className="mt-2">
						<strong>Ticket ID:</strong> {ticketsData[0]?.id}
					</p>
					<p className="mt-2">
						<strong>Subject:</strong> {ticketsData[0]?.subject}
					</p>
					<p className="mt-2">
						<strong>Status:</strong> {TicketStatus[ticketsData[0]?.status]}
					</p>
					<p className="mt-2">
						<strong>Severity:</strong> {PriorityLevel[ticketsData[0]?.priority]}
					</p>
				</div>
				<div className="flex justify-evenly items-center gap-10 w-full text-2xl">
					<p className="mt-2">
						<strong>Resolution Time:</strong>{" "}
						{ticketsData[0]?.stats.resolved_at
							? resolutionTime
							: "Pending Resolution"}
					</p>
					<p className="mt-2">
						<strong>Response Time:</strong>{" "}
						{ticketsData[0]?.stats.first_responded_at
							? responseTime
							: "Awaiting First Response"}
					</p>
				</div>
				<div className="overflow-x-auto flex flex-col justify-center py-2">
					<h3 className="font-semibold py-1 text-2xl">More Details</h3>
					<table className="min-w-full bg-white my-3">
						<thead className="bg-ternary text-white">
							<tr>
								<th className="py-2 px-4">Field</th>
								<th className="py-2 px-4">Value</th>
							</tr>
						</thead>
						<tbody>
							<tr className="bg-secondary">
								<th className="py-2 px-4">Requester ID</th>
								<td className="py-2 px-4">{ticketsData[0]?.requester_id}</td>
							</tr>
							<tr className="bg-white">
								<th className="py-2 px-4">Support Email</th>
								<td className="py-2 px-4">
									{ticketsData[0]?.support_email ?? "No Email Provided"}
								</td>
							</tr>
							<tr className="bg-secondary">
								<th className="py-2 px-4">Due By</th>
								<td className="py-2 px-4">
									{new Date(ticketsData[0]?.due_by).toLocaleString()}
								</td>
							</tr>
							<tr className="bg-white">
								<th className="py-2 px-4">Created At</th>
								<td className="py-2 px-4">
									{new Date(ticketsData[0]?.created_at).toLocaleString()}
								</td>
							</tr>
							<tr className="bg-secondary">
								<th className="py-2 px-4">Updated At</th>
								<td className="py-2 px-4">
									{new Date(ticketsData[0]?.updated_at).toLocaleString()}
								</td>
							</tr>
							<tr className="bg-white">
								<th className="py-2 px-4">Tags</th>
								<td className="py-2 px-4">
									{ticketsData[0]?.tags.length !== 0
										? ticketsData[0]?.tags.join(", ")
										: "No tags"}
								</td>
							</tr>
							<tr className="bg-secondary">
								<th className="py-2 px-4">Attachments</th>
								<td className="py-2 px-4">
									{ticketsData[0]?.attachments.length !== 0
										? ticketsData[0]?.attachments.join(", ")
										: "No attachments"}
								</td>
							</tr>
							<tr className="bg-white">
								<th className="py-2 px-4">Sentiment Score</th>
								<td className="py-2 px-4">{ticketsData[0]?.sentiment_score}</td>
							</tr>
							<tr className="bg-secondary">
								<th className="py-2 px-4">Is Escalated</th>
								<td className="py-2 px-4">
									{ticketsData[0]?.is_escalated ? "Yes" : "No"}
								</td>
							</tr>
							<tr className="bg-white">
								<th className="py-2 px-4">Is Spam</th>
								<td className="py-2 px-4">
									{ticketsData[0]?.spam ? "Yes" : "No"}
								</td>
							</tr>
							<tr className="bg-secondary">
								<th className="py-2 px-4">Forward Emails</th>
								<td className="py-2 px-4">
									{ticketsData[0]?.fwd_emails.length !== 0
										? ticketsData[0]?.fwd_emails.join(", ")
										: "No forward emails"}
								</td>
							</tr>
							<tr className="bg-white">
								<th className="py-2 px-4">CC Emails</th>
								<td className="py-2 px-4">
									{ticketsData[0]?.cc_emails.length !== 0
										? ticketsData[0]?.cc_emails.join(", ")
										: "No CC emails"}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Ticket;
