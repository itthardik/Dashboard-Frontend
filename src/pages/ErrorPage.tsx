import { IoArrowBackCircle } from "react-icons/io5";
import { useRouteError } from "react-router";
import { Link } from "react-router-dom";
import { useConfig } from "../api/ContextApi";

export default function ErrorPage({
	error,
	setError,
}: {
	error?: string;
	setError?: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
	const errorByRouter = useRouteError() as {
		statusText?: string;
		message?: string;
	};
	const { userData } = useConfig();
	return (
		<div
			className={
				"flex flex-col justify-evenly items-center w-full bg-[#FCFCFC] h-lvh relative"
			}
		>
			<IoArrowBackCircle
				className="absolute top-5 left-10 text-primary text-6xl p-1 cursor-pointer"
				onClick={() => {
					if (setError) setError(undefined);
				}}
			/>

			<img
				src={
					["401", "403"].includes(error || "")
						? "/gif/error401.gif"
						: "/gif/error.gif"
				}
				alt="Error"
				className="h-1/2"
			/>
			<div className="flex flex-col text-center">
				<h1 className="font-light text-primary text-4xl">
					{["401", "403"].includes(error || "") ? "Error " + error : "OOPS!"}
				</h1>

				<div className="font-light flex flex-col justify-center item-center">
					<i>
						{errorByRouter
							? errorByRouter.statusText || errorByRouter.message
							: error === "401"
							? "Authorization Required"
							: error === "403"
							? "Forbidden : Access to this resource is denied!"
							: error}
					</i>
					<p className="text-red-500">
						{/* {userData && "( Note: No Token Found! Please login again. )"} */}
						{userData &&
							Date.now() >
								new Date(userData["TokenExpirationTime"]).getTime() &&
							"( Note: Session Expired! Please login again. )"}
					</p>
				</div>
				<Link
					to={"/"}
					reloadDocument
					onClick={() => {
						if (setError) setError(undefined);
					}}
					className="text-xl rounded-lg bg-yellow-300 py-1 px-3 mt-2"
				>
					Back to Home Page
				</Link>
			</div>
		</div>
	);
}
