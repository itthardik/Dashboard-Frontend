import { useConfig } from "../api/ContextApi";
import { subscribeToTopic } from "../api/mqttController";

const Sales = () => {
	const { mqttClient } = useConfig();
	subscribeToTopic("sales", mqttClient);
	return <div>Sales</div>;
};

export default Sales;
