import { View } from "react-native"
import { StyleSheet } from "react-native"
import { Icon } from "./Icon"
import { AppText } from "./AppText"
import { PickerItemType } from "./picker/picker-types"

type Props = {
	item: PickerItemType
	onPress: () => void
}
export function CategoryPickerItem({ item, onPress }: Props) {
	return (
		<View style={styles.container}>
			<Icon
				backgroundColor={item.backgroundColor}
				name={item.icon ?? "apps"}
				size={80}
			/>
			<AppText style={styles.label}>
				{item.label}
			</AppText>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
		paddingVertical: 15,
		width: '33%',
	},
	label: {
		marginTop: 5,
		textAlign: "center",
	},
})
