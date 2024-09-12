import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "./components/Layout";
import ErrorPage from "./components/ErrorPage";
import { ConfigProvider } from "./api/ContextApi";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Revenue from "./pages/Revenue";
import Users from "./pages/Users";
import CustomerSupport from "./pages/CustomerSupport";

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
					path: "/users",
					element: <Users />,
				},
				{
					path: "/customerSupport",
					element: <CustomerSupport />,
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
				pauseOnFocusLoss
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
