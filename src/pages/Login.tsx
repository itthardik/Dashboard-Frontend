import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { handleLoginSubmit } from "../api/authContoller";
import { IoArrowBackCircleSharp, IoEyeOff, IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useConfig } from "../api/ContextApi";
import Loading from "../components/Loading";
import ErrorPage from "./ErrorPage";

const Login = () => {
	const [formData, setFormData] = useState<any>({
		username: "adminTest",
		password: "123123123",
	});
	const { setUserData } = useConfig();
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [error, setError] = useState<any>();
	const navigator = useNavigate();
	const [loading, setLoading] = useState(true);
	const [showPassword, setShowPassword] = useState(false);

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};
		if (!formData.username || formData.username.length < 2)
			newErrors.username = "Please enter your valid username";
		if (!formData.password)
			newErrors.password = "Please enter your valid password";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setErrors({});
		if (!validateForm()) {
			return;
		}

		handleLoginSubmit({
			formData,
			setFormData,
			setUserData,
			navigator,
			setLoading,
			setError,
		});
	};
	if (!loading)
		return (
			<div className="flex flex-col justify-center items-center text-center h-lvh">
				<Loading />;
			</div>
		);
	else if (error) {
		return (
			<div className="flex flex-col justify-center items-center text-center h-lvh">
				<ErrorPage error={error} setError={setError} />;
			</div>
		);
	} else
		return (
			<div className="flex sm:flex-row flex-col h-lvh bg-[FBF9F7] justify-center">
				<div
					className="absolute z-3 text-6xl top-3 left-6 cursor-pointer text-primary"
					onClick={() => {
						navigator(-1);
					}}
				>
					<IoArrowBackCircleSharp />
				</div>
				<div className="flex items-center justify-center flex-1 bg-secondary">
					<div className=" rounded-lg flex flex-col justify-evenly items-center w-3/5 p-6 shadow-ternary shadow-2xl">
						<Link
							className="flex justify-center items-center gap-4 w-full text-black cursor-pointer"
							to="/"
						>
							<img
								src="./../images/logo.png"
								alt="Login Gif"
								className="w-[30%]"
							/>
							<h3 className="text-2xl font-medium italic text-primary">
								Dashboard
							</h3>
						</Link>
						<form onSubmit={handleSubmit} className="w-full text-xl">
							<div className="mb-4">
								<label
									htmlFor="username"
									className="block mb-2 text-primary font-bold"
								>
									Username:
								</label>
								<input
									type="text"
									id="username"
									name="username"
									value={formData.username}
									onChange={handleChange}
									className="form-control w-full px-3 py-2 border border-ternary text-ternary rounded-md"
								/>
								{errors.username && (
									<div className="text-black italic">⚠️ {errors.username}</div>
								)}
							</div>
							<div className="mb-4">
								<label
									htmlFor="password"
									className="block mb-2 text-primary font-bold"
								>
									Password:
								</label>
								<div className="relative">
									<input
										type={showPassword ? "text" : "password"}
										id="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										className="form-control w-full px-3 py-2 border border-ternary text-ternary rounded-md"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute top-0 right-0 px-3 py-2 text-primary"
									>
										{showPassword ? (
											<IoEyeOff className="text-3xl" />
										) : (
											<IoEye className="text-3xl" />
										)}
									</button>
								</div>
								{errors.password && (
									<div className="text-black italic">⚠️ {errors.password}</div>
								)}
							</div>
							<button
								type="submit"
								className="w-full bg-primary opacity-80 text-white text-2xl font-bold py-2 rounded-md mt-4 hover:opacity-100"
							>
								Login
							</button>
						</form>
					</div>
				</div>
				<div className="bg-white sm:flex flex-1 justify-center hidden">
					<div className="h-lvh flex flex-col justify-center items-center">
						<p className="text-center w-2/3 font-bold italic text-2xl mb-10 text-primary">
							"Crafting the Future of Fashion with Insightful Data."
						</p>
						<img src="/gif/login5.gif" alt="Login Gif" className="h-[45%]" />
						<p className="text-center w-4/5 font-lighter italic text-lg mt-10 text-primary">
							Enhancing design and strategy with deep analytics and a visionary
							approach to fashion data.
						</p>
					</div>
				</div>
			</div>
		);
};

export default Login;
