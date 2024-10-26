package main

import "sync"

type InMemoryPlayerStore struct {
	wins map[string]int
	mu   sync.Mutex
}

func NewInMemoryPlayerStore() *InMemoryPlayerStore {
	return &InMemoryPlayerStore{make(map[string]int), sync.Mutex{}}
}

func (i *InMemoryPlayerStore) GetPlayerScore(name string) int {
	i.mu.Lock()
	defer i.mu.Unlock()
	return i.wins[name]
}

func (i *InMemoryPlayerStore) RecordWin(name string) {
	i.mu.Lock()
	defer i.mu.Unlock()
	i.wins[name]++
}
