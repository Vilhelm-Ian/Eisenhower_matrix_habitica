import { useState } from "react";

interface Props {
	login(isLoggedIn: boolean): void;
}

const creator = "a80214a4-2868-4f11-aa34-bb6327c57b9c";
const project_name = "EisenHower";

export default function Login(props: Props) {
	let [apiKey, setApiKey] = useState("");
	let [user, setUser] = useState("");
	function update(text: string, callback: Function) {
		callback(text);
	}
	async function login(e) {
		e.preventDefault();
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
		if (!data.succes) {
			return "wrong login";
		}
		props.login(true);
	}
	return (
		<div className="login-form">
			<label>Api Key</label>
			<input
				name="apiKey"
				onChange={(e) => update(e.target.value, setApiKey)}
			></input>
			<label>User</label>
			<input
				name="update"
				onChange={(e) => update(e.target.value, setUser)}
			></input>
			<button onClick={login}>Login</button>
		</div>
	);
}
