import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';
import { Spinner } from 'react-bootstrap';

import axios from 'axios';

class Info extends Component {
	constructor(props) {
		super(props);

		this.state = {
			state: 0,
			followStats: {},
			publications: 0
		}
	}

	componentDidMount() {
		const cookies = new Cookies();
		if (this.props.isLogged == false && cookies.get('token') == undefined || cookies.get('token') == "") {
			this.setState({state: 5});
			console.log("aqui");
		} else {
			var url = API.url + '/getFollowState?token=' +  cookies.get('token') + '&id=' + this.props.user.id;
			fetch(url, {
		      headers: {
		      'Content-Type': 'application/json'
		      },
		      method: 'GET', // or 'PUT'
		    }).then(res => res.json())
		    .catch(error => console.error('Error:', error))
		    .then(response => {
		      if (response.error) {
		      	console.log(response);
		        if (!response.auth) {
		        	
		        }
		      } else {
		 		console.log(response);
		 		this.setState({state: response.state});
		      }
		    });
		}
		var url = API.url + '/UserGetFollowStats?id=' + this.props.user.id;
		fetch(url, {
	      headers: {
	      'Content-Type': 'application/json'
	      },
	      method: 'GET', // or 'PUT'
	    }).then(res => res.json())
	    .catch(error => console.error('Error:', error))
	    .then(response => {
	      if (response.error) {
	      	console.log(response);
	        if (!response.auth) {
	        	
	        }
	      } else {
	 		console.log(response);
	 		this.setState({followStats: response});
	      }
	    });
	    var url = API.url + '/CountPublications?id=' + this.props.user.id;
		fetch(url, {
	      headers: {
	      'Content-Type': 'application/json'
	      },
	      method: 'GET', // or 'PUT'
	    }).then(res => res.json())
	    .catch(error => console.error('Error:', error))
	    .then(response => {
	      if (response.error) {
	      	console.log(response);
	        if (!response.auth) {
	        	
	        }
	      } else {
	 		console.log(response);
	 		this.setState({publications: response.count});
	      }
	    });
	}

	HandleFollow = () => {
		const cookies = new Cookies();
		var url = API.url + '/FastFollowAction?token=' +  cookies.get('token') + '&id=' + this.props.user.id;
		fetch(url, {
	      headers: {
	      'Content-Type': 'application/json'
	      },
	      method: 'GET', // or 'PUT'
	    }).then(res => res.json())
	    .catch(error => console.error('Error:', error))
	    .then(response => {
	      if (response.error) {
	      	console.log(response);
	        if (!response.auth) {
	        	
	        }
	      } else {
	 		console.log(response);
	 		this.setState({state: response.state});
	      }
	    });
	}

	render() {
		const info = this.props.user;
		const {state, followStats, publications} = this.state;
		const FOLLOW_STATES = {
		  1: <button type="button" class="btn btn-info btn-lg" style={{'font-size': '.8rem'}} onClick={this.HandleFollow}>Seguir</button>,
		  2: <button type="button" class="btn btn-info btn-lg" style={{'font-size': '.8rem'}} onClick={this.HandleFollow}>Dejar de seguir</button>,
		  3: <button type="button" class="btn btn-info btn-lg" style={{'font-size': '.8rem'}} onClick={this.HandleFollow}>Cancelar solicitud</button>,
		  4: '',
		  5: <p>Inicia seccion para seguir</p>
		};
		console.log(state);
		return(
			<div class="profile_info">
				<div class="profile_pic" style={{
						'background-image': 'url("'+API.storage+'/getProfile.php?n='+info.profile_pic+'")',
						'border': '10px solid transparent',
						'border-radius': '50%',
						'border-image': 'radial-gradient(#090, #fff, #2a4f32); ',
						'width': '150px',
						'height': '150px',
						'background-position': 'center center',
						'background-size': 'cover',
						'cursor': 'pointer'
					}}></div>
				<div class="info">
					<div class="info_name">
						{info.nickname}
					</div>

					<div class="">
					{FOLLOW_STATES[state]}						
					</div>

					<div></div>
					<div class="publications_count">
						{publications} publicaciones
					</div>
					<div class="followers_count">
						{followStats.followers} seguidores
					</div>
					<div class="followed_count">
						{followStats.followeds} seguidos
					</div>
					<div class="real_name">
						<b>{info.name}</b>
					</div>
					<div></div>
					<div></div>
					<div class="profile_description">
						<p>{info.description}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Info;