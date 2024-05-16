import {Screen} from "../components/Screen"
import { FlatList, ImageSourcePropType, Text } from "react-native"
import { Card } from "../components/Card"
import { printCurrency } from "../utils/currency"
import { Icon } from "../components/Icon"

type Listing = {
	id: number
	title: string
	price: number
	image: ImageSourcePropType
}

const listings: Listing[] = [
	{
		id: 1,
		title: 'Red jacket for sale!',
		price: 10000,
		image: require('../assets/jacket.jpg')
	},
	{
		id: 2,
		title: 'Couch in great condition!',
		price: 100000,
		image: require('../assets/couch.jpg')
	}
]

export function ListingsScreen() {
	return (
		<Screen style={{ marginHorizontal: 10 }}>
			<FlatList
				data={listings}
				keyExtractor={listing => listing.id.toString()}
				renderItem={({ item }) => (
					<>
						<Card
							title={item.title}
							subTitle={printCurrency(item.price)}
							image={item.image}
						/>
					</>
				)}
			/>
		</Screen>
	)
}
