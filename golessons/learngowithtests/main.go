package main

import (
	"jpbamberg1993/learngowithtests/di"
	"log"
	"net/http"
)

func main() {
	log.Fatal(http.ListenAndServe(":5001", http.HandlerFunc(di.MyGreetHandler)))
}
