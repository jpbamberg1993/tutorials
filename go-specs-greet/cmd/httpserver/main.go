package main

import (
	"github.com/jpbamberg1993/go-specs-greet/adapters/httpserver"
	"log"
	"net/http"
)

func main() {
	handler := http.HandlerFunc(httpserver.Handler)
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal(err)
	}
}
