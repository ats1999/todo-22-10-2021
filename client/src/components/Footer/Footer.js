import React from 'react';
import './Footer.css';

const currentDate= new Date();
const year=currentDate.getFullYear();
function Footer(){

	return(
		<div className="footer">
			<p>Copyright {year}</p>

		</div>

		)
}
export default Footer;