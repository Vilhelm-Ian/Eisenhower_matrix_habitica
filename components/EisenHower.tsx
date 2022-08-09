interface Props {
	grid_data: {
		_do: any[];
		deligate: any[];
		schedule: any[];
		_delete: any[];
	};
}

export default function EisenHower(props: Props) {
	console.log(props.grid_data, "props");

	let _do = props.grid_data._do?.map((task) => (
		<p key={task.text}>{task.text}</p>
	));
	let schedule = props.grid_data.schedule?.map((task) => (
		<p key={task.text}>{task.text}</p>
	));
	let deligate = props.grid_data.deligate?.map((task) => (
		<p key={task.text}>{task.text}</p>
	));
	let _delete = props.grid_data._delete?.map((task) => (
		<p key={task.text}>{task.text}</p>
	));
	return (
		<div className="grid">
			<div className="do">{_do}</div>
			<div className="schedule">{schedule}</div>
			<div className="deligate">{deligate}</div>
			<div className="delete">{_delete}</div>
		</div>
	);
}
