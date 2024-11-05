import React from 'react';
import {Button} from './Common.js'
import names from './Names.js';

class Welcome extends React.Component {
	handleButton = (id) => {
		this.props.onRoleSelected(id);
	}
		
	render() {
		if (!this.props.performance) {
			return (
				<div>
					<p tabIndex="0" role="alert">Welcome to {names.title}.</p>
					<Button text="Start Performance" id="moderator" onClicked={this.handleButton} />
				</div>
			);
		} else if (this.props.performance === "loading") {
			return (
				<div>
					<p>Loading...</p>
				</div>
			);
		} else {
			const callerButtons = Object.keys(names.callers).map((i) =>
				<Button text={names.callers[i]} id={names.callers[i]} onClicked={this.handleButton} />
			);
			return (
				<div>
					<p tabIndex="0" role="alert">Welcome to {names.title}. Please select your role from the following options:</p>
                    <div id="rolepicker">
					    <Button text="Audience" id="audience" onClicked={this.handleButton} />
					    {callerButtons}
					    <Button text="Moderator" id="moderator" onClicked={this.handleButton} />
                    </div>
				</div>
			);
		}
	}
}

export default Welcome;
