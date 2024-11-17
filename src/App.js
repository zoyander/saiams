import React from 'react';
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import firebase from './firebase.js';
import axios from 'axios';
import Splitter from '@devbookhq/splitter';
import GlobalStyle from './GlobalStyle.js';
import './App.css';
import Audience from './Audience.js';
import VideoCaller from './VideoCaller.js';
import Moderator from './Moderator.js';
import Welcome from './Welcome.js';
import Subtitles from './Subtitles.js';
import {VideoCall, TaskBar} from './Common.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: null,
			role: null,
			performance: "loading",
			showVideoPanel: false,
			panelSizes: [62.5, 37.5]
		}
	}
	initSettings = (s) => {
		this.setState(state => ({
			settings: s
		}));
		// Get performance data from Firebase
		const performanceRef = firebase.database().ref(this.state.settings.performanceId);
		performanceRef.on('value', (snapshot) => {
			const newState = snapshot.val();
			this.setState(state => ({
				performance: newState
			}));
			if (!newState) {
				this.handleBackButton();
			} else if (newState === "restarting") {
				if (this.state.role !== "moderator") {
					this.handleBackButton();
				}
			}
		});
	}
	handleRoleSelected = (r) => {
		this.setState(state => ({
			role: r
		}));
	}
	handleBackButton = () => {
		this.setState(state => ({
			role: null
		}));
	}
	handleResizeFinished = (_, newSizes) => {
		this.setState(state => ({
			panelSizes: newSizes
		}));
	}
	handleShowVideoPanel = (on) => {
		this.setState(state => ({
			showVideoPanel: on
		}));
	}
	componentDidMount() {
		axios.get("/settings.json").then((res) => this.initSettings(res.data));
		this.handleShowVideoPanel(window.innerWidth >= 1024);
	}
	componentWillUnmount() {
		this.setState = (state, callback) => {return;};
	}
	render() {
		let display, interact, styles, video, subtitles;
		let mainTaskbarLeft, mainTaskbarRight;
		let panelSizes = this.state.panelSizes;
		if (this.state.settings) {
			styles = (<GlobalStyle styles={this.state.settings.styles} />);
			switch(this.state.role) {
				case "audience":
					interact = (<Audience settings={this.state.settings} performance={this.state.performance} />);
					break;
				case "moderator":
					interact = (<Moderator settings={this.state.settings} performance={this.state.performance} onBackButton={this.handleBackButton}  />);
					break;
				case null:
					interact = (<Welcome settings={this.state.settings} performance={this.state.performance} onRoleSelected={this.handleRoleSelected} />);
					break;
				default:
					interact = (<VideoCaller settings={this.state.settings} performance={this.state.performance} speaker={this.state.role} />);
			}
			mainTaskbarLeft = (<strong>{this.state.settings.title}</strong>);
			if (this.state.showVideoPanel && this.state.role === "audience") {
				mainTaskbarRight = (<div><span class="material-icons"><span class="active">feed</span> mic bluetooth cloud wifi battery_4_bar</span> &nbsp;2:22</div>);
				video = (
					<div className='App-video-container'>
						<TaskBar />
						<VideoCall embedLink={this.state.settings.videoCallEmbedLink} />
					</div>
				);
			} else {
				panelSizes = [100];
			}
		}
		display = (
			<div className="App">
				{styles}
				<TaskBar left={mainTaskbarLeft} right={mainTaskbarRight} />
				<Splitter initialSizes={panelSizes} minWidths={[640, 384]} gutterClassName="gutter" onResizeFinished={this.handleResizeFinished}>
					{video}
					<div className="App-interact-container">
						<div className="App-interact">
							{interact}
						</div>
					</div>
				</Splitter>
			</div>
		);
		subtitles = (
			<div className="App">
				{styles}
				<Subtitles performance={this.state.performance} />
			</div>
		);
		return (
			<Router>
				<Routes>
					<Route exact path="/" element={display} />
					<Route path="/subtitles" element={subtitles} />
				</Routes>
			</Router>
		);
	}
}

export default App;
