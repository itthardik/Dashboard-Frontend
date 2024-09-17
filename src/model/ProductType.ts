export interface ProductData {
	id: number;
	name: string;
	costPrice: number;
	sellingPrice: number;
	shippingCost: number;
	discount: number;
	netProfit: number;
	thresholdValue: number;
	categoryId: number;
	currentStock: number;
	supplierId: number;
	createdAt: string;
	updatedAt: string | null;
	category: any;
	orderItems: any[];
	supplier: any;
}
