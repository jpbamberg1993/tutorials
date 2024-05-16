import { ComponentProps } from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export type PickerItemType = {
	label: string
	value: number
	icon?: ComponentProps<typeof MaterialCommunityIcons>['name']
	backgroundColor?: string
}

export type PickerComponentProps = {
	label: string
	item: PickerItemType
	onPress: () => void
}
