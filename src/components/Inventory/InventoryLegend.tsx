import { useEffect, useRef, useState } from "react";
import { FcHighPriority, FcLowPriority } from "react-icons/fc";
import { MdOutlineHelpOutline } from "react-icons/md";

const InventoryLegend = () => {
	const [isModelOpen, setIsModelOpen] = useState(true);
	const modalRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLDivElement | null>(null);
	const handleClickOutside = (event: any) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(event.target as Node) &&
			buttonRef.current &&
			!buttonRef.current.contains(event.target as Node)
		) {
			setIsModelOpen(false);
		}
	};

	useEffect(() => {
		if (isModelOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isModelOpen]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="relative flex justify-center items-center">
			<div ref={buttonRef}>
				<MdOutlineHelpOutline
					className="text-white text-5xl bg-primary rounded-full p-2 cursor-pointer select-none"
					onClick={() => {
						setIsModelOpen((prev) => !prev);
					}}
				/>
			</div>
			{isModelOpen && (
				<div
					className="absolute z-20 right-5 bg-secondary rounded-md shadow-lg p-3 flex flex-col top-10"
					ref={modalRef}
				>
					<div className="text-lg font-medium">Inventory&nbsp;Legend</div>
					<div className="flex gap-2 justify-center items-center">
						<FcLowPriority className="text-2xl" />
						<p>Recently&nbsp;Updated</p>
					</div>
					<div className="flex gap-2 justify-center items-center">
						<FcHighPriority className="text-2xl" />
						<p>Warning:&nbsp;Low&nbsp;Stock</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default InventoryLegend;
