import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import DropDown from "./components/Dropdown";


const API_URL = "https://assessment-edvora.herokuapp.com/";

const App = () => {
	const [allProducts, setAllProducts] = useState([]);
	const [allStates, setAllStates] = useState([]);
	const [allCities, setAllCities] = useState([]);

	async function getData() {
		const results = await axios.get(API_URL);

		// create a variable to hold the products
		// map through the products and create a new array of strings
		//(set this new array to the variable you created)
		const products = results.data.map((item) => item.product_name);

		//create an array of unique product names
		const uniqueProducts = new Set(products);
		//console.log([...uniqueProducts]);

		// set the state of the products to the new unique array
		setAllProducts([...uniqueProducts]);
		console.log(results.data);

		//create a variable to hold all the states
		const states = results.data.map((item) => item.address.state);
		//create an array of unique state names
		const uniqueStates = new Set(states);
		//console.log([...uniqueStates]);

		// set the state of the allStates to the new unique array
		setAllStates([...uniqueStates]);

		//create a variable to hold all the states
		const cities = results.data.map((item) => item.address.city);
		//create an array of unique state names
		const uniqueCities = new Set(cities);
		//console.log([...uniqueStates]);

		// set the state of the allStates to the new unique array
		setAllCities([...uniqueCities]);
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="container">
			<div className="sidebar">
				<div className="filterHeading">Filters</div>

				<DropDown items={allProducts} label="Products" />
				<DropDown items={allStates} label="States" />
				<DropDown items={allCities} label="Cities" />
			</div>

			<div className="caroussel-section">
				<h1>Edvora</h1>
				{/* <div>
					<h3>{title}</h3>
					<CardContainer>
						{products.map(() => (
							<Card />
						))}
					</CardContainer>
				</div> */}
			</div>
		</div>
	);
};

export default App;
