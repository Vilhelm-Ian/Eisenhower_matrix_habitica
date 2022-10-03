import { useState } from "react";

interface Props {
	setUser(user: string): void;
	setApiKey(apiKey: string): void;
	setLoggedIn(loggedin: boolean): void;
}

const project_name = "EisenHower";

export default function Login(props: Props) {
	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");
	let [is_wrong_attempt, setWrongAttempt] = useState(false);

	function update(text: string, callback: Function) {
		callback(text);
	}

	async function login(e: any) {
		e.preventDefault();
		try {
			let res = await fetch(
				"https://habitica.com/api/v3/user/auth/local/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username,
						password,
					}),
				}
			);
			if (res.status === 200) {
				let data = await res.json();
				console.log(data);
				document.cookie = `api=${data.data.apiToken};`;
				document.cookie = `user=${data.data.id};`;
				props.setUser(data.data.id);
				props.setApiKey(data.data.apiToken);
				props.setLoggedIn(true);
			} else {
				setWrongAttempt(true);
			}
		} catch (err) {
			console.log(err + "logging in");
		}
	}

	return (
		<div className="login-form">
			<h1>{project_name}</h1>
			<input
				placeholder="Username"
				name="username"
				onChange={(e) => update(e.target.value, setUsername)}
			></input>
			<input
				type="password"
				placeholder="Password"
				name="password"
				onChange={(e) => update(e.target.value, setPassword)}
			></input>
			{is_wrong_attempt ? <p>wrong password or username</p> : <></>}
			<button onClick={login}>Login</button>
		</div>
	);
}
