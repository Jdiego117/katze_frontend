import '../dash.css';

import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../../global';

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			redirect_p: false,
			redirectUrl: '/',
			results: {
				display: 'none'
			},
			users: [],
			query: ''
		}

		this.setWrapperRef = this.setWrapperRef.bind(this);
   		this.handleClickOutside = this.handleClickOutside.bind(this);
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

	setRedirectProfile = (url) => {
		this.setState({
	    	redirect_p: true,
	    	redirectUrl: url
	    })
	}

	renderRedirectProfile = () => {
	    if (this.state.redirect_p) {
	    	return <Redirect to={this.state.redirectUrl} /> 
	    	window.location.reload();
	    }
	}

	HideResults = (e) => {
		console.log(e.target);
		this.setState({results: {display: 'none'}});
	}

	ShowRes = () => {
		if (this.state.users.length > 0) {
			this.setState({results: {display: 'block'}});
		}
	}

	AbortHide = () => {
		this.setState({results: {display: 'block'}});
	}

	Search = (e) => {
		this.setState({[e.target.name]: e.target.value});
		var url = API.url + '/UserSearch?query=' + e.target.value;
		fetch(url, {
		  headers: {
		  'Content-Type': 'application/json'
		  },
		  method: 'GET', // or 'PUT'
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => {
		  if (response.error) {
		  } else {
		   this.setState({users: response.users, results: {display: 'block'}});
		  }
		});
	}

	componentDidMount() {
	    document.addEventListener('mousedown', this.handleClickOutside);
	  }

	  componentWillUnmount() {
	    document.removeEventListener('mousedown', this.handleClickOutside);
	  }

	  /**
	   * Set the wrapper ref
	   */
	  setWrapperRef(node) {
	    this.wrapperRef = node;
	  }

	  /**
	   * Alert if clicked on outside of element
	   */
	  handleClickOutside(event) {
	    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
	      //alert('You clicked outside of me!');
	      this.setState({results: {display: 'none'}});
	    }
	  }

	render() {
		const {results, query, users} =this.state;
		return(
			<div class="nav light-bar" ref={this.setWrapperRef}>{this.props.children}
			{this.renderRedirect()}
			{this.renderRedirectProfile()}
				<div class="logo" onClick={() => this.setRedirect('/dashboard')}>
					<i class="fas fa-cat" onClick={() => this.setRedirect('/dashboard')}></i>
					Katze
				</div>
				<div class="search">
					<input
						class="form-control f_search"
						type="text" 
						placeholder="Search" 
						aria-label="Search"
						name="query"
						value={query}
						onChange={this.Search}
						onClick={this.ShowRes}
					/>
					<div class="results" style={results}>
					{
						users.map(user => {
							return(
								<div class="result">
									<div class="pic" onClick={() => this.setRedirectProfile('/profile/' + user.nickname)}>
										<div class="photo" style={{
											'background-image': 'url("'+API.storage+'/getProfile.php?n='+user.profile_pic+'")',
											'background-position': 'center center',
											'background-size': 'cover',
											'cursor': 'pointer'
										}}></div>
									</div>
									<div class="nick"><a href={'/profile/' + user.nickname}>{user.nickname}</a></div>
								</div>
							)
						})
					}
					</div>
				</div>
				<div class="btns">
					<div><i class="fas fa-bell"></i></div>
					<div class="noti_drop">
						<div>hola</div>
						<div>chao</div>
					</div>
					<div onClick={() => this.setRedirect('/newContent')}><i class="fas fa-search-plus" onClick={() => this.setRedirect('/newContent')}></i></div>
					<div><i class="fas fa-comment"></i></div>
					<div onClick={() => this.setRedirect('/myprofile')}><i class="fas fa-user-alt" onClick={() => this.setRedirect('/myprofile')}></i></div>
				</div>
			</div>
		);
	}
}

export default Navbar;