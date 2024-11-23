package cli_test

import (
	"jpbamberg1993/learngowithtests/cli"
	poker "jpbamberg1993/learngowithtests/http-server"
	"strings"
	"testing"
)

func TestCLI(t *testing.T) {
	t.Run("record mary win from user input", func(t *testing.T) {
		in := strings.NewReader("Mary wins\n")
		playerStore := &poker.StubPlayStore{}

		myCLI := cli.NewCLI(playerStore, in)
		myCLI.PlayPoker()

		AssertPlayerWin(t, playerStore, "Mary")
	})

	t.Run("record paul win from user input", func(t *testing.T) {
		in := strings.NewReader("Paul wins\n")
		playerStore := &poker.StubPlayStore{}

		myCLI := cli.NewCLI(playerStore, in)
		myCLI.PlayPoker()

		AssertPlayerWin(t, playerStore, "Paul")
	})
}

func AssertPlayerWin(t *testing.T, store *poker.StubPlayStore, player string) {
	t.Helper()

	if len(store.WinCalls) != 1 {
		t.Errorf("got %d calls to RecordWin but wanted %d", len(store.WinCalls), 1)
		return
	}

	if store.WinCalls[0] != player {
		t.Errorf("did not store correct winner got %q want %q", store.WinCalls[0], player)
		return
	}
}
