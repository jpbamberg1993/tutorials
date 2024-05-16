import { Image, StyleSheet, View } from "react-native"
import { colors } from "../config/colors"
import { MaterialCommunityIcons } from '@expo/vector-icons'

export function ViewImageScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.closeIcon}>
				<MaterialCommunityIcons name="close" size={35} color={colors.white} />
			</View>
			<View style={styles.deleteIcon}>
				<MaterialCommunityIcons name="trash-can-outline" size={35} color={colors.white} />
			</View>
			<Image style={styles.image} resizeMode="contain" source={require('../assets/chair.jpg')} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.black,
		width: '100%',
		flex: 1,
	},
	closeIcon: {
		position: "absolute",
		top: 40,
		left: 30,
	},
	deleteIcon: {
		position: "absolute",
		top: 40,
		right: 30,
	},
	image: {
		width: '100%',
		height: '100%',
	}
})
