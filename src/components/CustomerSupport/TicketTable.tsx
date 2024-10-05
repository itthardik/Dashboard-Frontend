import React from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import { PriorityLevel, TicketStatus } from "../../model/AllEnums";

const TicketTable = ({
	ticketsData,
	currPage,
	isNextPage,
	setCurrPage,
}: {
	ticketsData: any[];
	currPage: number;
	isNextPage: boolean;
	setCurrPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className="w-full mt-10">
			<div className="">
				<table className="w-full">
					<thead className="bg-ternary text-white">
						<tr className="text-lg">
							<th className="py-[6px]">Ticket ID</th>
							<th className="py-[6px]">Title</th>
							<th className="py-[6px]">Status</th>
							<th className="py-[6px]">Severity</th>
							<th className="py-[6px]">Creation Date</th>
							<th className="py-[6px]">Link</th>
						</tr>
					</thead>
					<tbody className="text-md">
						{ticketsData.map((d: any, index: number) => {
							return (
								<tr
									key={index}
									className={index % 2 ? "bg-white" : "bg-secondary"}
								>
									<td className="py-[6px]">{d.id}</td>
									<td className="py-[6px]">{d.subject}</td>
									<td className="py-[6px]">
										{TicketStatus[d.status]}({d.status})
									</td>
									<td className="py-[6px]">
										{PriorityLevel[d.priority]}({d.priority})
									</td>
									<td className="py-[6px]">
										{new Date(d.created_at).toLocaleString("en-GB")}
									</td>
									<td className="py-[6px]">
										<Link
											to={"/customerSupport/ticket?id=" + d.id}
											className="text-blue-500 underline"
										>
											View
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="flex justify-between items-center px-3 pt-4 text-md">
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

				<div>Page: {currPage}</div>

				<div
					className={
						"flex select-none items-center gap-2 border-2 rounded-full py-2 px-4 cursor-pointer font-bold" +
						(!isNextPage
							? " border-ternary text-ternary"
							: " border-primary text-primary hover:bg-primary hover:text-white")
					}
					onClick={() => {
						if (isNextPage) setCurrPage(currPage + 1);
					}}
				>
					Next
					<GrLinkNext />
				</div>
			</div>
		</div>
	);
};

export default TicketTable;
