import React from "react";
export default function DropDown({ label, items }) {
	return (
		<div className="dropdown-container">
			<label htmlFor={label}>{label}</label>
			<select name={label} className="allSelect">
				<option value="">{label}</option>
				{items.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
}