import React from 'react';
import firebase from './firebase.js';
import './Backgrounds.css';

class Backgrounds extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            world: "loading" 
        }
    }

componentDidMount() {
      const worldRef = firebase.database().ref('world');
      worldRef.on('value', (snapshot) => {
        const newState = snapshot.val();
        this.setState(state => ({
				world: newState
			}));
			if (!newState) {
				console.log("world has no 'newState' - maybe failed to get snapshot?");
			} else if (newState === "restarting") {
				console.log("newState is 'restarting' so background image failed");
			}
        });
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {return;};
	}

    render() {
		let image;

		if (!this.state.world) {
			return (
				<div>
					<div>
						<p>No world state available</p>
					</div>
				</div>
			);
		}
    

		if (this.state.world !== "") {
			image = (
				<div className={this.state.world}></div>
			);
		} else {
            image = (
                <div>Error: World state has not loaded</div>
            );
        }

        return (
				    <div className = "Backgrounds">
						<div class="background-container">
							{image}
						</div>
				    </div>
			    );
    }
}

export default Backgrounds;