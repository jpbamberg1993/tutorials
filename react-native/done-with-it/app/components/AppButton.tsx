import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { colors } from "../config/colors"

export enum ButtonColor {
	Primary = 'primary',
	Secondary = 'secondary',
}
type Props = {
	title: string
	pressHandler: () => void
	color?: ButtonColor
}
export function AppButton({ title, pressHandler, color = ButtonColor.Primary }: Props){
	return (
		<TouchableOpacity style={[styles.button, {backgroundColor: colors[color]}]} onPress={pressHandler}>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
		width: '100%',
		marginVertical: 10,
	},
	title: {
		fontSize: 18,
		color: colors.white,
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
})
