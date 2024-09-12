import { toast } from "react-toastify";
import { useConfig } from "./ContextApi";

export const subscribeToTopic = (topic: any) => {
	try {
		const { mqttClient } = useConfig();
		if (!mqttClient) return;

		mqttClient.subscribe(topic, { qos: 0 });
	} catch (e: any) {
		toast.error("Login Required!");
	}
};

export const publishMessage = (topic: any, message: any) => {
	try {
		const { mqttClient } = useConfig();
		if (!mqttClient) return;

		mqttClient.publish(topic, message);
	} catch (e: any) {
		toast.error("Login Required!");
	}
};
