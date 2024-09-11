import React from 'react';

export class Button extends React.Component {
	handleClick = () => {		
		this.props.onClicked(this.props.id);
	}
	render() {
		return (
			<button className={this.props.speaker} disabled={this.props.selected} onClick={this.handleClick}>{this.props.text}</button>
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

export class Countdown extends React.Component {
	render() {
		return (
			<div className="countdown"></div>
		);
	}
}
