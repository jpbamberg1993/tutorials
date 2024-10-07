package main

import (
	gospecsgreet "github.com/jpbamberg1993/go-specs-greet"
	"log"
	"net/http"
)

func main() {
	handler := http.HandlerFunc(gospecsgreet.Handler)
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal(err)
	}
}
