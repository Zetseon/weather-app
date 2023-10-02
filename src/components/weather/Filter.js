import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function Filter({ onFilterChange, filterData }) {
	const [data, setData] = useState(filterData)

	const handleTempChange = () => {
		setData((prevData) => ({
			...prevData,
			temperature: prevData.temperature === 'imperial' ? 'metric' : 'imperial',
		}))


		// console.log('Filter Component data: ', data)
	}
	const handlePercipitationChange = () => {
		setData((prevData) => ({
			...prevData,
			percipitation: prevData.percipitation === 'inch' ? '' : 'inch',
		}))


	}
	const handleDayChange = (e) => {

	}
	onFilterChange(data)
	return (

		<div className="container-fluid">
		
			<div className="row justify-content-center">
				<div className="form-check form-switch col-auto me-2">
					<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={data.temperature === 'imperial'} onChange={handleTempChange} />
					<label className="form-check-label" htmlFor="flexSwitchCheckChecked">{data.temperature === 'imperial' ? 'F°' : 'C°'}</label>
				</div>
				<div className="form-check form-switch col-auto ms-2">
					<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={data.percipitation === 'inch'} onChange={handlePercipitationChange} />
					<label className="form-check-label" htmlFor="flexSwitchCheckChecked">{data.percipitation === 'inch' ? 'inch' : 'mm'}</label>
				</div>

			</div>
		</div>
	)
}

export default Filter;
