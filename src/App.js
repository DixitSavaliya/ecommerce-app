import React from 'react';
import './App.css';
import Home from './Component/home/home';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	/** Render this app first app component run */
	render() {
		return (
			<div>
				{/** Render Home Component */}
				<Home />
			</div>
		)
	}
}
export default App;
