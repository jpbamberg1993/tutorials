package main

import (
	"strings"
	"testing"
)

type Person struct {
	Name string
}

func TestFind(t *testing.T) {
	t.Run("find number", func(t *testing.T) {
		numbers := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
		firstEven, found := Find(numbers, func(x int) bool {
			return x%2 == 0
		})
		AssertTrue(t, found)
		AssertEqual(t, firstEven, 2)
	})

	t.Run("find person", func(t *testing.T) {
		people := []Person{
			{"Paul Bamberg"},
			{"Brenda Bamberg"},
			{"Bobby Black"},
		}
		person, exists := Find(people, func(p Person) bool {
			return strings.Contains(p.Name, "Black")
		})
		AssertTrue(t, exists)
		AssertEqual(t, person, Person{"Bobby Black"})
	})
}

func AssertTrue(t *testing.T, v bool) {
	t.Helper()
	if !v {
		t.Error("wanted true")
	}
}
