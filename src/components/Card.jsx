import { useWeather } from "../context/WeatherContext";
import cloudy from "../assets/animated/cloudy-day-2.svg";
import rain from "../assets/animated/rainy-6.svg";
import clear from "../assets/animated/day.svg";
import snow from "../assets/animated/snowy-6.svg";
import "./Card.css";

function Card() {
  const { weather } = useWeather();
  function capitalizeFirstLetter(str) {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, function (char) {
      return char.toUpperCase();
    });
  }

  function formatNumberFromString(str) {
    const match = str.match(/-?\d+(\.\d+)?/);
    if (match) {
      const number = match[0].split(".")[0]; // Ondalık kısmı atlıyoruz
      return number;
    }
    return null;
  }

  console.log(weather);

  const today = new Date();
  console.log(today.getTime());
  if (weather) {
    return (
      <div>
        <div className="all-container">
          <div className="big-card">
            <div className="general">
              <div className="day" style={{ fontSize: "xx-large" }}>
                {weather[0].dayName}
              </div>
              <div>{today.toLocaleDateString()}</div>
              {weather[0].weather[0].description === "rain and snow" ? (
                <span>Karla Karışık Yağmurlu</span>
              ) : (
                <span>
                  {capitalizeFirstLetter(weather[0].weather[0].description)}
                </span>
              )}
            </div>
            <div className="big-image">
              {weather[0].weather[0].main === "Rain" && (
                <span>
                  <img src={rain} />
                </span>
              )}
              {weather[0].weather[0].main === "Clear" && (
                <span>
                  <img src={clear} />
                </span>
              )}
              {weather[0].weather[0].main === "Clouds" && (
                <span>
                  <img src={cloudy} />
                </span>
              )}
              {weather[0].weather[0].main === "Snow" && (
                <span>
                  <img src={snow} />
                </span>
              )}
            </div>
            <div className="details">
              <div className="temp">
                <div className="details-title">Detaylar</div>
                <div className="temp-day">
                  Gündüz:{" "}
                  {formatNumberFromString(JSON.stringify(weather[0].temp.day))}{" "}
                  &#176;C
                </div>
                <div className="temp-night" style={{ color: "black" }}>
                  Akşam:{" "}
                  {formatNumberFromString(
                    JSON.stringify(weather[0].temp.night)
                  )}{" "}
                  &#176;C
                </div>
                <div>Nem: {weather[0].humidity}</div>
                <div>Rüzgar: {weather[0].wind_speed} km/h</div>
              </div>
            </div>
          </div>

          <div className="weatherContainer">
            {weather.slice(1, 7).map((wDay, i) => {
              return (
                <>
                  {wDay.dt * 1000 > today.getTime() && (
                    <div className="card" key={i}>
                      <div className="day">{wDay.dayName}</div>
                      {wDay.weather[0].main === "Rain" && (
                        <span>
                          <img src={rain} />
                        </span>
                      )}
                      {wDay.weather[0].main === "Clear" && (
                        <span>
                          <img src={clear} />
                        </span>
                      )}
                      {wDay.weather[0].main === "Clouds" && (
                        <span>
                          <img src={cloudy} />
                        </span>
                      )}
                      {wDay.weather[0].main === "Snow" && (
                        <span>
                          <img src={snow} />
                        </span>
                      )}
                      {wDay.weather[0].description === "rain and snow" ? (
                        <span>Karla Karışık Yağmurlu</span>
                      ) : (
                        <span>
                          {capitalizeFirstLetter(wDay.weather[0].description)}
                        </span>
                      )}

                      <div className="temp">
                        <div className="temp-day">
                          {formatNumberFromString(
                            JSON.stringify(wDay.temp.day)
                          )}
                          &#176;C
                        </div>
                        <div className="temp-night">
                          {formatNumberFromString(
                            JSON.stringify(wDay.temp.night)
                          )}
                          &#176;C
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else return <div>Loading...</div>;
}

export default Card;
