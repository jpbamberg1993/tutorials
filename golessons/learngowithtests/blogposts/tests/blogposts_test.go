package blogposts_test

import (
	"errors"
	blogpost "github.com/jpbamberg1993/blogposts"
	"io/fs"
	"reflect"
	"testing"
	"testing/fstest"
)

func TestNewBlogPosts(t *testing.T) {
	const (
		firstBody = `Title: Post 1
Description: Description 1
Tags: go, tdd
---
Hello
World`
		secondBody = `Title: Post 2
Description: Description 2
Tags: rust, borrow-checker
---
i
d
c`
	)

	mapFS := fstest.MapFS{
		"hello world.md":  {Data: []byte(firstBody)},
		"hello-world2.md": {Data: []byte(secondBody)},
	}

	posts, err := blogpost.NewPostsFromFS(mapFS)

	if err != nil {
		t.Fatal(err)
	}

	if len(posts) != len(mapFS) {
		t.Errorf("got %d posts, wanted %d posts", len(posts), len(mapFS))
	}

	assertPost(t, posts[0], blogpost.Post{
		Title:       "Post 1",
		Description: "Description 1",
		Tags:        []string{"go", "tdd"},
		Body: `Hello
World`,
	})
	//	assertPost(t, posts[1], blogpost.Post{
	//		Title:       "Post 2",
	//		Description: "Description 2",
	//		Tags:        []string{"rust", "borrow-checker"},
	//		Body: `i
	//d
	//c`,
	//	})
}

func TestFailingTest(t *testing.T) {
	failingFS := StubFailingFS{}
	_, err := blogpost.NewPostsFromFS(failingFS)
	if err == nil {
		t.Errorf("an error should have been returned")
	}
}

func assertPost(t *testing.T, got, want blogpost.Post) {
	t.Helper()
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %+v, want %+v", got, want)
	}
}

type StubFailingFS struct {
}

func (s StubFailingFS) Open(name string) (fs.File, error) {
	return nil, errors.New("this will always fail")
}
