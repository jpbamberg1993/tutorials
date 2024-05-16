import { FlatList, ImageSourcePropType, SafeAreaView, StyleSheet, Platform, StatusBar, View } from "react-native"
import { ListItem } from "../components/lists/ListItem"
import { Screen } from "../components/Screen"
import { ListItemSeparator } from "../components/lists/ListItemSeparator"
import { ListItemDeleteAction } from "../components/lists/ListItemDeleteAction"
import { useState } from "react"
import { Icon } from "../components/Icon"

type Message = {
	id: number
	title: string
	description: string
	image: ImageSourcePropType
}

const initialMessages: Message[] = [
	{
		id: 1,
		title: 'T1',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat metus purus, in semper ex tempor eget. Pellentesque congue dignissim iaculis. Nullam vel lacus aliquam tortor dapibus rhoncus id vitae purus. Praesent et aliquam urna. Aliquam id justo mi. Aliquam felis justo, rutrum et malesuada eu, imperdiet non felis. Duis vulputate, nibh id dignissim mollis, purus quam porttitor sem, ac condimentum nunc purus et odio. Integer dignissim, lorem sit amet dictum sollicitudin, ante nunc tristique nulla, vitae posuere urna erat ac tellus. Fusce facilisis eget lorem in tincidunt. Donec vel volutpat dui. Ut nec ultrices magna, sit amet sodales mi.',
		image: require('../assets/mosh.jpg')
	},
	{
		id: 2,
		title: 'T2',
		description: 'D2',
		image: require('../assets/mosh.jpg')
	},
]

export function MessagesScreen() {
	const [messages, setMessages] = useState(initialMessages)
	const [refreshing, setRefreshing] = useState(false)

	const handleDelete = (message: Message) => {
		setMessages(prevMessage => prevMessage.filter(m => m.id !== message.id))
	}

	return (
		<Screen>
			<FlatList
				data={messages}
				keyExtractor={message => message.id.toString()}
				ItemSeparatorComponent={ListItemSeparator}
				renderItem={({ item}) =>
						<ListItem
							title={item.title}
							subTitle={item.description}
							image={item.image}
							onPress={() => console.log('Message selected', item)}
							renderRightActions={() => <ListItemDeleteAction onPress={() => handleDelete(item)} />}
							showChevrons={true}
						/>
				}
				refreshing={refreshing}
				onRefresh={() => {
					setMessages(prevMessages => [
						...prevMessages,
						{
							id: 3,
							title: 'T3',
							description: 'D3',
							image: require('../assets/mosh.jpg')
						},
					])
				}}
			/>
		</Screen>
	)
}

const styles = StyleSheet.create({
})
