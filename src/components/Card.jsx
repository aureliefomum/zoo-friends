import React from 'react';

export default function Card({type,

  name,
  image,
  lifeSpan,
  latinName,
  habitat,
  diet,
}) {
  return (
    <div className="card-container">
      <div className="card-top-half">
        <div className="image-wrapper">
          <img src={image} alt="animal pic" />
        </div>

        <div className="names-wrapper">
          <p className="animal-name">
            Name:
            {name}
          </p>
          <p className="type">
            Type:
            {type}
          </p>
          <p className="latin-name">
            Latin Name:
            {latinName}
          </p>
          <p className="life-span">
            {" "}
            <span>
              Lifespan:
              {lifeSpan}
            </span>
            years
          </p>
        </div>
      </div>

      <div className="card-bottom-half">
        <span>Habitat: </span>
        <span className="habitat"> 
{' '}
{habitat}
</span>
      </div>
      <p className="diet">
        Diet:
        {diet}
      </p>
    </div>
  );
}
