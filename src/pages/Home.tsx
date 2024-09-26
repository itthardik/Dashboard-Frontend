const Home = () => {
	return (
		<div className="z-0 flex justify-center items-center text-center gap-5 h-lvh py-5 px-20">
			<div className="">
				<h1 className="text-4xl font-bold mb-4 text-ternary">
					Welcome to E-Commerce Sales Dashboard
				</h1>
				<p className="text-xl font-light mb-4">
					Monitor and analyze sales performance and inventory levels.
				</p>
				<hr className="my-4 border-gray-300" />
				<p className="text-gray-600 text-md">
					Our dashboard provides real-time updates, historical data analysis,
					and predictive insights to help businesses optimize their operations
					and make data-driven decisions.
				</p>
			</div>
			<img src="/gif/homeGif.gif" alt="Login Gif" className="" />
		</div>
	);
};

export default Home;
