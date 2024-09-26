import { createContext, ReactNode, useContext, useState } from "react";
import { GetCookieData } from "../utility/GetCookieData";
import mqtt from "mqtt/*";

interface ConfigContextType {
	userData: any;
	setUserData: React.Dispatch<any>;
	mqttClient: mqtt.MqttClient | null;
	setMqttClient: React.Dispatch<React.SetStateAction<mqtt.MqttClient | null>>;
	mqttInventoryMessages: any[];
	setMqttInventoryMessages: React.Dispatch<React.SetStateAction<any[]>>;
	mqttInventoryNotification: any;
	setMqttInventoryNotification: React.Dispatch<React.SetStateAction<any>>;
	mqttSalesByCategory: { CategoryId: number; Quantity: number } | null;
	setMqttSalesByCategory: React.Dispatch<
		React.SetStateAction<{ CategoryId: number; Quantity: number } | null>
	>;
	mqttOverallSales: {
		TotalQuantity: number;
		CurrentDateTime: string;
	} | null;
	setMqttOverallSales: React.Dispatch<
		React.SetStateAction<{
			TotalQuantity: number;
			CurrentDateTime: string;
		} | null>
	>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
	const [mqttInventoryNotification, setMqttInventoryNotification] =
		useState<any>();
	const [userData, setUserData] = useState(GetCookieData());
	const [mqttClient, setMqttClient] = useState<mqtt.MqttClient | null>(null);
	const [mqttInventoryMessages, setMqttInventoryMessages] = useState<
		{ ProductId: number; Quantity: number }[]
	>([]);
	const [mqttSalesByCategory, setMqttSalesByCategory] = useState<{
		CategoryId: number;
		Quantity: number;
	} | null>(null);
	const [mqttOverallSales, setMqttOverallSales] = useState<{
		TotalQuantity: number;
		CurrentDateTime: string;
	} | null>(null);

	return (
		<ConfigContext.Provider
			value={{
				userData,
				setUserData,
				mqttClient,
				setMqttClient,
				mqttInventoryMessages,
				setMqttInventoryMessages,
				mqttInventoryNotification,
				setMqttInventoryNotification,
				mqttSalesByCategory,
				setMqttSalesByCategory,
				mqttOverallSales,
				setMqttOverallSales,
			}}
		>
			{children}
		</ConfigContext.Provider>
	);
};

export const useConfig = () => {
	const context = useContext(ConfigContext);
	if (!context) {
		throw new Error("useConfig must be used within a ConfigProvider");
	}
	return context;
};
