import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../../global';
import { Spinner } from 'react-bootstrap';

import '../config.css';

class ConfigAccount extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			redirectPage: '/',

			name: '',
			lastname: '',
			nickname: '',
			country: '',
			city: '',
			pass: '',
			desc: '',
			error: '',
			error_s: {
				display: 'none'
			},
			loading: {
				display: 'none'
			}
		}
	}

	componentDidMount() {
		var current = this.props.Current;
		
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
	        	this.setRedirect('/');
	        }
	      } else {
	      	const cookies = new Cookies();
	      	cookies.set('id', response.id, { path: '/' });
	      	this.setState({
	      		name: response.name,
	      		lastname: response.lastname,
	      		nickname: response.nickname,
	      		country: response.country,
	      		city: response.city,
	      		desc: response.description
	      	});
	      }
	    });
	}

	setRedirect = (url) => {
		this.setState({
		   	redirect: true,
		   	redirectPage: url
		})
	}

	renderRedirect = () => {
	    if (this.state.redirect) {
		    return <Redirect to={this.state.redirectPage} />
	    }
	}

	changeHandler = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	UpdateInfo = () => {
		this.setState({loading: {display: 'block'}});
		const cookies = new Cookies();
		var url = API.url +'/UpdateUser?name='+this.state.name+'&lastname='
                        +this.state.lastname+'&country='+this.state.country+'&city='+this.state.city
                        +'&nickname='+this.state.nickname+'&password='+this.state.pass+'&token='
                        + cookies.get('token')+'&description='
                        + this.state.desc;
        fetch(url, {
          headers: {
          'Content-Type': 'application/json'
          },
          method: 'POST', // or 'PUT'
          body: JSON.stringify(this.state) // data can be `string` or {object}!
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          if (response.error) {
            this.setState({error: response.msg, error_s: {display: 'block'}, loading: {display: 'none'}});
          } else {
            this.setState({loading: {display: 'none'}});
            alert('Informacion actualizada');
          }
        });
	}

	render() {
		const Current = this.props.Current;
		const { name, lastname, nickname, country, city, desc, pass, error, error_s, loading} = this.state;
		return(
			<div className={'account'}>
				<div className={'title'}>
					Cuenta 
					<Spinner animation="grow" role="status" style={loading}>
					  <span className="sr-only">Loading...</span>
					</Spinner>
				</div>
				<div className={'opts'}>
					<div class="alert alert-danger alert-dismissible fade show" style={error_s}>
					    <strong>Error!</strong> {error}
					    <button type="button" class="close" data-dismiss="alert">&times;</button>
					</div>
					<div className={'info'}>
						<div className={'sub_title'}>
							Informacion
						</div>
						<div></div>
						<div><label for="1">Nombre</label></div>
						<div><input type="text" name="name" id="1" value={name} onChange={this.changeHandler}/></div>
						<div><label for="2">Apellido</label></div>
						<div><input type="text" name="lastname" id="2" value={lastname} onChange={this.changeHandler}/></div>
						<div><label for="3">Nombre de usuario</label></div>
						<div><input type="text" name="nickname" id="3" value={nickname} onChange={this.changeHandler}/></div>
						<div><label for="4">Pais</label></div>
						<div><input type="" name="country" id="4" value={country} onChange={this.changeHandler}/></div>
						<div><label for="5">Ciudad</label></div>
						<div><input type="text" name="city" id="5" value={city} onChange={this.changeHandler}/></div>
						<div><label for="6">Contraseña</label></div>
						<div><input type="password" name="pass" id="6" value={pass} placeholder="Contraseña" onChange={this.changeHandler} autocomplete="new-password"/></div>
						<div><label for="6">Descripcion</label></div>
						<div><textarea value={desc} name="desc" onChange={this.changeHandler}></textarea></div>
						
					</div>
				</div>
				<button type="button" class="btn btn-success" onClick={this.UpdateInfo}>Actualizar</button>
			</div>
		);
	}

}

export default ConfigAccount;