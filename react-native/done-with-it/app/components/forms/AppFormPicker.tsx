import { AppPicker, AppPickerProps, LabeledValue } from "../AppPicker"
import { ErrorMessage } from "./ErrorMessage"
import { FormikContextType, FormikValues, useFormikContext } from "formik"
import { DimensionValue, TextInputProps } from "react-native"
import { PickerItem, PickerItemProps } from "../PickerItem"
import { ComponentType } from "react"
import { PickerComponentProps } from "../picker/picker-types"

type Props = {
	name: string
	placeholder: string
	items: {label: string; value: number }[]
	PickerComponent?: ComponentType<PickerComponentProps>
	width?: DimensionValue | undefined
	numberOfColumns?: number
}
export function AppFormPicker({ name, placeholder, items, numberOfColumns = 1, PickerComponent, width }: Props) {
	const { errors, setFieldValue, touched, values } = useFormikContext<FormikContextType<FormikValues>>()

	return (
		<>
			<AppPicker
				items={items}
				onSelectedItem={(item) => setFieldValue(name, item)}
				placeholder={placeholder}
				selectedItem={values[name as keyof typeof values]}
				width={width}
				numberOfColumns={numberOfColumns}
				PickerComponent={PickerComponent}
			/>
			<ErrorMessage
				error={errors[name as keyof typeof errors] as string}
				visible={touched[name as keyof typeof errors] as boolean}
			/>
		</>
	)
}
