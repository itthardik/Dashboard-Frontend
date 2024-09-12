import { useState } from "react";
import {
	IoMdHelpCircleOutline,
	IoMdCloseCircleOutline,
	IoIosArrowDown,
} from "react-icons/io";

import {
	FcComboChart,
	FcConferenceCall,
	FcCurrencyExchange,
	FcCustomerSupport,
	FcSettings,
	FcShipped,
} from "react-icons/fc";

import { GiHamburgerMenu } from "react-icons/gi";

import { Link, useNavigate } from "react-router-dom";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { useConfig } from "./../api/ContextApi";
import NavbarLink from "./NavbarLink";
import { handleLogout } from "../api/authContoller";

const NavBar = () => {
	const [menu, setMenu] = useState(false);
	const { userData, setUserData } = useConfig();
	const [logoutAnimation, setLogoutAnimation] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			{/* desktop nav */}
			<div
				className={
					"sm:w-1/6 w-5/6 sm:static absolute top-0 left-0 sm:flex z-40 bg-secondary min-h-full " +
					(menu ? "hidden" : "block")
				}
			>
				<div className=" py-5 flex flex-col justify-between items-center min-h-lvh">
					{/* LOGO */}
					<Link
						className="flex justify-center items-center gap-4 w-full text-black cursor-pointer"
						to="/"
					>
						<img
							src="./../images/logo.png"
							alt="Login Gif"
							className="w-[30%]"
						/>
						<h3 className="text-2xl font-light">Dashboard</h3>
					</Link>
					<div className="w-full flex flex-col justify-center items-center">
						{!userData ? (
							<Link
								to="/login"
								className=" w-full flex justify-center items-center text-xl gap-2 mt-3 mb-10 font-medium"
							>
								<RiLoginBoxFill className="text-2xl" />
								Login
							</Link>
						) : (
							<div className=" flex flex-col justify-center items-center w-full gap-3 mb-1">
								<div className="flex justify-center gap-2 items-center w-full">
									<img
										src="/images/circleUserImg.png"
										alt="user Gif"
										className="max-h-16 p-[9px]"
									/>
									<div className="flex flex-col">
										<div className="text-xl font-medium">
											{userData.Username}
										</div>
										<div className="font-normal text-sm">{userData.Role}</div>
									</div>
									<IoIosArrowDown
										className="text-2xl cursor-pointer"
										style={{
											transitionDuration: "0.3s",
											transform: logoutAnimation
												? "rotate(180deg)"
												: "rotate(0deg)",
										}}
										onClick={(e) => {
											e.stopPropagation();
											setLogoutAnimation(!logoutAnimation);
										}}
									/>
								</div>

								<div
									onClick={() => {
										logoutAnimation && handleLogout({ setUserData, navigate });
									}}
									className="z-0 flex justify-center items-center text-md gap-1 "
									style={{
										cursor: logoutAnimation ? "pointer" : "default",
										translate: logoutAnimation ? "0px -10px" : "0px -30px",
										opacity: !logoutAnimation ? "0" : "100",
										transition: "linear",
										transitionDuration: "0.2s",
									}}
								>
									<RiLogoutBoxFill className="text-xl" />
									Logout
								</div>
							</div>
						)}
						{/* Nav Items */}
						<div className="w-full">
							<NavbarLink
								navLink="/sales"
								navText="Sales"
								Icon={FcComboChart}
							/>
							<NavbarLink
								navLink="/inventory"
								navText="Inventory"
								Icon={FcShipped}
							/>
							<NavbarLink
								navLink="/revenue"
								navText="Revenue"
								Icon={FcCurrencyExchange}
							/>
							<NavbarLink
								navLink="/users"
								navText="Users"
								Icon={FcConferenceCall}
							/>
							<NavbarLink
								navLink="/customerSupport"
								navText="Support"
								Icon={FcCustomerSupport}
							/>
						</div>
					</div>

					{/* Help */}
					<div className="w-full flex flex-col gap-3">
						<Link
							className="flex justify-center items-center gap-1 text-decoration-none text-black"
							style={{ cursor: "pointer" }}
							to="/help"
						>
							<IoMdHelpCircleOutline className="text-lg" />
							Help
						</Link>
						<Link
							className="flex justify-center items-center gap-1 text-decoration-none text-black"
							style={{ cursor: "pointer" }}
							to="/settings"
						>
							<FcSettings className="text-lg" />
							Settings
						</Link>

						{/* {userRole === "Admin" && <Setting />} */}

						<IoMdCloseCircleOutline
							className={"mt-1 w-full sm:hidden " + (menu ? "hidden" : "block")}
							style={{ fontSize: "40px", color: "#17206d" }}
							onClick={() => {
								setMenu(!menu);
							}}
						/>
					</div>
				</div>
			</div>

			{/* mobile nav */}
			<div className="z-10 py-5 bg-secondary flex justify-center sm:hidden">
				<GiHamburgerMenu
					className="text-5xl absolute top-4 left-4 z-20 text-ternary"
					onClick={() => {
						setMenu(!menu);
					}}
				/>

				<Link
					className="flex justify-center items-center gap-2 w-full text-black cursor-pointer"
					to="/"
				>
					<img src="./../images/logo.png" alt="Login Gif" className="w-[10%]" />
					<h3 className="text-2xl font-light">Dashboard</h3>
				</Link>
			</div>
		</>
	);
};

export default NavBar;