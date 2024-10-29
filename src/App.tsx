import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import { ConfigProvider } from "./api/ContextApi";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Revenue from "./pages/Revenue";
import CustomerSupport from "./pages/CustomerSupport";
import Ticket from "./pages/Ticket";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			errorElement: <ErrorPage />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/sales",
					element: <Sales />,
				},
				{
					path: "/inventory",
					element: <Inventory />,
				},
				{
					path: "/revenue",
					element: <Revenue />,
				},
				{
					path: "/customerSupport",
					children: [
						{
							path: "",
							element: <CustomerSupport />,
						},
						{
							path: "ticket",
							element: <Ticket />,
						},
					],
				},
			],
		},
		{
			path: "/login",
			element: <Login />,
		},
	]);

	return (
		<ConfigProvider>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme="light"
				transition={Flip}
			/>
			<RouterProvider router={router} />
		</ConfigProvider>
	);
}

export default App;
