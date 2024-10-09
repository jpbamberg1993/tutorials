package interactions

import (
	"github.com/jpbamberg1993/go-specs-greet/specifications"
	"testing"
)

func TestGreet(t *testing.T) {
	specifications.GreetSpecification(t, specifications.GreetAdapter(Greet))
}
