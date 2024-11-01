import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useConfig } from "./../api/ContextApi";
import { toast } from "react-toastify";
import mqtt, { IClientOptions } from "mqtt";
import Loading from "./Loading";
import ErrorPage from "../pages/ErrorPage";
import { refreshToken } from "../api/authContoller";

export const Layout = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>();

	const {
		setUserData,
		setMqttClient,
		userData,
		setMqttInventoryMessages,
		setMqttInventoryNotification,
		setMqttSalesByCategory,
		setMqttOverallSales,
	} = useConfig();

	useEffect(() => {
		const checkTokenExpiration = () => {
			if (userData === null) return;

			const tokenExpirationTime = new Date(
				userData.TokenExpirationTime
			).getTime();
			const dateNow = new Date().getTime();
			if (
				dateNow > tokenExpirationTime - 60 * 1000 &&
				dateNow < tokenExpirationTime
			) {
				refreshToken({ setUserData, setLoading, setError });
			}
		};

		const intervalId = setInterval(checkTokenExpiration, 60 * 1000);

		return () => clearInterval(intervalId);
	}, [userData, setUserData]);

	useEffect(() => {
		try {
			if (userData === null) return;

			setUserData(userData);

			const options: IClientOptions = {
				host: "localhost",
				port: 9001,
				username: userData.Username,
				password: userData.SessionToken,
			};
			// Setup MQTT client
			const client = mqtt.connect("ws://localhost:9001", options);
			client.on("connect", () => {
				setMqttClient(client);
				// toast.success("Connected to broker");
			});
			client.on("close", () => {
				client.end();
				// toast.error("Disconnected to broker");
				setMqttClient(null);
			});

			client.on("message", (topic: string, message: Buffer) => {
				const messageStr = message.toString();
				if (topic === "inventory/orderItems") {
					setMqttInventoryMessages(JSON.parse(messageStr));
				} else if (topic === "inventory/notificationAlert") {
					console.log(JSON.parse(messageStr));
					setMqttInventoryNotification(JSON.parse(messageStr));
				} else if (topic === "sales/salesByCategory") {
					setMqttSalesByCategory(JSON.parse(messageStr));
				} else if (topic === "sales/overallSales") {
					setMqttOverallSales(JSON.parse(messageStr));
				} else {
					console.log(topic);
					console.log(JSON.parse(messageStr));
				}
			});
			client.on("error", (e: Error) => {
				client.end();
				setMqttClient(null);
				throw new Error(e.message);
			});

			return () => {
				client.end();
			};
		} catch (ex) {
			if (ex instanceof Error) {
				toast.error(ex.message);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	}, [userData, setUserData]); // eslint-disable-line react-hooks/exhaustive-deps

	if (!loading)
		return (
			<div className="flex flex-col justify-center items-center text-center h-lvh">
				<Loading />;
			</div>
		);
	else if (error) {
		return (
			<div className="flex flex-col justify-center items-center text-center h-lvh">
				<ErrorPage error={error} setError={setError} />;
			</div>
		);
	} else
		return (
			<div className="flex sm:flex-row flex-col bg-white justify-center h-full">
				<NavBar setLoading={setLoading} setError={setError} />
				<div className="h-full sm:w-5/6 w-full flex flex-col justify-center items-center text-center">
					<Outlet />
				</div>
			</div>
		);
};
