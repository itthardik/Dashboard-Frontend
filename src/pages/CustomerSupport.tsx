import { useState } from "react";
import TiketViewer from "../components/CustomerSupport/TicketViewer";
import ErrorPage from "./ErrorPage";
import TicketStats from "../components/CustomerSupport/TicketStats";

const CustomerSupport = () => {
	const [error, setError] = useState<any>();

	if (error) {
		return <ErrorPage error={error} setError={setError} />;
	}
	return (
		<div className="w-full h-full flex flex-col gap-2">
			<div className="my-3 flex justify-center items-center gap-2">
				<img src="./../images/logo.png" alt="Login Gif" className="w-[60px]" />
				<h1 className="text-3xl font-bold">Customer Support Center</h1>
			</div>
			<TicketStats setError={setError} />
			<TiketViewer setError={setError} />
		</div>
	);
};

export default CustomerSupport;
