import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { colors } from "../../config/colors"
import {MaterialCommunityIcons} from '@expo/vector-icons'

type Props = {
	onPress: () => void
}
export function ListItemDeleteAction({ onPress }: Props) {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<MaterialCommunityIcons name="trash-can" size={35} color={colors.white} />
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.danger,
		width: 70,
		justifyContent: 'center',
		alignItems: 'center',
	}
})
