import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import App2 from './App2';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Index from './components/home/index';
import Dash from './components/dash/index';
import Myprofile from './components/dash/myprofile/myprofile';
import ConfigProfile from './components/dash/myprofile/configprofile';
import NewContent from './components/dash/contentmaker/new_content';
import Profile from './components/dash/profile/profile';
import Logout from './components/dash/logout';


import * as serviceWorker from './serviceWorker';

ReactDOM.render(

<Router>
	<Route path="/" exact component={Index} />
	<Route path="/app2" exact component={App2} />
	<Route path="/dashboard" exact component={Dash} />
	<Route path="/myprofile" exact component={Myprofile} />
	<Route path="/config" exact component={ConfigProfile} />
	<Route path="/newContent" exact component={NewContent} />
	<Route path="/profile/:nick" exact component={Profile} />
	<Route path="/logout" exact component={Logout} />

</Router>

, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
