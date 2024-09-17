import React, { useEffect, useRef } from "react";
import { Chart, ChartData, ChartOptions } from "chart.js/auto";

interface CostData {
	costPrice: number;
	sellingPrice: number;
	shippingCost: number;
	discount: number;
	netProfit: number;
}

interface CostPieChartProps {
	data: CostData;
}

const CostPieChart: React.FC<CostPieChartProps> = ({ data }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstanceRef = useRef<Chart<"doughnut"> | null>(null);

	useEffect(() => {
		const total =
			data.costPrice +
			data.sellingPrice +
			data.shippingCost +
			data.discount +
			data.netProfit;
		const chartData: ChartData<"doughnut"> = {
			labels: [
				"Cost Price",
				"Selling Price",
				"Shipping Cost",
				"Discount",
				"Net Profit",
			],
			datasets: [
				{
					data: [
						data.costPrice,
						data.sellingPrice,
						data.shippingCost,
						data.discount,
						data.netProfit,
					],
					backgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56",
						"#4BC0C0",
						"#9966FF",
					],
					hoverBackgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56",
						"#4BC0C0",
						"#9966FF",
					],
				},
			],
		};

		const chartOptions: ChartOptions<"doughnut"> = {
			responsive: true,
			plugins: {
				legend: {
					position: "right",
				},
				tooltip: {
					callbacks: {
						label: function (tooltipItem) {
							const label = tooltipItem.label || "";
							const value = tooltipItem.raw as number;
							const percentage = ((value / total) * 100).toFixed(2);
							return `${label}: ${value} (${percentage}%)`;
						},
					},
				},
			},
			cutout: "50%",
		};

		const ctx = chartRef.current?.getContext("2d");
		if (ctx) {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}

			chartInstanceRef.current = new Chart<"doughnut">(ctx, {
				type: "doughnut",
				data: chartData,
				options: chartOptions,
			});
		}

		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}
		};
	}, [data]);

	return <canvas ref={chartRef} />;
};

export default CostPieChart;
