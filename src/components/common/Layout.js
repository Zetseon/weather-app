import React, { useState, useEffect, useRef } from "react";
import FetchApi from "../../services/Api";
import Filter from "../weather/Filter";
import Display from "../weather/Display";
import DisplayHourly from "../weather/DisplayHourly";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'



function Layout() {
  const [filterData, setFilterData] = useState({
    temperature: 'imperial',
    percipitation: 'inch',
    timeZone: 'New_York'
  });
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastWeatherData, setForecastWeatherData] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const sliderRef = useRef(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('Geolocation Not Supported');
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setLat(latitude);
      setLong(longitude);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  }, []);

  function handleFilterChange(updatedData) {
    setFilterData(updatedData);
    console.log('Layout component filterData: ', filterData)
  }
  console.log('Layout component render filterData: ', filterData)
  // const slideLeft = () => {
  //   var slider = document.getElementById('slider')
  //   slider.scrollLeft = slider.scrollLeft - 800
  // }
  // const slideRight = () => {
  //   var slider = document.getElementById('slider')
  //   slider.scrollLeft = slider.scrollLeft + 800
  // }
  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 800;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 800;
    }
  };

 
  
  return (

    <div >
      <div>
        <Filter onFilterChange={handleFilterChange}  />
        {lat !== null && long !== null && (
          <FetchApi filterData={filterData} handleCurrentWeatherData={setCurrentWeatherData} handleForecastWeatherData={setForecastWeatherData} lat={lat} lon={long} />
        )}
      </div>
      {(currentWeatherData !== null && forecastWeatherData !== null) && (
        <>
          <div>

            <Display currentWeatherData={currentWeatherData} />


          </div>
          <div className="relative flex text-center my-20 items-center" >
            <MdChevronLeft className="opacity-20 cursor-pointer hover:opacity-100" onClick={() => slideLeft()} size={40} />
            <div
              ref={sliderRef} id='slider'
              className="w-full h-full p-2 mx-1 overflow-x-scroll scroll whitespace-nowrap scrollbar-hide"
              style={{
                scrollBehavior: 'smooth',
              }}>
              {(currentWeatherData !== null && forecastWeatherData !== null) && (
                forecastWeatherData.list.map((forecast, index) => (
                  <DisplayHourly key={index}>{forecast}</DisplayHourly>
                ))
              )}
            </div>
            <MdChevronRight className="opacity-20 cursor-pointer hover:opacity-100" onClick={() => slideRight()} size={40} />
          </div>
        </>
      )}
    </div>
  );
}


export default Layout;
{/* <div style={{display:'flex'}}>
        {(forecastWeatherData !== null) && (
          forecastWeatherData.list.map((forecast, index) => (
            <DisplayHourly key={index}>{forecast}</DisplayHourly>
          ))
        )}
      </div> */}


// <div className="hourly-container" style={{
//   display: 'flex',
//   whiteSpace: 'nowrap',
//   overflowX: 'auto',
//   marginTop: '10%'
// }}></div>

