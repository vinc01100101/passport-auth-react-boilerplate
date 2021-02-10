const React = require("react");
const ReactDOM = require("react-dom");
const ErrorMessage = require("./components/ErrorMessage");

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		};
		this._handleOnChange = this._handleOnChange.bind(this);
	}

	_handleOnChange(e) {
		this.setState({
			[e.target.id]: e.target.value,
		});
	}
	render() {
		return (
			<div>
				<h1>Home Page</h1>
				<form action="/login" method="post">
					<ErrorMessage />
					<input
						required
						type="text"
						id="username"
						name="username"
						placeholder="Username"
						onChange={this._handleOnChange}
						value={this.state.username}
					/>
					<br />
					<input
						required
						type="text"
						id="password"
						name="password"
						placeholder="Password"
						onChange={this._handleOnChange}
						value={this.state.password}
					/>
					<br />
					<button type="submit">Login</button>
				</form>
				<a href="/register">
					<button>Register</button>
				</a>
			</div>
		);
	}
}

const root = document.querySelector("#root");

ReactDOM.render(<Home />, root);
