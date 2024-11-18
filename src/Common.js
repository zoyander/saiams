import React from 'react';

export class Button extends React.Component {
	handleClick = () => {		
		this.props.onClicked(this.props.id);
	}
	render() {
		return (
			<button className={this.props.styleClass} disabled={this.props.selected} onClick={this.handleClick}>{this.props.text}</button>
		);
	}
}

export class TextBox extends React.Component {
	constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
	this.props.onSubmitted(this.state.value);
	this.setState({value: ''});
    event.preventDefault();
  }
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" value="Submit" />
			</form>
		);
	}
}

export class TaskBar extends React.Component {
	render() {
		return (
			<div className="taskbar">
				<div className="taskbar-left" aria-hidden="true">{this.props.left}</div>
				<div className="taskbar-right" aria-hidden="true">{this.props.right}</div>
			</div>
		);
	}
}

export class VideoCall extends React.Component {
	render() {
		return (
			<div className="video-container">
				<iframe className="video" title="embed" src={this.props.embedLink} frameBorder="0" referrerPolicy="strict-origin-when-cross-origin"></iframe>
			</div>
		);
	}
}
