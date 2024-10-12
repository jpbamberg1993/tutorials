package main_test

import (
	"fmt"
	"github.com/jpbamberg1993/go-specs-greet/adapters"
	"github.com/jpbamberg1993/go-specs-greet/adapters/grpcserver"
	"github.com/jpbamberg1993/go-specs-greet/specifications"
	"testing"
)

func TestGreeterServer(t *testing.T) {
	if testing.Short() {
		return
	}

	var (
		port   = "50051"
		driver = grpcserver.Driver{Addr: fmt.Sprintf("localhost:%s", port)}
	)

	adapters.StartDockerServer(t, port, "grpcserver")
	specifications.CurseSpecification(t, &driver)
	specifications.GreetSpecification(t, &driver)
}
