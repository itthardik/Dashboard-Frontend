import { toast } from "react-toastify";
import { MqttClient } from "mqtt/*";

export const subscribeToTopic = (topic: any, mqttClient: MqttClient | null) => {
	try {
		if (!mqttClient) return;
		mqttClient.subscribe(topic, { qos: 0 });
	} catch (e: any) {
		toast.error("Login Required!");
	}
};
export const unsubscribeToTopic = (
	topic: any,
	mqttClient: MqttClient | null
) => {
	try {
		if (!mqttClient) return;

		mqttClient.unsubscribe(topic);
	} catch (e: any) {
		toast.error("Login Required!");
	}
};

// export const publishMessage = (topic: any, message: any) => {
// 	try {
// 		const { mqttClient } = useConfig();
// 		if (!mqttClient) return;

// 		mqttClient.publish(topic, message);
// 	} catch (e: any) {
// 		toast.error("Login Required!");
// 	}
// };
