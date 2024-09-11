import React from 'react';
import firebase from './firebase.js';
import './Subtitles.css'

class Subtitles extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
		performance: "loading subtitles",
    };
  }

	componentDidMount() {
      const performanceRef = firebase.database().ref('performance');
      performanceRef.on('value', (snapshot) => {
        const newState = snapshot.val();
        this.setState(state => ({
				performance: newState
			}));
			if (!newState) {
				console.log("Subtitles have no 'newState' - maybe failed to get snapshot?");
			} else if (newState === "restarting") {
				console.log("newState is 'restarting' so subtitles failed");
			}
        });
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {return;};
	}

	render() {
		let currentLine;

		if (!this.state.performance) {
			return (
				<div>
					<div>
						<p>Nothing to show</p>
					</div>
				</div>
			);
		}

		if (this.state.performance.currentLine !== "") {
			if (this.state.performance.currentSpeaker) {
                if (this.state.performance.currentLine.includes("Firebase-read")) {
                    currentLine = (
                        <div className={this.state.performance.currentSpeaker}>
						    <p>{this.state.performance.currentSpeaker.toUpperCase()}: (Reads the audience-generated rant, displayed on the right)</p>
					    </div>
                    );
		        } else {
				    currentLine = (
					    <div className={this.state.performance.currentSpeaker}>
						    <p>{this.state.performance.currentSpeaker.toUpperCase()}: {this.state.performance.currentLine}</p>
					    </div>
				    );
                }
			}
		}

		return (
				<div className = "Subtitles">
					<div className = "Subtitles-container">
						{currentLine}
					</div>
				</div>
			);

	}

}

export default Subtitles;