import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FolderDetail from "../pages/FolderDetail/FolderDetail";
import DrawerNav from "./Drawer";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="DrawerNav" // gồm : HomeScreen,LabelsScreen,TrashScreen,FoldersScreen
                        component={DrawerNav}
                        options={{ animation: "slide_from_bottom" }}
                    />
                </Stack.Group>
                <Stack.Group screenOptions={{ headerShown: true }}>
                    <Stack.Screen
                        name="FolderDetail"
                        component={FolderDetail}
                        options={({ route }) => ({
                            title: `${route.params?.forderData?.name || ""}`,
                            animation: "slide_from_right",
                        })}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
