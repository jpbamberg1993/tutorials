import { AppTextInput } from "../AppTextInput"
import { ErrorMessage } from "./ErrorMessage"
import { FormikContextType, FormikValues, useFormikContext } from "formik"
import { DimensionValue, TextInputProps } from "react-native"
import { ComponentProps } from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"

type Props = {
	name: string
	width?: DimensionValue | undefined
	icon?: ComponentProps<typeof MaterialCommunityIcons>['name']
} & TextInputProps
export function AppFormField({ name, width, ...props }: Props) {
	const {
		setFieldTouched,
		handleChange,
		errors,
		touched
	} = useFormikContext<FormikContextType<FormikValues>>()
	return (
		<>
			<AppTextInput
				onChangeText={handleChange(name)}
				onBlur={() => setFieldTouched(name)}
				width={width}
				{...props}
			/>
			<ErrorMessage
				error={errors[name as keyof typeof errors] as string}
				visible={touched[name as keyof typeof errors] as boolean}
			/>
		</>
	)
}
