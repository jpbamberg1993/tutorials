package main

import (
	"github.com/jpbamberg1993/go-specs-greet/adapters/httpserver"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/greet", httpserver.Handler)
	http.HandleFunc("/curse", httpserver.CurseHandler)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
