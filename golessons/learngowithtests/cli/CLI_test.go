package cli

import (
	"bytes"
	"io"
	"strings"
	"testing"
)

var dummyStdIn = &bytes.Buffer{}
var dummyStdOut = &bytes.Buffer{}

type GameSpy struct {
	StartCalled     bool
	StartCalledWith int

	FinishCalled     bool
	FinishCalledWith string
}

func (g *GameSpy) PlayGame(numberOfPlayers int) {
	g.StartCalled = true
	g.StartCalledWith = numberOfPlayers
}

func (g *GameSpy) Finish(winner string) {
	g.FinishCalled = true
	g.FinishCalledWith = winner
}

func userSends(messages ...string) io.Reader {
	return strings.NewReader(strings.Join(messages, "\n"))
}

func TestCLI(t *testing.T) {
	t.Run("starts with 7 players and ends with 'Paul' as winner", func(t *testing.T) {
		stdout := &bytes.Buffer{}
		game := &GameSpy{}

		in := userSends("7", "Paul")
		myCLI := NewCLI(in, stdout, game)

		myCLI.PlayPoker()

		assertMessageSentToUser(t, stdout, PlayerPrompt)
		assertGameStartedWith(t, game, 7)
		assertFinishCalledWith(t, game, "Paul")
	})

	t.Run("game start with 8 players and ends with 'Brenda' as winner", func(t *testing.T) {
		game := &GameSpy{}

		in := userSends("8", "Brenda")
		myCLI := NewCLI(in, dummyStdOut, game)
		myCLI.PlayPoker()

		assertFinishCalledWith(t, game, "Brenda")
		assertGameStartedWith(t, game, 8)
	})

	t.Run("it prints an error when a non numeric value is entered and does not start the game", func(t *testing.T) {
		game := &GameSpy{}
		game.StartCalledWith = -1
		stdout := &bytes.Buffer{}

		in := userSends("lemon")
		myCLI := NewCLI(in, stdout, game)
		myCLI.PlayPoker()

		assertGameNotStarted(t, game)
		assertMessageSentToUser(t, stdout, PlayerPrompt, BadPlayerInputErrMsg)
	})

	t.Run("it prints an error when a winner is declared incorrectly", func(t *testing.T) {
		game := &GameSpy{}
		stdout := &bytes.Buffer{}

		in := userSends("3", "dat moda fucker blead")
		myCLI := NewCLI(in, stdout, game)
		myCLI.PlayPoker()

		assertGameNotFinished(t, game)
		assertMessageSentToUser(t, stdout, PlayerPrompt, BadWinnerInputMsg)
	})
}

func assertGameNotFinished(t *testing.T, game *GameSpy) {
	t.Helper()
	if game.FinishCalled {
		t.Error("game should not have finished")
	}
}

func assertGameNotStarted(t *testing.T, game *GameSpy) {
	t.Helper()
	if game.StartCalledWith >= 0 {
		t.Error("game should not have started")
	}
}

func assertFinishCalledWith(t testing.TB, game *GameSpy, winner string) {
	t.Helper()
	if game.FinishCalledWith != winner {
		t.Errorf("wanted winner %q got %q", winner, game.FinishCalledWith)
	}
}

func assertGameStartedWith(t testing.TB, game *GameSpy, numberOfPlayersWanted int) {
	t.Helper()
	if game.StartCalledWith != numberOfPlayersWanted {
		t.Errorf("wanted Start called with 7 but got %d", game.StartCalledWith)
	}
}

func assertMessageSentToUser(t testing.TB, stdout *bytes.Buffer, messages ...string) {
	t.Helper()
	want := strings.Join(messages, "")
	got := stdout.String()
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}
