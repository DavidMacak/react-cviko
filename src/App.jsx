import { useEffect, useState } from "react";
import "./App.css";
import rawData from "./fishData.json";
import PageContainer from "./components/PageContainer/PageContainer";
import Toggler from "./components/Toggler/Toggler";
import FishList from "./components/FishList/FishList";
import FishForm from "./components/FishForm/FishForm";
import AquariumForm from "./components/AquariumForm/AquariumForm";

function App() {
  const [listOfFish, setListOfFish] = useState(rawData.fish);
  // size nastavime small abychom nemuseli checkovat jestli je radiobutton selectnuty - ve formu se checkne radiobutton podle size
  const [newFish, setNewFish] = useState({
    id:
      listOfFish.length > 0
        ? Math.max(...listOfFish.map((fish) => fish.id)) + 1
        : 1,
    name: "",
    size: "small",
  });

  const [aquarium, setAquarium] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [valid, setValid] = useState(false);
  const [validAqua, setValidAqua] = useState(false);

  const [activeTab, setActiveTab] = useState(1);

  // ---------------------------------- FISHY LOGIC

  // trim nas zbavi mezer pred a za stringem
  const validateData = (fish) => {
    if (fish.name.trim().length === 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleChange = (e) => {
    const updatedFish = {
      ...newFish,
      [e.target.name]: e.target.value,
      [e.target.id]: e.target.value,
    };

    setNewFish(updatedFish);
    validateData(updatedFish);
  };

  // tohle se spusti po stisknuti tlacitka
  const handleAdd = () => {
    setListOfFish((listOfFish) => {
      return [...listOfFish, newFish];
    });
    const newFishId = newFish.id + 1;
    const updatedFish = {
      id: newFishId,
      name: "",
      size: "small",
    };
    setNewFish(updatedFish);
    validateData(updatedFish);
  };

  const handleDelete = (idToDelete) => {
    setListOfFish(listOfFish.filter((fish) => fish.id !== idToDelete));
  };

  const handleChoose = (source) => {
    switch (source) {
      case "fish":
        setActiveTab(1);
        break;
      case "aquarium":
        setActiveTab(2);
        break;
      default:
        break;
    }
  };

  // ---------------------------------- AQUARIUM LOGIC

  // ---------------------------------- HTML OUTPUT

  return (
    <div>
      <PageContainer>
        <Toggler
          active={activeTab}
          onChoose={handleChoose}
        />

        {activeTab === 1 && (
          <>
            <FishList
              data={listOfFish}
              onDelete={handleDelete}
            />
            <FishForm
              data={newFish}
              validation={valid}
              onChange={handleChange}
              onAdd={handleAdd}
            />
          </>
        )}

        {activeTab === 2 && (
          <>
            <h3>Navrhněte si akvárium</h3>
            <p>každá malá rybička potřebuje 10l prostoru.</p>
            <p>každá velká chce 20l</p>
            <AquariumForm data={listOfFish} />
          </>
        )}
      </PageContainer>
    </div>
  );
}

export default App;
