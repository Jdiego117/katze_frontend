import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';
import { Spinner } from 'react-bootstrap';

import axios from 'axios';

class ProfileInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			redirectUrl: '/',
			followStats: {},
			selectedFile: null,


			PicLoading : {
				display: 'none'
			}
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
		const cookies = new Cookies();
		var url = API.url+'/UserGetFollowStats?id='+cookies.get('id');
		fetch(url, {
	      headers: {
	      'Content-Type': 'application/json'
	      },
	      method: 'GET', // or 'PUT'
	    }).then(res => res.json())
	    .catch(error => console.error('Error:', error))
	    .then(response => {
	      if (response.error) {
	       /* if (!response.auth) {
	        	this.setRedirect();
	        }*/
	      } else {
	      	console.log(response);
	      	this.setState({followStats: response});
	      }
	    });
	}

	onFileChange=event=>{
		this.setState({
	      selectedFile: event.target.files[0],
	      loaded: 0,
	    });
	}

	uploadProfile = () => {
		this.setState({PicLoading: {display: 'block'}});
	    const data = new FormData() 
	    data.append('files', this.state.selectedFile);
	    const cookies = new Cookies();
	    axios.post(API.storage +'/upload_profile.php?token='+cookies.get('token'), data, { 
		    headers : {
		    	'content-type': 'multipart/form-data'
		    }  // receive two    parameter endpoint url ,form data
		}).then(res => { // then print response status
			console.log(res);
		    var file = res.data.files[0];
		    var url = API.url+'/UpdateUser?token='+cookies.get('token')+'&profile_pic='+file;
		    fetch(url, {
		      headers: {
		      'Content-Type': 'application/json'
		      },
		      method: 'POST', // or 'PUT'
		    }).then(res => res.json())
		    .catch(error => console.error('Error:', error))
		    .then(response => {
		      if (response.error) {
		      	console.log(response);
		       /* if (!response.auth) {
		        	this.setRedirect();
		        }*/
		      } else {
		      	console.log(response);
		      	window.location.reload(); 
		      }
		    });
		});
	}

	ConfigRedirect = () =>{
		this.setRedirect('/config');
	}

	render() {
		const current = this.props.Current;
		const { followStats, PicLoading } = this.state;
		return(
			<div class="profile_info">
			{this.renderRedirect()}
					<div class="profile_pic" style={{
						'background-image': 'url("'+API.storage+'/getProfile.php?n='+current.profile_pic+'")',
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
					{current.nickname}
				</div>
				<div class="" onClick={this.ConfigRedirect} style={{
					'font-size': '2em',
					'cursor': 'pointer'
				}}>
					<i class="fas fa-user-cog" onClick={this.ConfigRedirect}></i>			
				</div>
				<div><button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#profile_pic" style={{'font-size': '.8rem'}}>Cambiar foto de perfil</button></div>
				<div class="publications_count">
					{this.props.Pub} publicaciones
				</div>
				<div class="followers_count">
					{followStats.followers} seguidores
				</div>
				<div class="followed_count">
					{followStats.followeds} seguidos
				</div>
				<div class="real_name">
					<b>{current.name}</b>
				</div>
				<div></div>
				<div></div>
				<div class="profile_description">
					<p>{current.description}</p>
				</div>
			</div>

			<div class="modal fade" id="profile_pic" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLabel"></h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        <input type="file" class="custom-file-input" aria-describedby="inputGroupFileAddon01" id="inputGroupFile01" name="file" onChange={this.onFileChange} />
			        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
					<Spinner animation="grow" role="status" style={PicLoading}>
					  <span className="sr-only">Loading...</span>
					</Spinner>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-success btn-block" onClick={this.uploadProfile}>Upload</button>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
		);
	}
}

export default ProfileInfo;