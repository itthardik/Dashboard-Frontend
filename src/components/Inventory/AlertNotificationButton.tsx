import React, { useEffect, useState } from "react";
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
	const [inventoryNotifications, setInventoryNotifications] = useState<
		any[] | null
	>([]);
	const { mqttInventoryNotification, setMqttInventoryNotification } =
		useConfig();

	useEffect(() => {
		if (inventoryNotifications == null) return;
		if (mqttInventoryNotification == null) return;

		var tempInventoryNotification: any[] = [];
		var alertExists = false;

		inventoryNotifications.map((notification) => {
			if (notification.Id === mqttInventoryNotification.Id) {
				console.log(notification, mqttInventoryNotification);
				alertExists = true;
				notification = mqttInventoryNotification;
			}

			if (notification.Status === "Pending")
				tempInventoryNotification.push(notification);
		});
		if (!alertExists) tempInventoryNotification.push(mqttInventoryNotification);

		setInventoryNotifications(tempInventoryNotification);
	}, [mqttInventoryNotification, setMqttInventoryNotification]);

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
		<div className="bg-primary rounded-full p-2 cursor-pointer relative">
			<TbBellRinging
				className="text-white text-3xl"
				onClick={() => {
					setAddInventoryModel(false);
					setAlertModel(!alertModel);
				}}
			/>
			{alertModel && (
				<div className="absolute z-20 right-5 bg-white rounded-md border shadow-lg px-5 py-4 flex flex-col w-[450px]">
					<div className="flex items-center justify-between z-10 ">
						<h1 className="text-xl font-bold mb-5">Notification History</h1>
					</div>
					{error && <ErrorPage error={error} />}
					{!loading && (
						<div className=" mx-5 my-2 p-5 flex flex-col justify-center items-center text-center min-h-[550px]">
							<Loading />;
						</div>
					)}
					<div className="flex flex-col gap-4 justify-center items-center">
						{inventoryNotifications?.map((n) => {
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
										onClick={() =>
											handleSubmit(
												n.ProductId,
												Math.ceil(n.Product.AverageDailyUsage * 90 + 10)
											)
										}
									>
										<MdOutlineAddShoppingCart className="text-2xl" />
										<div className="font-semibold">Add New Stock</div>
									</button>
								</div>
							);
						})}
						{inventoryNotifications?.length === 0 && (
							<div className="overflow-hidden mb-5">
								<img
									src="/gif/noNotification.gif"
									alt="Login Gif"
									className="h-[45%] scale-105"
								/>
								<div className="text-2xl font-light">No Notification</div>
							</div>
						)}
						{inventoryNotifications?.length !== 0 && (
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
