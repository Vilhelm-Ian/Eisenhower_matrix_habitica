import { useState } from "react";

interface Props {
	setUser(user: string): void;
	setApiKey(apiKey: string): void;
	setLoggedIn(loggedin: boolean): void;
}

const creator = "a80214a4-2868-4f11-aa34-bb6327c57b9c";
const project_name = "EisenHower";

export default function Login(props: Props) {
	let [apiKey, setApiKey] = useState("");
	let [user, setUser] = useState("");

	function update(text: string, callback: Function) {
		callback(text);
	}

	async function login(e: any) {
		e.preventDefault();
		try {
			let res = await fetch("https://habitica.com/api/v3/tasks/user", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": apiKey,
					"x-api-user": user,
					"x-client": creator + "-" + project_name,
				},
			});
			let data = await res.json();
			if (!data.success) return;
			document.cookie = `api=${apiKey};`;
			document.cookie = `user=${user};`;
			props.setUser(user);
			props.setApiKey(apiKey);
			props.setLoggedIn(true);
		} catch (err) {
			console.log(err + "logging in");
		}
	}

	return (
		<div className="login-form">
			<h1>Habit Matrix</h1>
			<input
				placeholder="User ID"
				name="update"
				onChange={(e) => update(e.target.value, setUser)}
			></input>
			<input
				placeholder="Api Token"
				name="apiKey"
				onChange={(e) => update(e.target.value, setApiKey)}
			></input>
			<button onClick={login}>Login</button>
		</div>
	);
}
