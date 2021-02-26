import React from 'react';
import Home from "./components/Home";
import SinglePost from "./components/SinglePost";
import { Router } from "@reach/router";

class App extends React.Component {
	render() {
		return (
			<div>
				<Router>
					<Home path="/" />
					<SinglePost path="/post/:id" />
				</Router>
			</div>
		);
	}
}

export default App;

