import React from "react";
import "./Toggler.css";

function Toggler({ active, onChoose }) {
  const handleClick = (e) => {
    onChoose(e.target.name);
  };

  return (
    <div className="page-toggler">
      <button
        className={`toggler-btn ${active === 1 ? "active" : ""}`}
        onClick={handleClick}
        name="fish">
        Rybicky
      </button>
      <button
        className={`toggler-btn ${active === 2 ? "active" : ""}`}
        onClick={handleClick}
        name="aquarium">
        Akvarium
      </button>
    </div>
  );
}

export default Toggler;
