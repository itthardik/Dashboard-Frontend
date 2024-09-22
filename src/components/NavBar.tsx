import { useState } from "react";
import { IoMdHelpCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

import {
	FcBusinessman,
	FcComboChart,
	FcConferenceCall,
	FcCurrencyExchange,
	FcCustomerSupport,
	FcManager,
	FcSettings,
	FcShipped,
} from "react-icons/fc";

import { GiHamburgerMenu } from "react-icons/gi";

import { Link, useNavigate } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
import { useConfig } from "./../api/ContextApi";
import NavbarLink from "./NavbarLink";
import { handleLogout } from "../api/authContoller";
import { FaPowerOff } from "react-icons/fa";

const NavBar = ({
	setLoading,
	setError,
}: {
	setLoading: React.Dispatch<boolean>;
	setError: React.Dispatch<any>;
}) => {
	const [menu, setMenu] = useState(false);
	const { userData, setUserData } = useConfig();
	const role: string = userData?.Role ?? "none";
	const navigate = useNavigate();

	return (
		<>
			{/* desktop nav */}
			<div
				className={
					"sm:w-1/6 w-5/6 sm:static absolute top-0 left-0 sm:flex z-40 bg-secondary min-h-full shadow " +
					(menu ? "hidden" : "block")
				}
			>
				<div className=" py-5 flex flex-col justify-between items-center h-lvh">
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
							<div className=" flex flex-col justify-center items-center w-full gap-3 mb-10">
								<div className="flex justify-center gap-3 items-center w-full">
									{["admin"].includes(role) ? (
										<FcBusinessman className="text-5xl" />
									) : (
										<FcManager className="text-5xl" />
									)}
									<div className="flex flex-col">
										<div className="text-xl font-medium">
											{userData.Username}
										</div>
										<div className="font-normal text-sm">{userData.Role}</div>
									</div>
									<FaPowerOff
										className="text-2xl cursor-pointer text-ternary"
										title="Logout"
										onClick={() => {
											handleLogout({
												setUserData,
												navigate,
												setLoading,
												setError,
											});
										}}
									/>
								</div>
							</div>
						)}
						{/* Nav Items */}
						<div className="w-full">
							{["admin", "sales"].includes(role) && (
								<NavbarLink
									navLink="/sales"
									navText="Sales"
									Icon={FcComboChart}
								/>
							)}
							{["admin", "inventory"].includes(role) && (
								<NavbarLink
									navLink="/inventory"
									navText="Inventory"
									Icon={FcShipped}
								/>
							)}
							{["admin", "revenue"].includes(role) && (
								<NavbarLink
									navLink="/revenue"
									navText="Revenue"
									Icon={FcCurrencyExchange}
								/>
							)}
							{["admin"].includes(role) && (
								<NavbarLink
									navLink="/users"
									navText="Users"
									Icon={FcConferenceCall}
								/>
							)}
							{["admin", "support"].includes(role) && (
								<NavbarLink
									navLink="/customerSupport"
									navText="Support"
									Icon={FcCustomerSupport}
								/>
							)}
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

						{["admin"].includes(role) && (
							<Link
								className="flex justify-center items-center gap-1 text-decoration-none text-black"
								style={{ cursor: "pointer" }}
								to="/settings"
							>
								<FcSettings className="text-lg" />
								Settings
							</Link>
						)}

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
