import { Screen } from "../components/Screen"
import { FlatList, View } from "react-native"
import { ListItem } from "../components/lists/ListItem"
import { Icon } from "../components/Icon"
import { colors } from "../config/colors"
import { ComponentProps } from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ListItemSeparator } from "../components/lists/ListItemSeparator"

type FlatListItem = {
	title: string
	icon: {
		name: ComponentProps<typeof MaterialCommunityIcons>['name']
		backgroundColor: string
	}
}

const data: FlatListItem[] = [
	{
		title: 'My Listings',
		icon: {
			name: 'format-list-bulleted',
			backgroundColor: 'red',
		}
	},
	{
		title: 'My Messages',
		icon: {
			name: 'email',
			backgroundColor: colors.secondary,
		}
	}
]

export function MyAccountScreen() {
	return (
		<Screen style={{
			display: 'flex',
			height: '100%',
		}}>
			<View style={{
				marginVertical: 20,
			}}>
				<ListItem
					title="Mosh Hamedani"
					subTitle="programmingwithmosh@gmail.com"
					onPress={() => console.log('Tapped')}
					image={require('../assets/mosh.jpg')}
				/>
			</View>
			<View style={{ marginVertical: 20 }}>
				<FlatList
					data={data}
					keyExtractor={item => item.title}
					ItemSeparatorComponent={ListItemSeparator}
					renderItem={({ item }) => {
						return (
							<ListItem
								title={item.title}
								onPress={() => console.log('Tapped')}
								iconComponent={<Icon
									name={item.icon.name}
									backgroundColor={item.icon.backgroundColor}
									iconColor={colors.white}
								/>}
							/>
						)
					}} />
			</View>
			<ListItem
				title="Log Out"
				onPress={() => console.log('Tapped')}
				iconComponent={<Icon
					name='logout'
					backgroundColor="#fbe580"
					iconColor={colors.white}
				/>}
			/>
		</Screen>
	)
}
