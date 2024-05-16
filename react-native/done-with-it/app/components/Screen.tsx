import { SafeAreaView, StyleSheet, TextStyle, View } from "react-native"
import { ReactNode } from "react"
import Constants from "expo-constants"

type Props = {
	children: ReactNode
	style?: TextStyle
}
export function Screen({children, style}: Props) {
	return (
		<SafeAreaView style={[styles.screen, style]}>
			<View style={styles.view}>
				{children}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	screen: {
		paddingTop: Constants.statusBarHeight,
		flex: 1,
	},
	view: {
		flex: 1,
	}
})
