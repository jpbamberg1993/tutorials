import { MaterialCommunityIcons } from "@expo/vector-icons"
import { View } from "react-native"
import { colors } from "../config/colors"
import { ComponentProps } from "react"

type Props = {
	name: ComponentProps<typeof MaterialCommunityIcons>['name']
	size?: number
	backgroundColor?: string
	iconColor?: string
}
export function Icon({
 name,
 size = 40,
 backgroundColor = colors.black,
 iconColor = colors.white
}: Props) {
	return (
		<View style={{ backgroundColor, width: size, height: size, borderRadius: size / 2 }}>
			<MaterialCommunityIcons
				name={name}
				color={iconColor}
				size={size * 0.5}
				style={{ alignSelf: 'center', marginTop: size * 0.25 }} />
		</View>
	)
}
