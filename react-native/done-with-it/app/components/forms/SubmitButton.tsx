import { AppButton } from "../AppButton"
import { useFormikContext } from "formik"

type Props = {
	title: string
}
export function SubmitButton({ title }: Props) {
	const {handleSubmit} = useFormikContext()
	return (
		<AppButton title={title} pressHandler={handleSubmit} />
	)
}
