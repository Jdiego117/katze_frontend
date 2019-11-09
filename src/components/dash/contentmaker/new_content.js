import '../dash.css';
import './content_maker.css';

import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';

import  Navbar  from '../navbar/navbar.js';
import Gallery from './gallery.js';
import PublicationMaker from './publication_maker.js';

class NewContent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	render() {
		return(
			<div>
				<Navbar />
				<div class="content_maker">
					<Gallery />
					<PublicationMaker />
				</div>
			</div>
		);
	}
}

export default NewContent;