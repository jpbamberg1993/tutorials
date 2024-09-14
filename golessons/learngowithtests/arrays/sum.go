package main

func Sum(nums []int) int {
	add := func(acc, x int) int {
		return acc + x
	}
	return Reduce(nums, add, 0)
}

func SumAllTails(numbersToSum ...[]int) []int {
	sumTail := func(acc, ints []int) []int {
		if len(ints) == 0 {
			return append(acc, 0)
		} else {
			return append(acc, Sum(ints[1:]))
		}
	}
	return Reduce(numbersToSum, sumTail, []int{})
}

func Reduce[A, B any](collection []A, f func(B, A) B, initialValue B) B {
	var result = initialValue
	for _, x := range collection {
		result = f(result, x)
	}
	return result
}

type Transaction struct {
	From string
	To   string
	Sum  float64
}

func NewTransaction(from, to Account, sum float64) Transaction {
	return Transaction{from.Name, to.Name, sum}
}

type Account struct {
	Name    string
	Balance float64
}

func NewBalanceFor(a Account, transactions []Transaction) Account {
	return Reduce(transactions, applyTransactions, a)
}

func applyTransactions(a Account, t Transaction) Account {
	if t.To == a.Name {
		a.Balance += t.Sum
	}
	if t.From == a.Name {
		a.Balance -= t.Sum
	}
	return a
}

func BalanceFor(transactions []Transaction, name string) float64 {
	adjustBalance := func(currentBalance float64, t Transaction) float64 {
		if t.To == name {
			return currentBalance + t.Sum
		}
		if t.From == name {
			return currentBalance - t.Sum
		}
		return currentBalance
	}
	return Reduce(transactions, adjustBalance, 0.0)
}
