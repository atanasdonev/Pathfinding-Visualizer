import "./Node.css";

export const Node = props => {
	const { row, col, isTarget, isStart, isWall, onMouseDown, onMouseEnter, onMouseUp } =
		props;

	let extraClassNames = "";
	if (isStart) extraClassNames = "node-start";
	if (isTarget) extraClassNames = "node-target";
	if (isWall) extraClassNames = "node-wall";

	return (
		<div
			id={`node-${row}-${col}`}
			className={`node ${extraClassNames}`}
			onMouseDown={() => onMouseDown(row, col)}
			onMouseEnter={() => onMouseEnter(row, col)}
			onMouseUp={() => onMouseUp()}
		></div>
	);
};
