import { useState } from 'react'
import './App.css'

function calculateWinner(squares: string[]) {
	const successValues = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]
	for (let i = 0; i < successValues.length; i++) {
		const [a, b, c] = successValues[i]
		for (let j = 0; j < 3; j++) {
			if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
				return squares[a]
			}
		}
	}
	return null
}

export function Square({ value, onSquareClick }: {value: string | null, onSquareClick: () => void}) {
	return <button
		className={"border-1 w-7 h-7"}
		onClick={onSquareClick}>
		{value}
	</button>
}

export function Board() {
	const [xIsNext, setXIsNext] = useState(true)
	const [squares, setSquares] = useState(Array(9).fill(null))

	function handleClick(i: number) {
		if (squares[i] || calculateWinner(squares)) {
			return
		}
		const nextSquares = squares.slice()
		if (xIsNext) {
			nextSquares[i] = 'X'
		} else {
			nextSquares[i] = 'O'
		}
		setSquares(nextSquares)
		setXIsNext(!xIsNext)
	}

	const winner = calculateWinner(squares)
	let status
	if (winner) {
		status = `Winner: ${winner}`
	} else {
		status = `Next player: ${xIsNext ? 'X' : 'O'}`
	}

	return <>
		<div className={"text-left"}>{status}</div>
		<div className={"flex"}>
			<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
			<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
			<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
		</div>
		<div className={"flex"}>
			<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
			<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
			<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
		</div>
		<div className={"flex"}>
			<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
			<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
			<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
		</div>
	</>
}

function App() {
	return <Board />
}

export default App
