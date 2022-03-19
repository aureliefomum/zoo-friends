import { useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://assessment-edvora.herokuapp.com/";

const App = () => {
	async function getData() {
		const results = await axios.get(API_URL);
		console.log(results.data);
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="container">
			<div className="sidebar"></div>
			<div className="caroussel-section"></div>
		</div>
	);
};

export default App;
