package cli

import (
	poker "jpbamberg1993/learngowithtests/http-server"
	"time"
)

type TexasHoldem struct {
	store   poker.PlayerStore
	alerter BlindAlerter
}

func NewGame(store poker.PlayerStore, alerter BlindAlerter) *TexasHoldem {
	return &TexasHoldem{
		store,
		alerter,
	}
}

func (g *TexasHoldem) PlayGame(numberOfPlayers int) {
	blindIncrement := time.Duration(5+numberOfPlayers) * time.Minute

	blinds := []int{100, 200, 300, 400, 500, 600, 800, 1000, 2000, 4000, 8000}
	blindTime := 0 * time.Second
	for _, blind := range blinds {
		g.alerter.ScheduleAlertAt(blindTime, blind)
		blindTime = blindTime + blindIncrement
	}
}

func (g *TexasHoldem) Finish(winner string) {
	g.store.RecordWin(winner)
}
