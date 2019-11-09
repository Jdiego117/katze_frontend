import React, { Component } from 'react';
import './index.css';
import { API } from '../../global';
import { Modal, Button, Spinner } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      pass: '',
      show_m: false,

      error: '',
      error_d: {display: 'none'},

      error_vd: {display: 'none'},
      error_v: '',
      code: '',
      redirect: false,
      Loading: {display: 'none'}
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/dashboard' />
    }
  }



  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  modalHandler = () => {
    this.setState({show_m: !this.state.show_m});
  }

  submitHandler = () => {
    this.setState({Loading: {display: 'inline-block'}});
    var url = API.url +'/login?email='+this.state.email+'&password='+this.state.pass;
    fetch(url, {
      headers: {
      'Content-Type': 'application/json'
      },
      method: 'GET', // or 'PUT'
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if (response.error) {
        this.setState({Loading: {display: 'none'}});
        if (response.needVerify) {
          this.modalHandler();
          return;
        }
        this.setState({error: response.msg, error_d: {display: 'block'}});
      } else {
        this.setState({Loading: {display: 'none'}});
        const cookies = new Cookies();
        cookies.set('token', response.token, { path: '/' });
        this.setRedirect();
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
    const { email, pass, error, error_d, show_m, error_v, error_vd, code, Loading } = this.state; 
    return (
      <div class="login" id="log" style={this.props.display}>
        {this.renderRedirect()}
        <h1>Iniciar sesion</h1>
        <div class="error" style={error_d}>
          {error}
        </div>
        <div>
          <input
            type="text" 
            name="email"
            value={email} 
            onChange={this.changeHandler}
            placeholder="Correo electronico" 
          />
        </div>
        <div>
          <input
            type="password" 
            name="pass"
            value={pass} 
            onChange={this.changeHandler}
            placeholder="contraseña" 
          />
        </div>
        <div>
          <button 
            type="button"
            class="btn btn-success"
            onClick={this.submitHandler}
          >Iniciar sesion</button>
          <Spinner animation="grow" role="status" style={Loading}>
            <span className="sr-only">Loading...</span>
          </Spinner>
          Aun no tienes una cuenta? <b onClick={this.props.RegHand}>Registrate</b>
        </div>    

        <Modal show={show_m} animation={false}>
          <Modal.Header closeButton onClick={this.modalHandler}>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-body'>
            <div class="error" id="reg_err" style={error_vd}>{error_v}</div>
            <div class="check">
              <div><i class="fas fa-check-circle"></i></div>
                <p>Para iniciar sesion primero debes verificar tu cuenta, enviamos un codigo de verificacion para confirmar tu correo.</p>
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

export default Login;