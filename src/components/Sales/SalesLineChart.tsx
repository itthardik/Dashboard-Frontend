import React, { useEffect, useRef } from "react";
import {
	Chart,
	LineElement,
	PointElement,
	LineController,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
} from "chart.js";

// Register necessary Chart.js components
Chart.register(
	LineElement,
	PointElement,
	LineController,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend
);

interface SalesLineChartProps {
	data: {
		id: number;
		createdAt: string;
		quantity: number; // Ensure quantity is included
	}[];
}

const SalesLineChart: React.FC<SalesLineChartProps> = ({ data }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const chartInstanceRef = useRef<Chart<"line"> | null>(null);

	useEffect(() => {
		// Only proceed if there is data
		// if (!data || data.length === 0) return;

		const { labels, values } = processSalesData(data);

		const chartData: ChartData<"line"> = {
			labels: labels,
			datasets: [
				{
					label: "Sales",
					data: values,
					// fill: false,
					borderColor: "rgba(75, 192, 192, 1)",
					tension: 0.1,
				},
			],
		};

		const chartOptions: ChartOptions<"line"> = {
			responsive: true,
			animation: false,
			plugins: {
				datalabels: {
					// Use a function to control visibility based on value
					display: (context) => {
						const value = context.dataset.data[context.dataIndex];
						return value !== 0; // Show label only if the value is greater than 0
					},
					color: "black", // Optional: Set the color for the data labels
				},
			},
			scales: {
				x: {
					type: "category",
					title: {
						display: true,
						text: "Time",
					},
				},
				y: {
					beginAtZero: true,
					max: Math.ceil(Math.max(...values) * 1.1),
					title: {
						display: true,
						text: "Sales",
					},
				},
			},
		};

		const ctx = chartRef.current?.getContext("2d");
		if (ctx) {
			if (chartInstanceRef.current) {
				// Update existing chart
				chartInstanceRef.current.data.labels = labels;
				chartInstanceRef.current.data.datasets[0].data = values;
				chartInstanceRef.current.update();
			} else {
				// Create new chart
				chartInstanceRef.current = new Chart<"line">(ctx, {
					type: "line",
					data: chartData,
					options: chartOptions,
				});
			}
		} else {
			console.error(
				"Canvas context is null. Check if the canvas is rendered properly."
			);
		}

		// Cleanup chart on component unmount
		return () => {
			if (chartInstanceRef.current) {
				chartInstanceRef.current.destroy();
				chartInstanceRef.current = null; // Clear the reference
			}
		};
	}, [data]);

	return <canvas ref={chartRef} />;
};

export default SalesLineChart;

const processSalesData = (orderItems: any[]) => {
	const orderCounts: { [key: string]: number } = {};
	const gap = 15;
	for (let hour = 0; hour < 24; hour++) {
		for (let minute = 0; minute < 60; minute += gap) {
			const timeKey = `${String(hour).padStart(2, "0")}:${String(
				minute
			).padStart(2, "0")}`;
			orderCounts[timeKey] = 0; // Set default value to zero
		}
	}

	orderItems.forEach((item) => {
		const date = new Date(item.createdAt);
		const hour = `${date.getHours().toString().padStart(2, "0")}:${(
			Math.floor(date.getMinutes() / gap) * gap
		)
			.toString()
			.padStart(2, "0")}`;

		if (orderCounts[hour] >= 0) {
			orderCounts[hour] += item.quantity; // Ensure quantity is used
		} else {
			orderCounts[hour] = item.quantity;
		}
	});

	const labels = Object.keys(orderCounts);
	const values = Object.values(orderCounts);

	return { labels, values };
};
