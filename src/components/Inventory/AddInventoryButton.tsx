import React, { useEffect, useRef, useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { addInventory } from "../../api/inventoryController";
import { ProductData } from "../../model/ProductType";

const AddInventoryButton = ({
	inventoryData,
	addInventoryModel,
	addInventoryId,
	setAddInventoryModel,
	setAlertModel,
	addInventoryRestock,
	setInventoryData,
	setError,
}: {
	inventoryData: ProductData[] | null;
	addInventoryModel: boolean;
	addInventoryId: number;
	addInventoryRestock: number;
	setAddInventoryModel: React.Dispatch<React.SetStateAction<boolean>>;
	setAlertModel: React.Dispatch<React.SetStateAction<boolean>>;
	setInventoryData: React.Dispatch<React.SetStateAction<ProductData[] | null>>;
	setError: React.Dispatch<any>;
}) => {
	const [loading, setLoading] = useState(true);

	const [productId, setProductId] = useState<number>(addInventoryId);
	const [requiredStock, setRequiredStock] =
		useState<number>(addInventoryRestock);

	const modalRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = (event: any) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(event.target as Node) &&
			buttonRef.current &&
			!buttonRef.current.contains(event.target as Node)
		) {
			setAddInventoryModel(false);
		}
	};

	useEffect(() => {
		if (addInventoryModel) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [addInventoryModel]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setProductId(addInventoryId);
		setRequiredStock(addInventoryRestock);
	}, [addInventoryId]); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div className=" relative flex justify-center items-center">
			<div ref={buttonRef}>
				<MdOutlineAddShoppingCart
					className="text-white text-5xl bg-primary rounded-full p-2 cursor-pointer select-none "
					onClick={() => {
						setAddInventoryModel(!addInventoryModel);
						setAlertModel(false);
						setProductId(0);
						setRequiredStock(0);
					}}
				/>
			</div>
			{addInventoryModel && (
				<div
					className="absolute z-20 right-5 bg-secondary rounded-md shadow-lg px-10 py-8 flex flex-col w-96 top-10"
					ref={modalRef}
				>
					<div className="flex items-center justify-center z-10 ">
						<h1 className="text-xl font-bold">Add Inventory</h1>
					</div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (inventoryData)
								addInventory({
									productId: productId,
									stockRequire: requiredStock,
									setProductId,
									setRequiredStock,
									inventoryData,
									setLoading,
									setError,
									setAddInventoryModel,
									setInventoryData,
								});
						}}
						className="pt-8 w-full"
					>
						<div className="mb-4">
							<label
								htmlFor="productId"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Product ID
							</label>
							<input
								type="number"
								id="productId"
								value={productId}
								onChange={(e) => setProductId(parseInt(e.target.value ?? 0))}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ternary focus:border-ternary"
								required
							/>
						</div>

						<div className="mb-4">
							<label
								htmlFor="requiredStock"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Required Stock
							</label>
							<input
								type="number"
								id="requiredStock"
								value={requiredStock}
								onChange={(e) => setRequiredStock(parseInt(e.target.value))}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ternary focus:border-ternary"
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-ternary text-white py-2 px-4 rounded-md hover:bg-ternary focus:outline-none focus:ring-2 focus:ring-ternary focus:ring-offset-2"
						>
							Submit
						</button>
					</form>

					{!loading && (
						<div className="absolute w-full left-0 h-full top-0 text-4xl font-bold flex justify-center items-center rounded-md z-30 backdrop-blur-sm">
							<img src="/gif/loading.gif" alt="user Gif" className="max-h-24" />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default AddInventoryButton;
