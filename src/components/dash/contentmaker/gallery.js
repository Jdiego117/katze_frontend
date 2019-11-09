import '../dash.css';
import './content_maker.css';

import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';
import { Spinner } from 'react-bootstrap';

import axios from 'axios';

class Gallery extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: [],
			token: '',
			selectedFile: null,
			PicLoading : {
				display: 'none'
			}
		}
	}

	componentDidMount() {
		const cookies = new Cookies();
		if (cookies.get('token') == undefined || cookies.get('token') == "") {
			this.setRedirect('/');
		}
		var url = API.url + '/GetMyGallery?token=' +  cookies.get('token');
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
		      	this.setState({content: response.content, token: cookies.get('token')});
		      	console.log(this.state.content);
		      }
		    });
	}

	onFileChange=event=>{
		this.setState({
	      selectedFile: event.target.files[0],
	      loaded: 0,
	    });
	}

	uploadContent = () => {
		this.setState({PicLoading: {display: 'block'}});
	    const data = new FormData() 
	    data.append('files', this.state.selectedFile);
	    const cookies = new Cookies();
	    axios.post(API.storage +'/uploadImg.php?token='+cookies.get('token'), data, { 
		    headers : {
		    	'content-type': 'multipart/form-data'
		    }  // receive two    parameter endpoint url ,form data
		}).then(res => { // then print response status
			console.log(res);
		    var file = res.data.files[0];
		    var url = API.url+'/AddContent?token='+cookies.get('token')+'&url='+file+'&type=img';
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

	render() {
		const {content, token, PicLoading} = this.state;
		return(
			<div class="gallery">
				<div class="title"><h2 data-toggle="modal" data-target="#addToGallery">Galeria <i class="fas fa-plus"></i></h2></div>
				{
					content.map(conten => {
						return(
							<div 
								class="img" 
								key={conten.id} 
								style={{
									'background-image': 'url("'+API.storage+'/downloadImg.php?n='+conten.url + '&token=' + token +'")',				
									'height': '200px',
									'background-position': 'center center',
									'background-size': 'cover',
									'cursor': 'pointer'
								}}
							></div>
						)
					})
				}

				<div class="modal fade" id="addToGallery" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Agregar contenido</h5>
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
				        <button type="button" class="btn btn-success btn-block" onClick={this.uploadContent}>Agregar a la galeria</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		);
	}
}

export default Gallery;