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
			return winningCombinations[i]
		}
	}
	return null
}

function getGridPosition(index: number) {
	const row = Math.floor(index / 3)
	const column = index % 3
	return [row+1, column+1]
}

type BoardProps = {
	squares: string[],
	onPlay: (squares: string[]) => void,
	xIsNext: boolean
}

function Board({ squares, onPlay, xIsNext }: BoardProps) {
	const winner = checkWinner(squares)

	// it's a tie if no winner is declared and all squares are selected
	const isTie = winner === null && !squares.some(s => s === '')

	let title
	if (winner) {
		title = `Winner: ${squares[winner[0]]}`
	} else if (isTie) {
		title = `It's a tie :(`
	} else {
		title = `Next player: ${xIsNext ? 'X' : 'O'}`
	}

	function handleClick(i: number) {
		if (squares[i] || checkWinner(squares)) {
			return
		}
		const newSquares = squares.slice()
		newSquares[i] = xIsNext ? 'X' : 'O'
		onPlay(newSquares)
	}

	return (
		<div>
			<h2>{title}</h2>
			<div className={"grid grid-cols-3 w-fit"}>
				{squares.map((square, i) => {
					return <button
						key={i}
						className={`border-1 h-10 w-10 ${winner?.some(w => w === i) && 'bg-green-200'}`}
						onClick={() => handleClick(i)}>
						{square}
					</button>
				})}
			</div>
		</div>
	)
}

function Game() {
	const [history, setHistory] = useState<string[][]>([Array(9).fill('')])
	const [currentMove, setCurrentMove] = useState<number>(0)
	const [desc, setDesc] = useState(true)
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

	const moves = history.map((squares, i) => {
		let title
		let isCurrentMove = i === currentMove
		let alteredIndex = -1

		if (i !== 0) {
			for (let j = 0; j < squares.length; j++) {
				if (squares[j] !== history[i-1][j]) {
					alteredIndex = j
					break
				}
			}
		}

		if (i === 0) {
			title = "Go to game start"
		} else if (isCurrentMove) {
			title = `You are on move #${i} position (${getGridPosition(alteredIndex).join(", ")})`
		} else {
			title = `Go to move #${i} position (${getGridPosition(alteredIndex).join(", ")})`
		}

		return (
			<li key={i}>
				{isCurrentMove ? (
					<p>{title}</p>
				) : (
					<button onClick={() => jumpTo(i)}>{title}</button>
				)}
			</li>
		)
	})

	if (!desc) {
		moves.reverse()
	}

	return (
		<div className={"flex flex-row"}>
			<div>
				<Board squares={squares} onPlay={handlePlay} xIsNext={xIsNext} />
			</div>
			<div>
				<button onClick={() => setDesc(!desc)}>Toggle order</button>
				<ol className={"list-decimal ml-10"}>
					{moves}
				</ol>
			</div>
		</div>
	)
}

export default function App() {
	return <Game />
}
