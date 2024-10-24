import mqtt from "mqtt/*";

export type CookieData = {
	[key: string]: string;
} | null;

export type MqttInventoryMessage = {
	ProductId: number;
	Quantity: number;
};

// Define the types for sales by category
export type MqttSalesByCategory = {
	CategoryId: number;
	Quantity: number;
};

// Define the types for overall sales
export type MqttOverallSales = {
	TotalQuantity: number;
	CurrentDateTime: string;
};

// Main context type
export interface ConfigContextType {
	userData: CookieData;
	setUserData: React.Dispatch<React.SetStateAction<CookieData>>;

	mqttClient: mqtt.MqttClient | null;
	setMqttClient: React.Dispatch<React.SetStateAction<mqtt.MqttClient | null>>;

	mqttInventoryMessages: MqttInventoryMessage[];
	setMqttInventoryMessages: React.Dispatch<
		React.SetStateAction<MqttInventoryMessage[]>
	>;

	mqttInventoryNotification: MqttInventoryNotification | null; // Update this type
	setMqttInventoryNotification: React.Dispatch<
		React.SetStateAction<MqttInventoryNotification | null>
	>;

	mqttSalesByCategory: MqttSalesByCategory | null;
	setMqttSalesByCategory: React.Dispatch<
		React.SetStateAction<MqttSalesByCategory | null>
	>;

	mqttOverallSales: MqttOverallSales | null;
	setMqttOverallSales: React.Dispatch<
		React.SetStateAction<MqttOverallSales | null>
	>;
}

export type Product = {
	Id: number;
	Name: string;
	CostPrice: number;
	SellingPrice: number;
	ShippingCost: number;
	Discount: number;
	NetProfit: number;
	ReorderPoint: number;
	CategoryId: number;
	CurrentStock: number;
	SupplierId: number;
	CreatedAt: string;
	UpdatedAt: string;
	AverageDailyUsage: number;
	Alerts: any[]; // You can specify more details if needed
	Category: any; // Specify details if needed
	OrderItems: any[]; // Specify details if needed
	Supplier: any; // Specify details if needed
};

export type MqttInventoryNotification = {
	Id: number;
	ProductId: number;
	AlertLevel: number;
	NotifiedAt: string;
	Status: string;
	Product: Product;
};
