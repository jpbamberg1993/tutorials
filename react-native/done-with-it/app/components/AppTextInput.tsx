import { TextInput, TextInputProps, View, StyleSheet, Platform, DimensionValue } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ComponentProps } from "react"
import { defaultStyles } from "../config/styles"

type OwnProps = {
	icon?: ComponentProps<typeof MaterialCommunityIcons>['name']
	width?: DimensionValue | undefined
}
type Props = TextInputProps & OwnProps
export function AppTextInput({ icon, width = '100%', ...textProps }: Props) {
	return (
		<View style={[styles.container, {width}]}>
			<MaterialCommunityIcons
				name={icon}
				size={20}
				color={defaultStyles.colors.mediumGrey}
				style={styles.icon}
			/>
			<TextInput
				placeholderTextColor={defaultStyles.colors.mediumGrey}
				style={defaultStyles.text}
				{...textProps}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultStyles.colors.lightGrey,
		borderRadius: 25,
		flexDirection: "row",
		padding: 15,
		marginVertical: 10,
		alignItems: "center",
	},
	icon: {
		marginRight: 3,
	},
})
