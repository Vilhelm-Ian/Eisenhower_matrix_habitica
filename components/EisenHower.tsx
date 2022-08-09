interface Props {
	grid_data: {
		_do: any[];
		deligate: any[];
		schedule: any[];
		_delete: any[];
	};
}

function put_task_tex_in_tag(tasks: any): string[] {
	return tasks?.map((task: any) => <li key={task.text}>{task.text}</li>);
}

export default function EisenHower(props: Props) {
	let _do = put_task_tex_in_tag(props.grid_data._do);
	let schedule = put_task_tex_in_tag(props.grid_data.schedule);
	let deligate = put_task_tex_in_tag(props.grid_data.deligate);
	let _delete = put_task_tex_in_tag(props.grid_data._delete);

	return (
		<div className="grid">
			<div className="do">
				<div className="action do ">
					<h2>Do</h2>
				</div>
				<ul>{_do}</ul>
			</div>
			<div className="schedule">
				<div className="action schedule">
					<h2>Schedule</h2>
				</div>
				<ul>{schedule}</ul>
			</div>
			<div className="deligate">
				<div className="action deligate">
					<h2>deligate</h2>
				</div>
				<ul>{deligate}</ul>
			</div>
			<div className="delete">
				<div className="action delete">
					<h2>delete</h2>
				</div>
				<ul>{_delete}</ul>
			</div>
		</div>
	);
}
