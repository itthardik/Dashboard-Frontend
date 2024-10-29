import React from "react";

const SelectOption = ({
	filterKey,
	setFilterKey,
	optionList,
	bgColor,
}: {
	filterKey: string;
	setFilterKey: React.Dispatch<string>;
	optionList: { key: string; value: string }[];
	bgColor?: string;
}) => {
	return (
		<div className="relative inline-block w-full">
			<select
				id="dateRange"
				className={
					"block cursor-pointer appearance-none w-full bg-whit px-4 py-2 pr-8 rounded shadow-md leading-tight focus:outline-none focus:shadow-outline font-medium " +
					bgColor
				}
				value={filterKey}
				onChange={(e) => {
					setFilterKey(e.currentTarget.value);
				}}
			>
				{optionList.map((ol) => {
					return (
						<option value={ol.value} key={ol.key}>
							{ol.key}
						</option>
					);
				})}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
				<svg
					className="fill-current h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
				</svg>
			</div>
		</div>
	);
};

export default SelectOption;
