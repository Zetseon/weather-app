import React, { useState, useEffect, useRef } from "react";
import FetchApi, { fetchWeatherData } from "../../services/Api";
import Filter from "../weather/Filter";
import Display from "../weather/Display";
import DisplayHourly from "../weather/DisplayHourly";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

import SearchLocation from "./SearchLocation";

function Layout() {
	const [filterData, setFilterData] = useState({
		temperature: 'imperial',
		percipitation: 'inch',
		timeZone: 'New_York'
	});
	const [currentWeatherData, setCurrentWeatherData] = useState(null);
	const [forecastWeatherData, setForecastWeatherData] = useState(null);
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	const sliderRef = useRef(null);
	useEffect(() => {
		if (lat !== null && lon !== null) {
			// Call the API function and pass the state update functions
			fetchWeatherData(filterData, setCurrentWeatherData, setForecastWeatherData, lat, lon);
		}
	}, [filterData, lat, lon]);

	function handleFilterChange(updatedData) {
		setFilterData(updatedData);
		console.log("Filter data in layout comp: ", updatedData);
	}



	const handleCoordsChange = (coords) => {
		setLat(coords.lat)
		setLon(coords.lng)

	}
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
	const tempUnit = filterData.temperature === 'imperial' ? 'F' : 'C';

	console.log(tempUnit)
	return (

		<div >
			
			<div className="mx-2 mt-4">
				<Filter onFilterChange={setFilterData} filterData={filterData} />
				<SearchLocation handleCoordsChange={handleCoordsChange} />

				{/* {lat !== null && lon !== null && (
					<FetchApi filterData={filterData} handleCurrentWeatherData={setCurrentWeatherData} handleForecastWeatherData={setForecastWeatherData} lat={lat} lon={lon} />
				)} */}
			</div>
			{(currentWeatherData !== null && forecastWeatherData !== null) && (
				<>
					<div>

						<Display currentWeatherData={currentWeatherData} tempUnit={tempUnit} />


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
									<DisplayHourly key={index} tempUnit={tempUnit}>{forecast}</DisplayHourly>
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

