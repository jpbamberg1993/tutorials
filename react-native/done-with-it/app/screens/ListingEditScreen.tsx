import * as Yup from 'yup';
import { Screen } from '../components/Screen';
import { StyleSheet } from 'react-native';
import { AppForm, AppFormField, SubmitButton } from "../components/forms"
import { AppFormPicker } from "../components/forms/AppFormPicker"
import { PickerItem } from "../components/PickerItem"
import { CategoryPickerItem } from "../components/CategoryPickerItem"

const categories = [
	{ label: "Furniture", icon: "floor-lamp", backgroundColor: "#fc5c65", value: 1 },
	{ label: "Car", icon: "car", backgroundColor: "#fd9644", value: 2 },
	{ label: "Cameras", icon: "camera", backgroundColor: "#fed330", value: 3 },
	{ label: "Games", icon: "cards", backgroundColor: "#26de81", value: 4 },
	{ label: "Clothing", icon: "shoe-heel", backgroundColor: '#2bcbba', value: 5 },
	{ label: "Sports", icon: "basketball", backgroundColor: '#45aaf2', value: 6 },
	{ label: "Movies & Music", icon: "headphones", backgroundColor: '#4b7bec', value: 7 },
	{ label: "Books", icon: "book-open-variant", backgroundColor: '#800080', value: 8 },
	{ label: "Other", icon: "application-outline", backgroundColor: '#8594a8', value: 9 },
]

const validationSchema = Yup.object().shape({
	title: Yup.string().required().min(1).label('Title'),
	price: Yup.number().required().min(1).max(10_000).label('Price'),
	category: Yup.object().required().nullable().label('Category'),
	description: Yup.string().label('Description'),
})

export function ListingEditScreen() {
	return (
		<Screen style={styles.container}>
			<AppForm
				initialValues={{ title: '', price: '', category: null, description: '' }}
				onSubmit={values => console.log({ values })}
				validationSchema={validationSchema}
			>
				<AppFormField
					name={"title"}
					placeholder={"Title"}
					autoCapitalize={"words"}
					autoCorrect={true}
				/>
				<AppFormField
					name={"price"}
					placeholder={"Price"}
					keyboardType={"numeric"}
					autoCorrect={true}
					maxLength={8}
					width={120}
				/>
				<AppFormPicker
					items={categories}
					name="category"
					placeholder={"Category"}
					PickerComponent={CategoryPickerItem}
					width='50%'
					numberOfColumns={3}
				/>
				<AppFormField
					name={"description"}
					placeholder={"Description"}
					maxLength={255}
					multiline={true}
					numberOfLines={3}
				/>
				<SubmitButton title={"Post"} />
			</AppForm>
		</Screen>
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 10
	}
})
