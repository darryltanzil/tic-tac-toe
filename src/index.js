import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


/* class Square extends React.Component {
	// these square components are control components; the board has full control over them
	render() {
		return (
			<button
				className="square"
				onClick={() => this.props.onClick()}
			>

				{this.props.value}
			</button>
		);
	}
}
It is better to create Square as a function component, instead of as a class- all it needs is a render component, does not have their own state */

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	)
}

class Board extends React.Component {

	constructor(props) {
		super(props);

		// the board's state of squares, is an array full of 9 different square states
		// each square has 3 different states: X, 0, and null
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		};
	}

	renderSquare(i) {

		// passing two props from Board to Square: value and onClick
		// onClick prop is a fucntion that Square can call when clicked.
		return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
	}

	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			xIsNext: true,
		}
	}
	render() {
		const history = this.state.history;
		const current = history[history.length - 1];
		const winner = calculateWinner(current.squares);

		let status;

		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}

	handleClick(i) {
		const history = this.state.history;
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
		  return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
		  history: history.concat([{
			squares: squares,
		  }]),
		  xIsNext: !this.state.xIsNext,
		});
	  }
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);

function calculateWinner(squares) {

	// winning combinations
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	// iterates through every line for its length
	for (let i = 0; i < lines.length; i++) {
		// creates a constant [a, b, c] and compares to see if they are all at the same state, if so then return the winner
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}