import { useState, useEffect } from "react";

interface Props {
	apiKey: string;
	user: string;
}

interface Tags {
	important: string;
	urgent: string;
}

function put_task_tex_in_ul(tasks: any): string[] {
	return tasks?.map((task: any) => <li key={task.text}>{task.text}</li>);
}

const creator = "a80214a4-2868-4f11-aa34-bb6327c57b9c";
const project_name = "EisenHower";

export default function EisenHower(props: Props) {
	let [_do, setDo] = useState([""]);
	let [schedule, setSchedule] = useState([""]);
	let [delegate, setDelegate] = useState([""]);
	let [_delete, setDelete] = useState([""]);

	async function getTags(
		apiKey: string,
		user: string
	): Promise<Tags | undefined> {
		try {
			let res = await fetch("https://habitica.com/api/v3/user", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": apiKey,
					"x-api-user": user,
					"x-client": creator + "-" + project_name,
				},
			});
			let data = await res.json();
			console.log(data)
			let tags = data.data.tags;
			let important = tags.filter((tag: any) => tag.name == "important");
			let urgent = tags.filter((tag: any) => tag.name == "urgent");
			return { important: important[0].id, urgent: urgent[0].id };
		} catch (err) {
			console.log(err);
		}
	}

	async function getTasks() {
		try {
			let res = await fetch("https://habitica.com/api/v3/tasks/user", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": props.apiKey,
					"x-api-user": props.user,
					"x-client": creator + "-" + project_name,
				},
			});
			return await res.json();
		} catch (err) {
			console.log(err);
		}
	}

	async function place_task_in_appropriate_square(
		squares: any,
		task: any,
		tags: Tags
	) {
		let isImporant = task.tags.includes(tags?.important);
		let isUrgent = task.tags.includes(tags?.urgent);
		if (isImporant && isUrgent) return squares._do.push(task);
		if (isImporant) return squares.schedule.push(task);
		if (isUrgent) return squares.delegate.push(task);
		squares._delete.push(task);
	}

	async function generateMatrix() {
		try {
			let data = await getTasks();
			let dailyTasks = data.data.filter((task: any) => task.type == "daily" || task.type == "todo");
			let tags: Tags | undefined = await getTags(props.apiKey, props.user);
			if (tags === undefined) throw "can't generate matrix, couldn't find tags";
			let squares = {
				_do: [],
				schedule: [],
				delegate: [],
				_delete: [],
			};
			for (let i = 0; i < dailyTasks.length; i++) {
				if (dailyTasks[i].completed) continue;
				place_task_in_appropriate_square(squares, dailyTasks[i], tags);
			}
			return squares;
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		console.log("we are loading");
		generateMatrix()
			.then((squares) => {
				setDo(put_task_tex_in_ul(squares?._do));
				setSchedule(put_task_tex_in_ul(squares?.schedule));
				setDelegate(put_task_tex_in_ul(squares?.delegate));
				setDelete(put_task_tex_in_ul(squares?._delete));
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="grid">
			<div className="do">
				<div className="action">
					<h2>Do</h2>
				</div>
				<ul>{_do}</ul>
			</div>
			<div className="schedule">
				<div className="action">
					<h2>Schedule</h2>
				</div>
				<ul>{schedule}</ul>
			</div>
			<div className="delegate">
				<div className="action">
					<h2>delegate</h2>
				</div>
				<ul>{delegate}</ul>
			</div>
			<div className="delete">
				<div className="action">
					<h2>delete</h2>
				</div>
				<ul>{_delete}</ul>
			</div>
		</div>
	);
}
