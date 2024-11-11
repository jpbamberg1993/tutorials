package main

import (
	"log"
	"net/http"
)

func main() {
	server := NewPlayerServer(&FilesystemPlayerStore{})
	log.Fatal(http.ListenAndServe(":5050", server))
}
