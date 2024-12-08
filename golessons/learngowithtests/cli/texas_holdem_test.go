package cli_test

import (
	"bytes"
	"fmt"
	"jpbamberg1993/learngowithtests/cli"
	poker "jpbamberg1993/learngowithtests/http-server"
	"strings"
	"testing"
	"time"
)

var dummyBlindAlerter = &cli.SpyBlindAlerter{}
var dummyPlayerStore = &poker.StubPlayStore{}

func TestGame_Start(t *testing.T) {
	t.Run("schedules alerts on game start for 5 players", func(t *testing.T) {
		playerStore := &poker.StubPlayStore{}
		blindAlerter := &cli.SpyBlindAlerter{}
		game := cli.NewGame(playerStore, blindAlerter)

		game.PlayGame(5)

		cases := []cli.ScheduledAlert{
			{0 * time.Second, 100},
			{10 * time.Minute, 200},
			{20 * time.Minute, 300},
			{30 * time.Minute, 400},
			{40 * time.Minute, 500},
			{50 * time.Minute, 600},
			{60 * time.Minute, 800},
			{70 * time.Minute, 1000},
			{80 * time.Minute, 2000},
			{90 * time.Minute, 4000},
			{100 * time.Minute, 8000},
		}

		checkSchedulingCases(t, cases, blindAlerter)
	})

	t.Run("it prompts the user to enter the number of players", func(t *testing.T) {
		stdout := &bytes.Buffer{}
		in := strings.NewReader("7\n")
		blindAlerter := &cli.SpyBlindAlerter{}
		game := cli.NewGame(dummyPlayerStore, blindAlerter)

		myCLI := cli.NewCLI(in, stdout, game)
		myCLI.PlayPoker()

		input := stdout.String()
		want := cli.PlayerPrompt

		if input != want {
			t.Errorf("input %q, want %q", input, want)
		}

		cases := []cli.ScheduledAlert{
			{0 * time.Second, 100},
			{12 * time.Minute, 200},
			{24 * time.Minute, 300},
			{36 * time.Minute, 400},
		}

		checkSchedulingCases(t, cases, blindAlerter)
	})
}

func checkSchedulingCases(t *testing.T, cases []cli.ScheduledAlert, blindAlerter *cli.SpyBlindAlerter) {
	for i, c := range cases {
		t.Run(fmt.Sprint(c), func(t *testing.T) {

			if len(blindAlerter.Alerts) <= i {
				t.Fatalf("alert %d was not scheduled %v", i, blindAlerter.Alerts)
			}

			got := blindAlerter.Alerts[i]
			assertScheduledAlert(t, got, c)
		})
	}
}

func assertScheduledAlert(t *testing.T, got, want cli.ScheduledAlert) {
	t.Helper()

	amountGot := got.Amount
	if amountGot != want.Amount {
		t.Errorf("got Amount %d, want %d", amountGot, want.Amount)
	}

	gotScheduledTime := got.At
	if gotScheduledTime != want.At {
		t.Errorf("got sheduled time %v, want %v", gotScheduledTime, want.At)
	}
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
