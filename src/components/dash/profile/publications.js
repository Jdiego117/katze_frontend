import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';

class Publications extends Component {
	constructor(props) {
		super(props);

		this.state = {
			publications: [],
			token: ''
		}
	}

	componentDidMount() {
		const cookies = new Cookies();
		var url = API.url + '/GetUserPublications?token=' +  cookies.get('token') + '&id=' + this.props.userId;
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
	 		this.setState({publications: response.content, token: cookies.get('token')});
	      }
	    });
	}

	render() {
		const { publications, token } = this.state;
		return(
			<div>
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
		);
	}
}

export default Publications;