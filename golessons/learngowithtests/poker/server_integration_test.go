package poker

import (
	"jpbamberg1993/learngowithtests/gracefulshutdown/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRecordingWinsAndRetrievingTheme(t *testing.T) {
	database, cleanDatabase := createTempFile(t, `[]`)
	defer cleanDatabase()
	store, err := NewFilesystemPlayStore(database)
	assert.NoError(t, err)
	game := &GameSpy{}

	server, _ := NewPlayerServer(store, game)
	player := "Pepper"

	server.ServeHTTP(httptest.NewRecorder(), newPostWinRequest(player))
	server.ServeHTTP(httptest.NewRecorder(), newPostWinRequest(player))
	server.ServeHTTP(httptest.NewRecorder(), newPostWinRequest(player))

	t.Run("get score", func(t *testing.T) {
		res := httptest.NewRecorder()
		server.ServeHTTP(res, newGetScoreRequest(player))
		assertStatus(t, res, http.StatusOK)

		assertResponseBody(t, res.Body.String(), "3")
	})

	t.Run("get League", func(t *testing.T) {
		res := httptest.NewRecorder()
		server.ServeHTTP(res, newLeagueRequest())
		assertStatus(t, res, http.StatusOK)

		got := getLeagueFromRequest(t, res)
		want := []Player{
			{"Pepper", 3},
		}
		assertLeague(t, got, want)
	})
}
