import { useRouteError } from "react-router";
import { Link } from "react-router-dom";

export default function ErrorPage({ error }: { error?: any }) {
	const errorByRouter: any = useRouteError();
	return (
		<div
			className={
				"flex flex-col justify-evenly items-center w-full bg-[#FCFCFC] " +
				(error ? "h-full" : "h-lvh")
			}
		>
			<img
				src={
					["401", "403"].includes(error)
						? "/gif/error401.gif"
						: "/gif/error.gif"
				}
				alt="Error"
				className="h-1/2"
			/>
			<div className="flex flex-col text-center">
				<h1 className="font-light text-primary text-4xl">
					{["401", "403"].includes(error) ? "Error " + error : "OOPS!"}
				</h1>

				<p className="font-light">
					<i>
						{errorByRouter
							? errorByRouter.statusText || errorByRouter.message
							: error === "401"
							? "Authorization Required"
							: error === "403"
							? "Forbidden : Access to this resource is denied!"
							: error}
					</i>
				</p>
				<Link
					to={"/"}
					className="text-xl rounded-lg bg-yellow-300 py-1 px-3 mt-2"
				>
					Back to Home Page
				</Link>
			</div>
		</div>
	);
}
