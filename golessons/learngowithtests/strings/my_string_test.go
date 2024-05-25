package strings

import (
	"strings"
	"testing"
	"unsafe"
)

func TestClone(t *testing.T) {
	s := "abc"
	clonedS := strings.Clone(s)
	if s != clonedS {
		t.Errorf("expected %q but got %q", s, clonedS)
	}
}

func TestCloneMemAddr(t *testing.T) {
	s := "abc"
	clonedS := strings.Clone(s)
	if unsafe.StringData(s) == unsafe.StringData(clonedS) {
		t.Errorf("expect memory address %q to be different then memory address  %q", s, clonedS)
	}
}

func TestContainsFunc(t *testing.T) {
	f := func(r rune) bool {
		return r == 'p' || r == 'a' || r == 'u'
	}
	result := strings.ContainsFunc("belly", f)
	if result {
		t.Errorf("expected false got %v", result)
	}
}

func TestContainsFuncTrue(t *testing.T) {
	f := func(r rune) bool {
		return r == 'p' || r == 'a'
	}
	if !strings.ContainsFunc("paul", f) {
		t.Errorf("expected true but got false")
	}
}

func TestCount(t *testing.T) {
	s := "pauÑl"
	count := strings.Count(s, "")
	expected := 6
	if count != expected {
		t.Errorf("expected %v but got %v", expected, count)
	}
}
