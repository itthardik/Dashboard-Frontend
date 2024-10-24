import { createContext, ReactNode, useContext, useState } from "react";
import { GetCookieData } from "../utility/GetCookieData";
import mqtt from "mqtt/*";
import {
	ConfigContextType,
	CookieData,
	MqttInventoryMessage,
	MqttInventoryNotification,
	MqttOverallSales,
	MqttSalesByCategory,
} from "../model/Types";

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
	const [userData, setUserData] = useState<CookieData>(GetCookieData());

	const [mqttClient, setMqttClient] = useState<mqtt.MqttClient | null>(null);

	const [mqttInventoryMessages, setMqttInventoryMessages] = useState<
		MqttInventoryMessage[]
	>([]);

	const [mqttInventoryNotification, setMqttInventoryNotification] =
		useState<MqttInventoryNotification | null>(null);

	const [mqttSalesByCategory, setMqttSalesByCategory] =
		useState<MqttSalesByCategory | null>(null);

	const [mqttOverallSales, setMqttOverallSales] =
		useState<MqttOverallSales | null>(null);
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
