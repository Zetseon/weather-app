import React, { useState } from "react";

function Filter({ onFilterChange,handleTempChange2 }) {
	const [data, setData] = useState({
		temperature: 'imperial',
		percipitation: 'inch',
		timeZone: 'New_York'
	})

	const handleTempChange = () => {
		setData((prevData) => ({
			...prevData,
			temperature: prevData.temperature === 'imperial' ? 'metric' : 'imperial',
		}))
	

		onFilterChange(data)
		// console.log('Filter Component data: ', data)
	}
	const handlePercipitationChange = () => {
		setData((prevData) => ({
			...prevData,
			percipitation: prevData.percipitation === 'inch' ? '' : 'inch',
		}))
		
		onFilterChange(data)

	}
	const handleDayChange = (e) => {

	}
	return (
		<div className="container-fluid row">
			<div className="form-check form-switch col">
				<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={data.temperature === 'imperial'} onChange={handleTempChange} />
				<label className="form-check-label" htmlFor="flexSwitchCheckChecked">{data.temperature === 'imperial' ? 'F°' : 'C°'}</label>
			</div>
			<div className="form-check form-switch col">
				<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={data.percipitation === 'inch'} onChange={handlePercipitationChange} />
				<label className="form-check-label" htmlFor="flexSwitchCheckChecked">{data.percipitation === 'inch' ? 'inch' : 'mm'}</label>
			</div>
			<div>
				<select className="form-select form-select-normal mb-3" aria-label="normal select" onChange={handleDayChange} defaultValue='7'>
					<option value='1'>1 Day</option>
					<option value='7'>7 Days</option>
					<option value='14'>14 Days</option>
				</select>
			</div>

		</div>
	)
}

export default Filter;
