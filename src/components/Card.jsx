import React from "react";

export default function Card({
  type,
  name,
  image,
  lifeSpan,
  latinName,
  habitat,
  diet,
  activeTime,
}) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://wikipedia.org/wiki/${latinName.replace(" ", "_")}`}
      className="card-container"
    >
      <div className="image-wrapper">
        <img src={image} alt="animal pic" />
      </div>

      <div className="text-wrapper">
        <p className="label-item">
          <span className="label">Name: </span>
          {name}
        </p>
        <p className="label-item">
          <span className="label">Type: </span>
          {type}
        </p>
        <p className="label-item">
          <span className="label">Latin Name: </span>
          {latinName}
        </p>
        <p className="label-item">
          <span className="label">Lifespan: </span>
          {lifeSpan} years
        </p>
        <p className="label-item">
          <span className="label">Habitat: </span>
          {habitat}
        </p>
        <p className="label-item">
          <span className="label">Diet: </span>
          {diet}
        </p>
        <p className="label-item">
          <span className="label">Active Time: </span>
          {activeTime}
        </p>
      </div>
    </a>
  );
}
