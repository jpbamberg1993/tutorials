import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Image, ImageSourcePropType, StyleSheet, TouchableHighlight, View } from "react-native"
import { AppText } from "../AppText"
import { colors } from "../../config/colors"
import { ReactNode } from "react"
import { Icon } from "../Icon"
import { defaultStyles } from "../../config/styles"

type Props = {
	image?: ImageSourcePropType
	iconComponent?: ReactNode
	showChevrons?: boolean
	title: string
	subTitle?: string
	onPress: () => void
	renderRightActions?: () => ReactNode
}
export function ListItem({
	image,
	iconComponent,
	showChevrons = false,
	title,
	subTitle,
	onPress,
	renderRightActions
}: Props) {
	return (
		<Swipeable renderRightActions={renderRightActions}>
			<TouchableHighlight
				onPress={onPress}
				underlayColor={colors.lightGrey}
			>
				<View style={styles.container}>
					{iconComponent && iconComponent}
					{image && <Image source={image} style={styles.image} />}
					<View style={styles.detailsContainer}>
						<AppText style={styles.title} numberOfLines={1}>{title}</AppText>
						{subTitle && <AppText style={styles.subTitle} numberOfLines={3}>{subTitle}</AppText>}
					</View>
					{showChevrons && <Icon
						name="chevron-right"
						size={50}
						backgroundColor={defaultStyles.colors.white}
						iconColor={defaultStyles.colors.mediumGrey}
					/>}
				</View>
			</TouchableHighlight>
		</Swipeable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: '100%',
		alignItems: 'center',
		padding: 15,
		backgroundColor: colors.white,
	},
	image: {
		borderRadius: 35,
		height: 70,
		width: 70,
	},
	title: {
		fontSize: 16,
		fontWeight: "500",
	},
	subTitle: {
		color: colors.mediumGrey,
		maxWidth: 280,
	},
	detailsContainer: {
		marginLeft: 10,
		flex: 1,
	}
})
