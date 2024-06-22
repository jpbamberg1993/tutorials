package main

func Sum(nums []int) int {
	sum := 0
	for _, num := range nums {
		sum += num
	}
	return sum
}

func SumAll(numbersToSum ...[]int) []int {
	sums := make([]int, len(numbersToSum))
	for i, ints := range numbersToSum {
		sums[i] = Sum(ints)
	}
	return sums
}

func SumAllTails(numbersToSum ...[]int) []int {
	var sums []int
	for _, ints := range numbersToSum {
		if len(ints) == 0 {
			sums = append(sums, 0)
		} else {
			sums = append(sums, Sum(ints[1:]))
		}
	}
	return sums
}
