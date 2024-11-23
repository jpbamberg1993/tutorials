package main

import (
	"jpbamberg1993/learngowithtests/http-server"
	"log"
	"net/http"
)

const dbFileName = "game.db.json"

func main() {
	store, closeFN, err := poker.FileSystemPlayerStoreFromFile(dbFileName)

	if err != nil {
		log.Fatal(err)
	}
	defer closeFN()

	server := poker.NewPlayerServer(store)

	if err = http.ListenAndServe(":5050", server); err != nil {
		log.Fatalf("could not listen on port 5050 %v", err)
	}
}
