import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';

class DashStories extends Component {
	constructor(props) {
		super(props);

		this.state = {
			preview: [],
			users: [],
			token: ''
		}
	}

	componentDidMount() {
		const cookies = new Cookies();
			var url = API.url + '/GetStoriesPreview?token=' +  cookies.get('token');
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
		      	console.log("aqui");
		      	console.log(response);
		      	this.setState({preview: response.stories, users: response.users, token: cookies.get('token')})
		      }
		    });
	}

	findId(data, idToLookFor) {
	    var categoryArray = data;
	    for (var i = 0; i < categoryArray.length; i++) {
	        if (categoryArray[i].id == idToLookFor) {
	            return(categoryArray[i]);
	        }
	    }
	}

	render() {
		const {preview, users, token} = this.state;
		return (
			<div class="side_story">
				<h3>Historias</h3>
				<div class="side_story_p">
					{
						preview.map(story => {
							return(
								<div class="story" key={story.id}>
									<div class="profile_photo" style={{
										'background-image': 'url("'+API.storage+'/downloadImg.php?n='+story.content_url + '&token=' + token +'")',
													'border-radius': '50%',
													'width': '50px',
													'height': '50px',
													'background-position': 'center',
													'background-size': 'cover'
									}}>
								
									</div>
									<div class="side_profile_name">
										{this.findId(users, story.author).nickname}
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}
}

export default DashStories;