import firebase from './firebase.js';
import names from './Names.js';

const Story = require('inkjs').Story;
const json = require('./script.ink.json');

class Script {
	initPerformance(props) {
		this.story = new Story(json);
		if (!props) {
			this.continue();
		} else {
			this.story.state.LoadJson(props.saveState);
		}
	}
	continue(props = null) {
		let nextLines = [];
		let audience = null;
		let choices = null;
        let news = null;
		let world = null;
		if (props) {
			if (props.nextLines) nextLines = props.nextLines;
			if (props.audience) audience = props.audience;
			if (props.choices) choices = props.choices;
		} else {
			nextLines = [];
			while (this.story.canContinue) {
				nextLines.push(this.story.Continue());
			}
			let numChoices = this.story.currentChoices.length;
			if (numChoices > 0) {
				choices = {};
				for (let i = 0; i < numChoices; i++) {
					choices[i] = { text: null, speaker: null, votes: 0 };
					let newText = this.story.currentChoices[i].text.replace('/', '');
					choices[i].text = this.getLineText(newText);
					choices[i].speaker = this.getSpeaker(newText);
				}
			}
		}
		let line = "";
		while (nextLines.length > 0) {
			line = nextLines.shift();
            if (line.includes('News:')) {
                news = this.getLineText(line);
            }
            if (line.includes('setWorldState:')) {
                world = this.getLineText(line);
            }
			if (line.includes('@')) {
				audience = this.getLineText(line);
			} else {
				break;
			}
		}
		const state = this.story.state.toJson();
		firebase.database().ref('performance').set({
			currentLine: this.getLineText(line),
			currentSpeaker: this.getSpeaker(line),
			nextLines: nextLines,
			audience: audience,
			choices: choices,
			saveState: state,
		});
        firebase.database().ref('news').push(
            news,
        );
		if (world != "") {
        	firebase.database().ref('world').set(
            	world,
       	 		);
			}
	}
	getLineText(text) {
		let newText = text.replace(/\w+: /, '');
		return newText.trim();
	}
	getSpeaker(text) {
		if (text.includes(names.callerA+': ')) return names.callerA;
		if (text.includes(names.callerB+': ')) return names.callerB;
		return null;
	}
	pickChoice(choice) {
		this.story.ChooseChoiceIndex(choice);
		this.continue();
	}
	startOver() {
		this.story.ChoosePathString("Start");
		this.continue();
	}
}

const instance = new Script();
export default instance;
