import './messenger.css';

import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { API } from '../../global';

import Navbar from '../dash/navbar/navbar';

class Messenger extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	render() {
		return(
			<div class="main_me">
				<Navbar />
				<div class="app">
					<div class="chatmenu">
						<div class="chatmenu_header">
							<div class="pic_section">
								<div class="mpic"></div>
							</div>
							<div class="flex">Jdiego117</div>
							<div class="btn">
								<div><i class="fas fa-comment"></i></div>
								<div><i class="fas fa-cog"></i></div>
							</div>
						</div>
						<div class="chats">
							<div class="userchat">
								<div>
									<div class="mpic"></div>
								</div>
								<div class="name">
									<div>Pedrito</div>
									<div class="msgprev">
										<div class="msgprev_unview"><i class="fas fa-check"></i></div>
										lorem
									</div>
								</div>
								<div class="userchat_opt">
									<i class="fas fa-ellipsis-v"></i>
								</div>
							</div>
							<div class="userchat">
								<div>
									<div class="mpic"></div>
								</div>
								<div class="name">
									<div>Pedrito</div>
									<div class="msgprev">
										<div class="msgprev_unview"><i class="fas fa-check"></i></div>
										lorem
									</div>
								</div>
								<div class="userchat_opt">
									<i class="fas fa-ellipsis-v"></i>
								</div>
							</div>
							<div class="userchat">
								<div>
									<div class="mpic"></div>
								</div>
								<div class="name">
									<div>Pedrito</div>
									<div class="msgprev">
										<div class="msgprev_unview"><i class="fas fa-check"></i></div>
										lorem
									</div>
								</div>
								<div class="userchat_opt">
									<i class="fas fa-ellipsis-v"></i>
								</div>
							</div>
						</div>
					</div>
					<div class="side_app">
						<div class="header">
							<div class="pic_section">
								<div class="mpic"></div>
							</div>
							<div class="flex">
								Pedro
							</div>
						</div>
						<div class="main_section">
							<div class="msg_sended">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
								proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								<div class="status">visto</div>
							</div>
							<div class="msg_resived">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
								proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
							<div class="msg_sended">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
								proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								<div class="status">visto</div>
							</div>
						</div>
						<div class="footer">
							<div class="msg_input">
								<textarea placeholder="Escribe tu mensaje..."></textarea>
							</div>
							<div class="msg_btn">
								<div class="send">
									<i class="fas fa-paper-plane"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Messenger;