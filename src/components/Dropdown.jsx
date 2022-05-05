import React from "react";
export default function DropDown({ items, label, setItem, selectedItem }) {
  return (
    <div className="dropdown-container">
      <label htmlFor={label}>{label}</label>
      <select
        name={label}
        className="allSelect"
        onChange={(e) => setItem(e.target.value)}
        value={selectedItem}
      >
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
