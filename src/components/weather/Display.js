import React from "react";
import DisplayHourly from "./DisplayHourly";

function Display({ currentWeatherData, tempUnit }) {
  
  const main = currentWeatherData.main
  const code = currentWeatherData.weather[0]
  // style={{border: '1px black solid '}}
  const weatherInfoStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  const backgroundStyle = {
    borderRadius:'15px'
  };
  console.log(currentWeatherData)
  return (
    <div className="weather-display" style={backgroundStyle}>
      <div className="container text-center" >
        <div className="row ">
          <div className="col" >
            <h4>
              Current Weather in {currentWeatherData.name}, {currentWeatherData.sys.country}
            </h4>
          </div>
        </div>
      </div>

      <div className="container " style={{ marginTop: '100px', }} >
        <div className="row">
          <div className="col text-center">
            <div className="weather-info" style={weatherInfoStyle}>
              <h2>{Math.round(main.temp)}° {tempUnit}</h2>
              <img src={`https://openweathermap.org/img/wn/${code.icon}.png`} width='80px' height='80px' alt="Weather Icon" />

              <h5>{code.description}</h5>
            </div>
          </div>
          <div className="col">
            <div className="weather-stats ">
              <div className="row">
                <div className="col">
                  <p>Max</p>
                  <p>{Math.round(main.temp_max)}° {tempUnit}</p>
                </div>
                <div className="col">
                  <p>Feels like</p>
                  <p>{Math.round(main.feels_like)}° {tempUnit}</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p>Min</p>
                  <p>{Math.round(main.temp_min)}° {tempUnit}</p>
                </div>

                <div className="col">
                  <p>Humidity</p>
                  <p>{main.humidity}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Display;

// {forecastWeatherData.list.map((forecast, index) => (
//   <DisplayHourly key={index}>{forecast}</DisplayHourly>
// ))}