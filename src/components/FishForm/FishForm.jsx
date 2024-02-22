import React from "react";
import "./FishForm.css";

function FishForm({ data, onChange, validation, onAdd }) {
  return (
    <div className="fish-form">
      <input
        className="fish-form-input"
        type="text"
        placeholder="jméno rybičky"
        name="name"
        value={data.name}
        onChange={onChange}
      />
      <input
        type="radio"
        name="size"
        id="small"
        value="small"
        onChange={onChange}
        checked={data.size === "small"}
      />
      <label htmlFor="small">Malá rybička</label>
      <input
        type="radio"
        name="size"
        id="big"
        value="big"
        onChange={onChange}
        checked={data.size === "big"}
      />
      <label htmlFor="big">Velká rybička</label>
      <button
        className="fish-form-btn"
        disabled={!validation}
        onClick={onAdd}>
        Přidat
      </button>
    </div>
  );
}

export default FishForm;
