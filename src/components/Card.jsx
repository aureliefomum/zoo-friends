import React from "react";

export default function Card({name, image, type, lifeSpan, latinName}){
    return(
        <div className="card-container">

        <div className="card-top-half">
            <div className="image-wrapper">
            <img src="https://source.unsplash.com/random/150x150" alt="product images"  />
            
        </div>

        <div className="names-wrapper">
        <p className="product-name">{name}</p>
        <p className="brand-name">Brand Name</p>
        <p className="price"> <span>$</span>29.99</p>
        
        </div>

        </div>

        <div className="card-bottom-half">
        <span>Location</span>
        <span>Date:10:12:2021</span>
        
        </div>
        <p className="description">Description of the product/item</p>
        
      
    </div>
    )
}