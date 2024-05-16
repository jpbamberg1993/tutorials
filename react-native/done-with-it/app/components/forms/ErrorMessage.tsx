import {StyleSheet} from "react-native"
import {Text} from "react-native"

type Props = {
	error: string
	visible: boolean
}
export function ErrorMessage({ error, visible }: Props) {
 	if (!error || !visible) return null
	return <Text style={styles.error}>{error}</Text>
}
const styles = StyleSheet.create({
	error: {
		color: 'red',
	},
})
