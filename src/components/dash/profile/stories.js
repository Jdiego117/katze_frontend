import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';
import { Spinner } from 'react-bootstrap';

import axios from 'axios';

class Stories extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stories: [],
			token: ''
		}
	}

	componentDidMount() {
		const cookies = new Cookies();
	    var url = API.url + '/GetUserStories?token=' +  cookies.get('token') + '&id=' + this.props.userId;
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
	 		this.setState({stories: response.stories, token: cookies.get('token')});
	      }
	    });
	}

	render() {
		const {stories, token} = this.state;
		return(
		<div class="profile_storys">
		{
			stories.map(story => {
				return(
					<div class="story" key={story.id} >
						<div>
							<div class="story_img" style={{
								'background-image': 'url("'+API.storage+'/downloadImg.php?n='+story.content_url + '&token=' + token +'")',
								'width': '60px',
								'height': '60px',
								'background-size': 'cover',
								'background-position': 'center',
								'border-radius': '50%'
							}}>			
							</div>
						</div>
						<div class="story_title">
							<b></b>
						</div>
					</div>
				)
			})
		}
		</div>
		);
	}
}

export default Stories;