import { useEffect, useState } from "react";
import { useLocation } from "../context/LocationContext.jsx";
import axios from "axios";
import "./Selector.css";

function Selector() {
  const { setLocation } = useLocation();
  const [provinces, setProvinces] = useState([]);

  const getProvinces = async () => {
    try {
      const res = await axios.get("https://turkiyeapi.dev/api/v1/provinces");
      setProvinces(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProvinceChange = (selectedCoordinates) => {
    const [lat, lon] = selectedCoordinates.split(","); // Koordinatları ayır
    setLocation({ lat, lon }); // Objeyi geçir
  };

  useEffect(() => {
    getProvinces();
  }, []);

  if (provinces.length > 0) {
    return (
      <div className="selector-container">
        <span className="title">Şehir:</span>
        <select
          className="selector"
          onChange={(e) => handleProvinceChange(e.target.value)}
        >
          {provinces.map((province, index) => {
            const { latitude, longitude } = province.coordinates;

            const coordinates = `${latitude},${longitude}`;
            return (
              <option value={coordinates} key={index}>
                {province.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default Selector;
