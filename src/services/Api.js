import React from "react";
import axios from "axios";

function FetchApi({ filterData, handleCurrentWeatherData, handleForecastWeatherData, lat, lon }) {
	const temperature = filterData.temperature === 'imperial' ? 'imperial' : 'metric';
	const key = '1d5302b5721aa692cbcf84acb68e373f'
	const baseURL = `https://api.openweathermap.org/data/2.5/`
	const currentWeatherParams = `weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`
	const threeHourForecastParams = `forecast?lat=${lat}&lon=${lon}&units=${filterData.temperature}&appid=${key}`
	function fetchCurrentWeather() {
		axios.get(baseURL + currentWeatherParams)
			.then(res => {
				handleCurrentWeatherData(res.data);
				console.log(res.data)
			})
		axios.get(baseURL + threeHourForecastParams)
			.then(res => {
				handleForecastWeatherData(res.data)
				console.log(res.data)
			})
	}
	return (
		<div>

			<button onClick={fetchCurrentWeather} className="btn btn-primary">Button</button>
		</div>
	)
}

export default FetchApi;
