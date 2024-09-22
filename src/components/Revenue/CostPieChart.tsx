import React, { useEffect, useRef } from "react";
import {
	Chart,
	DoughnutController,
	ArcElement,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ProductData } from "../../model/ProductType";

// Register the required components
Chart.register(
	DoughnutController,
	ArcElement,
	Tooltip,
	Legend,
	ChartDataLabels
);

interface CostPieChartProps {
	data: ProductData | undefined;
}

const CostPieChart: React.FC<CostPieChartProps> = ({ data }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstanceRef = useRef<Chart<"doughnut"> | null>(null);

	useEffect(() => {
		const total =
			data != null
				? data.costPrice +
				  data.sellingPrice +
				  data.shippingCost +
				  data.discount +
				  data.netProfit
				: 0;

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
						data?.costPrice ?? 0,
						data?.sellingPrice ?? 0,
						data?.shippingCost ?? 0,
						data?.discount ?? 0,
						data?.netProfit ?? 0,
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
				datalabels: {
					color: "#fff",
					formatter: (value: number) => {
						const percentage = ((value / total) * 100).toFixed(2);
						return `${percentage}%`;
					},
					font: {
						size: 18,
						weight: "bold",
						style: "oblique",
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
