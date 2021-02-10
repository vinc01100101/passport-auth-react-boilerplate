const React = require("react");
const ReactDOM = require("react-dom");

class Profile extends React.Component {
	render() {
		return (
			<div>
				<h1>Profile Page!</h1>
				<a href="/logout">Log out</a>
			</div>
		);
	}
}

const root = document.querySelector("#root");

ReactDOM.render(<Profile />, root);
