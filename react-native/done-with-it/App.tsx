import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useState } from "react"
import { RegistrationScreen } from "./app/screens/RegistrationScreen"
import { ListingEditScreen } from "./app/screens/ListingEditScreen"
import { ListingsScreen } from "./app/screens/ListingsScreen"
import { ProductListScreen } from "./app/screens/ProductListScreen"
import { ListingDetailsScreen } from "./app/screens/ListingDetailsScreen"
import { MessagesScreen } from "./app/screens/MessagesScreen"

export type Category = {
  label: string
  value: number
}
const categories = [
  { label: "Furniture", value: 1 },
  { label: "Clothing", value: 2 },
  { label: "Camera", value: 3 },
]

export default function App() {
  const [category, setCategory] = useState<Category | null>(null)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ListingEditScreen />
    </GestureHandlerRootView>
  )
}
