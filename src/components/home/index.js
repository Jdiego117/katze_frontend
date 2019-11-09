import React, { Component } from 'react';
import './index.css';

import Register from './Register';
import Login from './Login';
import Modals from './Modals'

class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Registe: {display: 'none'},
      Logi: {display: 'block'}
    };
  }

  setRegister = () => {
    this.setState({Registe: {display: 'block'}, Logi: {display: 'none'}});
  }

  setLogin = () => {
    this.setState({Registe: {display: 'none'}, Logi: {display: 'block'}})
  }

  render() {
    const { Registe, Logi } = this.state;
    return (
      <div class="index">
    <div class="logo">
      <i class="fas fa-cat"></i>Katze
    </div>
    <div class="form">
      <Register LogHand={this.setLogin} display={Registe}/>
      <Login RegHand={this.setRegister} display={Logi}/>
    </div>
    <Modals />
  </div>
    );
  }
}

export default Index;