export interface ProductData {
	id: number; // Unique identifier for the product
	name: string; // Name of the product
	categoryId: number | null; // ID of the category or null if not assigned
	category: string | null; // Name of the category or null if not assigned
	supplierId: number | null; // ID of the supplier or null if not assigned
	supplier: string | null; // Name of the supplier or null if not assigned
	currentStock: number; // Current stock level of the product
	reorderPoint: number; // Reorder point for the product
	costPrice: number; // Cost price (expected to be a decimal)
	sellingPrice: number; // Selling price (expected to be a decimal)
	discount: number; // Discount on the product (expected to be a decimal)
	shippingCost: number; // Shipping cost (expected to be a decimal)
	netProfit: number; // Net profit for the product (expected to be a decimal)
	averageDailyUsage: number; // Average daily usage (expected to be a decimal)
	orderItems: any[]; // Array of order items associated with the product
	createdAt: string; // Timestamp of product creation
	updatedAt: string | null; // Timestamp of the last update, or null if not updated
}
