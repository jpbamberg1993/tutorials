package poker

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
	"net/http/httptest"
	"reflect"
	"strings"
	"testing"
	"time"
)

var (
	dummyGame = &GameSpy{}
)

func mustMakePlayerServer(t *testing.T, store PlayerStore, game Game) *PlayerServer {
	t.Helper()
	server, err := NewPlayerServer(store, game)
	if err != nil {
		t.Fatal("problem creating player server", err)
	}
	return server
}

func TestGETPlayers(t *testing.T) {
	store := &StubPlayStore{
		Scores: map[string]int{
			"Pepper":  20,
			"Ronaldo": 10,
		},
	}
	server := mustMakePlayerServer(t, store, dummyGame)

	t.Run("returns Pepper's score", func(t *testing.T) {
		request := newGetScoreRequest("Pepper")
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		assertStatus(t, response, http.StatusOK)
		assertResponseBody(t, response.Body.String(), "20")
	})

	t.Run("returns Floyd's score", func(t *testing.T) {
		request := newGetScoreRequest("Ronaldo")
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		assertStatus(t, response, http.StatusOK)
		assertResponseBody(t, response.Body.String(), "10")
	})

	t.Run("returns 404 on missing players", func(t *testing.T) {
		request := newGetScoreRequest("Apollo")
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		want := http.StatusNotFound

		assertStatus(t, response, want)
	})

}

func TestStoreWins(t *testing.T) {
	store := &StubPlayStore{
		make(map[string]int),
		make([]string, 0),
		nil,
	}
	server := mustMakePlayerServer(t, store, dummyGame)

	t.Run("it records wins when POST", func(t *testing.T) {
		player := "Pepper"

		request := newPostWinRequest(player)
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		assertPlayerWin(t, store, player)
	})
}

func TestLeague(t *testing.T) {
	t.Run("it returns 200 on /League", func(t *testing.T) {
		wantedLeague := []Player{
			{"Paul", 20},
			{"Brenda", 10},
			{"Mary", 0},
		}
		store := &StubPlayStore{nil, nil, wantedLeague}
		server := mustMakePlayerServer(t, store, dummyGame)

		request := newLeagueRequest()
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		got := getLeagueFromRequest(t, response)
		assertStatus(t, response, http.StatusOK)
		assertLeague(t, got, wantedLeague)
		assertContentType(t, response)
	})
}

func TestGame(t *testing.T) {
	t.Run("GET /game returns 200", func(t *testing.T) {
		server := mustMakePlayerServer(t, &StubPlayStore{}, dummyGame)

		request := newGameRequest()
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		assertStatus(t, response, http.StatusOK)
	})

	t.Run("game starts with 2 players and ends with Mary as the winner", func(t *testing.T) {
		game := &GameSpy{}
		store := &StubPlayStore{}
		winner := "Mary"
		playerServer := mustMakePlayerServer(t, store, game)
		server := httptest.NewServer(playerServer)
		defer server.Close()

		ws := mustDialWS(t, server.URL)
		defer ws.Close()

		writeWSMessage(t, ws, "2", winner)

		time.Sleep(10 * time.Millisecond)
		assertGameStartedWith(t, game, 2)
		assertPlayerWin(t, store, winner)
	})
}

func writeWSMessage(t *testing.T, ws *websocket.Conn, messages ...string) {
	t.Helper()
	for _, s := range messages {
		if err := ws.WriteMessage(websocket.TextMessage, []byte(s)); err != nil {
			t.Fatalf("could not send message over ws connection %v", err)
		}
	}
}

func mustDialWS(t *testing.T, url string) *websocket.Conn {
	wsURL := "ws" + strings.TrimPrefix(url, "http") + "/ws"

	ws, _, err := websocket.DefaultDialer.Dial(wsURL, nil)
	if err != nil {
		t.Fatalf("could not open ws connection %s %v", wsURL, err)
	}
	return ws
}

func assertPlayerWin(t *testing.T, store *StubPlayStore, player string) {
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

func assertContentType(t *testing.T, response *httptest.ResponseRecorder) {
	t.Helper()
	if response.Result().Header.Get("content-type") != "application/json" {
		t.Errorf("response does not have content-type of application/json, got %v", response.Result().Header)
	}
}

func assertLeague(t *testing.T, got []Player, wantedLeague []Player) {
	t.Helper()
	if !reflect.DeepEqual(got, wantedLeague) {
		t.Errorf("got %v, want %v", got, wantedLeague)
	}
}

func getLeagueFromRequest(t *testing.T, response *httptest.ResponseRecorder) (league []Player) {
	t.Helper()
	err := json.NewDecoder(response.Body).Decode(&league)

	if err != nil {
		t.Fatalf("unable to parse response from server %q into slice ofg Player, '%v'", response.Body, err)
	}
	return league
}

func assertStatus(t *testing.T, got *httptest.ResponseRecorder, want int) {
	if got.Code != want {
		t.Errorf("got status %d want %d", got.Code, want)
	}
}

func assertResponseBody(t *testing.T, got string, want string) {
	if got != want {
		t.Errorf("got %q, want %q", got, want)
	}
}

func newGetScoreRequest(name string) *http.Request {
	req, _ := http.NewRequest(http.MethodGet, fmt.Sprintf("/players/%s", name), nil)
	return req
}

func newPostWinRequest(player string) *http.Request {
	request, _ := http.NewRequest(http.MethodPost, fmt.Sprintf("/players/%s", player), nil)
	return request
}

func newLeagueRequest() *http.Request {
	request, _ := http.NewRequest(http.MethodGet, "/league", nil)
	return request
}

func newGameRequest() *http.Request {
	request, _ := http.NewRequest(http.MethodGet, "/game", nil)
	return request
}
