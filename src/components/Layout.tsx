import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { useConfig } from "./../api/ContextApi";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { toast } from "react-toastify";
import mqtt, { IClientOptions } from "mqtt";

export const Layout = () => {
	const { setUserData, setMqttClient, connection, setConnection, userData } =
		useConfig();
	// adding new SingnalR connection and mqtt client with basic event (onConnect, onMessage)
	useEffect(() => {
		try {
			if (userData === null) return;

			setUserData(userData);
			// Setup SignalR connection
			const newConnection = new HubConnectionBuilder()
				.withUrl("https://localhost:5043/mqtthub")
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
				toast.success("Connected to MQTT broker");
			});
			client.on("close", () => {
				client.end();
				toast.success("Disconnected to MQTT broker");
				setMqttClient(null);
			});

			client.on("message", (topic: any, message: any) => {
				const payload = { topic, message: message.toString() };
				// setMessages((prevMessages) => [...prevMessages, payload]);
			});
			client.on("error", (e: any) => {
				client.end();
				setMqttClient(null);
				toast.error(e.message);
				return;
			});

			return () => {
				client.end();
			};
		} catch (ex: any) {
			toast.error(ex.message);
		}
	}, []);

	// starting signalR connection and adding the on receive and on start events
	// only when new connection is made
	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then((result: any) => {
					console.log("Connected to SignalR hub");
					connection.on("ReceiveMessage", (topic: any, message: any) => {
						// setMessages((prevMessages) => [
						// 	...prevMessages,
						// 	{ topic, message },
						// ]);
					});
				})
				.catch((e: any) => console.log("Connection failed: ", e));
		}
	}, [connection]);

	return (
		<div className="flex sm:flex-row flex-col bg-white justify-center h-lvh">
			<NavBar />
			<div className="h-full sm:w-5/6 w-full flex flex-col justify-center items-center text-center ">
				<Outlet />
			</div>
		</div>
	);
};
