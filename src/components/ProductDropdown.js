import React from "react";

export default function ProductDropDown({ products }) {
	return (
		<div className="products-dropdown-container">
			<label htmlFor="products">Products</label>
			<select name="products" className="allSelect productSelect">
				{products.map((product) => (
					<option key={product} value={product}>
						{product}
					</option>
				))}
			</select>
		</div>
	);
}
