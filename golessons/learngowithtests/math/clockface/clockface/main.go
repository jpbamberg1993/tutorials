package main

import (
	"jpbamberg1993/learngowithtests/math/clockface"
	"os"
	"time"
)

func main() {
	t := time.Now()
	clockface.SVGWriter(os.Stdout, t)
}
