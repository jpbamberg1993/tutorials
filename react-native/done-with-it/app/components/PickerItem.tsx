import { TouchableOpacity } from "react-native"
import { AppText } from "./AppText"
import { StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ComponentProps } from "react"
import { Icon } from "./Icon"
import { PickerItemType } from "./picker/picker-types"

export type PickerItemProps = {
	item: PickerItemType
	onPress: () => void
}
export function PickerItem({item, onPress}: PickerItemProps) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				margin: 10,
			}}
		>
			<AppText style={styles.text}>{item.label}</AppText>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	text: {
	}
})
