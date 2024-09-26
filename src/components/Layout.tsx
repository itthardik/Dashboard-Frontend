import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useConfig } from "./../api/ContextApi";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { toast } from "react-toastify";
import mqtt, { IClientOptions } from "mqtt";
import Loading from "./Loading";
import ErrorPage from "../pages/ErrorPage";
import { refreshToken } from "../api/authContoller";

export const Layout = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>();

	const {
		setUserData,
		setMqttClient,
		connection,
		setConnection,
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

	// adding new SingnalR connection and mqtt client with basic event (onConnect, onMessage)
	useEffect(() => {
		try {
			if (userData === null) return;

			setUserData(userData);
			// Setup SignalR connection
			const newConnection = new HubConnectionBuilder()
				.withUrl("https://localhost:7012/mqtthub")
				.withAutomaticReconnect()
				.build();

			setConnection(newConnection);

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

			client.on("message", (topic: any, message: any) => {
				if (topic === "inventory/orderItems") {
					setMqttInventoryMessages(JSON.parse(message));
				} else if (topic === "inventory/notificationAlert") {
					setMqttInventoryNotification(JSON.parse(message));
				} else if (topic === "sales/salesByCategory") {
					setMqttSalesByCategory(JSON.parse(message));
				} else if (topic === "sales/overallSales") {
					setMqttOverallSales(JSON.parse(message));
				} else {
					console.log(topic);
					console.log(JSON.parse(message));
				}
			});
			client.on("error", (e: any) => {
				client.end();
				setMqttClient(null);
				setConnection(null);
				throw new Error(e.message);
			});

			return () => {
				client.end();
			};
		} catch (ex: any) {
			toast.error(ex.message);
		}
	}, [userData, setUserData]); // eslint-disable-line react-hooks/exhaustive-deps

	// starting signalR connection and adding the on receive and on start events
	// only when new connection is made
	useEffect(() => {
		if (userData === null) return;
		if (connection != null) {
			connection
				.start()
				.then((result: any) => {
					// toast.success("Connected to SignalR hub");
					connection.on("ReceiveMessage", (topic: any, message: any) => {});
				})
				.catch((e: any) => {
					// toast.error("Connection failed: ", e);
				});
		}
	}, [connection, userData]);

	if (!loading)
		return (
			<div className="flex flex-col justify-center items-center text-center h-lvh">
				<Loading />;
			</div>
		);
	else if (error) {
		return (
			<div className="flex flex-col justify-center items-center text-center h-lvh">
				<ErrorPage error={error} />;
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
//todo
//throw request with the script
