import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { colors } from "../config/colors"
import { AppButton, ButtonColor } from "../components/AppButton"

export function WelcomeScreen() {
	return (
		<ImageBackground
			source={require('../assets/background.jpg')}
			style={styles.background}
			blurRadius={7}
		>
			<View style={styles.logoContainer}>
				<Image style={styles.logo} source={require('../assets/logo-red.png')} />
				<Text style={styles.tagLine}>Sell What You Don't Need</Text>
			</View>
			<View style={styles.btnWrapper}>
				<AppButton title="Login"
									 pressHandler={() => console.log("login clicked")}
									 color={ButtonColor.Primary} />
				<AppButton title="Register"
									 pressHandler={() => console.log("register clicked")}
									 color={ButtonColor.Secondary} />
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%',
	},
	loginBtn: {
		height: 70,
		backgroundColor: colors.primary,
	},
	registerBtn: {
		height: 70,
		backgroundColor: colors.secondary,
	},
	logoContainer: {
		position: 'absolute',
		top: 100,
		alignItems: "center",
	},
	logo: {
		width: 100,
		height: 100,
	},
	tagLine: {
		fontSize: 25,
		fontWeight: "600",
		paddingVertical: 20,
	},
	btnWrapper: {
		paddingHorizontal: 20,
		paddingBottom: 50,
		width: '100%',
	}
})
