export function printCurrency(amount: number): string {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	})
	const a = amount / 100
	return formatter.format(a)
}
