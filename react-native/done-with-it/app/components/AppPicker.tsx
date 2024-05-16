import {
	TextInput,
	TextInputProps,
	View,
	StyleSheet,
	Platform,
	TouchableWithoutFeedback,
	Modal,
	Button, FlatList, DimensionValue
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ComponentProps, ComponentType, ReactNode, useState } from "react"
import { defaultStyles } from "../config/styles"
import { AppText } from "./AppText"
import { Screen } from "./Screen"
import { Category } from "../../App"
import { PickerItem, PickerItemProps } from "./PickerItem"
import { colors } from "../config/colors"
import { PickerComponentProps } from "./picker/picker-types"

export type LabeledValue<T> = T & {
	label: string
	icon?: ComponentProps<typeof MaterialCommunityIcons>['name']
	bgColor?: string
	value: number
}
type OwnProps<T> = {
	icon?: ComponentProps<typeof MaterialCommunityIcons>['name']
	placeholder: string
	items: LabeledValue<T>[]
	numberOfColumns?: number
	selectedItem: LabeledValue<T> | null
	onSelectedItem: (item: LabeledValue<T>) => void
	PickerComponent?: ComponentType<PickerComponentProps>
	width?: DimensionValue | undefined
}
export type AppPickerProps<T> = TextInputProps & OwnProps<T>
export function AppPicker<T>({
	icon,
	placeholder,
	items,
	numberOfColumns = 1,
	selectedItem,
	onSelectedItem,
	PickerComponent = PickerItem,
	width = '100%'
}: AppPickerProps<T>) {
	const [modalVisible, setModalVisible] = useState(false)
	return (
		<>
			<TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
				<View style={[styles.container, {width}]}>
					<MaterialCommunityIcons
						name={icon}
						size={20}
						color={defaultStyles.colors.mediumGrey}
						style={styles.icon}
					/>
					{selectedItem ?
						<AppText style={styles.text}>{selectedItem.label}</AppText> :
						<AppText style={styles.placeholder}>{placeholder}</AppText>
					}
					<MaterialCommunityIcons
						name="chevron-down"
						size={20}
					/>
				</View>
			</TouchableWithoutFeedback>
			<Modal visible={modalVisible} animationType="slide">
				<Screen>
					<Button title={"Close"} onPress={() => setModalVisible(false)} />
					<FlatList
						data={items}
						keyExtractor={item => item.value.toString()}
						numColumns={numberOfColumns}
						contentContainerStyle={styles.list}
						renderItem={({ item }) =>
							<PickerComponent
								label={item.label}
								item={item}
								onPress={() => {
									setModalVisible(false)
									onSelectedItem(item)
								}}
							/>}
					/>
				</Screen>
			</Modal>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultStyles.colors.lightGrey,
		borderRadius: 25,
		flexDirection: "row",
		padding: 15,
		marginVertical: 10,
	},
	icon: {
		marginRight: 3,
	},
	text: {
		flex: 1,
	},
	placeholder: {
		color: defaultStyles.colors.mediumGrey,
		flex: 1,
	},
	list: {
		width: '100%',
	},
})
