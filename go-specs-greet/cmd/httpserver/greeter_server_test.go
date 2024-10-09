package main_test

import (
	"fmt"
	"github.com/jpbamberg1993/go-specs-greet/adapters"
	"github.com/jpbamberg1993/go-specs-greet/adapters/httpserver"
	"github.com/jpbamberg1993/go-specs-greet/specifications"
	"net/http"
	"testing"
	"time"
)

func TestGreeterServer(t *testing.T) {
	if testing.Short() {
		return
	}

	var (
		port    = "8080"
		baseURL = fmt.Sprintf("http://localhost:%s", port)
		driver  = httpserver.Driver{BaseURL: baseURL, Client: &http.Client{
			Timeout: 1 * time.Second,
		}}
	)

	adapters.StartDockerServer(t, port, "httpserver")
	specifications.GreetSpecification(t, driver)
}
