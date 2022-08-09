interface Props {
	grid_data: {
		_do: any[];
		deligate: any[];
		schedule: any[];
		_delete: any[];
	};
}

function put_task_tex_in_tag(tasks: any): string[] {
	return tasks?.map((task) => <p key={task.text}>{task.text}</p>);
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
				{_do}
			</div>
			<div className="schedule">
				<div className="action schedule">
					<h2>Schedule</h2>
				</div>
				{schedule}
			</div>
			<div className="deligate">
				<div className="action deligate">
					<h2>deligate</h2>
				</div>
				{deligate}
			</div>
			<div className="delete">
				<div className="action delete">
					<h2>delete</h2>
				</div>
				{_delete}
			</div>
		</div>
	);
}
