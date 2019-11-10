import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';

class Publications extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: [],
			users: [],
			token: '',
			count: []
		}
	}

	componentDidMount() {
		const cookies = new Cookies();
		this.setState({token: cookies.get('token')});
		var url = API.url + '/GetFollowPublications?token=' +  cookies.get('token');
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
	      	this.setState({content: response.content, users: response.users});

	      	for (var i = this.state.content.length - 1; i >= 0; i--) {
	      		var id = this.state.content[i].id;
	      		var url = API.url + '/CountPublicationLikes?id=' + this.state.content[i].id;
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
	      	      	var last = this.state.count
	      	      	var newC = {
	      	      		id: id,
	      	      		count: response.count
	      	      	} 
	      	      	last.push(newC);
	      	      	this.setState({count: last});
	      	      }
	      	    });
	      	}
	      }

	    	console.log("hola");
	    	console.log(this.state.count);
	    	console.log(this.state.content);

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

	countLikes(id) {
		var counter = Object.assign([], this.state.count);

		for (var i = counter.length - 1; i >= 0; i--) {
			if (counter[i].id == id) {
				return (<div style={{display: 'inline-block'}}>{9}</div>)
			}
		}

		return;

		var url = API.url + '/CountPublicationLikes?id=' + id;
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

	      }
	    });
	}
		//return (<div style={{display: 'inline-block'}}>9</div>);

	render() {
		const {content, token, users, count} = this.state;
		return(
			<div class="content">
			{
				content.map(publication => {
					if (publication.ptype == 'text') {
						return(
							<div class="text_publication">
								<div class="profile_pic"><div class="pic" style={{
									'background-image': 'url("'+API.storage+'/getProfile.php?n='+this.findId(users, publication.author).profile_pic+'")',
									'background-position': 'center center',
									'background-size': 'cover',
								}}></div></div>
								<div class="content_text">
									<div class="author_name">{this.findId(users, publication.author).nickname}</div>
									<div class="text">
										<p>{publication.text}</p>
									</div>
									<div class="btn">
										<div class="send">
											<i class="fas fa-paper-plane"></i>
										</div>
										<div class="like">
											<i class="fas fa-heart"></i>
										</div>
										<div class="share">
											<i class="fas fa-share-alt"></i>
										</div>
									</div>
								</div>		
							</div>
						)
					}
					return(
						<div class="publication">
							<div class="author">
								<div class="profile_pic"><div class="pic" style={{
									'background-image': 'url("'+API.storage+'/getProfile.php?n='+this.findId(users, publication.author).profile_pic+'")',
									'background-position': 'center center',
									'background-size': 'cover',
								}}></div></div>
								<div class="author_name">{this.findId(users, publication.author).nickname} ha publicado</div>
							</div>
							<div class="publication_content publication_img" style={{
								'background-image': 'url("'+API.storage+'/downloadImg.php?n='+publication.content_url + '&token=' + token +'")',
								'background-position': 'center center',
								'background-size': 'cover',
							}}></div>
								<div class="publication_shadow">
									<div class="publication_text">
										<p>{publication.text}</p>
									</div>
								<div class="publication_likes">
									<p><i class="fas fa-heart"></i> {this.countLikes(publication.id)}people like</p>
								</div>
								<div class="publication_comments">
									<div class="comment">
										<p><b>Jdiego</b>hola a todos</p>
									</div>
								</div>
								<div class="publication_form">
									<div class="input_text">
										<input type="text" name="" placeholder="write a comment" />
									</div>
									<div class="btn">
										<div class="send">
											<i class="fas fa-paper-plane"></i>
										</div>
										<div class="like">
											<i class="fas fa-heart"></i>
										</div>
										<div class="share">
											<i class="fas fa-share-alt"></i>
										</div>
									</div>	
								</div>
							</div>
						</div>
					)
				})
			}
			{ /*<div class="text_publication">
					<div class="profile_pic"><div class="pic"></div></div>
					<div class="content_text">
						<div class="author_name">Juan</div>
						<div class="text">
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
							quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						</div>
						<div class="btn">
							<div class="send">
								<i class="fas fa-paper-plane"></i>
							</div>
							<div class="like">
								<i class="fas fa-heart"></i>
							</div>
							<div class="share">
								<i class="fas fa-share-alt"></i>
							</div>
						</div>
					</div>		
				</div>
				<div class="publication">
					<div class="author">
						<div class="profile_pic"><div class="pic"></div></div>
						<div class="author_name">Juan shared story</div>
					</div>
					<div class="publication_content publication_img"></div>
						<div class="publication_shadow">
							<div class="publication_text">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								</p>
							</div>
						<div class="publication_likes">
							<p><i class="fas fa-heart"></i> 32 people like</p>
						</div>
						<div class="publication_comments">
							<div class="comment">
								<p><b>Jdiego</b>hola a todos</p>
							</div>
							<div class="comment">
								<p><b>Jdiego</b>hola a todos</p>
							</div>
							<div class="comment">
								<p><b>Jdiego</b>hola a todos</p>
							</div>
						</div>
						<div class="publication_form">
							<div class="input_text">
								<input type="text" name="" placeholder="write a comment" />
							</div>
							<div class="btn">
								<div class="send">
									<i class="fas fa-paper-plane"></i>
								</div>
								<div class="like">
									<i class="fas fa-heart"></i>
								</div>
								<div class="share">
									<i class="fas fa-share-alt"></i>
								</div>
							</div>	
						</div>
					</div>
				</div>*/}
			
			</div>
		);
	}
}

export default Publications;