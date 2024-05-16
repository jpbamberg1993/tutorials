import * as Yup from 'yup'
import {StyleSheet} from "react-native"
import {Screen} from '../components/Screen'
import { AppForm, AppFormField, SubmitButton } from "../components/forms"

const validationSchema = Yup.object().shape({
	name: Yup.string().required().min(2).label('Name'),
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().required().min(4).label('Password')
})

export function RegistrationScreen() {
	return (
		<Screen style={styles.container}>
			<AppForm
				initialValues={{name: '', email: '', password: ''}}
				onSubmit={values => console.log({values})}
				validationSchema={validationSchema}
			>
				<AppFormField
					name="name"
					icon="account"
					placeholder="Name"
					autoCapitalize="words"
					autoCorrect={false}
					textContentType={"name"}
				/>
				<AppFormField
					name="email"
					icon="email"
					placeholder="Email"
					autoCapitalize="none"
					autoCorrect={false}
					keyboardType="email-address"
					textContentType="emailAddress"
				/>
				<AppFormField
					placeholder="Password"
					name="password"
					icon="lock"
					autoCapitalize={"none"}
					autoCorrect={false}
					secureTextEntry
					textContentType="password"
				/>
				<SubmitButton title={"Login"} />
			</AppForm>
		</Screen>
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 10
	}
})
