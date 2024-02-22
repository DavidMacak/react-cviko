import React from "react";
import "./FishList.css";

function getSizeText(size) {
  let text;
  switch (size) {
    case "small":
      text = "malá rybička";
      break;
    case "big":
      text = "velká rybička";
      break;
    default:
      break;
  }

  return text;
}

function FishList({ data, onDelete }) {
  return (
    <div className="list">
      {data.map((item) => {
        return (
          <div
            className="item"
            key={item.id}>
            <span>{item.name}</span>
            <span>{getSizeText(item.size)}</span>
            <button
              className="btn-delete"
              onClick={() => onDelete(item.id)}>
              ❌
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FishList;
