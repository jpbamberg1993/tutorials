package httpserver

import (
	"fmt"
	"github.com/jpbamberg1993/go-specs-greet/interactions"
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	fmt.Fprintf(w, "%s", interactions.Greet(name))
}
