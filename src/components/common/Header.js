import React from "react";
import logo from '../../assests/logo.png'
function Header() {


	return (
		<nav className="navbar navbar-expand-md navbar-light bg-*">
			<div className="container">
				<a className="navbar-brand" href="#">
					<img src={logo} alt="Logo" width="50px" height="50px" />
				</a>
				<h1 className="navbar-text mx-auto">Weather App</h1>
			</div>
		</nav>
	)
}

export default Header;
