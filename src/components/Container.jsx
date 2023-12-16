import { useEffect } from "react";
import { useLocation } from "../context/LocationContext";
import { useWeather } from "../context/WeatherContext";
import Card from "./Card";
import axios from "axios";
import Selector from "./Selector";
import "./Container.css";

const getDayName = (timestamp) => {
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  const date = new Date(timestamp * 1000);
  const dayName = days[date.getDay()];
  return dayName;
};

function Container() {
  const { location } = useLocation();
  const { weather, setWeather } = useWeather();

  console.log(location);
  const getWeather = async () => {
    try {
      const { lat, lon } = location;
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=20b98ee539578148d8467615f17df70c&units=metric&lang=tr`
      );

      if (data && data.daily) {
        const dailyForecasts = data.daily.map((day) => {
          const dayName = getDayName(day.dt);
          return { dayName, ...day };
        });
        console.log(dailyForecasts[0]);
        setWeather(dailyForecasts); // Günlük tahminlerinizi gün isimleriyle birlikte set edin
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location) {
      getWeather();
    }
  }, [location]); // location değiştiğinde getWeather'ı çalıştırıyoruz

  if (weather.length > 0) {
    return (
      <div className="container">
        <Selector />
        <Card />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default Container;
