package main

import (
	blogpost "github.com/jpbamberg1993/blogposts"
	"log"
	"os"
)

func main() {
	posts, err := blogpost.NewPostsFromFS(os.DirFS("../posts"))
	if err != nil {
		log.Fatal(err)
	}
	log.Println(posts)
}
