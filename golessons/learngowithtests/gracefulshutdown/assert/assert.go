package assert

import (
	"net/http"
	"testing"
	"time"
)

func CanGet(t testing.TB, url string) {
	errChan := make(chan error)

	go func() {
		res, err := http.Get(url)
		if err != nil {
			errChan <- err
			return
		}
		res.Body.Close()
		errChan <- nil
	}()

	select {
	case err := <-errChan:
		NoError(t, err)
	case <-time.After(3 * time.Second):
		t.Errorf("timed out waiting for request to %q", url)
	}
}

func CantGet(t testing.TB, url string) {
	t.Helper()
	errChan := make(chan error, 1)

	go func() {
		res, err := http.Get(url)
		if err != nil {
			errChan <- err
			return
		}
		res.Body.Close()
		errChan <- nil
	}()

	select {
	case err := <-errChan:
		Error(t, err)
	case <-time.After(500 * time.Millisecond):
		t.Errorf("timed out waiting for request to %q", url)
	}
}

func NoError(t testing.TB, err error) {
	if err == nil {
		return
	}
	t.Helper()
	t.Fatalf("didn't expect an error, but got one %v", err)
}

func Error(t testing.TB, err error) {
	if err != nil {
		return
	}
	t.Helper()
	t.Fatal("expected an error but didn't receive one")
}
