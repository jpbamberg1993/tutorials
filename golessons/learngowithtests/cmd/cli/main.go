package main

import (
	"fmt"
	"jpbamberg1993/learngowithtests/cli"
	poker "jpbamberg1993/learngowithtests/http-server"
	"log"
	"os"
)

const dbFileName = "game.db.json"

func main() {

	store, closeFN, err := poker.FileSystemPlayerStoreFromFile(dbFileName)

	if err != nil {
		log.Fatal(err)
	}
	defer closeFN()

	fmt.Println("Let's play poker")
	fmt.Println("Type '{name} wins' to record a win")
	cli.NewCLI(store, os.Stdin).PlayPoker()
}
