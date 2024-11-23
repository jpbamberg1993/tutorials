package cli

import (
	"bufio"
	"io"
	poker "jpbamberg1993/learngowithtests/http-server"
	"strings"
)

type CLI struct {
	playerstore poker.PlayerStore
	in          *bufio.Scanner
}

func NewCLI(store poker.PlayerStore, in io.Reader) *CLI {
	return &CLI{store, bufio.NewScanner(in)}
}

func (cli *CLI) PlayPoker() {
	userInput := cli.readLine()
	cli.playerstore.RecordWin(extractWinner(userInput))
}

func (cli *CLI) readLine() string {
	cli.in.Scan()
	return cli.in.Text()
}

func extractWinner(text string) string {
	return strings.Replace(text, " wins", "", 1)
}
