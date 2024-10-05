import React, { useEffect, useRef, useState } from "react";
import { TbBellRinging } from "react-icons/tb";
import { fetchInventoryNotificationData } from "../../api/inventoryController";
import ErrorPage from "../../pages/ErrorPage";
import Loading from "../Loading";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useConfig } from "../../api/ContextApi";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const AlertNotificationButton = ({
	alertModel,
	setAlertModel,
	setAddInventoryModel,
	setAddInventoryId,
	setAddInventoryRestock,
}: {
	alertModel: boolean;
	setAlertModel: React.Dispatch<React.SetStateAction<boolean>>;
	setAddInventoryModel: React.Dispatch<React.SetStateAction<boolean>>;
	setAddInventoryId: React.Dispatch<React.SetStateAction<number>>;
	setAddInventoryRestock: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const [error, setError] = useState<any>();
	const [currPage, setCurrPage] = useState<number>(1);
	const [maxPages, setMaxPages] = useState<number>(1);

	const [loading, setLoading] = useState(false);
	const [alertOnMessage, setAlertOnMessage] = useState(false);
	const [inventoryNotifications, setInventoryNotifications] = useState<
		any[] | null
	>([]);
	const { mqttInventoryNotification, setMqttInventoryNotification } =
		useConfig();

	const notificationSound = new Audio("/notification.mp3");

	const modalRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLDivElement | null>(null);

	const handleActivate = () => {
		setAlertOnMessage(true);
		notificationSound.play().catch((err) => {
			console.log("Failed to play sound:", err);
		});
		setTimeout(() => {
			setAlertOnMessage(false);
		}, 2000);
	};

	useEffect(() => {
		if (mqttInventoryNotification == null) return;
		if (inventoryNotifications == null) {
			setInventoryNotifications([mqttInventoryNotification]);
			handleActivate();
			return;
		}

		handleActivate();

		var tempInventoryNotification: any[] = [];
		var alertExists = false;

		inventoryNotifications.forEach((notification) => {
			if (notification.Id === mqttInventoryNotification.Id) {
				alertExists = true;
				notification = mqttInventoryNotification;
			}

			if (notification.Status === "Pending")
				tempInventoryNotification.push(notification);
		});
		if (!alertExists) tempInventoryNotification.push(mqttInventoryNotification);

		setInventoryNotifications(tempInventoryNotification);
		setMqttInventoryNotification(null);
	}, [mqttInventoryNotification, setMqttInventoryNotification]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleClickOutside = (event: any) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(event.target as Node) &&
			buttonRef.current &&
			!buttonRef.current.contains(event.target as Node)
		) {
			setAlertModel(false);
		}
	};

	useEffect(() => {
		if (alertModel) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [alertModel]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		fetchInventoryNotificationData({
			currPage,
			setLoading,
			setError,
			setMaxPages,
			setInventoryNotifications,
		});
	}, [currPage]);
	const handleSubmit = (id: number, restockAmt: number) => {
		setAlertModel(false);
		setAddInventoryId(id);
		setAddInventoryRestock(restockAmt);
		setAddInventoryModel(true);
	};
	return (
		<div className="relative flex justify-center items-center">
			<div ref={buttonRef}>
				<TbBellRinging
					className={`bg-primary rounded-full cursor-pointer text-white p-2 text-5xl ${
						alertOnMessage && "hithere"
					}`}
					onClick={() => {
						setAddInventoryModel(false);
						setAlertModel(!alertModel);
					}}
				/>
			</div>
			{alertModel && (
				<div
					className="absolute z-20 right-5 top-10 bg-white rounded-md border shadow-lg px-5 py-4 flex flex-col w-[450px] "
					ref={modalRef}
				>
					<div className="flex items-center justify-between z-10 ">
						<h1 className="text-xl font-bold mb-5 select-none">
							Notification History
						</h1>
					</div>
					{error && <ErrorPage error={error} setError={setError} />}
					{!loading && (
						<div className=" mx-5 my-2 p-5 flex flex-col justify-center items-center text-center min-h-[550px]">
							<Loading />;
						</div>
					)}
					<div className="flex flex-col gap-4 justify-center items-center">
						{inventoryNotifications?.map((n, i) => {
							return (
								<div
									className="p-4 shadow-md rounded-md max-w-md mx-auto flex flex-col justify-center items-start text-left bg-secondary"
									key={n.Id}
								>
									<h2 className="text-lg font-bold mb-2 text-primary">
										⚠️ Low Stock Alert (Alert Level : {n.AlertLevel})
									</h2>
									<p className="text-gray-700 mb-4">
										The stock for <strong>"{n.Product.Name}"</strong> (ID:{" "}
										<strong>{n.ProductId}</strong>) is below the threshold
										level. Current stock:{" "}
										<strong>{n.Product.CurrentStock}</strong> units. Please
										reorder soon to avoid stock outs.
									</p>
									<button
										className="bg-primary text-white px-4 py-2 rounded w-full flex justify-center items-center gap-2"
										onClick={() => {
											handleSubmit(
												n.ProductId,
												Math.ceil(n.Product.AverageDailyUsage * 90 + 10)
											);
										}}
									>
										<MdOutlineAddShoppingCart className="text-2xl" />
										<div className="font-semibold">Add New Stock</div>
									</button>
								</div>
							);
						})}
						{(!inventoryNotifications ||
							inventoryNotifications.length === 0) && (
							<div className="overflow-hidden mb-5 select-none">
								<img
									src="/gif/noNotification.gif"
									alt="Login Gif"
									className="h-[45%] scale-105"
								/>
								<div className="text-2xl font-light">No Notification</div>
							</div>
						)}
						{inventoryNotifications && inventoryNotifications.length !== 0 && (
							<div className="flex justify-between items-center px-5 pt-4 text-md w-full">
								<div
									className={
										"flex select-none items-center gap-2 border-2 rounded-full py-2 px-4 cursor-pointer font-bold" +
										(currPage <= 1
											? " border-ternary text-ternary"
											: " border-primary text-primary hover:bg-primary hover:text-white")
									}
									onClick={() => {
										if (currPage > 1) setCurrPage(currPage - 1);
									}}
								>
									<GrLinkPrevious />
									Previous
								</div>

								<div>
									{currPage} / {maxPages}
								</div>

								<div
									className={
										"flex select-none items-center gap-2 border-2 rounded-full py-2 px-4 cursor-pointer font-bold" +
										(currPage >= maxPages
											? " border-ternary text-ternary"
											: " border-primary text-primary hover:bg-primary hover:text-white")
									}
									onClick={() => {
										if (currPage < maxPages) setCurrPage(currPage + 1);
									}}
								>
									Next
									<GrLinkNext />
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default AlertNotificationButton;
