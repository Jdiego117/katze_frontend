import '../dash.css';

import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';

import  Navbar  from '../navbar/navbar.js';
import ProfileInfo from './profile_info.js';
import ProfileStories from './profile_stories';

class Myprofile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,

			currentUser: {},
			profile_pic: {},

			publications: [],
			token: '',
		}
	}

	setRedirect = () => {
		this.setState({
	    	redirect: true
	    })
	}

	renderRedirect = (url) => {
	    if (this.state.redirect) {
	      return <Redirect to={url} />
	    }
	}

	componentDidMount() {
		//console.log(this.props.match.params.idu);
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
	        	this.setRedirect();
	        }
	      } else {
	      	const cookies = new Cookies();
	      	 cookies.set('id', response.id, { path: '/' });
	      	this.setState({currentUser: response});
	      	this.setState({profile_pic: {
	      		'background-image': 'url("'+this.state.currentUser.profile_pic+'")',
				'border-radius': '50%',
				'width': '50px',
				'height': '50px',
				'background-position': 'center',
				'background-size': 'cover'
	      	}});
	       console.log(this.state.currentUser);
	      }
	    });

	    url = API.url + '/GetMyPublications?token=' +  cookies.get('token');
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
	      	console.log(response);
	      	this.setState({publications: response.content})
	      }
	    });
	    this.setState({token: cookies.get('token')});
	}
	render() {
		
		const {currentUser, publications, token} = this.state;
		return(
			<div>
				<Navbar />
		
				<div class="profile_content">
					<ProfileInfo Current={currentUser} Pub={publications.length}/>
					<ProfileStories />

					<div class="profile_line">			
					</div>

					<div class="profile_publication_options">
						<div class="selected"><i class="fas fa-grip-horizontal"></i><b>publicaciones</b></div>
						<div><i class="fas fa-share-alt"></i><b>compartidos</b></div>
						<div><i class="fas fa-tag"></i><b>etiquetas</b></div>
					</div>

					<div class="profile_publications">
					{
						publications.map(publication => {
							if (publication.ptype == 'text') {
								return(
									<div class="publication_text">
										<p>{publication.text}</p>
									</div>
								);
							}
							return(
								<div 
									key={publication.id} 
									class="publication"
									style={{
										'background-image': 'url("'+API.storage+'/downloadImg.php?n='+publication.content_url + '&token=' + token +'")',
										'background-position': 'center center',
										'background-size': 'cover',
										'cursor': 'pointer'
									}}
								>
								</div>
							)
						})

					}
					</div>
				</div>
			</div>
		);
	}
}

export default Myprofile;