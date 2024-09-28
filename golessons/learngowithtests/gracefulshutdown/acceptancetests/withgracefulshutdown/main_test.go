package main

import (
	"jpbamberg1993/learngowithtests/gracefulshutdown/acceptancetests"
	"jpbamberg1993/learngowithtests/gracefulshutdown/assert"
	"testing"
	"time"
)

const (
	port = "8080"
	url  = "http://localhost:" + port
)

func TestGracefulShutdown(t *testing.T) {
	cleanup, sendInterrupt, err := acceptancetests.LaunchTestProgram(port)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(cleanup)
	assert.CanGet(t, url)

	time.AfterFunc(50*time.Millisecond, func() {
		assert.NoError(t, sendInterrupt())
	})
	// without graceful shutdown this would fail
	assert.CanGet(t, url)

	// after interrupt the server should be shutdown
	assert.CantGet(t, url)
}
