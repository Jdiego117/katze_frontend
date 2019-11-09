import React, { Component } from 'react';
import './index.css';
import { API } from '../../global';

import axios from 'axios';
import { Modal, Button, Spinner } from 'react-bootstrap';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name : '',
      lastname : '',
      date: '',
      country: '',
      city: '',
      nickname: '',
      email: '',
      pass: '',

      error: '',
      error_d: {display: 'none'},
      show_m: false,

      code: '',
      error_v: '',
      error_vd: {display: 'none'},
      loading: {display: 'none'}
    };
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  modalHandler = () => {
    this.setState({show_m: !this.state.show_m});
  }

  submitHandler = (e) => {
    this.setState({loading: {display: 'inline-block'}});
    /*axios.post(API.url + '/register', this.state)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });*/
      var url = API.url +'/register?name='+this.state.name+'&lastname='
                        +this.state.lastname+'&birthdate='+this.state.date
                        +'&country='+this.state.country+'&city='+this.state.city
                        +'&nickname='+this.state.nickname+'&email='+this.state.email
                        +'&password='+this.state.pass;
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
        this.setState({error: response.msg, error_d: {display: 'block'}, loading: {display: 'none'}});
      } else {
        this.setState({loading: {display: 'none'}});
        this.modalHandler();
      }
    });
  }

  verifyHandler = (e) => {
    var url = API.url +'/verifyEmail?code=' + this.state.code;
    fetch(url, {
      headers: {
      'Content-Type': 'application/json'
      },
      method: 'GET', // or 'PUT'
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if (response.error) {
        this.setState({error_v: response.msg, error_vd: {display: 'block'}});
      } else {
        alert(response.msg);
        this.modalHandler();
      }
    });
  }

  resendHandler = () => {
    var url = API.url +'/resendVerifyCode?email=' + this.state.email;
    fetch(url, {
      headers: {
      'Content-Type': 'application/json'
      },
      method: 'GET', // or 'PUT'
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if (response.error) {
        this.setState({error_v: response.msg, error_vd: {display: 'block'}});
      } else {
        alert(response.msg);
      }
    });
  }

  render() {
    const { name, lastname, date, country, city, nickname, email, pass, error, error_d, show_m, code, error_v, error_vd, loading } = this.state;
    return (
      <div class="register" id="reg" style={this.props.display}>
        <h1>Registrate</h1>
        <div class="error" id="reg_err" style={error_d}>{error}</div>
        <div>
          <input
           type="text" 
           name="name" 
           value={name}
           onChange={this.changeHandler} 
           placeholder="nombre" 
           id="nom" 
          />
        </div>
        <div>
          <input
            type="text" 
            name="lastname" 
            value={lastname}
            onChange={this.changeHandler}
            placeholder="apellido" 
            id="ape" 
          />
        </div>
        <div class="date">
          Fecha de nacimiento
          <input
            type="date"
            name="date"
            value={date}
            onChange={this.changeHandler}
            id="Date" 
          />
        </div>
        <div>
          <input
            type="text"
            name="country"
            value={country}
            onChange={this.changeHandler}
            placeholder="Pais"
            id="country"
          />
        </div>
        <div>
          <input 
            type="text" 
            name="city"
            value={city} 
            onChange={this.changeHandler}
            placeholder="Ciudad" 
            id="city" 
          />
        </div>
        <div>
          <input 
            type="text"
            name="nickname" 
            value={nickname}
            onChange={this.changeHandler}
            placeholder="nombre de usuario"
            id="nick" 
          />
        </div>
        <div>
          <input
            type="text"
            name="email" 
            value={email}
            onChange={this.changeHandler}
            placeholder="Correo electronico" 
            id="mail" 
          />
        </div>
        <div>
          <input 
            type="password"
            name="pass" 
            value={pass}
            onChange={this.changeHandler}
            placeholder="contraseña" 
            id="password" 
          />
        </div>
        <div>
          <button 
            type="button" 
            class="btn btn-success" 
            onClick={this.submitHandler}
          >
            Registrate
          </button>
          
          <Spinner animation="grow" role="status" style={loading}>
            <span className="sr-only">Loading...</span>
          </Spinner>
          Ya tienes una cuenta? <b onClick={this.props.LogHand}>Inicia sesion</b>
        </div>
        <Modal show={show_m} animation={false}>
          <Modal.Header closeButton onClick={this.modalHandler}>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-body'>
            <div class="error" id="reg_err" style={error_vd}>{error_v}</div>
            <div class="check">
              <div><i class="fas fa-check-circle"></i></div>
                <p>Te has registrado con exito, enviamos un codigo de verificacion para confirmar tu correo.</p>
              </div>
              <div class="input_code">
                <input
                  type="text" 
                  name="code" 
                  value={code}
                  onChange={this.changeHandler}
                  placeholder="xxxxxxx" 
                />
              </div>
              <div className={"resend_code"} onClick={this.resendHandler}>
                <b>Volver a enviar</b>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" onClick={this.verifyHandler} class="btn btn-success">Verificar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.modalHandler}>Cerrar</button>
          </Modal.Footer>
        </Modal>    
      </div>
    );
  }
}

export default Register;