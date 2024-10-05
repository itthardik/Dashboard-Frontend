import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Title,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

const LiveLineChart = ({
	last10minDataPoint,
	last10minLabel,
	newDataPoint,
	newLabel,
}: {
	last10minDataPoint: number[];
	last10minLabel: string[];
	newDataPoint: number | null;
	newLabel: string | null;
}) => {
	const chartRef = useRef<any>(null);
	const [chartData, setChartData] = useState<number[]>(last10minDataPoint);
	const [labels, setLabels] = useState<string[]>(last10minLabel);

	const addNewData = () => {
		setChartData((prevData) => [...prevData, newDataPoint!].slice(-10));
		setLabels((prevLabels) => [...prevLabels, newLabel!].slice(-10));

		if (chartRef.current) {
			const chart = chartRef.current;

			chart.data.labels = [...labels, newLabel].slice(-10);
			chart.data.datasets[0].data = [...chartData, newDataPoint].slice(-10);
			chart.update();
		}
	};

	useEffect(() => {
		setChartData(last10minDataPoint);
		setLabels(last10minLabel);
	}, [last10minDataPoint, last10minLabel]);
	useEffect(() => {
		if (newDataPoint != null || newLabel != null) addNewData();
	}, [newDataPoint, newLabel]); // eslint-disable-line react-hooks/exhaustive-deps

	const data = {
		labels: labels,
		datasets: [
			{
				label: "Real-Time Sales",
				data: chartData,
				fill: false,
				backgroundColor: "rgb(75, 192, 192)",
				borderColor: "rgba(75, 192, 192, 0.2)",
				tension: 0,
				borderWidth: 4,
			},
		],
	};

	const options = {
		responsive: true,
		animation: {
			duration: 0,
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Time",
				},
			},
			y: {
				title: {
					display: true,
					text: "Sales",
				},
				min: 0,
			},
		},
	};

	return (
		<div className="w-full px-10 pt-5">
			<Line ref={chartRef} data={data} options={options} />;
		</div>
	);
};

export default LiveLineChart;
