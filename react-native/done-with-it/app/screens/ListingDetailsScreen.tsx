import { Text, StyleSheet, View, Image } from "react-native"
import { AppText } from "../components/AppText"
import { colors } from "../config/colors"
import { ListItem } from "../components/lists/ListItem"

export function ListingDetailsScreen() {
	return (
		<View style={styles.detailsWrapper}>
			<Image source={require('../assets/jacket.jpg')} style={styles.image} />
			<View style={styles.infoWrapper}>
				<AppText style={styles.title}>Red jacket for sale</AppText>
				<AppText style={styles.price}>$100</AppText>
				<View style={styles.userContainer}>
					<ListItem
						image={require('../assets/mosh.jpg')}
						title="Mosh Hamedani"
						subTitle="5 Listings"
						onPress={() => console.log('pressed')}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	detailsWrapper: {
		flex: 1,
		width: '100%',
	},
	image: {
		width: '100%',
		height: 300,
	},
	infoWrapper: {
		padding: 20,
	},
	title: {
		fontWeight: "500",
		fontSize: 24,
	},
	price: {
		color: colors.secondary,
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 10,
	},
	userContainer: {
		marginVertical: 40,
	},
})
