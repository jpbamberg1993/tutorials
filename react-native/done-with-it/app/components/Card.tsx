import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native"
import { colors } from "../config/colors"
import { ListItem } from "./lists/ListItem"
import { AppText } from "./AppText"

type Props = {
	title: string
	subTitle: string
	image: ImageSourcePropType
}
export function Card({title, subTitle, image}: Props) {
	return (
		<View style={styles.cardWrapper}>
			<Image source={image} style={styles.image}  />
			<View style={styles.detailsContainer}>
				<AppText style={styles.title}>{title}</AppText>
				<AppText style={styles.subTitle}>{subTitle}</AppText>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	cardWrapper: {
		borderRadius: 15,
		backgroundColor: colors.white,
		marginBottom: 20,
	},
	image: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		width: '100%',
		height: 200,
		overflow: 'hidden',
	},
	detailsContainer: {
		padding: 20,
	},
	title: {
		fontWeight: "500",
		fontSize: 18,
		marginBottom: 10,
	},
	subTitle: {
		fontSize: 16,
		color: colors.secondary,
		fontWeight: 'bold',
	}
})
