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
  const [allTypes, setAllTypes] = useState([]);
  const [selectedLifeSpan, setSelectedLifeSpan] = useState("");
  const [allActiveTimes, setAllActiveTimes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedActiveTime, setSelectedActiveTime] = useState("");

  async function getData() {
    const results = await axios.get(API_URL);

    const animalObjects = results.data;

    setAllResults(animalObjects);

    const lifeSpans = results.data.map((animal) => animal.lifespan);
    console.log("all life spans:", lifeSpans);

    const uniqueLifeSpans = new Set(lifeSpans);

    console.log("unique life spans", uniqueLifeSpans);

    const types = results.data.map((animal) => animal.animal_type);

    const uniqueTypes = new Set(types);

    setAllTypes([...uniqueTypes]);

    const times = results.data.map((animal) => animal.active_time);
    const uniqueTimes = new Set(times);

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

  const lifespanOptions = ["1-20 years", "21-30 years", "31-50 years"];

  const filteredCards = allResults

    .filter((animal) => {
      if (selectedLifeSpan === "") {
        return true;
      }
      if (selectedLifeSpan === "1-20 years") {
        return animal.lifespan < 20;
      }
      if (selectedLifeSpan === "21-30 years") {
        return animal.lifespan > 20 && animal.lifespan < 30;
      }
      if (selectedLifeSpan === "31-50 years") {
        return animal.lifespan > 30;
      }
      return false;
    })
    .filter((animal) => {
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
            {!selectedLifeSpan ? defaultCards : filteredCards}
          </Carousel>
        </div>
        <h3>
          {!isFilterPresent ? "Choose a Filter" : `Filters: ${filtersStrings}`}
        </h3>
        <Carousel>{!isFilterPresent ? defaultCards : filteredCards}</Carousel>
      </div>
    </div>
  );
}

export default App;
