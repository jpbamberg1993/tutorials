import { StyleSheet } from "react-native"
import { Screen } from "../components/Screen"
import { Image } from "react-native"
import * as Yup from "yup"
import { AppFormField } from "../components/forms"
import { SubmitButton } from "../components/forms"
import { AppForm } from "../components/forms"

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().min(4).label("Password"),
})

export function LoginScreen() {
	return (
		<Screen style={styles.container}>
			<Image
				source={require("../assets/logo-red.png")}
				style={styles.logo}
			/>
			<AppForm
				initialValues={{ email: '', password: '' }}
				onSubmit={values => console.log({values})}
				validationSchema={validationSchema}
			>
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
		margin: 10,
	},
	logo: {
		width: 80,
		height: 80,
		alignSelf: "center",
		marginTop: 50,
		marginBottom: 20,
	},
})
