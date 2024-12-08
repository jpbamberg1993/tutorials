package cli

type Game interface {
	PlayGame(numberOfPlayers int)
	Finish(winner string)
}
