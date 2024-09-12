import { createContext, ReactNode, useContext, useState } from "react";
import { GetCookieData } from "../utility/GetCookieData";
import mqtt from "mqtt/*";
import { HubConnection } from "@microsoft/signalr";

interface ConfigContextType {
	userData: any;
	setUserData: React.Dispatch<any>;
	mqttClient: mqtt.MqttClient | null;
	setMqttClient: React.Dispatch<React.SetStateAction<mqtt.MqttClient | null>>;
	connection: HubConnection | null;
	setConnection: React.Dispatch<React.SetStateAction<HubConnection | null>>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
	const [userData, setUserData] = useState(GetCookieData());
	const [mqttClient, setMqttClient] = useState<mqtt.MqttClient | null>(null);
	const [connection, setConnection] = useState<HubConnection | null>(null);

	return (
		<ConfigContext.Provider
			value={{
				userData,
				setUserData,
				mqttClient,
				setMqttClient,
				connection,
				setConnection,
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
