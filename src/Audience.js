import React from 'react';
import firebase from './firebase.js';
import {Button, TextBox} from './Common.js';

class Audience extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	selected: null,
		mute: "unmute"
    };
  }

	handleChoice = (id) => {
		const prev = this.state.selected
		const updates = {};
		if (prev) {
  		updates[`performance/choices/${prev}/votes`] = firebase.database.ServerValue.increment(-1);
		}
  		updates[`performance/choices/${id}/votes`] = firebase.database.ServerValue.increment(1);
		firebase.database().ref().update(updates);
		this.setState(state => ({
			selected: id
		}));
	}
    handleFreeResponse = (value) => {
        var postData = value;
        var newPostKey = firebase.database().ref().child('rants').push().key;
        var updates = {};
        updates['/rants/' + newPostKey] = postData;

        firebase.database().ref().update(updates);
    }
	handleMute = (id) => {
		this.setState(state => ({
			mute: id
		}))
	}
	playSound = (value) => {
		if (this.state.mute == "unmute") {
			if (value == "ping") {
				const audioElement = new Audio("https://intrapology.com/sfx/g-bell.mp3");
				audioElement.play();
			}
			if (value == "ring") {
				const audioElement = new Audio("https://intrapology.com/sfx/ringer.mp3");
				audioElement.play();
			}
		}
	}
	componentDidUpdate() {
		if (!this.props.performance) return;
		let resetChoices = true;
		const choices = this.props.performance.choices;
		if (choices) {
			const choiceValues = Object.values(choices);
			choiceValues.forEach((item) => {
				if (item.votes) resetChoices = false;
				if (item.text == "Hello!"){
					this.playSound("ring");
				}
			});
		}
		if (resetChoices && this.state.selected) {
			this.setState(state => ({
				selected: null
			}));
		}
	}
	render() {
		if (!this.props.performance) return null;

        let newsPopup;
        if (!this.props.news) {
            newsPopup = "No news";
        } else {
            newsPopup = this.props.news
        };

		let muteCommand;
		let buttonMessage;
		if (this.state.mute == "unmute"){
			muteCommand = "mute";
			buttonMessage = "mute sfx 🔕";
		} else {
			muteCommand = "unmute";
			buttonMessage = "unmute sfx 🔔"
		}

		
		let choices = [];
		let leading = 0;
		const allChoices = this.props.performance.choices;
		if (allChoices) {
			for (let i = 0; i < allChoices.length; i++) {
				if (allChoices.length > 1) { // Use this to hide fake choices used to progress the story e.g. "news"
				//if (allChoices[i].speaker === this.props.speaker) { // OR use this if there are multiple audience groups
					if (allChoices[i].votes > allChoices[leading].votes) {
						leading = i;
					}
					choices.push(allChoices[i]);
				}
			}
		}
		if (choices.length > 0) {
			const choiceList = Object.keys(choices).map((i) =>
				<Button
					key={i}
					text={choices[i].text+" ("+choices[i].votes+" votes)"}
					speaker={i == leading ? "highlight" : null}
					id={i}
					onClicked={this.handleChoice}
					selected={this.state.selected === i} />
			);
			return (
				<div>
					<div id="soundControl" className={muteCommand} aria-live="off">
						<Button 
							key={muteCommand}
							id={muteCommand}  
							text={buttonMessage}
							onClicked={this.handleMute} />
					</div>
					<ul role="status">{newsPopup}</ul>
					<p tabIndex="0" role="alert">Please vote for one of the following:</p>
					{choiceList}
				</div>
			);
		} else {
			if (this.props.performance.audience) {
				if (this.props.rant.length < 21){
					//this.playSound("ping"); // not sure why this keeps pinging, fix later
				};
				let newText = this.props.performance.audience.replace('@', '');
				return (
                    <div>
						<div id="soundControl" className={muteCommand} aria-live="off">
							<Button 
								key={muteCommand}
								id={muteCommand}   
								text={buttonMessage}
								onClicked={this.handleMute} />
						</div>
						<ul role="status">{newsPopup}</ul>
					    <div className="bubble">
						    <p tabIndex="0" role="alert" >Have your say! {newText.trim()}</p>
                            <TextBox onSubmitted={this.handleFreeResponse}/>
                        </div>
                        <p aria-hidden="true">Current rant content</p>
                        <ul aria-hidden="true">{this.props.rant}</ul>
                    </div>
				);
			} else {
				return (
					<div aria-live="off">
						<div id="soundControl" className={muteCommand} aria-live="off">
							<Button 
								key={muteCommand}
								id={muteCommand}    
								text={buttonMessage}
								onClicked={this.handleMute} />
						</div>
            			<ul role="status">{newsPopup}</ul>
						<p>You don't have to do anything right now - just sit back and enjoy the show!</p>
					</div>
				);
			}
		}
	}
}

export default Audience;
