import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const SearchLocation = ({ handleCoordsChange }) => {
	const [address, setAddress] = useState('');

	const handleChange = (newAddress) => {
		setAddress(newAddress);
	};

	const handleSelect = (newAddress) => {
		geocodeByAddress(newAddress)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => {
				console.log('Success', latLng)
				handleCoordsChange(latLng)
			})

			.catch((error) => console.error('Error', error));
	};

	const findMyLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			console.log('Geolocation not supported, please search instead.');
		}

		function success(position) {
			const coords = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}
			console.log(`Coords ${JSON.stringify(coords)}`);
			handleCoordsChange(coords)
		}

		function error() {
			console.log("Unable to retrieve your location");
		}
	}

	return (
		<div className='mx-2 mt-2'>
			<PlacesAutocomplete
				value={address}
				onChange={handleChange}
				onSelect={handleSelect}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<div className="input-group rounded">
							<input
								{...getInputProps({
									placeholder: 'Search Places ...',
									className: 'location-search-input form-control rounded',
								})}
								aria-label="search" aria-describedby="search-addon" placeholder="City, State, Country Code" />
							<span class="input-group-text border-0" style={{backgroundColor:'#cfdfe2'}} id="search-addon">
								<button onClick={findMyLocation} className="btn btn-outline-dark"><FontAwesomeIcon icon={faLocation} /></button>
							</span>
						</div>
						<div className="autocomplete-dropdown-container p-2 ">
							{loading && <div>Loading...</div>}
							{suggestions.map((suggestion) => {
								const className = suggestion.active
									? 'suggestion-item--active m-2'
									: 'suggestion-item m-2';
								// inline style for demonstration purpose
								const style = suggestion.active
									? { backgroundColor: '#fafafa', cursor: 'pointer' }
									: { backgroundColor: '#ffffff', cursor: 'pointer' };
								return (
									<div
										{...getSuggestionItemProps(suggestion, {
											className,
											style,
										})}
									>
										<span>{suggestion.description}</span>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		</div>
	);
};

export default SearchLocation;

