import { SafeAreaView, View } from "react-native"
import { colors } from "../config/colors"
import { Card } from "../components/Card"

export function ProductListScreen() {
	return (
		<SafeAreaView style={{
			flex: 1,
			width: '100%',
			backgroundColor: colors.grey,
		}}>
			<View style={{
				paddingHorizontal: 20,
			}}>
				<Card title="Red jacket for sale!"
							subTitle="$100"
							image={require('../assets/jacket.jpg')} />
				<Card title="Couch in great condition!"
							subTitle="$1000"
							image={require('../assets/couch.jpg')} />
			</View>
		</SafeAreaView>
	)
}
