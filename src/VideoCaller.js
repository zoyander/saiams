import React from 'react';

class VideoCaller extends React.Component {

	render() {
		if (!this.props.performance) return null;
		const p = this.props.performance;
        const r = this.props.rant;
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
			let display;
            if (p.currentLine.includes("Firebase-read")) {
                display = r;
                return (
                    <div className={"bubble "+this.props.speaker}>
                        {this.props.speaker}:
                        <ul>{display}</ul>
                    </div>
                );
            } else {
    			display = ( <p dangerouslySetInnerHTML={{ __html: p.currentLine, }} /> );
    			return (
                    <div>
    				    <div className={"bubble "+this.props.speaker}>
                            {this.props.speaker}:
    					    {display}
    				    </div>
                        <div><ul class="knot">{knot}</ul></div>
                    </div>
    			);
            }
		} else {
			return (
                <div>
				    <div>--</div>
                    <div><ul class="knot">{knot}</ul></div>
                </div>
			);
		}
	}
}

export default VideoCaller;
