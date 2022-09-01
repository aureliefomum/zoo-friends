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
//   const [allAnimals, setAllAnimals] = useState([]);
  // const [allLifeSpans, setAllLifeSpans] = useState({ages1to20:[], ages20to30:[], ages30to50:[]});
  const [allTypes, setAllTypes] = useState([]);
  const [selectedLifeSpan, setSelectedLifeSpan] = useState("");
  const [allActiveTimes, setAllActiveTimes] = useState([]);
 // const [selectedAnimal, setSelectedAnimal] = useState("");
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
    //const animals = results.data.map((animal) => animal.name);

    const lifeSpans = results.data.map((animal) => animal.lifespan);
    console.log("all life spans:", lifeSpans);

    const uniqueLifeSpans = new Set(lifeSpans);
    // setAllLifeSpans([...uniqueLifeSpans]);
    console.log("unique life spans", uniqueLifeSpans);

    // set 'all animals names' State to new array
    //setAllAnimals(animals);

    // create a variable to hold all the states
    const types = results.data.map((animal) => animal.animal_type);

    const uniqueTypes = new Set(types);

    // set the state of allTypes
    setAllTypes([...uniqueTypes]);

    // create a variable to hold all the animals
    const times = results.data.map((animal) => animal.active_time);
    const uniqueTimes = new Set(times);

    // set the state of the allAnimals to the new unique array
    setAllActiveTimes([...uniqueTimes]);
  }

  useEffect(() => {
    getData();
  }, []);

  const defaultCards = allResults.map((animal) => (
    <Card
      type={animal.animal_type}
      name={animal.name}
      image={animal.image_link}
      latinName={animal.latin_name}
      lifeSpan={animal.lifespan}
      habitat={animal.habitat}
      diet={animal.diet}
      activeTime={animal.active_time}
    />
  ));

  //    const lifeSpansBelow20 = allLifeSpans.filter((lifespan) => lifespan < 20)
  //    console.log('filtered life spans below 20', lifeSpansBelow20)

  //    const lifeSpansBelow30 = allLifeSpans.filter((lifespan) => lifespan > 20 && lifespan < 30)
  //    console.log('filtered life spans below 30', lifeSpansBelow30)

  //    const lifeSpansBelow50 = allLifeSpans.filter((lifespan) => lifespan > 30 && lifespan < 50)
  //    console.log('filtered life spans below 50', lifeSpansBelow50)

  //    setAllLifeSpans({
  //     ages1to20:lifeSpansBelow20, ages20to30:lifeSpansBelow30, ages30to50:lifeSpansBelow50
  //    })

  // create a variable to hold the lifespan options you want to display in the dropdown
  const lifespanOptions = ["1-20 years", "21-30 years", "31-50 years"];
//   const filteredLifeSpans = allResults
//     .filter((animal) => {
//       if (selectedLifeSpan === "") {
//         return true;
//       }
//       if (selectedLifeSpan === "1-20 years") {
//         if (animal.lifespan < 20) {
//           return true;
//         }
//       }
//       if (selectedLifeSpan === "21-30 years") {
//         if (animal.lifespan > 20 && animal.lifespan < 30) {
//           return true;
//         }
//       }
//       if (selectedLifeSpan === "31-50 years") {
//         if (animal.lifespan > 30) {
//           return true;
//         }
//       }
      
//     })
//     .map((animal) => (
//       <Card
//         type={animal.animal_type}
//         name={animal.name}
//         image={animal.image_link}
//         latinName={animal.latin_name}
//         lifeSpan={animal.lifespan}
//         habitat={animal.habitat}
//         diet={animal.diet}
//         activeTime={animal.active_time}
//       />
//     ));

  //const ageGroups = [lifeSpansBelow11]

  // animal =>
  // do I have a filter set? no, return true (give me back every item)
  // otherwise, should I return this item?
  // animaltype == myfilter? true (gives you it back), false (filters it out)
  const filteredCards = allResults
    // in your filter:
    // if selectedLifespan === "1-20":
    // if animal.lifespan < 20 return true
    // if selectedLifespan === "21-30"
    // if animal.lifespan > 20 && animal.lifespan < 30 return true
    .filter((animal) => {
        if (selectedLifeSpan === "") {
          return true;
        }
        if (selectedLifeSpan === "1-20 years") {
          if (animal.lifespan < 20) {
            return true;
          }
        }
        if (selectedLifeSpan === "21-30 years") {
          if (animal.lifespan > 20 && animal.lifespan < 30) {
            return true;
          }
        }
        if (selectedLifeSpan === "31-50 years") {
          if (animal.lifespan > 30) {
            return true;
          }
        }
        
      }).filter((animal) => {
      if (selectedType === "") {
        return true;
      }
      return animal.animal_type.toLowerCase() === selectedType.toLowerCase();
    })
    .filter((animal) => {
      if (selectedActiveTime === "") {
        return true;
      }
      console.log(
        "animal active time:",
        animal.active_time,
        "selectedactivetime:",
        selectedActiveTime
      );
      return (
        animal.active_time.toLowerCase() === selectedActiveTime.toLowerCase()
      );
    })
    .map((animal) => (
      <Card
        type={animal.animal_type}
        name={animal.name}
        image={animal.image_link}
        latinName={animal.latin_name}
        lifeSpan={animal.lifespan}
        habitat={animal.habitat}
        diet={animal.diet}
        activeTime={animal.active_time}
      />
    ));

  //filter for first carousel

  //filters for lower carousel

  const isFilterPresent = selectedType !== "" || selectedActiveTime !== "";
  const filtersStrings = [selectedType, selectedActiveTime]
  .map((item) => {
      if (item !== "") {
        return item;
      }
      return null;
    })
    .filter((item) => item !== null)
    .join(", ");

  return (
    <div className="container">
      <div className="sidebar">
        <div className="filterHeading">Filters</div>

        <DropDown
          items={lifespanOptions}
          label="Life Spans"
          setItem={setSelectedLifeSpan}
          selectedItem={selectedLifeSpan}
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
        <h3 className="animalsHeading">
          
          {!selectedLifeSpan
            ? "Choose a Life Span"
            : `Life Span Range: ${selectedLifeSpan}`}
        </h3>

        <div className="caroussel-container">
          <Carousel>
            {!selectedLifeSpan ? defaultCards : filteredCards }
          </Carousel>
        </div>
        <h3>
          {!isFilterPresent ? "Choose a Filter" : `Filters: ${filtersStrings}`}
        </h3>
        <Carousel>{!isFilterPresent ? defaultCards : filteredCards}</Carousel>

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
