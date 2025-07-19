import { useState } from 'react'
import './App.css'

function checkWinner(squares: string[]) {
	const winningCombinations = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,4,8],
		[1,4,7],
		[2,4,6],
		[0,3,6],
		[1,4,7],
		[2,5,8],
	]
	for (let i = 0; i < winningCombinations.length; i++) {
		const [a, b, c] = winningCombinations[i]
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]
		}
	}
	return ""
}

type BoardProps = {
	squares: any,
	onPlay: (squares: string[]) => void,
	xIsNext: boolean
}

function Board({ squares, onPlay, xIsNext }: BoardProps) {
	const winner = checkWinner(squares)

	let title
	if (winner) {
		title = `Winner: ${winner}`
	} else {
		title = `Next player: ${xIsNext ? 'X' : 'O'}`
	}

	function handleClick(i: number) {
		const newSquares = squares.slice()
		newSquares[i] = xIsNext ? 'X' : 'O'
		onPlay(newSquares)
	}

	return (
		<div>
			<h2>{title}</h2>
			<div className={"grid grid-cols-3 w-fit"}>
				<button className={"border-1 h-10 w-10"} onClick={() => handleClick(0)}>{squares[0]}</button>
				<button className={"border-1 h-10 w-10"} onClick={() => handleClick(1)}>{squares[1]}</button>
				<button className={"border-1 h-10 w-10"} onClick={() => handleClick(2)}>{squares[2]}</button>
				<button className={"border-1 h-10 w-10"} onClick={() => handleClick(3)}>{squares[3]}</button>
				<button className={"border-1 h-10 w-10"} onClick={() => handleClick(4)}>{squares[4]}</button>
				<button className={"border-1 h-10 w-10"} onClick={() => handleClick(5)}>{squares[5]}</button>
				<button className={"border-1 h-10 w-10"} onClick={() => handleClick(6)}>{squares[6]}</button>
				<button className={"border-1 h-10 w-10"} onClick={() => handleClick(7)}>{squares[7]}</button>
				<button className={"border-1 h-10 w-10"} onClick={() => handleClick(8)}>{squares[8]}</button>
			</div>
		</div>
	)
}

function Game() {
	const [history, setHistory] = useState<string[][]>([Array(9).fill('')])
	const [currentMove, setCurrentMove] = useState<number>(0)
	const squares = history[currentMove]
	const xIsNext = currentMove % 2 === 0

	function handlePlay(squares: string[]) {
		let newSquares = [...history.slice(0, currentMove+1), squares]
		setHistory(newSquares)
		setCurrentMove(newSquares.length-1)
	}

	function jumpTo(i: number) {
		setCurrentMove(i)
	}

	const moves = history.map((_, i) => {
		let title
		if (i > 0) {
			title = `Go to move #${i}`
		} else {
			title = "Go to game start"
		}

		return (
			<li key={i}>
				<button onClick={() => jumpTo(i)}>{title}</button>
			</li>
		)
	})

	return (
		<div className={"flex flex-row"}>
			<div>
				<Board squares={squares} onPlay={handlePlay} xIsNext={xIsNext} />
			</div>
			<ol className={"list-decimal ml-10"}>
				{moves}
			</ol>
		</div>
	)
}

export default function App() {
	return <Game />
}
