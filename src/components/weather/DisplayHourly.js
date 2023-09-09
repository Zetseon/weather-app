import React from "react";
import { DateTime } from "luxon";
import classes from './DisplayHourly.module.css';
function DisplayHourly(props) {
	const day = TimestampConvert(props.children.dt)
	const code = props.children.weather[0]
	return (
		<div className='inline-block p-4 mx-0.5 cursor-pointer hover:scale-105 ease-in-out duration-300 border-2 rounded-xl '>
			<div className={classes.tempContainer}>
				<div className={classes.temp}>
					<p>{Math.round(props.children.main.temp)}</p>
				</div>

			</div>
			<div >
				<img src={`https://openweathermap.org/img/wn/${code.icon}.png`} width='50px' height='50px' alt={code.description} />
			</div>
			<div >


				<p>{Math.round(props.children.pop * 100)}%</p>

				<p>{day.formattedTime.toLowerCase()}</p>
				<p>{day.formattedDay}</p>

			</div>
		</div >
	)
}

export default DisplayHourly;

function TimestampConvert(unixTimestamp) {
	const dateTime = DateTime.fromSeconds(unixTimestamp);
	const formattedTime = dateTime.toFormat("h a"); // Use "hh" for two-digit hour
	const formattedDay = dateTime.toFormat("cccc"); // Format day as abbreviated weekday
	const day = {
		formattedDay,
		formattedTime
	};
	return day;
}