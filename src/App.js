import React from 'react';
import firebase from './firebase.js';
import './App.css';
import Audience from './Audience.js';
import VideoCaller from './VideoCaller.js';
import Moderator from './Moderator.js';
import Welcome from './Welcome.js';
import names from './Names.js';

const rantLength = 20;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			role: null,
			performance: "loading",
            rant: "rant string",
            news: "news string",
		}
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
	componentDidMount() {
      // Get performance data from Firebase
      const performanceRef = firebase.database().ref('performance');
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
      //Get rant data from Firebase
      const rantRef = firebase.database().ref('rants').limitToLast(rantLength);
      rantRef.on('value', (snapshot) => {
        const newState = snapshot.val();
        let rantArray = new Array(rantLength);
        console.log ('imported rant from Firebase:', newState);
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            rantArray.push({key: childKey, data: childData});
        });
        var rantItems = rantArray.map(line => <li key={line.key}>{line.data}</li>);
        this.setState(state => ({
				rant: rantItems
			}));
        });
      //Get news stories from Firebase
      const newsRef = firebase.database().ref('news').limitToLast(1);
      newsRef.on('value', (snapshot) => {
        const newState = snapshot.val();
        let newsArray = new Array(rantLength);
        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            newsArray.push({key: childKey, data: childData});
        });
        var newsItems = newsArray.map(line => <li span class="news" key={line.key}>{line.data}</li>);
        this.setState(state => ({
				news: newsItems
			}));
        });
	}
	componentWillUnmount() {
		this.setState = (state, callback) => {return;};
	}
	render() {

		let display;
		switch(this.state.role) {
			case "audiencea":
				display = ( <Audience performance={this.state.performance} speaker={names.callerA} news={this.state.news} rant={this.state.rant}/> );
				break;
			case "audienceb":
				display = ( <Audience performance={this.state.performance} speaker={names.callerB} news={this.state.news} rant={this.state.rant}/> );
				break;
			case "callera":
				display = ( <VideoCaller performance={this.state.performance} speaker={names.callerA} rant={this.state.rant} />);
				break;
			case "callerb":
				display = ( <VideoCaller performance={this.state.performance} speaker={names.callerB} /> );
				break;
			case "moderator":
				display = ( <Moderator performance={this.state.performance} onBackButton={this.handleBackButton} rant={this.state.rant} news={this.state.news} /> );
				break;
			default:
				display = ( <Welcome performance={this.state.performance} onRoleSelected={this.handleRoleSelected} /> );
		}
		return (
			<div className="App">
				<header className="App-container">
					{display}
				</header>
			</div>
		);
	}
}

export default App;
