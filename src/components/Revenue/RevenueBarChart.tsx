// src/RevenueBarChart.tsx
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

interface RevenueBarChartProps {
	data: {
		categoryName: string;
		revenue: number;
		profit: number;
	}[];
}

const RevenueBarChart: React.FC<RevenueBarChartProps> = ({ data }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstanceRef = useRef<Chart<"bar"> | null>(null);

	useEffect(() => {
		// Extract labels and data
		const labels = data.map((item) => item.categoryName);
		const revenueData = data.map((item) => item.revenue);
		const profitData = data.map((item) => item.profit);

		// Chart data configuration
		const chartData: ChartData<"bar"> = {
			labels: labels,
			datasets: [
				{
					label: "Revenue",
					data: revenueData,
					backgroundColor: "rgba(75, 192, 192, 0.5)",
					borderColor: "rgba(75, 192, 192, 1)",
					borderWidth: 1,
					stack: "stack0",
				},
				{
					label: "Profit",
					data: profitData,
					backgroundColor: "rgba(153, 102, 255, 0.5)",
					borderColor: "rgba(153, 102, 255, 1)",
					borderWidth: 1,
					stack: "stack1",
				},
			],
		};

		// Chart options configuration
		const chartOptions: ChartOptions<"bar"> = {
			responsive: true,
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

export default RevenueBarChart;
