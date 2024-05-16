import { ReactNode } from "react"
import { Platform, StyleSheet, Text, TextComponent, TextProps, TextStyle } from "react-native"
import { defaultStyles } from "../config/styles"

type Props = {
	children: ReactNode
	style?: TextStyle
} & TextProps
export function AppText({children, style, ...otherProps}: Props) {
	return (
		<Text style={[defaultStyles.text, style]} {...otherProps}>
			{children}
		</Text>
	)
}
