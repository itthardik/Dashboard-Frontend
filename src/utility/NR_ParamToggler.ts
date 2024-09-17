export const ParamsToggle = ({
	setSearchParams,
	paramName,
	paramValue,
}: {
	setSearchParams: React.Dispatch<React.SetStateAction<any>>;
	paramName: string;
	paramValue: boolean;
}) => {
	setSearchParams((prevParams: any) => ({
		...prevParams,
		[paramName]: paramValue,
	}));
};
