import { useEffect, useRef, useState } from "react";
import { Node } from "./Node/Node";
import "./PathfindingVisualizer.css";

// const START_NODE_ROW = 16;
// const START_NODE_COL = 16;
// const FINISH_NODE_ROW = 16;
// const FINISH_NODE_COL = 46;

const getInitialGrid = gridDiv => {
	const grid = [];
	for (let row = 0; row < 31; row++) {
		const currentRow = [];
		for (let col = 0; col < gridDiv.current.offsetWidth / 25; col++) {
			currentRow.push(<Node />);
		}
		grid.push(currentRow);
	}
	return grid;
};

// const createNode = (col, row) => {
// 	return {
// 		col,
// 		row,
// 		isStart: row === START_NODE_ROW && col === START_NODE_COL,
// 		isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
// 		distance: Infinity,
// 		isVisited: false,
// 		isWall: false,
// 		previousNode: null
// 	};
// };

const PathfindingVisualizer = () => {
	const gridDiv = useRef(null);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
	const [grid, setGrid] = useState([]);

	useEffect(() => {
		setGrid(getInitialGrid(gridDiv));
	}, []);

	return (
		<>
			<nav className="nav">
				<h1>Pathfinding Visualizer</h1>
				<select
					className="algorithms"
					onChange={e => {
						setSelectedAlgorithm(e.target.value);
					}}
				>
					<option value="dijkstra">Dijkstra's Algorithm</option>
					<option value="astar">A* Search</option>
					<option value="bfs">Breadth-first Search</option>
					<option value="dfs">Depth-first Search</option>
				</select>
				<button className="btn btn-green">Visualize!</button>
				<button className="btn btn-dark-bg btn-clear">Clear Board</button>
			</nav>
			<section className="main-text">
				<div className="annotations-div">
					<div className="annotation start-node">
						<img src="../src/assets/start.svg" alt="start-node" />
						<p>Start Node</p>
					</div>
					<div className="annotation target-node">
						<img src="../src/assets/target.svg" alt="target-node" />
						<p>Target Node</p>
					</div>
					<div className="annotation">
						<div className="node-example"></div>
						<p>Unvisited Node</p>
					</div>
					<div className="annotation">
						<div className="node-example visited-node"></div>
						<p>Visited Node</p>
					</div>
					<div className="annotation">
						<div className="node-example shortest-path-node"></div>
						<p>Shortest Path Node</p>
					</div>
					<div className="annotation">
						<div className="node-example wall-node"></div>
						<p>Wall Node</p>
					</div>
				</div>
				<p className="algorithm-description">
					{{
						dijkstra: "Dijkstra's Algorithm guarantees the shortest path!",
						astar: "A* Search guarantees the shortest path!",
						bfs: "Breadth-first Search guarantees the shortest path!",
						dfs: "Depth-first Search does not guarantee the shortest path!"
					}[selectedAlgorithm] || "Dijkstra's Algorithm guarantees the shortest path!"}
				</p>
			</section>
			<main className="main">
				<div className="grid" ref={gridDiv}>
					{grid.map((row, rowIdx) => {
						return (
							<div className="grid-row" key={rowIdx}>
								{row.map((node, nodeIdx) => {
									return <Node key={nodeIdx} />;
								})}
							</div>
						);
					})}
				</div>
			</main>
		</>
	);
};

export default PathfindingVisualizer;
