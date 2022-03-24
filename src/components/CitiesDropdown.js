import React from "react";
export default function CitiesDropDown() {
	return (
		<div className="cities-dropdown-container">
			<label htmlFor="cities"></label>
			<select name="cities" className="allSelect">
				<option value="">Cities</option>
			</select>
		</div>
	);
}
