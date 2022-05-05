import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import DropDown from "./components/Dropdown";
import Card from "./components/Card";
import Carousel from "./components/Carousel";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_URL = "https://zoo-animal-api.herokuapp.com/animals/rand/10";

function App() {
  const [allResults, setAllResults] = useState([]);
  const [allAnimals, setAllAnimals] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [allActiveTimes, setAllActiveTimes] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedActiveTime, setSelectedActiveTime] = useState("");

  async function getData() {
    const results = await axios.get(API_URL);
    // console.log(results);

    // create a variable to hold the array of animals
    const animalObjects = results.data;
    // set 'all animals' State to new array
    setAllResults(animalObjects);

    // create a variable to hold the animal names
    // map through the animal names and create a new array of strings
    // (set this new array to the variable you created)
    const animals = results.data.map((animal) => animal.name);

    // set 'all animals names' State to new array
    setAllAnimals(animals);

    // create a variable to hold all the states
    const types = results.data.map((animal) => animal.animal_type);

    const uniqueTypes = new Set(types);

    // set the state of allTypes
    setAllTypes([...uniqueTypes]);

    // create a variable to hold all the states
    const times = results.data.map((animal) => animal.active_time);
    const uniqueTimes = new Set(times);

    // set the state of the allStates to the new unique array
    setAllActiveTimes([...uniqueTimes]);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <div className="filterHeading">Filters</div>

        <DropDown
          items={allAnimals}
          label="Animals"
          setItem={setSelectedAnimal}
          selectedItem={selectedAnimal}
        />
        <DropDown
          items={allTypes}
          label="Types"
          setItem={setSelectedType}
          selectedItem={selectedType}
        />
        <DropDown
          items={allActiveTimes}
          label="Active Times"
          setItem={setSelectedActiveTime}
          selectedItem={selectedActiveTime}
        />
      </div>

      <div className="main-section">
        <h1>Zoo Friends</h1>
        <h2>All Animals</h2>

        <div className="caroussel-container">
          <Carousel>
            {allResults.map((animal) => (
              <Card
                type={animal.animal_type}
                name={animal.name}
                image={animal.image_link}
                latinName={animal.latin_name}
                lifeSpan={animal.lifespan}
                habitat={animal.habitat}
                diet={animal.diet}
              />
            ))}
          </Carousel>
        </div>
        <h3>
          Animals by Type: <span />
          {selectedType}
        </h3>
        {/* <div className='cards-area'></div>
         */}
        <Carousel>
          {allResults
            .filter((animal) => animal.animal_type === selectedType)
            .map((animal) => (
              <Card
                type={animal.animal_type}
                name={animal.name}
                image={animal.image_link}
                latinName={animal.latin_name}
                lifeSpan={animal.lifespan}
                habitat={animal.habitat}
                diet={animal.diet}
              />
            ))}
        </Carousel>

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
}

export default App;
