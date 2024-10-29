import { SlBag } from "react-icons/sl";
const Loading = () => {
	return (
		<div className="flex flex-col justify-evenly items-center">
			<div className="border-[13px] border-[#CD2026] rounded-full overflow-hidden relative box bounce-6">
				<SlBag className="text-[200px] m-5 translate-y-[40px] z-0 text-[#CD2026] " />
				<img
					src="./../images/logo.png"
					alt="Login Gif"
					className="w-[100px] absolute bottom-[15px] left-[70px] z-10"
				/>
			</div>
			<h1 className="text-3xl mt-5">Loading...</h1>
		</div>
	);
};

export default Loading;
