import './dash.css';

import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../global';

import Navbar from './navbar/navbar';
import Publications from './publications/publications';
import DashStories from './stories/DashStories';

class Dash extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,

			currentUser: {},
			profile_pic: {}
		}
	}

	setRedirect = () => {
		this.setState({
	    	redirect: true
	    })
	}

	renderRedirect = () => {
	    if (this.state.redirect) {
	      return <Redirect to='/' />
	    }
	}

	componentDidMount() {
		const cookies = new Cookies();
		if (cookies.get('token') == undefined || cookies.get('token') == "") {
			this.setRedirect();
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
	        	this.setRedirect();
	        }
	      } else {
	      	this.setState({currentUser: response});
	      	this.setState({profile_pic: {
	      		'background-image': 'url("'+API.storage+'/getProfile.php?n='+this.state.currentUser.profile_pic+'")',
				'border-radius': '50%',
				'width': '50px',
				'height': '50px',
				'background-position': 'center',
				'background-size': 'cover'
	      	}});
	       console.log(this.state.currentUser);
	      }
	    });
	}

	render() {		
		const { profile_pic, currentUser } = this.state;
		return(
			<div>
				{this.renderRedirect()}
				
				<Navbar />
		<div class="main">
			<Publications />
			<div class="side">
				<div class="side_profile">
					<div class="profile_photo">
						<div style={profile_pic}></div>		
					</div>
					<div class="side_profile_name">
						<a href="/myprofile" >{currentUser.nickname}</a>
					</div>
					<div>
						<a href="/logout" >cerrar sesion</a>
					</div>
				</div>
				
				<DashStories />
				<div class="side_suggest">
					<h3>Sugerencias</h3>
					<div class="side_suggested">
						<div class="suggest">
							<div class="profile_photo">
						
							</div>
							<div class="side_profile_name">
								juan diego
							</div>
						</div>
						<div class="suggest">
							<div class="profile_photo">
						
							</div>
							<div class="side_profile_name">
								juan diego
							</div>
						</div>
						<div class="suggest">
							<div class="profile_photo">
						
							</div>
							<div class="side_profile_name">
								juan diego
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
			</div>
		);
	}
}

export default Dash;