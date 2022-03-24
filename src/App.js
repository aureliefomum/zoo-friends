import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import ProductDropDown from "./components/ProductDropdown";
import StatesDropDown from "./components/StatesDropdown";
import CitiesDropDown from "./components/CitiesDropdown";

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
			<div className="sidebar">
				<div className="filterHeading">Filters</div>
				<div className="products-dropdown-container">
					<label htmlFor="products"></label>
					<select name="products" className="allSelect">
						<option value="">Products</option>
					</select>
				</div>

				<div className="states-dropdown-container">
					<label htmlFor="states"></label>
					<select name="states" className="allSelect">
						<option value="">States</option>
					</select>
				</div>

				<div className="cities-dropdown-container">
					<label htmlFor="cities"></label>
					<select name="cities" className="allSelect">
						<option value="">Cities</option>
					</select>
				</div>
			</div>

			<div className="caroussel-section"></div>
		</div>
	);
};

export default App;
