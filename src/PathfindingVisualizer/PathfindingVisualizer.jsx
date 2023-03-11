import { useEffect, useRef, useState } from "react";
import { Node } from "./Node/Node";
import "./PathfindingVisualizer.css";

const START_NODE_ROW = 15;
const START_NODE_COL = 16;
const TARGET_NODE_ROW = 15;
const TARGET_NODE_COL = 48;

const NODE_SIZE = 23;
const TOTAL_ROWS = 31;

function getInitialGrid(gridDiv) {
	const grid = [];
	for (let row = 0; row < TOTAL_ROWS; row++) {
		const currentRow = [];
		for (let col = 0; col < gridDiv.current.offsetWidth / NODE_SIZE; col++) {
			currentRow.push(createNode(row, col));
		}
		grid.push(currentRow);
	}
	return grid;
}

function createNode(row, col) {
	return {
		col,
		row,
		isStart: row === START_NODE_ROW && col === START_NODE_COL,
		isTarget: row === TARGET_NODE_ROW && col === TARGET_NODE_COL,
		distance: Infinity,
		isVisited: false,
		isWall: false,
		previousNode: null
	};
}

function getGridWithWallToggled(grid, row, col) {
	const gridWithWalls = grid.slice();
	const node = gridWithWalls[row][col];
	const nodeWall = {
		...node,
		isWall: !node.isWall
	};
	gridWithWalls[row][col] = nodeWall;
	return gridWithWalls;
}

const PathfindingVisualizer = () => {
	const gridDiv = useRef(null);

	const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
	const [grid, setGrid] = useState([]);
	const [mouseIsPressed, setMouseIsPressed] = useState(false);

	useEffect(() => {
		setGrid(getInitialGrid(gridDiv));
	}, []);

	function handleMouseDown(row, col) {
		const gridWithWalls = getGridWithWallToggled(grid, row, col);
		setGrid(gridWithWalls);
		setMouseIsPressed(true);
	}

	function handleMouseUp() {
		setMouseIsPressed(false);
	}

	function handeMouseEnter(row, col) {
		if (mouseIsPressed === false) return;
		const gridWithWalls = getGridWithWallToggled(grid, row, col);
		setGrid(gridWithWalls);
	}

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
									const { row, col, isTarget, isStart, isWall } = node;
									return (
										<Node
											key={nodeIdx}
											row={row}
											col={col}
											isStart={isStart}
											isTarget={isTarget}
											isWall={isWall}
											mouseIsPressed={mouseIsPressed}
											onMouseDown={(row, col) => {
												handleMouseDown(row, col);
											}}
											onMouseUp={() => {
												handleMouseUp();
											}}
											onMouseEnter={(row, col) => {
												handeMouseEnter(row, col);
											}}
										/>
									);
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
