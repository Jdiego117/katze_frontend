import '../dash.css';
import './content_maker.css';

import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';
import { Spinner } from 'react-bootstrap';

import axios from 'axios';

class PublicationMaker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: [],
			token : '',
			imgGallery : '',
			selectedFile: null,
			PicLoading : {
				display: 'none'
			},
			img : 'No hay imagen seleccionada',
			text : '',
			privacy : false,
			error : '',
			error_s: {
				display: 'none'
			},
			success: {
				display: 'none'
			},
			isStory: false
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
		this.setState({token: cookies.get('token')});
	}

	SelectImgHandler (url) {
		console.log(url);
		this.setState({imgGallery: url, img: 'Imagen seleccionada'});
	}

	onFileChange=event=>{
		this.setState({
	      selectedFile: event.target.files[0],
	      loaded: 0,
	    });
	}

	changeHandler = (e) => {
		if (e.target.name == 'isStory') {
			if (!this.state.isStory) {
				this.setState({isStory: true});
			} else {
				this.setState({isStory: false});
			}
			return;
		}
	  this.setState({[e.target.name]: e.target.value});
	 }

	createPublication = () => {
		const cookies = new Cookies();
		var data = {
			token: cookies.get('token'),
			privacy: this.state.privacy,
			text: this.state.text,
			url: this.state.imgGallery
		}
		var params = "?token="+data.token+"&privacy="+data.privacy+"&text="+data.text+"&url="+data.url;
		if (this.state.isStory) {
		    axios.post(API.url +'/NewStory'+params, data, { 
			    headers : {
			    	'content-type': 'multipart/form-data'
			    }  // receive two    parameter endpoint url ,form data
			}).then(res => { // then print response status
				if (res.data.error) {
					this.setState({error: res.data.msg, error_s: {display: 'block'}});
				} else {
					this.setState({success: {display: 'block'}, text: '', imgGallery: '', privacy: false});
				}
			});
			return;
		}

	    axios.post(API.url +'/NewPublication'+params, data, { 
		    headers : {
		    	'content-type': 'multipart/form-data'
		    }  // receive two    parameter endpoint url ,form data
		}).then(res => { // then print response status
			if (res.data.error) {
				this.setState({error: res.data.msg, error_s: {display: 'block'}});
			} else {
				this.setState({success: {display: 'block'}, text: '', imgGallery: '', privacy: false});
			}
		});
	}

	uploadContent = () => {
		if (this.state.selectedFile == null) {return;}
		this.setState({PicLoading: {display: 'block'}});
	    const data = new FormData() 
	    data.append('files', this.state.selectedFile);
	    const cookies = new Cookies();
	    axios.post(API.storage +'/uploadImg.php?token='+cookies.get('token'), data, { 
		    headers : {
		    	'content-type': 'multipart/form-data'
		    }  // receive two    parameter endpoint url ,form data
		}).then(res => { // then print response status
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
		       /* if (!response.auth) {
		        	this.setRedirect();
		        }*/
		      } else {
		      	this.setState({PicLoading: {display: 'none'}, imgGallery: file, img: 'Imagen seleccionada'})
		      }
		    });
		});
	}

	render() {
		const {content, token, PicLoading, img, text, privacy, error, error_s, success, isStory} = this.state;
		return (
			<div class="publication_maker">
				<div class="title"><h2>Publicar</h2></div>
				<div class="opts">
					<div>Imagen</div>
					<div><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#AddContent">Seleccionar</button></div>
					<div>Texto</div>
					<div><textarea
							name="text"
				            value={text} 
				            onChange={this.changeHandler}
						 ></textarea>
					</div>
					<div>Privada</div>
					<div><input
							type="checkbox" 
							className={'checkbox'} 
							name="privacy" 
							value={privacy}
							onChange={this.changeHandler}
						/>
					</div>
					<div>Publicar como historia</div>
					<div><input type="checkbox" className={'checkbox'} name="isStory" value={isStory} onChange={this.changeHandler} /></div>
					<div class="alert alert-success alert-dismissible fade show" style={success}>
					    <strong>Publicado!</strong>
					    <button type="button" class="close" data-dismiss="alert">&times;</button>
					</div>
					<div class="alert alert-danger alert-dismissible fade show" style={error_s}>
					    <strong>Error!</strong>{error}
					    <button type="button" class="close" data-dismiss="alert">&times;</button>
					</div>
				</div>
				<div>
					<button type="button" class="btn btn-success btn-block" onClick={this.createPublication}>Publicar
					</button>

				</div>

				<div class="modal fade" id="AddContent" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">{img}</h5>
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
				        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#AddContentGallery">Seleccionar desde la galeria</button>
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-success btn-block" onClick={this.uploadContent}>Subir</button>
				      </div>
				    </div>
				  </div>
				</div>

				<div class="modal fade" id="AddContentGallery" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Agregar contenido</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
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
				        					onClick={() =>this.SelectImgHandler(conten.url)}
				        					data-toggle="modal" data-target="#AddContentGallery"
				        				></div>
				        			)
				        		})
				        	}
				        </div>
				      </div>
				      <div class="modal-footer">
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		);
	}
}

export default PublicationMaker;