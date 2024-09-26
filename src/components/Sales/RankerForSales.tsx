import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const RankerForSales = ({
	currPage,
	setCurrPage,
	maxPages,
	data,
}: {
	currPage: number;
	setCurrPage: React.Dispatch<React.SetStateAction<number>>;
	maxPages: number;
	data: any[];
}) => {
	return (
		<div className="w-full mt-5">
			<div className="">
				<table className="w-full">
					<thead className="bg-ternary text-white">
						<tr className="text-lg">
							<th className="py-[6px]">Rank</th>
							<th className="py-[6px]">ID</th>
							<th className="py-[6px]">Name</th>
							<th className="py-[6px]">Total Sales</th>
						</tr>
					</thead>
					<tbody className="text-md">
						{data.map((d: any, index) => (
							<tr
								key={index}
								className={index % 2 ? "bg-white" : "bg-secondary"}
							>
								<td className="py-[6px]">{index + 1 + (currPage - 1) * 10}</td>
								<td className="py-[6px]">{d.id}</td>
								<td className="py-[6px]">{d.name}</td>
								<td className="py-[6px]">{d.totalSales}</td>
							</tr>
						))}
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
		</div>
	);
};

export default RankerForSales;
