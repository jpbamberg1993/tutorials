import { ReactNode } from "react"
import { Formik, FormikHelpers, FormikValues } from "formik"
import * as Yup from "yup"

type Props<T> = {
	children: ReactNode
	initialValues: FormikValues
	onSubmit: ((values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<any>) & ((values: T) => void)
	validationSchema: Yup.ObjectSchema<any>
}
export function AppForm<T>({ children, initialValues, onSubmit, validationSchema }: Props<T>) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{() => children}
		</Formik>
	)
}
