import React, { useEffect, useState } from "react";
import "./AquariumForm.css";

function AquariumForm({ data }) {
  const [tempDimensions, setTempDimensions] = useState({
    x: 50,
    y: 150,
    z: 60,
  });

  const [reqDim, setReqDim] = useState(0);
  const [currentDim, setCurrentDim] = useState(0);
  const [disable, setDisable] = useState(false);

  const handleChange = (e) => {
    const source = e.target.name;
    switch (source) {
      case "x": {
        setTempDimensions({
          x: e.target.value,
          y: tempDimensions.y,
          z: tempDimensions.z,
        });

        break;
      }
      case "y": {
        setTempDimensions({
          x: tempDimensions.x,
          y: e.target.value,
          z: tempDimensions.z,
        });
        break;
      }
      case "z": {
        setTempDimensions({
          x: tempDimensions.x,
          y: tempDimensions.y,
          z: e.target.value,
        });
        break;
      }

      default: {
        break;
      }
    }
    validateAquarium();
  };

  function validateAquarium() {
    let temp = 0;
    data.forEach((fish) => {
      if (fish.size === "small") {
        temp += 10;
      } else if (fish.size === "big") {
        temp += 20;
      }
    });
    setReqDim(temp);

    let totalDim = Math.round(
      tempDimensions.x * tempDimensions.y * tempDimensions.z * 0.001,
      2
    );
    // console.log(totalDim, temp);

    setCurrentDim(totalDim);

    if (totalDim < temp) {
      setDisable(false);
      return true;
    } else {
      setDisable(true);
      return false;
    }
  }

  function onAdd() {
    alert(
      `Akvárium bylo úspěšně vytvořeno.\n${tempDimensions.x} cm\n${tempDimensions.y} cm\n${tempDimensions.z} cm\n${currentDim} l`
    );
  }

  useEffect(() => {
    validateAquarium();
  });

  return (
    <div className="aquarium-form">
      <div className="inputs">
        <label htmlFor="x">Výška (cm)</label>
        <input
          type="number"
          placeholder="výška"
          name="x"
          min="0"
          value={tempDimensions.x}
          onChange={handleChange}
        />
        <label htmlFor="y">Šířka (cm)</label>
        <input
          type="number"
          placeholder="šířka"
          name="y"
          min="0"
          value={tempDimensions.y}
          onChange={handleChange}
        />
        <label htmlFor="z">Hloubka (cm)</label>
        <input
          type="number"
          placeholder="hloubka"
          name="z"
          min="0"
          value={tempDimensions.z}
          onChange={handleChange}
        />
      </div>
      <div className="inputs">
        <div className="dim">{currentDim} l</div>
        <div>potřebujete minimálně {reqDim} l</div>
        <button
          disabled={!disable}
          onClick={onAdd}>
          Vytvořit akvárium
        </button>
      </div>
    </div>
  );
}

export default AquariumForm;
