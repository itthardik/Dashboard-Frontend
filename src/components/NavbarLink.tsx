import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

const NavbarLink = ({
	navLink,
	Icon,
	navText,
}: {
	navLink: string;
	Icon: IconType;
	navText: string;
}) => {
	return (
		<NavLink
			className={({ isActive }) =>
				"flex justify-start items-center gap-3 text-lg ps-[50px] py-3 font-medium " +
				(isActive ? "bg-primary text-secondary" : "bg-secondary text-black")
			}
			to={navLink}
		>
			<Icon className="text-3xl" />
			{navText}
		</NavLink>
	);
};

export default NavbarLink;
