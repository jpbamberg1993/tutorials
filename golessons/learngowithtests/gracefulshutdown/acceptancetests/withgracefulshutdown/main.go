package main

import (
	"context"
	"jpbamberg1993/learngowithtests/gracefulshutdown"
	"jpbamberg1993/learngowithtests/gracefulshutdown/acceptancetests"
	"log"
	"net/http"
)

func main() {
	var (
		ctx        = context.Background()
		httpServer = &http.Server{Addr: ":8080", Handler: http.HandlerFunc(acceptancetests.SlowHandler)}
		server     = gracefulshutdown.NewServer(httpServer)
	)

	if err := server.ListenAndServe(ctx); err != nil {
		log.Fatalf("uh oh, didnt shut down gracefully, some responses may have been lost %v", err)
	}

	log.Println("shutdown gracefully! all responses were sent")
}
