import { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import InventoryGrid from "../components/Inventory/InventoryGrid";
import { useSearchParams } from "react-router-dom";
import { ProductData } from "../model/ProductType";
import AddInventoryButton from "../components/Inventory/AddInventoryButton";
import { useConfig } from "../api/ContextApi";
import { subscribeToTopic, unsubscribeToTopic } from "../api/mqttController";
import { toast } from "react-toastify";
import AlertNotificationButton from "../components/Inventory/AlertNotificationButton";

const Inventory = () => {
	const { mqttInventoryMessages, setMqttInventoryMessages } = useConfig();
	const [error, setError] = useState<any>();
	const [addInventoryId, setAddInventoryId] = useState<number>(0);
	const [addInventoryRestock, setAddInventoryRestock] = useState<number>(0);
	const [addInventoryModel, setAddInventoryModel] = useState(false);
	const [alertModel, setAlertModel] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [currPage, setCurrPage] = useState(
		parseInt(searchParams.get("page") ?? "1")
	);
	const [inventoryData, setInventoryData] = useState<ProductData[] | null>(
		null
	);
	const { mqttClient } = useConfig();
	const [sortFilterKey, setSortFilterKey] = useState<string>(
		searchParams.get("sortFilterKey") ?? "lowToHighStock"
	);
	const [updateFilterKey, setUpdateFilterKey] = useState<string>(
		searchParams.get("updateFilterKey") ?? "static"
	);

	useEffect(() => {
		if (mqttClient) {
			if (updateFilterKey === "realtime") {
				subscribeToTopic("inventory/#", mqttClient);
				toast.success("Updates are Realtime");
			} else unsubscribeToTopic("inventory/#", mqttClient);
		}
	}, [updateFilterKey, mqttClient]);

	useEffect(() => {
		if (inventoryData == null) return;

		var tempInventory: any[] = [];

		mqttInventoryMessages.forEach((message) => {
			inventoryData.forEach((inventory) => {
				if (inventory.id === message.ProductId) {
					inventory.currentStock -= message.Quantity;
					inventory.updatedAt = Date();
				}

				tempInventory.push(inventory);
			});
		});

		setInventoryData(tempInventory);
	}, [mqttInventoryMessages, setMqttInventoryMessages]); // eslint-disable-line react-hooks/exhaustive-deps

	if (error) {
		return <ErrorPage error={error} />;
	}

	return (
		<>
			<div className="w-full h-full flex flex-col gap-2">
				<div className="my-3 flex justify-center items-center gap-2 relative">
					<img
						src="./../images/logo.png"
						alt="Login Gif"
						className="w-[60px]"
					/>
					<h1 className="text-3xl font-bold">Inventory Management</h1>
					<div className="flex gap-3 absolute right-10">
						<AddInventoryButton
							inventoryData={inventoryData}
							addInventoryModel={addInventoryModel}
							addInventoryRestock={addInventoryRestock}
							setAddInventoryModel={setAddInventoryModel}
							setAlertModel={setAlertModel}
							setInventoryData={setInventoryData}
							setError={setError}
							addInventoryId={addInventoryId}
						/>
						<AlertNotificationButton
							alertModel={alertModel}
							setAlertModel={setAlertModel}
							setAddInventoryModel={setAddInventoryModel}
							setAddInventoryId={setAddInventoryId}
							setAddInventoryRestock={setAddInventoryRestock}
						/>
					</div>
				</div>
				<InventoryGrid
					currPage={currPage}
					sortFilterKey={sortFilterKey}
					updateFilterKey={updateFilterKey}
					setSortFilterKey={setSortFilterKey}
					setUpdateFilterKey={setUpdateFilterKey}
					inventoryData={inventoryData}
					setInventoryData={setInventoryData}
					setCurrPage={setCurrPage}
					setSearchParams={setSearchParams}
					setError={setError}
				/>
			</div>
		</>
	);
};

export default Inventory;
