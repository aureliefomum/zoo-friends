import React from "react";
export default function StatesDropDown({ states }) {
	return (
		<div className="states-dropdown-container">
			<label htmlFor="states">States</label>
			<select name="states" className="allSelect">
				<option value="">States</option>
				{states.map((state) => (
					<option key={state} value={state}>
						{state}
					</option>
				))}
			</select>
		</div>
	);
}
