import '../dash.css';

import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';

import  Navbar  from '../navbar/navbar.js';
import Info from './info.js';
import Stories from './stories.js';
import Publications from './publications.js';

class Profile extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			userInfo: {},
			redirect: false,
			redirectUrl: '/',
			CanSee: false,
			isLogged: false,
			current: {},
		}
	}

	setRedirect = (url) => {
		this.setState({
	    	redirect: true,
	    	redirectUrl: url
	    })
	}

	renderRedirect = () => {
	    if (this.state.redirect) {
	      return <Redirect to={this.state.redirectUrl} />
	    }
	}

	componentDidMount() {
		this._isMounted = true;
		const cookies = new Cookies();
		var nick = this.props.match.params.nick;

		if (cookies.get('token') != undefined || cookies.get('token') != "") {
			var url = API.url + '/GetMyBasicInfo?token=' +  cookies.get('token');
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
		        	
		        }
		      } else {
		 		this.setState({isLogged: true});
		 		this.setState({current: response});
		 		if (response.nickname == nick) {
		 			this.setRedirect('/myprofile');
		 		}
		      }
		    });
		}
		var url = API.url + '/GetUserByNick?nickname=' + nick;

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
	        	
	        }
	      } else {
	      	console.log(response);
	      	this.setState({userInfo: response.user});
	    	if (response.user.private == false && cookies.get('token') == undefined) {
	    		this.setState({CanSee: true, loading: false});
	    	}
	      	if (cookies.get('token') != undefined || cookies.get('token') != "") {
	      		var url = API.url + '/CanSeeUser?token=' +  cookies.get('token') + '&id=' + response.user.id;
	      		fetch(url, {
	      	      headers: {
	      	      'Content-Type': 'application/json'
	      	      },
	      	      method: 'GET', // or 'PUT'
	      	    }).then(res => res.json())
	      	    .catch(error => console.error('Error:', error))
	      	    .then(response => {
	      	      if (response.error) {
	      	      	console.error(response.msg);
	      	        if (!response.auth) {
	      	        	
	      	        }
	      	      } else {
	      	 		//this.setState({CanSee: response.canSee});
	      	 		console.log("hola");
	      	 		console.log(this.state);
	      	 		this.setState({CanSee: true, loading: false});
	      	      }
	      	    });
	      	}
	      }
	    });
	}

	componentWillUnmount() {
	  this._isMounted = false;
	}

	render() {
		const {userInfo, CanSee, isLogged, current, loading} = this.state;

		if (loading) {
			return(<div>Cargando...</div>);
		}
		return(
		<div>
			{this.renderRedirect()}
			<Navbar />
			<div class="profile_content">
				<Info user={userInfo} current={current} isLogged={isLogged} />			
				{CanSee ? (<div><Stories userId={userInfo.id} /> <Publications userId={userInfo.id}/></div>) : (<div class="private"><i class="fas fa-user-lock"></i>Perfil privado</div>)}
				{!isLogged && !CanSee ? (<div class="private"><p>inicia sesion para ver el contenido</p></div>) : ('')}

			</div>
		</div>
		);
	}
}

export default Profile;