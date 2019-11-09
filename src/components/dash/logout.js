import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../global';

class Logout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			end: false
		}
	}

	componentDidMount() {
		const cookies = new Cookies();
		cookies.remove('token', { path: '/' });
		this.setState({end: true});
	}

	render() {
		if (this.state.end == false) {
			return(<div>Cerrando sesion..</div>);
		}
		return(
			<div>
				<Redirect to='/' />
			</div>
		);
	}
}

export default Logout;