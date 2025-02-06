import React from 'react';
import {Button} from './Common.js';

class VideoCaller extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			speaker: null
		};
	}
	handleButton = (id) => {
		this.setState({speaker: id});
	}
	render() {
		if (!this.props.performance || !this.props.settings) return null;
		if (!this.state.speaker) {
			const callerButtons = Object.keys(this.props.settings.callers).map((i) =>
				<Button text={this.props.settings.callers[i]} id={this.props.settings.callers[i]} onClicked={this.handleButton} key={i} />
			);
			return (
				<div>
					<p tabIndex="0" role="alert">Please select your role:</p>
                    {callerButtons}
				</div>
			);
		}
		const p = this.props.performance;
		var knot = [];
		if (!p.nextLines) {
			console.log("There's no p.nextLines available to the VideoCaller view right now.")
		} else {
			console.log(p.nextLines);
			knot = p.nextLines.map(
				(line, index) => 
				<li key={index} className={"preview "+line.substring(0,4)}>{line}</li>
			);
		}
		if (p.currentSpeaker === this.state.speaker && p.currentLine !== "") {
			let display = null;
			if (p.currentLine.includes("RANT_READ")) {
				if (this.props.performance.rants) {
					display = Object.keys(this.props.performance.rants).map((i) =>
						<li key={i}>{this.props.performance.rants[i]}</li>
					);
				}
				return (
					<div>
						{this.state.speaker.toUpperCase()}:
						<ul>{display}</ul>
					</div>
				);
			} else {
				display = ( <p dangerouslySetInnerHTML={{ __html: p.currentLine, }} /> );
				return (
					<div>
						<div>
							{this.state.speaker.toUpperCase()}:
							{display}
						</div>
						<div><ul className="knot">{knot}</ul></div>
					</div>
				);
			}
		} else {
			return (
				<div>
					<div>--</div>
					<div><ul className="knot">{knot}</ul></div>
				</div>
			);
		}
	}
}

export default VideoCaller;
