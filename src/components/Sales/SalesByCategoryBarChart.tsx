import React, { useEffect, useRef } from "react";
import {
	Chart,
	ChartData,
	ChartOptions,
	CategoryScale,
	LinearScale,
	BarElement,
	BarController,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

// Register Chart.js components
Chart.register(
	CategoryScale,
	LinearScale,
	BarElement,
	BarController,
	Title,
	Tooltip,
	Legend
);

interface SalesByCategoryBarChartProps {
	data: {
		categoryId: number;
		category: string;
		totalSales: number;
	}[];
}

const SalesByCategoryBarChart: React.FC<SalesByCategoryBarChartProps> = ({
	data,
}) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstanceRef = useRef<Chart<"bar"> | null>(null);

	useEffect(() => {
		// Extract labels and data
		const labels = data.map((item) => item.category);
		const salesData = data.map((item) => item.totalSales);

		// Chart data configuration
		const chartData: ChartData<"bar"> = {
			labels: labels,
			datasets: [
				{
					label: "Sales",
					data: salesData,
					backgroundColor: "rgba(75, 192, 192, 0.5)",
					borderColor: "rgba(75, 192, 192, 1)",
					borderWidth: 1,
					stack: "stack0",
				},
			],
		};

		// Chart options configuration
		const chartOptions: ChartOptions<"bar"> = {
			responsive: true,
			animation: false, // Turn off animations
			indexAxis: "y", // Make bars horizontal
			plugins: {
				legend: {
					position: "top",
				},
				tooltip: {
					callbacks: {
						label: function (tooltipItem) {
							const label = tooltipItem.dataset.label || "";
							if (label) {
								return `${label}: ${tooltipItem.raw}`;
							}
							return "";
						},
					},
				},
				datalabels: {
					display: (context) => {
						const value = context.dataset.data[context.dataIndex];
						return value !== 0;
					},
					color: "black",
				},
			},
			scales: {
				x: {
					stacked: true,
					max: Math.ceil(Math.max(...salesData) * 1.1),
				},
				y: {
					stacked: true,
					beginAtZero: true,
				},
			},
		};

		const ctx = chartRef.current?.getContext("2d");
		if (ctx && chartRef.current) {
			// Destroy the previous chart instance if it exists
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}

			// Create new chart instance with type 'bar'
			chartInstanceRef.current = new Chart<"bar">(ctx, {
				type: "bar",
				data: chartData,
				options: chartOptions,
			});
		}

		// Cleanup the chart instance when component unmounts
		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
			}
		};
	}, [data]);

	return (
		<div className="w-full px-10 pt-5">
			<canvas ref={chartRef} />
		</div>
	);
};

export default SalesByCategoryBarChart;
