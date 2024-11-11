package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

type StubPlayStore struct {
	scores   map[string]int
	winCalls []string
	league   []Player
}

func (s *StubPlayStore) GetPlayerScore(name string) int {
	return s.scores[name]
}

func (s *StubPlayStore) RecordWin(name string) {
	s.winCalls = append(s.winCalls, name)
}

func (s *StubPlayStore) GetLeague() League {
	return s.league
}

func TestGETPlayers(t *testing.T) {
	store := StubPlayStore{
		scores: map[string]int{
			"Pepper":  20,
			"Ronaldo": 10,
		},
	}
	server := NewPlayerServer(&store)

	t.Run("returns Pepper's score", func(t *testing.T) {
		request := newGetScoreRequest("Pepper")
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		assertStatus(t, response.Code, http.StatusOK)
		assertResponseBody(t, response.Body.String(), "20")
	})

	t.Run("returns Floyd's score", func(t *testing.T) {
		request := newGetScoreRequest("Ronaldo")
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		assertStatus(t, response.Code, http.StatusOK)
		assertResponseBody(t, response.Body.String(), "10")
	})

	t.Run("returns 404 on missing players", func(t *testing.T) {
		request := newGetScoreRequest("Apollo")
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		got := response.Code
		want := http.StatusNotFound

		assertStatus(t, got, want)
	})

}

func TestStoreWins(t *testing.T) {
	t.Run("it returns accepted POST", func(t *testing.T) {
		_, server := setupTest()

		player := "Pepper"

		request := newPostWinRequest(player)
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		assertStatus(t, response.Code, http.StatusAccepted)
	})

	t.Run("it records wins when POST", func(t *testing.T) {
		store, server := setupTest()

		player := "Pepper"

		request := newPostWinRequest(player)
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		if len(store.winCalls) != 1 {
			t.Errorf("got %d calls to RecordWin but wanted %d", len(store.winCalls), 1)
			return
		}

		if store.winCalls[0] != player {
			t.Errorf("did not store correct winner got %q want %q", store.winCalls[0], player)
			return
		}
	})
}

func TestLeague(t *testing.T) {
	t.Run("it returns 200 on /league", func(t *testing.T) {
		wantedLeague := []Player{
			{"Paul", 20},
			{"Brenda", 10},
			{"Mary", 0},
		}
		store := StubPlayStore{nil, nil, wantedLeague}
		server := NewPlayerServer(&store)

		request := newLeagueRequest()
		response := httptest.NewRecorder()

		server.ServeHTTP(response, request)

		got := getLeagueFromRequest(t, response)
		assertStatus(t, response.Code, http.StatusOK)
		assertLeague(t, got, wantedLeague)
		assertContentType(t, response)
	})
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

func setupTest() (*StubPlayStore, *PlayerServer) {
	store := &StubPlayStore{
		make(map[string]int),
		make([]string, 0),
		nil,
	}
	server := NewPlayerServer(store)
	return store, server
}

func assertStatus(t *testing.T, got, want int) {
	if got != want {
		t.Errorf("got status %d want %d", got, want)
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
