import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';
import  Navbar  from '../navbar/navbar.js';
import ConfigAccount from './configs/config_account';

import './config.css';

class ConfigProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			redirectPage: '/',
			currentUser: {}
		}
	}

	setRedirect = (url) => {
		this.setState({
		   	redirect: true,
		   	redirectPage: url
		})
	}

	renderRedirect = () => {
	    if (this.state.redirect) {
		    return <Redirect to={this.state.redirectPage} />
	    }
	}

	componentDidMount() {
		const cookies = new Cookies();
		if (cookies.get('token') == undefined || cookies.get('token') == "") {
			this.setRedirect('/');
		}
		var url = API.url + '/currentUserInfo?token=' +  cookies.get('token');
		fetch(url, {
	      headers: {
	      'Content-Type': 'application/json'
	      },
	      method: 'GET', // or 'PUT'
	    }).then(res => res.json())
	    .catch(error => console.error('Error:', error))
	    .then(response => {
	      if (response.error) {
	        if (!response.auth) {
	        	this.setRedirect('/');
	        }
	      } else {
	      	const cookies = new Cookies();
	      	cookies.set('id', response.id, { path: '/' });
	      	this.setState({currentUser: response});
	       console.log(this.state.currentUser);
	      }
	    });
	}

	render() {
		const {currentUser} = this.state;
		return(
			<div>
				<Navbar />
				<div className={'config'}>
					<div className={'options'}>
						<div className={'option selected'}>
							Cuenta
						</div>
					</div>
					<div className={'configs'}>
						<ConfigAccount Current={currentUser}/>
					</div>
				</div>
			</div>
		);
	}
}

export default ConfigProfile;