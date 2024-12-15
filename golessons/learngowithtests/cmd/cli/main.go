package main

import (
	"fmt"
	poker "jpbamberg1993/learngowithtests/poker"
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
	game := poker.NewTexasHoldem(store, poker.BlindAlerterFunc(poker.Alerter))
	poker.NewCLI(os.Stdin, os.Stdout, game).PlayPoker()
}
