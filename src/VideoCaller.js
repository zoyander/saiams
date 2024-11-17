import React from 'react';

class VideoCaller extends React.Component {
	render() {
		if (!this.props.performance) return null;
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
		if (p.currentSpeaker === this.props.speaker && p.currentLine !== "") {
			let display = null;
			if (p.currentLine.includes("Firebase-read")) {
				if (this.props.performance.rants) {
					display = Object.keys(this.props.performance.rants).map((i) =>
						<li key={i}>{this.props.performance.rants[i]}</li>
					);
				}
				return (
					<div>
						{this.props.speaker.toUpperCase()}:
						<ul>{display}</ul>
					</div>
				);
			} else {
				display = ( <p dangerouslySetInnerHTML={{ __html: p.currentLine, }} /> );
				return (
					<div>
						<div>
							{this.props.speaker.toUpperCase()}:
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
